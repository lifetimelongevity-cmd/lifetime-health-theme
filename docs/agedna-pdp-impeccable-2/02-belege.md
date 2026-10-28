---
status: snapshot
last_review: 2026-10-28
canonical_for: agedna-pdp-impeccable-2-belege-stimmen-leitung
---

# AGE&DNA-PDP, Impeccable-Durchgang 2: Belege, Stimmen, Leitung (28.10.2026)

Drei Sections aus `sections/lt-pdp-belege.liquid` auf der AGE&DNA-PDP (`templates/product.age-dna-test.json`, Keys `belege`, `belege_stimmen`, `leitung`). Ausgangspunkt Commit `3c3d766` (erster Durchgang 27.10.). Ablauf je Section: `/impeccable critique` (zwei getrennte Gutachten, A Designkritik, B Detector und Browser-Messung), dann `bolder`, dann `delight`. Ziel: jede Section auf dem Handy in einem Blick, genau eine Botschaft. Nichts committet, nichts gepusht. Die NMN-PDP rendert unverändert (alle neuen Schalter per Default aus, NMN-Template setzt keinen davon).

- Vorschau: `docs/agedna-pdp-impeccable-2/02-belege.html`, http://localhost:8789/agedna-pdp-impeccable-2/02-belege.html. CSS 1:1 aus der Section (`{% stylesheet %}`) plus `assets/crs-section-headings.css`, Texte 1:1 aus dem Template, Zählskript aus der Section.
- Bilder bei 375 px, zweifach: `02-belege-vorher-1.webp` bis `-3` (aus der Gesamtvorschau vom 27.10.) und `02-belege-nachher-1.webp` bis `-3`.

## Höhen bei 375 px

| Section | Vorher | Nachher | Botschaft |
|---|---|---|---|
| Belege (`belege`) | 792 px | **516 px** | das Ergebnis: 49 → 42 |
| Stimmen (`belege_stimmen`) | 747 px | **635 px** | drei echte Menschen mit Sternen |
| Leitung (`leitung`) | 424 px | **401 px** | ein Satz, ein Name, ein Beleg |

Zusammen 1.963 → 1.552 px, also ein halber Bildschirm weniger. Kein horizontales Scrollen bei 375 px, Desktop bei 1280 px geprüft (Zahlenpaar links, Zeilen rechts; Zitat links, Unterschrift rechts).

## Critique (Kurzfassung beider Gutachten)

Method: dual-agent (A Designkritik, B Detector plus headless Chrome). Nielsen für die drei zusammen: 7, 9, 10 n/a; Schwächen bei 4 (Konsistenz: Petra ohne Sterne zwischen zwei verifizierten Stimmen, vier Fettköpfe in einer Karte), 6 (die 49 stand nur im Nebensatz, das Paar musste man sich zusammensuchen) und 8 (Sterne viermal, Limmroth zweimal, drei Botschaften in Belege). Questions skipped: Richtung stand im Auftrag (bolder, delight).

**Belege.** 70 Wörter vor der Zahl (Beweiszeile 12, Überschrift 10), vier Fettköpfe in gleicher Größe, „42 Jahre“ las sich als Preiskarte. Die Zählanimation lief, hinterließ aber keine Spur: nach dem Zählen stand die 49 nirgends mehr groß. Limmroth stand hier und in Leitung.

**Stimmen.** Petra N. ohne Sterne und Datum wirkte wie die erfundene Stimme. Thomas, der stärkste Beleg, stand zuletzt und mit 33 Wörtern. Quelle der 4,7 fehlte. Fünf volle Sterne neben einer 4,7.

**Leitung.** Visitenkarte: Kreisfoto, Name über zwei Zeilen in Überschriftsgröße, Rolle über zwei Zeilen, kein Satz von ihm. Die Lade „Wie die Uhr arbeitet“ handelte von der Methode, nicht von der Person. „Spiegel-Bestseller-Autor“ ist nicht die belegbare Form (Faktenblatt: Co-Autor, SPIEGEL-Liste 05/2025).

**Detector.** Section: nur der bekannte 4-px-Radius (bewusst, wie die Hero-Karten). Theme Check: nur die bekannte `RemoteAsset`-Warnung am Bild-URL-Fallback, nichts Neues. Messung: Belege 67 Wörter sichtbar, Stimmen 84, Leitung 20; gedämpfte Texte AA.

## Änderungen

### Belege (bolder: das Zahlenpaar, delight: die Zahl verlässt den Pass)

