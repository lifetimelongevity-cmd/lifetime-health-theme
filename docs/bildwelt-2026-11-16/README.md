---
status: snapshot
last_review: 2026-11-16
canonical_for: bildwelt-startseite-auf-katalog-science-pdp
---

# Bildwelt der Startseite auf Katalog, Wissenschaft und PDPs (16.11.2026)

BJ-Auftrag: Kollektionsseite, PDPs und Wissenschaftsseite sollen sich stärker wie die Startseite
anfühlen. Die Startseite setzt Bilder als Fläche ein, der Text steht darauf (Vollbild-Hero,
Foto-Karte, Stimmen-Karte, Leiste). Auf den anderen Seiten waren Bilder kleine Kästen neben dem
Text. Regel für jede Seite: Bildfläche als Auftakt, ein Bildbruch in der Mitte, Leiste am Ende.
Beleg-Abschnitte bleiben ruhig. **NMN-PDP ohne Menschen** (BJ 16.11.).

## Stand

**Von BJ am 16.11. freigegeben und im Repo, wartet auf den Push über den Theme Manager.** Live ist
bis dahin nichts geändert. Die Vorschau liegt weiter auf dem unveröffentlichten Theme
**„Claude Bildwelt Vorschau (16.11.)“ (#193736180087)**, Basis war der Live-Stand vom 16.11.

- Katalog: https://lifetime-health-de.myshopify.com/collections/all?preview_theme_id=193736180087
- Wissenschaft: https://lifetime-health-de.myshopify.com/pages/science?preview_theme_id=193736180087
- NMN-PDP: https://lifetime-health-de.myshopify.com/products/lifetime-nmn?preview_theme_id=193736180087

Aufnahmen in `vorschau/`.

## Was gebaut ist

| Seite | Änderung | Wo |
|---|---|---|
| Katalog | Hero als Bildband mit dem Kollektionsbild der Startseite, Überschrift auf dem Bild | `lt-science-hero`, Setting `layout: bildband` |
| Katalog | Gruppenmarken (Zellfunktion, Basisversorgung, Haut/Gelenke/Schlaf) als Bildband mit einem Satz | `lifetime-collection-grid`, Block `group_label` mit `image`, `text`, `position` |
| Katalog | „Wonach suchst du?“ als Schluss-Leiste: verwischtes Foto rechts, Liste zweispaltig, nahtlos in den Footer | `lt-katalog-index`, Settings `image`, `footer_nahtlos` |
| Wissenschaft | Schluss-Leiste am Seitenende, im Validierungs-Block das Laufpaar statt der kühlen Schwimmerin | nur Template |
| NMN-PDP | Schluss-Leiste mit drei Fakten und Karte „Der Rohstoff“ als Bildkarte, beides mit dem Stillleben ohne Menschen | nur Template |

Alle neuen Settings stehen per Default auf aus. Sections und Templates sind im Repo. Die drei
Templates (`collection.katalog.json`, `page.science.json`, `product.nmn-pulver.json`) sind inhaltlich
gleich der Vorschau-Fassung, gegengeprüft am 16.11. `templates-patch.py` bleibt als Protokoll liegen:
es schreibt dieselben Änderungen auf einen frisch gezogenen Live-Stand, formatiert `page.science.json`
dabei aber um, deshalb ist die Datei im Repo von Hand an denselben drei Stellen geändert.

Nach dem Push prüfen: Katalog, `/pages/science` und NMN-PDP je bei 1280 und 390 px, auf der NMN-PDP
Variantenwahl und Warenkorb (das Template hat eine Section mehr, 6 von höchstens 25).

## Motive (16.11.2026, ChatGPT, Projekt `ki-bilder`)

Die vier Platzhalter sind ersetzt. Die Motive liegen als WebP in den Shopify-Dateien, die
Originale in `lifetime-mockups/ki-bilder/`, Prompts in `lifetime-mockups/lifestyle/QUELLEN.md`.

| Stelle | Datei | Format |
|---|---|---|
| Katalog, Band Zellfunktion | `lt-kat-zellfunktion-2.webp` | 1536 × 1024 |
| Katalog, Band Basisversorgung | `lt-kat-basis-2.webp` | 1536 × 1024 |
| Katalog, Band Haut, Gelenke, Schlaf | `lt-kat-alltag-2.webp` | 1536 × 1024 |
| NMN-PDP, Leiste (verwischt) und Bildkarte „Der Rohstoff“ (scharf) | `lt-nmn-stillleben.webp` | 1774 × 887 |

Für weitere Bänder gilt dieselbe Bestellung: Querformat 3:2, Motiv in der rechten Bildhälfte,
das linke Drittel ruhig und dunkel. Hochformate taugen dafür nicht, es bleibt nur ein Streifen
Oberkörper. **Kein verwischtes Gesicht** (BJ 16.11.): Die ersten Fassungen hatten verwischte
Gesichter und wirkten in Küche und Bett unheimlich (`lt-kat-zellfunktion.webp`, `lt-kat-basis.webp`,
`lt-kat-alltag.webp`, am 16.11. auf BJs Ansage aus den Shopify-Dateien gelöscht; die PNGs liegen
weiter in `lifetime-mockups/ki-bilder/`). Jetzt ist in allen drei Bändern die Person
von hinten zu sehen, das Bild ist scharf, und nur im Laufbild ist der Hintergrund bewegungsunscharf. Auf der NMN-PDP keine Menschen, keine Hände, keine Einnahme-Requisiten (Wasserglas,
Löffel).

## Teil 2: Wissenschaft, Auftakt und „Mehr erfahren“ (16.11.2026)

**Von BJ am 16.11. freigegeben, Template im Repo, wartet auf den Push.** Teil 1 ist seit 16.11. live.

| Stelle | Änderung | Wo |
|---|---|---|
| Hero | Bildband mit Labor-Motiv statt Kasten mit Limmroth-Foto, zwei Knöpfe auf dem Bild | `lt-science-hero` statt `lt-science-proof-hero`; neue Settings `cta_*`, `band_verlauf`, `position_*` |
| „Mehr erfahren“ | vier Foto-Karten statt grauer Textkarten, am Handy seitlich wischbar | `crs-link-cards`, Block-Setting `image` |

Die Sections sind im Repo (Settings per Default aus, `crs-link-cards` läuft auf rund 20
Artikel-Templates unverändert weiter). `templates/page.science.json` ist im Repo von Hand an
denselben Stellen geändert und inhaltlich gleich der Vorschau-Fassung (`templates-patch-2.py`
bleibt als Protokoll). Nach dem Push prüfen: `/pages/science` bei 1280 und 375 px, die beiden
Knöpfe im Hero, Wischen der Foto-Karten am Handy, dazu ein Artikel mit Link-Karten. Limmroth steht weiter im Block „Ein Arzt prüft die Inhalte“. Der zweite
Knopf heißt in der Vorschau „Zum Test“ statt „Zum AGE & DNA-Test“, damit beide bei 375 px
nebeneinander passen. Die Aufnahmen `vorschau/science-*.jpg` zeigen noch die lange Fassung.

Motive: `lt-sci-hero-labor.webp` (neu, ChatGPT), `lt-sci-probe.webp` (vorhandenes Probe-Bild),
dazu drei Bereichsbilder der Startseite (`lt-hp-bereich-lesen-handy`, `-markt-gemuese`,
`-ki-bewegung-c`).

## Noch nicht gebaut (Reihenfolge aus dem Konzept)

1. Wissenschaft, Auftakt und „Mehr erfahren“: gebaut und freigegeben, siehe Teil 2.
2. AGE&DNA-PDP: Stimmen als Foto-Karten statt Text-Bewertungen, Ablauf-Schritte mit Bildern.
3. Neben-PDPs: Leiste und Lifestyle-Bild an zweiter Stelle der Galerie.
4. `DESIGN.md` nachziehen (Foto-Hero ist dort noch untersagt).

## Geprüft

`scripts/lt-check.mjs --changed --theme-check` ohne Befund. Vorschau bei 1280 und 390 px: kein
horizontales Scrollen, keine Skriptfehler, `/collections/naehrstoffe` (zweiter Nutzer von
`lifetime-collection-grid`) rendert. Nicht geprüft: Warenkorb-Klick im Katalog und Variantenwahl
auf der NMN-PDP im Vorschau-Theme (an beiden Stellen ist kein Code geändert), Breiten über 1920 px.
