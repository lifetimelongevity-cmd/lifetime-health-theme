---
status: snapshot
last_review: 2026-10-28
canonical_for: agedna-pdp-impeccable-2-ablauf
---

# 05 Ablauf (`ablauf`, `lt-dna-lp-steps`) · zweiter Impeccable-Durchgang, 28.10.2026

Section 9 der AGE&DNA-PDP, Stand nach Commit `3c3d766`. Durchgang: `/impeccable` critique (zwei getrennte Gutachten: A Designkritik, B Detektor), dann bolder, dann delight. Nichts committet, nichts gepusht.

- Vorschau nur dieser Section: http://localhost:8789/agedna-pdp-impeccable-2/05-ablauf.html (`docs/agedna-pdp-impeccable-2/05-ablauf.html`, Texte 1:1 aus dem Template)
- Bilder bei 375 px, zweifache Auflösung: `05-ablauf-vorher.webp`, `05-ablauf-nachher.webp`
- **Höhe bei 375 px: 602 → 586 px**, mit einer Zeile mehr Information (Fußnote) und einer Subline, die vorher leer war. Desktop 1280 px: 337 px hoch, vier Spalten.

## Befund (Critique)

Gutachten A, Nielsen 15 von 28 (sieben anwendbare Heuristiken), Spezifität 2 von 5: ein Standard-Stepper, den ein anderer Testanbieter nach zwei Wörtern Tausch nutzen könnte.

1. **Zwei Zeitangaben widersprechen sich oder sind nicht zugesagt.** Überschrift „Fünf Minuten Arbeit“, Schritt 3 „Drei Minuten“. Schritt 2 „In 1 bis 2 Werktagen: Das Kit kommt per Post“, zugesagt ist nur der Versand (`compact_ship_text` im Hero). Dazu neu: Laut `docs/age-dna-product-fact-sheet.md` (Freigabe BJ 30.07.) zählen die 6 Wochen **ab Probeneingang im Labor**, nicht ab Einsenden. Der alte Block ließ den Bezugspunkt offen.
2. **Schritt 5 (Folgetest 299 € nach 6 Monaten) ist kein Schritt zum Ergebnis**, sondern eine zweite Kaufentscheidung am Ende einer Section, die beruhigen soll. Die 299 € stehen auf der Seite schon fünfmal. Direkt danach folgt „Das bekommst du für 395 €“, das liest sich als Folgekosten.
3. **Zwei Zahlensysteme je Zeile:** die Ordnungszahl im Kreis (1 bis 5) neben der Zeitzahl („4“ neben „6 Wochen“). Tabellenziffern saßen auf den Zahlen, die nichts aussagen. Zeiten teils ausgeschrieben („Drei“), nicht als Zahl erfassbar.
4. **Schritt 1 bündelt drei Handlungen** (Bestellen, App laden, Face Scan), der Face Scan steht im Bonus-Stack direkt darunter ein zweites Mal.
5. Die Headline verkaufte Aufwand, die Käuferin will wissen, wie lange es dauert.

Gutachten B (Detektor, `detect.mjs`): 0 Befunde im Liquid, 0 Befunde im Ablauf-Teil der Gesamtvorschau. Manuell: keine Hex-Farben, keine farbige linke Border, keine Em-Dashes, Schema-Name 15 Zeichen, keine leeren Defaults. Harte px-Werte nur im Bestand der Liste-Darstellung (36px Kreis, 17.5px Linie), unverändert gelassen, weil die Landingpages sie rendern.

## Änderungen

**Template-Block `ablauf`** (nur dieser Block, `order` unangetastet):

| | Vorher | Nachher |
|---|---|---|
| Headline | Fünf Minuten Arbeit. Den Rest machen wir. | So läuft es. |
| Subline | leer | Drei Schritte machst du, einen wir. |
| Schritt 1 | Heute · Bestellen, App laden, Face Scan machen. | **Heute** · Bestellen. Versand in 1 bis 2 Werktagen. |
| Schritt 2 | In 1 bis 2 Werktagen · Das Kit kommt per Post. | **3 Minuten** · Speichel ins Röhrchen, kein Arzttermin. |
| Schritt 3 | Drei Minuten · Speichel ins Röhrchen, ab in den Briefkasten. Porto bezahlt. | **Porto bezahlt** · Umschlag in den Briefkasten, fertig. |
| Schritt 4 | Nach etwa 6 Wochen · Dein Ergebnis ist in der App. | **6 Wochen** · Dein Ergebnis ist in der App. |
| Schritt 5 | Nach 6 Monaten · Folgetest für 299 €, nur Epigenetik. | gestrichen |
| Fußnote | leer | Die 6 Wochen zählen ab Eingang im Labor. Du bekommst eine Mail, sobald deine Probe da ist. |
| Darstellung | `timeline: true` | `layout: "zahlen"` (`timeline` bleibt stehen, wirkt nur in „Liste“) |