- **Zahlenpaar statt Zahl** (`labor_value_style: paar`): links **49** regular in Tertiär, Pfeil (gezeichnetes SVG, `aria-label` „wird zu“), rechts **42** fett in Tinte, beide in Stat-Größe mit Tabellenziffern. Darunter je Zahl eine Zeile: „Jahre laut Pass“ / „Jahre biologisch“ (`labor_pair_from_label`, `labor_pair_to_label`). Die Zeile „Ein Beispielbefund aus der App.“ stand kurz darunter und ist auf BJs Ansage (28.10.) wieder raus, `labor_value_label` ist leer.
- **Delight:** Die 42 zählt beim Hereinscrollen einmal von 49 herunter, während die 49 links stehen bleibt. Am Anfang stehen beide Zahlen gleich, dann löst sich die rechte vom Pass. Nach dem Zählen bleibt der Abstand sichtbar (Befund aus Gutachten A). Ohne JS und bei reduzierter Bewegung steht das Paar von Anfang an. Es ist der einzige Zähl-Moment der Seite.
- **Überschrift und Beweiszeile raus** (`heading`, `subheading` auf `__none__`, `beweis_zeile` leer). „Zwei Analysen. Eine Speichelprobe. / Das gibt es in Deutschland nur hier.“ war die zweite Botschaft der Section; der Vergleich vom 27.10. hatte beide schon gestrichen. Das Labor steht jetzt als Quellenzeile unten in der Karte (`labor_source`: „Labor: Eurofins Genomics, ISO 17025“), Limmroth nur noch in Leitung.
- **Zeilen als Spalten** (`labor_text_style: spalten`): unter 840 px läuft der Kopf fett in die Zeile hinein („**6 Bereiche** Epigenetik: wie du alterst. Nach 6 Monaten neu messbar.“), zwei Zeilen je Eintrag statt drei; ab 840 px Kopf links in fester Spalte, Text rechts (Spec-Rows aus DESIGN.md). Kopf in Body-Größe fett, damit allein das Paar Stat-Größe hat. Texte gekürzt („Erklärt jeden Wert. PDF für deine Ärztin.“). **Eine Schriftgröße in der Karte** (BJ 28.10.): mit Spalten laufen Zeilen, Lade-Beschriftung, Lade-Text, Tabelle und Quellenzeile alle in Body-Größe (16 px); nur der Tabellenkopf bleibt in der Label-Stufe. Gilt nur mit `spalten`, NMN (Absätze) bleibt.
- Lade: Bereiche-Tabelle und Folgetest-Satz unverändert, dazu ein neuer Text zur Methode (`labor_compare`, auf BJs Ansage „juicy“): DNA bleibt gleich, die Methylierung verändert sich, epigenetische Uhren als Goldstandard der Altersforschung, Messung statt Schätzung; die Uhr folgt dem Prinzip von Steve Horvath (2013), ohne Nennung von MethylPace (BJ 28.10.), kalibriert auf die verlässlichsten Stellen, liest dazu Alterstempo und Körperalter. Keine Messstellen-Zahl, kein Anbietername (PRODUCT.md), ersetzt den alten Horvath-Absatz aus der Leitung.

### Stimmen (bolder: drei identische Loox-Muster, delight: der Teilstern)

- **Petra N. raus, Markus T. rein** (Loox, März 2026, 5 Sterne, verifiziert: „Ich bin 46, mein biologisches Alter: 38. Das hat mich motiviert weiterzumachen.“). Alle drei Stimmen tragen jetzt dasselbe Muster Sterne · Name · Verifiziert · Monat.
- **Reihenfolge** Sophie, Thomas, Markus. Thomas als lebendes Zahlenpaar nach oben, auf die zwei tragenden Sätze gekürzt, Auslassung mit „(…)“ gekennzeichnet (siehe offene Fragen).
- **Quelle an der Zahl** (`stimmen_quelle`: „auf Loox“): „4,7 von 5 · 122 Bewertungen auf Loox“.
- **Delight:** Die Sterne neben dem Schnitt füllen sich nach dem Schnitt: bei 4,7 vier volle Sterne und der fünfte zu 70 % (reines CSS, `clip-path`, kein JS, keine Bewegung). Vorher standen fünf volle Sterne neben einer 4,7. Gilt überall, wo `stimmen_stars_big` an ist (nur AGE&DNA).

### Leitung (bolder: ein Satz in Zitat-Stimme, delight: die hängende Anführung)

