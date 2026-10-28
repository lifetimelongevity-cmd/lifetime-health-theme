#!/usr/bin/env node
// Prüft Liquid-Sections, Snippets, Blocks und JSON-Templates gegen die Hausregeln aus CLAUDE.md.
//
// Aufrufe:
//   (Hook)  PostToolUse liefert JSON auf stdin, geprüft wird tool_input.file_path
//   node scripts/lt-check.mjs sections/lt-pdp-hero.liquid …   einzelne Dateien
//   node scripts/lt-check.mjs --changed                        alle geänderten Dateien gegen --base
//   Optionen: --base <rev> (Default HEAD), --theme-check (zusätzlich Shopify Theme Check, nur Fehler)
//
// Zeilenregeln (Em-Dash, Hex, border-left, inline_asset_content, continue) gelten nur für
// hinzugefügte Zeilen gegen --base, damit der Bestand kein Rauschen erzeugt. Schema- und
// Template-Regeln gelten für die ganze Datei, weil sie sonst den Push scheitern lassen.
// Exit 2 = Befunde (der Hook reicht stderr an Claude weiter), 0 = sauber.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHECKED_DIRS = ['sections', 'snippets', 'blocks', 'templates', 'layout'];

const args = process.argv.slice(2);
const opt = (name) => args.includes(name);
const optValue = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const base = optValue('--base', 'HEAD');

