#!/usr/bin/env python3
"""Baut aus den sechs Teilvorschauen (01 bis 06) eine Gesamtvorschau in Template-Reihenfolge.

Jede Teilvorschau behält ihr eigenes CSS: die Regeln werden mit einer Klasse je Datei
(.pv01 bis .pv06) eingekapselt, damit gleichnamige Klassen (.hd, .obj, .wrap) nicht
kollidieren. Skripte laufen je Datei in einer eigenen Funktion. Vorschau-Hinweise
(.ph, .vor, .nachbar, .pv-vor, .pv-nach, .pv-tag) und die Kopfzeilen von 02/03 fliegen raus.

Aufruf: python3 gesamt-bauen.py  →  00-gesamt.html im selben Ordner.
"""
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
FILES = {k: HERE / f for k, f in {
    "01": "01-hero.html", "02": "02-belege.html", "03": "03-zusage.html",
    "04": "04-einwaende.html", "05": "05-ablauf.html", "06": "06-faq-schluss.html"}.items()}

VOID = {"br", "img", "meta", "link", "input", "hr", "source", "wbr"}


def read(f):
    h = f.read_text()
    styles = "\n".join(re.findall(r"<style[^>]*>(.*?)</style>", h, re.S))
    body = re.search(r"<body[^>]*>(.*)</body>", h, re.S).group(1)
    scripts = re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", body, re.S)
    body = re.sub(r"<script(?![^>]*\bsrc=)[^>]*>.*?</script>", "", body, flags=re.S)
    return styles, body, scripts


def element(html, start):
    """Gibt das vollständige Element zurück, das bei `start` (Position von '<') beginnt."""
    m = re.match(r"<([a-zA-Z0-9]+)", html[start:])
    tag = m.group(1).lower()
    depth = 0
    pos = start
    for t in re.finditer(r"<(/?)([a-zA-Z0-9]+)[^>]*?(/?)>", html[start:]):
        name = t.group(2).lower()
        if name != tag:
            continue
        if t.group(1) == "/":
            depth -= 1
            if depth == 0:
                return html[start:start + t.end()]
        elif not t.group(3) and name not in VOID:
            depth += 1
    raise ValueError(f"kein Ende für <{tag}> ab {start}")


def by_id(html, id_):
    m = re.search(r"<[a-zA-Z0-9]+[^>]*\bid=\"%s\"" % re.escape(id_), html)
    if not m:
        raise ValueError(f"id {id_} nicht gefunden")
    return element(html, m.start())


def first(html, pattern):
    m = re.search(pattern, html)
    return element(html, m.start())


def split_selectors(sel):
    out, depth, cur = [], 0, ""
    for ch in sel:
        if ch in "([":
            depth += 1
        elif ch in ")]":
            depth -= 1
        if ch == "," and depth == 0:
            out.append(cur)
            cur = ""
        else:
            cur += ch
    out.append(cur)
    return [s.strip() for s in out if s.strip()]


def scope_selector(sel, cls):
    s = sel.strip()
    if s in (":root", "html", "body") or s.startswith("html") and not s.startswith("html "):
        return f".{cls}"
    if s.startswith("body"):
        rest = s[4:]
        return f".{cls}{rest}" if rest.startswith((".", ":", "[")) else f".{cls} {rest.strip()}"
    return f".{cls} {s}"


def scope_css(css, cls):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out = []
    i, n = 0, len(css)
    while i < n:
        j = css.find("{", i)
        if j < 0:
            break
        head = css[i:j].strip()
        # Block-Ende finden (balanciert)
        depth, k = 0, j
        while k < n:
            if css[k] == "{":
                depth += 1
            elif css[k] == "}":
                depth -= 1
                if depth == 0:
                    break
            k += 1
        inner = css[j + 1:k]
        i = k + 1
        if not head:
            continue
        if head.startswith("@"):
            low = head.lower()
            if low.startswith(("@media", "@supports", "@container", "@layer")):
                out.append(f"{head}{{{scope_css(inner, cls)}}}")
            else:  # @keyframes, @font-face, @import, @property
                out.append(f"{head}{{{inner}}}")
        else:
            sels = ",".join(scope_selector(s, cls) for s in split_selectors(head))
            out.append(f"{sels}{{{inner.strip()}}}")
    return "\n".join(out)


def strip_notes(html):
    for cls in ("ph", "vor", "nachbar", "pv-vor", "pv-nach", "pv-tag"):
        while True:
            m = re.search(r"<(p|div)[^>]*\bclass=\"%s\"" % re.escape(cls), html)
            if not m:
                break
            el = element(html, m.start())
            html = html.replace(el, "", 1)
    return html


parts = {}
styles, scripts = {}, {}
for key, f in FILES.items():
    st, body, sc = read(f)
    styles[key] = scope_css(st, f"pv{key}")
    scripts[key] = sc
    body = strip_notes(body)
    parts[key] = body

p01, p02, p03, p04, p05, p06 = (parts[k] for k in ("01", "02", "03", "04", "05", "06"))

header = first(p01, r"<header\b")
hero_main = first(p01, r"<main\b")
stimmen = by_id(p02, "section-stimmen")
# Die Lade direkt hinter den Stimmen gehört dazu
after = p02[p02.find(stimmen) + len(stimmen):]
m = re.match(r"\s*<a\b[^>]*class=\"lade\"", after)
if m:
    stimmen += "\n" + first(after, r"<a\b[^>]*class=\"lade\"")

pieces = [
    ("01", "main", header + "\n" + hero_main),
    ("02", "belege", by_id(p02, "section-belege")),
    ("03", "warum_jetzt", by_id(p03, "section-warum_jetzt")),
    ("02", "belege_stimmen", stimmen),
    ("06", "loox_reviews", by_id(p06, "s-loox")),
    ("04", "einwaende", by_id(p04, "einwaende")),
    ("04", "abgrenzung", by_id(p04, "abgrenzung")),
    ("02", "leitung", by_id(p02, "section-leitung")),
    ("05", "ablauf", first(p05, r"<section\b")),
    ("03", "bonus_stack", by_id(p03, "section-bonus_stack")),
    ("03", "garantie", by_id(p03, "section-garantie")),
    ("06", "faq_accordion", by_id(p06, "s-faq")),
    ("06", "schluss", by_id(p06, "s-leiste")),
]

body_html = "\n".join(
    f'<div class="pv{key} pv-teil" data-section="{name}">\n{html}\n</div>' for key, name, html in pieces)

css_all = "\n\n".join(f"/* ---- {k} ---- */\n{styles[k]}" for k in FILES)
js_all = "\n".join(
    f"/* ---- {k} ---- */\n(function(){{\n{s}\n}})();" for k in FILES for s in scripts[k])

doc = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AGE&amp;DNA-Verkaufsseite, Impeccable 2</title>
<meta name="description" content="Gesamtvorschau der AGE&DNA-PDP nach dem zweiten Impeccable-Durchgang (28.10.2026), zusammengesetzt aus den sechs Teilvorschauen 01 bis 06 in Template-Reihenfolge. Erzeugt von gesamt-bauen.py, nicht von Hand ändern.">
<meta name="robots" content="noindex">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,600;0,700;1,400&family=Instrument+Serif&display=swap" rel="stylesheet">
<style>
html,body{{margin:0;padding:0}}
.pv-teil{{display:block}}
{css_all}
</style>
</head>
<body>
{body_html}
<script>
{js_all}
</script>
</body>
</html>
"""
out = HERE / "00-gesamt.html"
out.write_text(doc)
print(out, len(doc), "Zeichen,", len(pieces), "Teile")