- **Ein Satz** (`person_quote`): „Longevity beginnt mit Daten, nicht mit Annahmen.“ (steht so auf der Startseite, `video_vsl`). Zitat-Stimme aus DESIGN.md: Lato kursiv, 24 px mobil, 28 px ab 840 px; Anführungszeichen setzt das CSS, das öffnende hängt in den Rand. Auf dem Desktop links neben der Person.
- **Person als Unterschrift:** Sobald ein Zitat da ist, wird die Person zur Byline (Bild 48 px, Name in Body-sm halbfett wie an den Stimmen, darunter Rolle und Belegzeile). Fett gehört den Messwerten, nicht dem Namen.
- **Ein Beleg** (`person_proof`): „Co-Autor des SPIEGEL-Bestsellers „Der Longevity-Kompass““, die belegbare Form aus dem Faktenblatt. Rolle: „Chefarzt Neurologie, Köln-Merheim“ statt „Chefarzt Neurologie, Spiegel-Bestseller-Autor“.
- **Lade raus** (`rohstoff_details_label`, `rohstoff_details_body` leer), Inhalt in die Belege-Lade gewandert.
- Überschrift „Geleitet von einem Chefarzt. / Nicht von einem Influencer.“ unverändert.

## Neue Schalter in `lt-pdp-belege` (alle per Default aus bzw. leer)

| Schalter | Karte | Wirkung |
|---|---|---|
| `labor_value_style` (`zahl` / `paar`) | 1 | Zahlenpaar, braucht `labor_value_from` |
| `labor_pair_from_label`, `labor_pair_to_label` | 1 | Zeile unter Startwert und Wert |
| `labor_text_style: spalten` | 1 | Kopf in der Zeile (mobil) bzw. links in Spalte (Desktop) |
| `labor_source` | 1 | Quellenzeile unten |
| `person_quote`, `person_proof` | 2 | Satz der Person, Belegzeile; mit Zitat wird die Person zur Unterschrift |
| `stimmen_quelle` | 3 | Wort hinter der Anzahl |

Geändertes Verhalten ohne neuen Schalter: `stimmen_stars_big` füllt die Sterne jetzt nach dem Schnitt (Teilstern). Betrifft nur Templates mit diesem Schalter, also nur die AGE&DNA-PDP.

## Geprüft

- Template-Settings der drei Blöcke gegen das Schema (Typen, Select-Werte, Blocktypen): keine Abweichung.
- `shopify theme check`: ein Liquid-Fehler aus dem Umbau gefunden und behoben (Filter in Bedingung), danach nur die bekannte `RemoteAsset`-Warnung am Bild-URL-Fallback.
- 375 px ohne horizontales Scrollen (scrollWidth 375), 1280 px sauber.
- Nicht geprüft: echte Shopify-Darstellung (erst nach Push in ein Vorschau-Theme), dort vor allem das Zählen und das Team-Foto (`person_image`, in der Vorschau steht das Podcast-Bild als Fallback).

## Offene Fragen für BJ

1. **Thomas gekürzt.** Die Loox-Stimme ist um den mittleren Satz („Das hat mich überrascht, ich dachte ich mache bereits alles richtig.“) gekürzt, mit „(…)“. Der Satz ist der Hook für die Zielkundin, kostet aber eine Zeile. Voll lassen oder gekürzt?
2. **Überschrift über den Belegen.** „Zwei Analysen. Eine Speichelprobe. / Das gibt es in Deutschland nur hier.“ ist raus, damit die Section eine Botschaft hat. Die Einzigartigkeit steht auf der Seite nur noch in der Abgrenzung. Soll sie hier zurück?
3. **Kein Beispiel-Hinweis mehr am Zahlenpaar.** Auf BJs Ansage raus. 49 → 42 steht jetzt ohne Kennzeichnung als Beispiel; falls das rechtlich gekennzeichnet sein soll, wäre `labor_value_label` die Stelle (eine Zeile, 14 px).
4. **„Nicht von einem Influencer.“** Gutachten A hält die Gegenfigur für fremd im Kopf der 50-plus-Kundin und schlägt den Namen als zweite Zeile vor. Nicht geändert.
5. **„Goldstandard“ in der Lade.** Steht auf BJs Wunsch. Die Formulierung „gilt in der Altersforschung als Goldstandard für das biologische Alter“ ist die übliche Einordnung epigenetischer Uhren, aber kein zitierter Beleg; bei Bedarf Quelle nachtragen (z. B. Horvath 2013, Genome Biology).
6. **Zitat-Quelle.** „Longevity beginnt mit Daten, nicht mit Annahmen.“ steht auf der Startseite; im Faktenblatt ist nur das Zitat von `/pages/ueber-lifetime` als freigegeben notiert. Freigabe für die PDP bestätigen.
