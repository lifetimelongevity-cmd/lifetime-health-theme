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
| NMN-PDP | Schluss-Leiste mit drei Fakten, Bild ohne Menschen | nur Template |

Alle neuen Settings stehen per Default auf aus. Die Sections sind im Repo, die Template-Änderungen
**nicht**: sie liegen nur im Vorschau-Theme, damit ein normaler Push sie nicht versehentlich live
nimmt. Nach der Freigabe:

```bash
python3 docs/bildwelt-2026-11-16/templates-patch.py .
```

## Platzhalter

Vier Motive sind vorhandene Bilder, bis die neuen erzeugt sind (ChatGPT-Zugriff wurde am 16.11.
im Dialog abgelehnt, deshalb stehen hier die Aufträge):

| Stelle | Platzhalter | Zieldatei |
|---|---|---|
| Katalog, Band Zellfunktion | `lt-hp-bereich-ki-bewegung-c.webp` | `lt-kat-zellfunktion.webp` |
| Katalog, Band Basisversorgung | `lt-hp-bereich-markt-gemuese.webp` | `lt-kat-basis.webp` |
| Katalog, Band Haut, Gelenke, Schlaf | `lt-hp-bereich-schlafen.webp` | `lt-kat-alltag.webp` |
| NMN-PDP, Leiste | `nad-liposom.jpg` | `lt-nmn-stillleben.webp` |

Das NMN-Stillleben trägt später auch die Bildkarte „Der Rohstoff“ (`lt-pdp-belege`,
`rohstoff_image`, Muster NAD⁺).

## Aufträge für ChatGPT (Projekt `ki-bilder`)

Gemeinsamer Stil für 1 bis 3: wie die eigenen Bewegungsbilder (Vorlagen
`../lifestyle/freundinnen-spaziergang.jpg`, `sport-laufen-paar.jpg`, `ki-bewegung-b2.jpg`).
Mitzieher mit starker Bewegungsunschärfe, tiefe warme Sonne oder warmes Lampenlicht, Filmkorn,
Gesichter durch die Bewegung nicht erkennbar, kein Text, keine Logos, kein Produkt.
**Querformat 3:2 (1536 × 1024). Motiv in der rechten Bildhälfte, das linke Drittel ruhig und
dunkel**, dort steht später die Schrift.

```text
1  katalog-zellfunktion.png
Eine Frau Anfang 50 läuft bei tiefer Abendsonne zügig einen Uferweg entlang, von der Seite,
Oberkörper und Kopf im Bild. Mitzieher mit starker Bewegungsunschärfe, Haare und Gesicht verwischt,
Licht von hinten rechts. Links im Bild dunkles, unscharfes Ufergrün ohne Details.

2  katalog-basis.png
Ein Paar Mitte 40 morgens in einer bewohnten Küche, beide in Bewegung am Tresen, einer greift
nach einer Schale, hartes Morgenlicht durchs Fenster rechts. Kamera leicht mitgezogen, Gesichter
und Hände verwischt, Holz, Keramik, Obst. Links im Bild ein dunkler, unscharfer Küchenschrank.

3  katalog-alltag.png
Eine Frau um 50 liegt abends im Bett auf der Seite, Kopf auf dem Kissen in der rechten Bildhälfte,
warmes Licht einer Nachttischlampe rechts hinten. Leichte Kamerabewegung, alles weich, Leinen in
Beigetönen. Links im Bild läuft die Bettdecke unscharf ins Dunkel.
```

```text
4  nmn-stillleben.png   (ohne Menschen, Querformat 2:1, 2400 × 1200)
Stillleben in tiefem, warmem Abendlicht: auf einem Travertin-Block steht ein Uhrglas mit feinem
weißem Pulver, daneben ein Laborspatel aus Edelstahl und ein schmaler Messzylinder aus Glas, der
das Licht bricht. Warme Wand in Hellbeige (#f2f1ed), weicher Blattschatten. Alles in der rechten
Bildhälfte, links leere Wand. Kein Wasserglas, kein Löffel, keine Hände, keine Verpackung, kein
Text, kein kaltes Blau. 50 mm, geringe Schärfentiefe, Filmkorn.
```

Danach: als WebP in die Shopify-Dateien, Namen wie in der Tabelle, in `templates-patch.py` die
vier Dateinamen tauschen, Eintrag in `lifetime-mockups/lifestyle/QUELLEN.md`.

## Noch nicht gebaut (Reihenfolge aus dem Konzept)

1. Wissenschaft: Limmroth am Mikro groß als Auftakt, „Mehr erfahren“ als Foto-Karten.
2. AGE&DNA-PDP: Stimmen als Foto-Karten statt Text-Bewertungen, Ablauf-Schritte mit Bildern.
3. Neben-PDPs: Leiste und Lifestyle-Bild an zweiter Stelle der Galerie.
4. NMN-PDP: Bildkarte „Der Rohstoff“ mit dem Stillleben.
5. `DESIGN.md` nachziehen (Foto-Hero ist dort noch untersagt).

## Geprüft

`scripts/lt-check.mjs --changed --theme-check` ohne Befund. Vorschau bei 1280 und 390 px: kein
horizontales Scrollen, keine Skriptfehler, `/collections/naehrstoffe` (zweiter Nutzer von
`lifetime-collection-grid`) rendert. Nicht geprüft: Warenkorb-Klick im Katalog und Variantenwahl
auf der NMN-PDP im Vorschau-Theme (an beiden Stellen ist kein Code geändert), Breiten über 1920 px.
