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

Vorschau auf dem unveröffentlichten Theme **„Claude Bildwelt Vorschau (16.11.)“ (#193736180087)**,
Basis ist der Live-Stand vom 16.11. Live ist nichts geändert.

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

Alle neuen Settings stehen per Default auf aus. Die Sections sind im Repo, die Template-Änderungen
**nicht**: sie liegen nur im Vorschau-Theme, damit ein normaler Push sie nicht versehentlich live
nimmt. Nach der Freigabe:

```bash
python3 docs/bildwelt-2026-11-16/templates-patch.py .
```

## Motive (16.11.2026, ChatGPT, Projekt `ki-bilder`)

Die vier Platzhalter sind ersetzt. Die Motive liegen als WebP in den Shopify-Dateien, die
Originale in `lifetime-mockups/ki-bilder/`, Prompts in `lifetime-mockups/lifestyle/QUELLEN.md`.

| Stelle | Datei | Format |
|---|---|---|
| Katalog, Band Zellfunktion | `lt-kat-zellfunktion.webp` | 1536 × 1024 |
| Katalog, Band Basisversorgung | `lt-kat-basis-2.webp` | 1536 × 1024 |
| Katalog, Band Haut, Gelenke, Schlaf | `lt-kat-alltag-2.webp` | 1536 × 1024 |
| NMN-PDP, Leiste (verwischt) und Bildkarte „Der Rohstoff“ (scharf) | `lt-nmn-stillleben.webp` | 1774 × 887 |

Für weitere Bänder gilt dieselbe Bestellung: Querformat 3:2, Motiv in der rechten Bildhälfte,
das linke Drittel ruhig und dunkel. Hochformate taugen dafür nicht, es bleibt nur ein Streifen
Oberkörper. **Bewegungsunschärfe nur bei Sport** (BJ 16.11.): Die ersten Fassungen von Küche und
Schlaf hatten verwischte Gesichter und wirkten unheimlich (`lt-kat-basis.webp`, `lt-kat-alltag.webp`,
ungenutzt in den Shopify-Dateien). In ruhigen Szenen ist das Bild scharf und die Person von hinten
zu sehen. Auf der NMN-PDP keine Menschen, keine Hände, keine Einnahme-Requisiten (Wasserglas,
Löffel).

## Noch nicht gebaut (Reihenfolge aus dem Konzept)

1. Wissenschaft: Limmroth am Mikro groß als Auftakt, „Mehr erfahren“ als Foto-Karten.
2. AGE&DNA-PDP: Stimmen als Foto-Karten statt Text-Bewertungen, Ablauf-Schritte mit Bildern.
3. Neben-PDPs: Leiste und Lifestyle-Bild an zweiter Stelle der Galerie.
4. `DESIGN.md` nachziehen (Foto-Hero ist dort noch untersagt).

## Geprüft

`scripts/lt-check.mjs --changed --theme-check` ohne Befund. Vorschau bei 1280 und 390 px: kein
horizontales Scrollen, keine Skriptfehler, `/collections/naehrstoffe` (zweiter Nutzer von
`lifetime-collection-grid`) rendert. Nicht geprüft: Warenkorb-Klick im Katalog und Variantenwahl
auf der NMN-PDP im Vorschau-Theme (an beiden Stellen ist kein Code geändert), Breiten über 1920 px.
