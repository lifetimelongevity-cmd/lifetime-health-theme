---
status: living
last_review: 2026-10-26
canonical_for: startseite-umbau-2026-10
supersedes: [../../../lifetime-produktdetails/hormozi/2026-09-22_page-homepage.md]
review_cadence_days: 14
---

# Startseite-Umbau Oktober 2026

Section für Section mit BJ durchgegangen (07./08.10.2026), Vorbild wonderful.ai. Grundsatz: Die Startseite ist der Eingang zur Marke, der Test ist das Hero-Produkt, aber nicht das einzige.

**Vorschau:** `startseite.html` (über http://localhost:8789/startseite-v2/startseite.html). Sie ist die Live-Seite mit den neuen Sections an ihrer Stelle, Scripts entfernt. Die Sections dort (HTML + CSS + JS je Block) sind die Bauvorlage für die echten Liquid-Sections. Das Bauskript lag im Scratchpad und ist weg. **Seit dem Livegang am 09.10. ist das Theme die Quelle** (`templates/index.json` und die Sections), die Vorschau zeigt den Stand vom 08.10.

## AG1-Umbau 26.10.

Nach der AG1-Hero-Analyse (`docs/ag1-hero-analyse-2026-10-26.md`) und BJs Freigabe des Entwurfs `docs/entwurf-startseite-ag1-2026-10-26.html` („genau so“, Schriften wie live) ist die Startseite auf dem **Entwicklungs-Theme 193836777847** komplett neu gesetzt (Vorschau `https://lifetime-health-de.myshopify.com/?preview_theme_id=193836777847`). **Nicht live**, live geht nur über den Theme Manager. Grundsatz: ein Bild, ein Satz, ein Knopf im Hero; Beweis, Bereiche, Forschung, Stimmen, Angebot, Fragen darunter.

| # | Section-Datei | Key in `index.json` | Was sie zeigt |
|---|---|---|---|
| 1 | `lt-hp-hero-vollbild` (neu) | `hero_vollbild` | Vollbild-Karussell, zwei Folien als Blocks: Paar beim Laufen (`lt-hp-hero-laufen-paar.webp`, Teal-Knopf + Ghost-Knopf nach `#test`) und Kit auf Teal-Verlauf (weißer Knopf). Kein Autoplay, Punkte immer, Pfeile ab 769 px. Oben ein Papier-Streifen in Kopfzeilenhöhe, weil die Kopfzeile auf der Startseite absolut liegt (`header_absolute_homepage`); JS misst `.site-header` nach. |
| 2 | `lt-hp-bekannt` | `bekannt` | unverändert |
| 3 | `lt-hp-bereiche-karten` (neu, Anker `#test`) | `bereiche_karten` | „Eine Speichelprobe. / Sechs Antworten über deinen Körper.“, sechs Foto-Karten als Blocks (Kicker „Wie du alterst“ / „Was angelegt ist“), mobil Scroll-Snap 78 %, ab 769 px drei, ab 1180 px sechs Spalten, Fußzeile mit Quiz-Link |
| 4 | `lt-hp-video-vsl` | `video_vsl` | neu: Blocks „methode“ (drei nummerierte Zeilen), Zitat 24/28 px, Video-Karte 4:5 rechts, Play-Knopf mittig; `forschung_text` leer (Text steht in Methode 03), Link „Wie wir forschen →“ bleibt eigenständig |
| 5 | `lt-hp-stimmen` | `stimmen` | neues Setting `layout: raster`: drei Foto-Karten (Markus 46 → 38, Anja 36 → 31, Julia + 6 Jahre, `lt-hp-stimme-*.webp`), Sterne-Zeile aus Loox rechts neben der Überschrift (Link zu den Bewertungen), Zahl 40 px, Zitat in Lato mit Anführungszeichen. `karussell` ist der Stand vom 09.10. und bleibt wählbar |
| 6 | `lt-hp-angebot` (neu, Anker `#bestellen`) | `angebot` | Kit links auf Papier, rechts „Starte mit dem AGE & DNA-Test.“, fünf Inhaltszeilen, Preis aus `lifetime-age-dna` (Fallback 349 €), Teal-Knopf, drei Vertrauenszeilen, darunter vier Schritte. Block-Typen `inhalt`, `vertrauen`, `schritt`. Keine Streichpreise, keine Knappheit |
| 7 | `lt-hp-fragen` | `fragen` | vier Fragen (Kosten, Rückgabe, Genauigkeit, Datensicherheit), links „Oder 15 Minuten Video-Call, kostenlos. Termin wählen →“ (neues Setting `link_intro`) |
| 8 | `lt-leiste` | `schluss` | unverändert |

Deaktiviert im Template, als Rückweg mit allen Settings: `hero` (`crs-hero-typewriter`, Stand 22.10.), `test`, `normbereich`, `ablauf`, `bereiche`. 13 Sections im Template, unter der 25er-Grenze.

**Typografie:** Kapitel-Überschriften seitenweit 36 px Desktop / 28 px Handy (Entwurf), gesetzt als `--text-h2` auf der Section-Wurzel in allen sieben Sections mit Heading-Paar (vorher 28 / 24). Hero-Headline 64 / 36 px, Helvetica Neue 400, −0,02 em. Alle Knöpfe Teal `--color-dark` mit heller Schrift; der Mint-Knopf des Entwurfs ist verworfen (BJ 26.10.: „nicht dieses Grün“).

**Knöpfe (BJ 26.10., „wie sonst auf der Seite, nicht dieses Grün“):** nicht die 18-px-fetten Mint-Pillen des Entwurfs, sondern der Stil von `lt-hp-test`, `lt-leiste` und dem PDP-Kaufknopf: Teal `--color-dark` mit heller Schrift, Lato 16 px, Gewicht 500, 15 × 26 px Innenabstand, rund 50 px hoch, Pille, Hover heller wie auf der PDP. Mobil im Hero beide Knöpfe nebeneinander mit 12 px seitlich. Abweichend nur der Ghost-Knopf (transparent, heller Rand) und der Papier-Knopf auf der Kit-Folie. Mint kommt nirgends mehr als Knopf vor; Regel 6 der Analyse ist entsprechend geändert.

**Abweichungen vom Entwurf, bewusst:** Bekannt-aus und Schluss-Leiste bleiben wie live (Kacheln statt loser Logos; Leiste 520 px mit Verlauf, Knopf 16 px Tinte statt 18 px Teal). Häkchen vor den Vertrauenszeilen sind Phosphor-Icons in `--color-dark`, Sterne in `--color-dark` wie im Hero vom 22.10. Der Hero hat keine Kopfzeile im Bild (Entwurf und AG1 zeigen beide eine weiße Kopfzeile darüber). Preis und Produkt-Link kommen aus dem Produkt, nicht hart aus dem Entwurf. Fragen-Zeilen behalten die Live-Größen 18 / 16 px (Entwurf 17 / 15).

**Geprüft am 26.10.:** `shopify theme check` ohne Fehler; Puppeteer-Abgleich Entwurf gegen Dev-Theme bei 1440 und 390 px (Hero beide Folien, alle Sections, Schriftgrößen gleich), Karussell per Punkt, Pfeil und Wischen, Karten scrollen mobil, Fragen klappen, keine Konsolenfehler außer Shopify-Monorail. Skript lag im Scratchpad (Muster `vergleich.mjs`, Paare `.hero/.lthv`, `.test/.ltbk`, `.forschung/.ltvsl`, `.stimmen/.ltk`, `.angebot/.ltag`, `.fragen/.ltf`).

**Stolperstein beim Push:** Die Section mit dem neuen Setting muss *vor* dem Template auf dem Theme sein. Beim ersten Push war das Schema von `lt-hp-stimmen` ungültig (Option-Label über 50 Zeichen), Shopify hat `layout: raster` aus dem Template still verworfen; nach dem Fix Template nochmal pushen (vorher `touch`, sonst überspringt die CLI es als „nicht neuer“). Das Dev-Theme hatte vor dem Umbau einen älteren `index.json` als `main` (Stand vor 26.10.), deshalb nach `theme pull` immer gegen Git diffen und von der Git-Fassung ausgehen.

**Bilder neu in den Shopify-Dateien (26.10.):** `lt-hp-hero-laufen-paar.webp` (aus `lifetime-mockups/lifestyle/sport-laufen-paar.jpg`, 1122 × 1402, Quelle hier als `bilder/hero-laufen-paar.webp`), `lt-hp-stimme-anja.webp`, `lt-hp-stimme-julia.webp`. Weg wie am 08.10.: `stagedUploadsCreate` über den Shopify-MCP, POST per curl, `fileCreate`.

**Offen bei BJ:** `DESIGN.md` verbietet Foto-Hintergründe im Hero, der Umbau bricht das absichtlich; `DESIGN.md` nachziehen oder Umbau verwerfen. Ob Kopfzeile auf dem Foto liegen soll (wie bei Vollbild-Heros üblich) statt darüber. Ob ein 10-Sekunden-Mitzieher das Foto ersetzt. NMN ist weiter nicht auf der Startseite.

## Hero 22.10.

Nach der Denkschulen-Runde vom 22.10.2026 (`docs/entwurf-startseite-2026-10-22.html`, Vorschau http://localhost:8789/entwurf-startseite-2026-10-22.html) wurde der Verteiler-Entwurf der ganzen Seite verworfen, übernommen wurde nur der Hero. Die Section `crs-hero-typewriter` hat seitdem unter dem Heading-Paar einen Testsatz (`lead`), eine Sterne-Zeile aus den Loox-Metafeldern des Produkts `lifetime-age-dna` (fünf Sterne in Teal, der fünfte anteilig gefüllt, Settings `product`, `rating_fallback`, `count_fallback`, `sterne_label`), den Knopf „Zum AGE & DNA-Test“, eine Faktenzeile mit Produktpreis (`fakten`, `preis_fallback`) und einen unterstrichenen Quiz-Link nach `/pages/quiz-age` (`quiz_label`, `quiz_url`), der mobil unter dem Bild und auf dem Desktop unter der Faktenzeile steht. Der Ghost-Knopf „Alle Produkte ansehen“ und der „Weg der Probe“ sind auf BJ-Entscheid vom 22.10. leer gesetzt, ihre Settings bleiben im Schema. Commit `2a28dc9`, geprüft auf dem Entwicklungs-Theme 193836777847, mobil 390 px und Desktop. Zahlenregel aus `docs/age-dna-product-fact-sheet.md`: „über 150 DNA-Ergebnisse“, keine exakte Gesamtzahl.

## Live

| Was | Commit |
|---|---|
| Hero: Laufbild mit Ergebniskarten, zweiter Knopf „Alle Produkte ansehen“ → `/collections/all` | `94ea530` |
| Hero: Bildunterschrift „Beispielwerte“ gestrichen | `e75b8ce` |
| Alle zehn Sections der Startseite v2 (Tabelle unten) | `dd282ce` (09.10.) |

## Verständlichkeit, wartet auf Push (09.10.2026)

Story-Check aus Sicht eines Außenstehenden: Er erfuhr erst auf dem fünften Handy-Bildschirm, dass es um einen Speicheltest geht. Umgesetzt auf dem Entwicklungs-Theme 193836777847, live erst per Theme Manager:

- **Hero:** Unter den Knöpfen der **Weg der Probe**: Röhrchen links, Handy rechts, Punktlinie mit „Labor“ dazwischen, darunter „5 Minuten · Speichel, zu Hause“ und „6 Wochen · Dein biologisches Alter“. Beim Laden läuft einmal ein Punkt vom Röhrchen zum Handy und legt die Linie, das Handy nickt kurz; bei reduzierter Bewegung statisch. Settings `weg_a_zahl`, `weg_a_text`, `weg_label`, `weg_b_zahl`, `weg_b_text` in `crs-hero-typewriter`, Icons Phosphor thin wie im Ablauf (36 px, mobil 30), Zahlen 24 px wie die Begriffe im Test-Block. Vorstufe war eine graue Faktenzeile nach dem Muster myagingtests.com, BJ: „voll langweilig“.
- **Test-Block:** „Biologisches Alter und Gene aus Speichel.“ statt „Epigenetik und DNA aus einer Speichelprobe.“; Spaltenköpfe „Wie du alterst“ / „Was angelegt ist“; „MethylPace“ durch „Körperalter“ ersetzt (das biologische Alter *ist* ein Wert in MethylPace, die Liste zählte es doppelt, siehe `docs/age-dna-product-fact-sheet.md`); je Liste „+ 2 weitere“ / „+ 19 weitere“ gedämpft, damit vier gezeigte Begriffe zu sechs Bereichen und 23 Kategorien passen; Face-Scan als „Hautanalyse per Face-Scan“ erklärt; AI Health Coach nur noch einmal im Block.
- **Reihenfolge:** Nährstoff-Umschalter (mit NMN-Karte) hinter den Ablauf. Vorher unterbrach er den Test-Teil (Test, Nährstoffe, Test-Stimmen, Test-Ablauf); jetzt folgt „Wo willst du ansetzen?“ auf „04 Ergebnis in der App“.
- **Ablauf:** Schritt 04 sagt, wie man erfährt, was wirkt: „Nach 6 Monaten nochmal messen, dann siehst du, was gewirkt hat.“ (Re-Test-Empfehlung laut Produktdetails). Schritt 03 mit „inklusive“ statt Labornamen im Zeitfeld.
- **Stimmen:** Überschrift „Wie es anderen mit ihrem Ergebnis ging“ (die Zitate zeigen Eindrücke, keine Veränderung); Zählzeile „121 Bewertungen zum Test“, damit sie nicht gegen „431 Bewertungen für LIFETIME“ oben steht.
- **Video:** Hinweis mit Länge „1:12 Min. · …“.
- **Fehler:** In der Befund-Karte klebte am Handy „Cholesterin190“ zusammen (Tabellenkopf ohne Abstand rechts).

**`baue-index.py` nicht mehr laufen lassen:** Es war der Erstbau und überschreibt `templates/index.json` mit dem Wortlaut vom 08.10.

## Gebaut, wartet auf Freigabe (08.10.2026, seit 09.10. live)

Alle Sections unten sind als eigene Dateien gebaut und liegen auf dem **Entwicklungs-Theme 193836777847** (Vorschau `https://lifetime-health-de.myshopify.com/?preview_theme_id=193836777847`). Das alte Entwicklungs-Theme 193684111735 existiert nicht mehr. **Live geht nur über den Theme Manager** (BJ 08.10.), nicht per CLI.

| # | Anker | Section-Datei | Key in `index.json` |
|---|---|---|---|
| 1 | Hero | `crs-hero-typewriter` (unverändert, nur `padding_bottom` 120 → 64 wie in der Vorschau) | `hero` |
| 2 | `#bekannt` | `lt-hp-bekannt` | `bekannt` |
| 3 | `#video` | `lt-hp-video-vsl` | `video_vsl` |
| 4 | `#normbereich` | `lt-hp-normbereich` | `normbereich` |
| 5 | `#test` | `lt-hp-test` (CSS-Präfix `.lttb`, weil `.lts` schon `lt-science-split` gehört) | `test` |
| 6 | `#bereiche` | `lt-hp-bereiche` mit NMN-Karte davor | `bereiche` |
| 7 | `#stimmen` | `lt-hp-stimmen` | `stimmen` |
| 8 | `#ablauf` | `lt-hp-ablauf` | `ablauf` |
| 9 | `#fragen` | `lt-hp-fragen` (mit FAQPage-JSON-LD) | `fragen` |
| 10 | `#schluss` | `lt-leiste` (Footer-Naht nur auf `template-index`) | `schluss` |

Entscheidungen beim Bau (BJ 08.10.): Bestseller-Reihe fällt, **über den sechs Reitern steht mit Abstand eine breite NMN-Karte** im Live-Wortlaut der alten Bestseller-Karte, außerhalb des Heading-Paars „Nährstoffe nach Ziel“ (VSW-Vergleich), NMN nie als Reiter. Loox-Zitate echt, verwendet. Keine Kit-Stückzahl, Schluss ohne Knappheit. DNA-Karten im Vorschau-Wortlaut bestätigt. Urbanist und Instrument Serif **selbst gehostet** (`assets/lt-urbanist.woff2`, `assets/lt-instrument-serif.woff2`), keine Anfrage an Google.

Abweichungen von der Vorschau, bewusst: alle Sections auf der Kante des Heros (1280 mit 40/24/20 px Rand; in der Vorschau standen Schluss-Text und Stimmen-Kopf 20 px weiter innen). Kapitel-Überschriften mobil 24 px auch in Normbereich und Umschalter (Tabelle oben; die Vorschau hatte dort 28). Karussell-Pfeile als Phosphor thin statt Textpfeil. Links in Tinte statt Teal, Unterstreichung bei Hover.

Werkzeuge hier im Ordner: `baue-index.py` (schreibt `templates/index.json`), `upload-bilder.py` + `upload-ziele.json` (Bilder in die Shopify-Dateien, Präfix `lt-hp-`), `vergleich.mjs` (Vorschau gegen Theme je Section, 1440 und 390, Ausgabe `vergleich/`), `bedienung.mjs` (Reiter, Tastatur, Deep-Link, Karussell, Video, Fragen, Footer). Die alten Sections (`lt-hp-problem-v2`, `lt-hp-social-proof`, `lt-hp-journey`, `lt-hp-loop`, `lt-hp-consultation` u. a.) bleiben als Dateien liegen.

## Abgenommen (Vorschau)

| # | Section | Anker in der Vorschau |
|---|---|---|
| 1 | Hero (live) | – |
| 2 | Logo-Wand „Bekannt aus“ direkt unter dem Hero, ersetzt den Ticker; alte Logo-Reihe weiter unten fällt | `#bekannt` |
| 3 | Video mit Limmroth als VSL: dunkles Teal-Band (#364f56, kein Schwarz), links „Dein biologisches Alter ist messbar. Und beeinflussbar.“ + Zitat, rechts Short im Hochformat, eingebettet; YouTube lädt erst nach Klick (youtube-nocookie) | `#video` |
| 4 | „Alles im Normbereich. Nur nicht, was in deinen Genen steht.“ Befund-Karte gegen Foto (Pizza mit Freunden) mit zwei DNA-Karten | `#normbereich` |
| 5 | Test-Block: verwischtes Naturbild (`grund-natur`, Motiv `laeufer-huegel-himmel`) unter Teal #364f56, Kit frei, zwei Spalten Epigenetik / DNA; Video-Band bleibt einfarbig im selben Teal | `#test` |
| 6 | Umschalter „Wo willst du ansetzen?“ mit sechs Ziel-Kollektionen | `#bereiche` |
| 7 | Kundenstimmen: erste Karte mit Foto, die übrigen dunkler Teal-Verlauf (Loox-Wortlaut, 124er-Block raus) | `#stimmen` |
| 8 | So läuft's: ohne Bild, vier Spalten mit Phosphor-Icon, Zeitangabe grau | `#ablauf` |
| 9 | Fragen, acht Stück, Beratung als Antwort statt Section (abgenommen 08.10.) | `#fragen` |
| 10 | Schluss-Leiste im Wispr-Muster (verwischtes Foto, Instrument Serif, heller Knopf), aber im Footer-Teal #364f56 statt Schwarz und ohne Lücke und ohne Linie zum Footer (Footer `margin-top: 0` und `border-top: 0` auf der Startseite) | `#schluss` |

Gestrichen: Ticker, „Erst testen, dann ergänzen“, Wissenschafts-Block, Beratungs-Section, langer Abschluss. Die Limmroth-Bildkarte mit Video-Overlay ist durch das eingebettete Video (Nr. 3) ersetzt. Angaben zu Limmroth nur nach `docs/limmroth-faktenblatt.md` (z. B. über 160 PubMed-Arbeiten, nicht 200).

## Offen bei BJ (am 08.10. beantwortet, siehe oben)

1. Ersetzt der Umschalter die Bestseller-Reihe? Dann ist NMN nicht mehr auf der Startseite.
2. Stammen die langen Loox-Zitate (Markus T., Julia W., Philipp R., Petra N., Felix M., Thomas R., Sophie K., Stefan H.) von echten Käufern? Sie standen am 15.04. schon als Template-Text im Theme. Falls nicht: Schwarze Liste UWG Nr. 23b/c, Texte tauschen.
3. Optional: Kits je Charge für echte Knappheit im Schluss.
4. Kurzbefunde der zwei DNA-Karten („Erhöhtes Risiko für …“) vor dem Livegang mit einem echten App-Screen abgleichen.

## Typografie (08.10.2026, Bauvorgabe)

Abgeleitet aus den Live-Tokens, umgesetzt als ein Block `<style id="typeset">` am Ende von `startseite.html`. Beim Bau in die Sections übernehmen, nicht als Override.

| Rolle | Schrift | Größe Desktop / Handy | Wo |
|---|---|---|---|
| H1 | Helvetica Neue 400 | 36 (`--text-h1`) | Hero, live |
| Statement | Helvetica Neue 400, 1.1, −0.02em | 48 (`--text-display`) / 32 | Video-Band, Test-Block |
| Kapitel | Helvetica Neue 400, 1.15, −0.01em | 28 (`--text-h2`) / 24 | Normbereich, Umschalter, Stimmen, Ablauf, Fragen |
| Stat | Helvetica Neue 700, tabular | 56 (`--text-stat`) / 48 | „46 → 38“, Umschalter-Titel (400), Schluss (Instrument Serif) |
| Begriff | Helvetica Neue 400 | 24 / 18 | Spalten im Test-Block |
| Titel, Zitat | Helvetica Neue 400 | 20 (`--text-section`) / 18 | Ablauf-Titel, Kundenzitate, Video-Zitat 24/20 |
| Lead | Lato 400, 1.6 | 18 / 16 | Unterzeile Test-Block |
| Body | Lato 400, 1.6 | 16 | Fließtext, Antworten, Namen, Links |
| Klein | Lato 400 | 14 | Quellen, Hinweise, Einheiten |
| Label | Lato 600, Versalien, 0.1em | 12 | „Bekannt aus“, Spaltenköpfe, Schritt-Zeiten, „Beurteilung“ |

Regeln: Heading-Paar gleich groß, Unterzeile nur per Farbe (`rgba(38,37,30,.72)` hell, `rgba(247,247,244,.72)` dunkel). Kleiner Text auf Hell in `#6b6b63` (5:1), nie `#8a8982` (3,3:1). Keine Farbe in Schrift außer Messwerten; Teal-Labels sind raus. Kein Kicker über Überschriften: „AGE & DNA-Test“ steht jetzt im Heading-Paar des Test-Blocks. Zahlen mit `tabular-nums`. Ausnahmen bewusst: Urbanist nur in den nachgebauten App-Karten, Instrument Serif nur in der Schluss-Leiste.

Offen für den Bau: Die Hero-Unterzeile live steht bei Deckkraft 0.55 statt 0.72.

## Icons

Nur Phosphor thin (`ph:*-thin`, Iconify), einfarbig in `currentColor`, ohne farbige Kreise, siehe `docs/design-icon-system.md`. In der Vorschau: Ablauf (`package`, `test-tube`, `cpu`, `device-mobile`, 36 px), Häkchen im Befund (`check`), Video-Knopf (`play`). Die Pfeile in den DNA- und Ergebniskarten bilden die App nach und bleiben.

## Bilder

Neu erzeugt mit Codex (ChatGPT-App), Originale in `lifetime-mockups/ki-bilder/`, Einträge in `lifetime-mockups/lifestyle/QUELLEN.md`: sechs `ki-stimme-*`, `ki-schritt-probe`, `ki-schritt-labor`. Die zwei Schritt-Bilder sind auf der Startseite nicht mehr im Einsatz (BJ 08.10.), bleiben für andere Stellen.