Entscheidungen zu den Widersprüchen: **3 Minuten** (die Speichelprobe allein; deckt sich mit der verifizierten Loox-Stimme von Sophie K., „in drei Minuten erledigt“). **Versand** statt Zustellung, wie im Hero; „1 bis 2 Werktage“ ausgeschrieben, der Hero schreibt „1–2“ (nicht meine Datei). Face Scan und Folgetest raus, beides steht im Bonus-Stack bzw. in Belegen und FAQ.

**Bolder** (`sections/lt-dna-lp-steps.liquid`, neue Darstellung `zahlen`): Die Zeit steht groß voran (Überschrift-Schrift, `--text-h2`, fett, Tabellenziffern), darunter genau eine Zeile in Body-Grau. Keine Ziffern mehr, nur 12-px-Punkte auf einer Haarlinie. Der Skeleton-Test besteht jetzt ohne Worte: vier Punkte, vier große Angaben, vier Zeilen. Section-Padding 64 → 48 px, Kopfabstand 32 → 24 px. Desktop: vier Spalten, Linie waagerecht durch die Punkte. Keine neue Farbe, keine neue Schrift: Punkte und gezogene Linie in `--color-teal-dark` wie die Knoten in `lt-pdp-process` (dem Ablauf der Live-PDP).

**Delight, genau einer:** Die Linie zieht sich beim Hereinscrollen von „Heute“ bis „6 Wochen“, jeder Punkt füllt sich, sobald sie ihn erreicht. Trägt die Information „kurzer Weg, endet beim Ergebnis“. Nur CSS (`animation-timeline: view()`, Bereiche an `cover`), kein JavaScript, dieselbe Bauweise wie in `lt-pdp-process`. Ohne Browser-Unterstützung oder bei `prefers-reduced-motion: reduce` steht der Endzustand (Linie gezogen, Punkte gefüllt). Geprüft in Headless Chrome bei 375 und 1280 px: Reihenfolge Punkt 1, Linie 1, Punkt 2 … Punkt 4; bei 375 px ist der Weg fertig, sobald die Liste ganz im Bild steht; mit Reduced Motion null Animationen, Endzustand von Anfang an.

## Neue Schalter (per Default aus)

| Section | Schalter | Default |
|---|---|---|
| `lt-dna-lp-steps` | `layout` (`liste` / `zahlen`) | `liste` |

`page.dna-lp.json` trägt keinen `layout`-Eintrag und rendert wie vorher (Liste, `timeline` aus). In „zahlen“ heißt `title` die große Angabe und `time` die eine Zeile, die Schema-Infos sagen das.

## Geprüft

- Template-Settings gegen das Schema: `layout` ist ein gültiger Select-Wert, Blöcke nur `title`/`time`, vier von höchstens fünf Blöcken. JSON parst (nach dem gewollten Kommentarkopf).
- `shopify theme check -o json` über das Theme: keine Befunde in `sections/lt-dna-lp-steps.liquid` und `templates/product.age-dna-test.json` (Exit 1 kommt von Altbefunden in anderen Dateien).
- 375 px: `scrollWidth` 375, kein horizontales Scrollen. 1280 px sauber, Zeilen 1 und 2 brechen dort auf zwei Zeilen um (Spaltenbreite ~260 px).
- Nicht geprüft: die echte Shopify-Darstellung, erst nach dem Push in ein Vorschau-Theme.

## Offene Fragen für BJ

1. **Hero-Datum gegen Fact Sheet.** Das Kalenderblatt im Hero rechnet „heute plus 42 Tage“, das Fact Sheet sagt 6 Wochen ab Probeneingang im Labor, also rund eine Woche später (Bestellung, Versand, Rückweg). Der Ablauf sagt jetzt das Richtige („ab Eingang im Labor“), der Hero läuft davon. Entweder `result_line_days` auf etwa 49 oder im Hero „frühestens“. Nicht meine Datei.
2. **Hero schreibt „1–2 Werktagen“ mit Bis-Strich**, der Ablauf „1 bis 2“. Eine Schreibweise wählen (Theme-Regel: keine Gedankenstriche in Copy).
3. **Folgetest raus aus dem Ablauf:** bewusst, weil er in Belegen, Bonus-Stack und FAQ steht. Wenn BJ ihn hier will, als fünften Block mit Titel „6 Monate“ und Zeile „Folgetest, nur Epigenetik, 299 €“, die Animation ist auf fünf Schritte vorbereitet.
4. „Porto bezahlt“ als große Angabe ist die einzige Nicht-Zahl neben „Heute“. Alternative wäre „Briefkasten“ (Ort statt Kosten). Bauchentscheidung, beides wahr.
5. Gutachten A fragt, ob der Ablauf überhaupt eine eigene Section braucht oder als drei Zeilen unter das Kalenderblatt im Hero gehört. Mit 586 px und vier Zahlen ist die Section jetzt in einem Blick erfassbar; die Frage bleibt für den Gesamtvergleich.