function git(...a) {
  try {
    return execFileSync('git', ['-C', ROOT, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return '';
  }
}

function relevant(rel) {
  if (!CHECKED_DIRS.includes(rel.split('/')[0])) return false;
  return rel.endsWith('.liquid') || (rel.startsWith('templates/') && rel.endsWith('.json'));
}

async function targets() {
  const files = args.filter((a, i) => !a.startsWith('--') && args[i - 1] !== '--base');
  if (opt('--changed')) {
    const changed = git('diff', '--name-only', base, '--').split('\n');
    const untracked = git('ls-files', '--others', '--exclude-standard').split('\n');
    return [...new Set([...changed, ...untracked])].filter(Boolean);
  }
  if (files.length) return files.map((f) => path.relative(ROOT, path.resolve(f)));
  // Hook-Modus: JSON auf stdin
  let raw = '';
  for await (const chunk of process.stdin) raw += chunk;
  try {
    const p = JSON.parse(raw)?.tool_input?.file_path;
    return p ? [path.relative(ROOT, path.resolve(p))] : [];
  } catch {
    return [];
  }
}

// Zeilennummern (1-basiert), die gegenüber base hinzugekommen sind. Neue Datei = alle Zeilen.
function addedLines(rel, lineCount) {
  const inBase = git('rev-parse', '--verify', '-q', `${base}:${rel}`).trim();
  if (!inBase) return new Set(Array.from({ length: lineCount }, (_, i) => i + 1));
  const diff = git('diff', '-U0', base, '--', rel);
  const added = new Set();
  for (const m of diff.matchAll(/^@@ -\S+ \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const len = m[2] === undefined ? 1 : Number(m[2]);
    for (let i = 0; i < len; i++) added.add(start + i);
  }
  return added;
}

// Markiert je Zeile, ob sie in {% schema %}, {% comment %} oder {% liquid %} liegt.
function zones(lines) {
  let schema = false, comment = false, liquid = false;
  return lines.map((line) => {
    const z = { schema, comment, liquid };
    if (/{%-?\s*schema\s*-?%}/.test(line)) schema = z.schema = true;
    if (/{%-?\s*endschema\s*-?%}/.test(line)) schema = false;
    if (/{%-?\s*comment\s*-?%}/.test(line)) comment = z.comment = true;
    if (/{%-?\s*endcomment\s*-?%}/.test(line)) comment = false;
    if (/{%-?\s*liquid\b/.test(line) && !/-?%}/.test(line.replace(/{%-?\s*liquid/, ''))) liquid = z.liquid = true;
    else if (liquid && /-?%}/.test(line)) liquid = false;
    return z;
  });
}

const HEX = /(?<![\w&\/=-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/;

function checkLiquid(rel, text, added) {
  const out = [];
  const lines = text.split('\n');
  const z = zones(lines);
  lines.forEach((line, i) => {
    const n = i + 1;
    if (!added.has(n) || z[i].schema) return;
    if (line.includes('inline_asset_content'))
      out.push([n, '`inline_asset_content` rendert im Store still leer. SVG in ein Snippet mit case-Mapping legen.']);
    if (z[i].comment || /^\s*(\/\/|\/\*|\*)/.test(line)) return;
    if (line.includes('—'))
      out.push([n, 'Em-Dash (—). Stattdessen Komma, Punkt oder Klammer.']);
    // Hex als Fallback einer Variable (var(--lt-text, #26251e)) ist das Muster der lt-Sections, erlaubt.
    const hex = line.replace(/var\(--[\w-]+\s*,\s*#[0-9a-fA-F]{3,8}\s*\)/g, '').match(HEX);
    if (hex && !/href=|\bid=/.test(line))
      out.push([n, `Fester Farbwert ${hex[0]}. Variable aus assets/theme.css nutzen (z. B. var(--color-ink), var(--color-paper), var(--color-dark)).`]);
    const bl = line.match(/border-left(?:-color|-width)?\s*:\s*([^;"}]+)/);
    if (bl && !/^\s*(0|none)\b/.test(bl[1]) && (/border-left-color/.test(line) || /([2-9]|\d{2,})px/.test(bl[1]) || /teal|accent|dark|#|rgb/.test(bl[1])))
      out.push([n, 'Farbiges border-left als Akzent. Stattdessen getönte Karte mit vollem Rahmen.']);
    if (z[i].liquid && /^\s*continue\s*$/.test(line))
      out.push([n, '`continue` in {% liquid %} überspringt nicht zuverlässig. Mit unless … endunless einschließen.']);
  });

  const m = text.match(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/);
  if (m) {
    const at = text.slice(0, m.index).split('\n').length;
    let schema;
    try {
      // Shopify akzeptiert Kommas vor ] und } (z. B. ss-hero-pro), JSON.parse nicht.
      schema = JSON.parse(m[1].replace(/,(\s*[\]}])/g, '$1'));
    } catch (e) {
      out.push([at, `Schema ist kein gültiges JSON: ${e.message}`]);
    }
    if (schema) {
      const name = (v, where) => {
        if (typeof v === 'string' && v.length > 25) out.push([at, `${where} "${v}" hat ${v.length} Zeichen, erlaubt sind 25.`]);
      };
      name(schema.name, 'Schema-name');
      (schema.presets || []).forEach((p) => name(p.name, 'presets[].name'));
      const walk = (node, trail) => {
        if (Array.isArray(node)) return node.forEach((x) => walk(x, trail));
        if (!node || typeof node !== 'object') return;
        if (node.default === '') out.push([at, `Leeres default bei Setting "${node.id || trail}". Weglassen und in Liquid | default: nutzen.`]);
        if (node.type === 'header' && typeof node.content === 'string' && node.content.length > 50)
          out.push([at, `header-content "${node.content.slice(0, 40)}…" hat ${node.content.length} Zeichen, erlaubt sind 50 (scheitert erst beim Push).`]);
        // Übersetzungsschlüssel (t:…) zählen nicht, nur wörtliche Labels.
        if (typeof node.label === 'string' && !node.label.startsWith('t:') && node.label.length > 70)
          out.push([at, `label "${node.label.slice(0, 40)}…" (${node.id || node.value || trail}) hat ${node.label.length} Zeichen, erlaubt sind 70 (scheitert erst beim Push).`]);
        if (Array.isArray(node.options))
          for (const o of node.options)
            if (typeof o?.label === 'string' && !o.label.startsWith('t:') && o.label.length > 50)
              out.push([at, `option label "${o.label.slice(0, 40)}…" (${node.id}) hat ${o.label.length} Zeichen, erlaubt sind 50 (scheitert erst beim Push).`]);
        if (node.type === 'range' && node.step > 0 && (node.max - node.min) / node.step > 100)
          out.push([at, `range "${node.id}" hat ${(node.max - node.min) / node.step} Stufen, erlaubt sind 100 (scheitert erst beim Push).`]);
        for (const [k, v] of Object.entries(node)) if (typeof v === 'object') walk(v, node.id || k);
      };
      walk(schema.settings, 'settings');
      walk(schema.blocks, 'blocks');
    }
  }
  return out;
}

function checkTemplate(rel, text, added) {
  const out = [];
  let data;
  try {
    data = JSON.parse(text.replace(/^\s*\/\*[\s\S]*?\*\//, ''));
  } catch (e) {
    return [[1, `Template ist kein gültiges JSON: ${e.message}`]];
  }
  if (rel.startsWith('templates/product') && Array.isArray(data.order) && data.order.length > 25)
    out.push([1, `${data.order.length} Sections im order, erlaubt sind 25.`]);
  for (const key of data.order || []) {
    const type = data.sections?.[key]?.type;
    if (type && !type.startsWith('shopify://') && !existsSync(path.join(ROOT, 'sections', `${type}.liquid`)))
      out.push([1, `Section "${key}" verweist auf sections/${type}.liquid, die Datei fehlt.`]);
  }
  text.split('\n').forEach((line, i) => {
    if (added.has(i + 1) && line.includes('—')) out.push([i + 1, 'Em-Dash (—) im Text. Stattdessen Komma, Punkt oder Klammer.']);
  });
  return out;
}

function themeCheck(files) {
  let json = '[]';
  try {
    json = execFileSync('shopify', ['theme', 'check', '--path', ROOT, '--output', 'json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
  } catch (e) {
    json = e.stdout || '[]';
  }
  const want = new Set(files.map((f) => path.join(ROOT, f)));
  const out = [];
  for (const f of JSON.parse(json || '[]')) {
    if (!want.has(f.path)) continue;
    for (const o of f.offenses || [])
      if (o.severity === 'error' || o.severity === 0)
        out.push([path.relative(ROOT, f.path), (o.start_row ?? 0) + 1, `Theme Check ${o.check}: ${o.message}`]);
  }
  return out;
}

const files = (await targets()).filter((rel) => relevant(rel) && existsSync(path.join(ROOT, rel)));
const findings = [];
for (const rel of files) {
  const text = readFileSync(path.join(ROOT, rel), 'utf8');
  const added = addedLines(rel, text.split('\n').length);
  const res = rel.endsWith('.json') ? checkTemplate(rel, text, added) : checkLiquid(rel, text, added);
  res.forEach(([line, msg]) => findings.push([rel, line, msg]));
}
if (opt('--theme-check') && files.length) findings.push(...themeCheck(files));

if (findings.length) {
  console.error(`lt-check: ${findings.length} Befund(e) nach den Regeln in CLAUDE.md. Bitte beheben.`);
  for (const [rel, line, msg] of findings) console.error(`  ${rel}:${line}  ${msg}`);
  process.exit(2);
}
if (args.length) console.log(`lt-check: ${files.length} Datei(en) geprüft, keine Befunde.`);
