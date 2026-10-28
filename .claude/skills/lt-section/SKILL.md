---
name: lt-section
description: Ablauf für jede Arbeit an einer Shopify-Section, einem Snippet, einem Block oder einem JSON-Template im LIFETIME-Theme, vom Bestätigen des Templates bis zum lokalen Commit. Pflicht bei allem, was sections/, snippets/, blocks/ oder templates/ ändert, auch bei kleinen Edits („Buybox anpassen“, „Section umbauen“, „Text in der PDP ändern“, „neue Section für die Startseite“, „Entwurf umsetzen“). Nutzen bei /lt-section und immer, wenn Liquid oder ein Template angefasst wird.
---

# Section-Arbeit im LIFETIME-Theme

Die Regeln stehen in `CLAUDE.md` im Theme-Root. Dieser Skill ist die Reihenfolge, in der sie greifen. Ein Hook prüft jeden Edit automatisch (`scripts/lt-check.mjs`). Seine Meldungen werden behoben, nicht umgangen.

Theme-Root: `/Users/benediktjunker/lifetime-claude/lifetime-health-theme` (in einem Worktree der Worktree selbst).

## 1 Ziel festnageln

- Welche URL, welches Template, welche Section? Zuerst `docs/live-pages-map.md`. Bei Produkten das Template am Produkt bestätigen (`product(id){ templateSuffix }` per Shopify-MCP), nie aus dem Dateinamen raten.
- Die Live-Seite ansehen, sie ist die Wahrheit. Was steht davor und danach? Doppelt sich etwas?
- Die Aussage der Section in einem Satz. Wenn zwei Aussagen drinstecken, sind es zwei Sections oder eine schwache.

## 2 Vorhandenes finden

- Wer nutzt die Section noch? `grep -l '"type": "<section>"' templates/*.json`. Jede dieser Seiten muss nach der Änderung unverändert rendern, deshalb stehen neue Settings per Default auf aus.
- Gibt es das Muster schon? `_examples/`, Nachbar-Sections mit gleichem Präfix, `snippets/`. Erweitern statt neu bauen.
- Liquid-Syntax, Objekte oder Filter unklar? `/shopify-plugin:shopify-liquid` hat die offizielle Doku-Suche (`scripts/search_docs.mjs`).

## 3 Bauen

- Überschrift über `snippets/section-heading-crs.liquid`, nie eigenes Heading-CSS.
- Farben, Abstände und Größen aus `assets/theme.css :root`. Hex nur als Fallback in `var(--x, #…)` oder als Default eines Color-Settings.
- Mobil zuerst (375 px), ein dominantes Element, höchstens drei Schriftgrößen.
- Copy: Du-Form, keine Em-Dashes, Copy-Linie aggressiv (Workspace-CLAUDE.md). Bei neuer Copy die Bildstellen vermerken.
- Für Gestaltungsfragen `/impeccable`, die visuelle Sprache steht in `DESIGN.md`.

## 4 Prüfen, bevor committet wird

```bash
node scripts/lt-check.mjs --changed --theme-check
```

Das prüft alle geänderten Dateien gegen `HEAD`, die Hausregeln und Shopify Theme Check (nur Fehler in diesen Dateien, Laufzeit rund 45 s). Bei einem Stand, der schon committet ist: `--base <commit vor der Arbeit>`.

Danach im Browser bei 375 und 1280 px: kein horizontales Scrollen, Konsole ohne Fehler, bei Produkt-Templates Variantenwahl und Warenkorb testen. Mindestens eine andere Seite ansehen, die dieselbe Section nutzt. Bei Karussell, Formularen und Dialogen `/liquid-theme-a11y`.

Vorschau-Wege: statische HTML-Vorschau in `docs/` über http://localhost:8789/, echtes Rendern über `shopify theme dev` (nach neuen Schema-Settings neu starten) oder einen Dev-Push über den Theme Manager.

## 5 Abgeben

- Lokal committen, Commit-Text nennt Seite und Zweck. `docs/theme-status.md` und bei PDPs `docs/pdp-system.md` nachziehen.
- **Live pusht BJ über den Theme Manager.** Danach die Live-URL per `curl` prüfen. Der Storefront-Cache braucht bis zu 20 Minuten.
- Im Abschluss sagen, was nicht geprüft ist (z. B. nur in der Vorschau gesehen, nicht im Dev-Theme).
