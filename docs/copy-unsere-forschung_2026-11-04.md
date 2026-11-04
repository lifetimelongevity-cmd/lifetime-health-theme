---
status: snapshot
last_review: 2026-11-04
canonical_for: copy-entwurf-unsere-forschung-november-2026
---

# Copy-Entwurf /pages/unsere-forschung, November 2026

Seit 04.11.2026 lokal eingebaut und committet, nicht gepusht. Ziel-Template: `templates/page.wissenschaft.json`.
Zahlen aus dem Manuskript off-clock, Fassung v2b (Exporte `2026-11-03_154053`, `_154456`,
`_155210` in `lifetime-epigenetik/output/forschungslog/`), SALIVAGE-TH-Zahlen aus dem
eingereichten Antrag 041-782-024-2026-1, Nullbefunde aus `lifetime-epigenetik/LOG.md`
vom 17.10.2026 (F14, F15). Eigene Kundenkits, Anbieter und Collins kommen nicht vor.

Die Rubriknummern verschieben sich durch zwei neue Abschnitte. Reihenfolge danach:

`hero → statement → feld → grenze → zahl (neu) → kurz → forschung → befund (neu) → pruefung (neu) → validierung → personen → ausblick → lesen → quellen`

## 1. Neuer Abschnitt `befund` (zweite Instanz von `lt-wiss-forschung`)

Ohne `report_asset`, dann rendern die drei `stat`-Blöcke rechts. Ohne `node`-Blöcke, die Zeitleiste bleibt im Abschnitt `forschung`.

**Bildstelle:** rechts die Zahlenkarten. Später Abbildung 5 des Manuskripts („Ausgangslage oder Tempo“, Streuung mit 25 gegen 70), sobald sie gebaut ist.

```json
"befund": {
  "type": "lt-wiss-forschung",
  "settings": {
    "anchor_id": "befund",
    "rubric_label": "Erster Befund",
    "heading": "Die Uhren streiten über dein Alter.",
    "subheading": "Aber nicht darüber, wer vorn liegt.",
    "intro": "<p>Fünf epigenetische Uhren nennen für dieselbe Blutprobe verschiedene Jahre. Wir haben gefragt, worauf sie sich trotzdem einigen. Gerechnet haben wir auf öffentlichen Studiendaten von über 4.000 Menschen. Das Manuskript ist in Vorbereitung.</p>",
    "shot_label": "Manuskript in Vorbereitung",
    "shot_note": "Öffentliche Blutdaten aus vier Kohorten",
    "closing": "Deine Zahl enthält also eine Ausgangslage, die du mitbringst. Bewegen kann sich der Rest. Genau den wollen wir messbar machen.",
    "color_bg": "#f7f7f4",
    "color_text": "#26251e"
  },
  "blocks": {
    "r1": { "type": "signal", "settings": {
      "title": "Einig über die Reihenfolge",
      "body": "Wer für eine Uhr älter wirkt als Gleichaltrige, wirkt es meist auch für die anderen. Die Übereinstimmung liegt bei 0,51. Würde jede Messstelle unabhängig altern, wären es 0,07."
    }},
    "r2": { "type": "signal", "settings": {
      "title": "Auch außerhalb der Uhren",
      "body": "Rund ein Fünftel dieser Einigkeit zeigt sich auch in über 467.000 Messstellen, die keine der Uhren benutzt. Das gemeinsame Signal gehört zur Person, nicht nur zu den Uhren."
    }},
    "r3": { "type": "signal", "settings": {
      "title": "Ausgangslage statt Tempo",
      "body": "Etwa die Hälfte der Unterschiede, die die Uhren bei 70-Jährigen zeigen, besteht schon mit 25. Ein Teil wächst mit den Jahren wie ein Tempo. Ein anderer bleibt über 15 Jahre gleich groß."
    }},
    "s1": { "type": "stat", "settings": {
      "value": "0,51", "value_suffix": "",
      "label": "Einigkeit der fünf Uhren, wer älter wirkt. Zufall ergäbe 0,07."
    }},
    "s2": { "type": "stat", "settings": {
      "value": "48", "value_suffix": "%",
      "label": "der Streuung unter 70-Jährigen gibt es schon mit 25. Reines Tempo ergäbe 13 %."
    }},
    "s3": { "type": "stat", "settings": {
      "value": "181", "value_suffix": "",
      "label": "Zwillingspaare zeigen: Der stabile Teil ist familiär geprägt."
    }}
  },
  "block_order": ["r1", "r2", "r3", "s1", "s2", "s3"]
}
```

Belege: 0,51 / 0,07 = `r_beob` / `r_zufall`; 467.541 = `n_cpg`; 48 % (KI 37 bis 62 %) und 13 % = `a25_uhren` / `a25_tempo`; 15 Jahre = `vw_jahre` (Rest 1,0-fach, epiTOC2-Anteil 1,9-fach, Tempo 1,5); 181 Paare, h² 0,40 im AE-Modell.

**Formulierungsgrenzen:** „Hälfte“ ist Streuung im Querschnitt, nicht Jahre. Nach der Vorab-Regel aus Skript 38 ist der Befund nicht „überwiegend früh angelegt“. „Familiär“ statt „erblich“, weil sich Gene und geteilte Umwelt nach der Array-Bereinigung nicht trennen lassen. Kein Satz über Interventionen.

## 2. Neuer Abschnitt `zahl` (zweite Instanz von `lt-wiss-kurz`)

Steht nach `grenze`, also direkt hinter dem Diagramm mit den sechs Uhren auf einer Probe.

**Bildstelle:** das 4:5-Bildfeld rechts für den Wasserfall aus dem englischen Programm-Schema (7,5 Jahre, vier Balken), als statisches WebP. Interaktiv erst als eigene Section.

```json
"zahl": {
  "type": "lt-wiss-kurz",
  "settings": {
    "anchor_id": "zahl",
    "heading": "Was in deiner Zahl steckt.",
    "subheading": "Ein Beispiel: Du bist 60, die Uhr meldet 67,5.",
    "closer": "Misst dieselbe Uhr dich zweimal, heben sich Versatz und Ausgangslage auf. Übrig bleiben deine Veränderung und das Rauschen. Das Rauschen kleiner zu machen, ist unsere Arbeit. Die Zahlen sind ein Schema, keine Messung.",
    "image_alt": "Schema: 7,5 Jahre Abstand zum Kalenderalter, zerlegt in Versatz der Uhr, Messfehler, Ausgangslage und Veränderung",
    "color_bg": "#f2f1ed",
    "color_text": "#26251e"
  },
  "blocks": {
    "z1": { "type": "criterion", "settings": {
      "title": "Versatz der Uhr: 3 Jahre",
      "body": "Manche Uhren rechnen bei allen etwas drauf, wie eine Waage, die immer zwei Kilo zu viel zeigt. Das gehört zur Uhr, nicht zu dir."
    }},
    "z2": { "type": "criterion", "settings": {
      "title": "Messfehler: 1,5 Jahre",
      "body": "Ein Teil ist Zufall beim Messen, ein Teil eine Eigenart genau dieser Uhr. Eine zweite Messung fiele hier anders aus."
    }},
    "z3": { "type": "criterion", "settings": {
      "title": "Deine Ausgangslage: 1,5 Jahre",
      "body": "Was du mitbringst. Dieser Teil ist schon bei jungen Erwachsenen sichtbar und bleibt über Jahre stabil."
    }},
    "z4": { "type": "criterion", "settings": {
      "title": "Was sich bewegt: 1,5 Jahre",
      "body": "Der Teil, der sich verändern kann. Ihn wollen wir zwischen zwei Messungen sichtbar machen."
    }}
  },
  "block_order": ["z1", "z2", "z3", "z4"]
}
```

Quelle: `lifetime-epigenetik/paper/programm.json` → `schema` (abw 3, eig 0,5 + rau 1, ausg 1,5, vera 1,5; Zellmix und Laborlauf vorher herausgerechnet).

## 3. Abschnitt `ausblick` (bestehend, überarbeitet)

```json
"body": "<p>Seit 2026 arbeiten wir an der nächsten Frage: Wie wird eine Speichelprobe so präzise, dass sie eine Veränderung bei dir zeigt? Bis Ende 2027 prüfen wir das gegen vorab festgelegte Zielgrößen. Ob wir sie erreichen, ist offen. Veröffentlichen wollen wir die Ergebnisse so oder so.</p>",
"stand": "Diese Seite wächst mit unserer Forschung. Stand: November 2026."
```

```json
"o1": { "type": "next", "settings": {
  "title": "Speichel präziser machen",
  "body": "Speichel ist eine Mischung aus Immun- und Schleimhautzellen. Bei derselben Person verschob sie sich in zwei Monaten um bis zu 35 Prozentpunkte, und die Uhren springen mit. Heute muss sich das biologische Alter um rund 5,7 Jahre ändern, bevor eine Messung es sicher erkennt. Unser Ziel liegt unter 3,5 Jahren. Ein erster Testdatensatz kam auf 3,4. Ob das auf neuen Daten hält, klärt die Validierung."
}},
"o2": { "type": "next", "settings": {
  "title": "Eine Schwelle für jedes Probenpaar",
  "body": "Wie stark sich zwei Messungen unterscheiden dürfen, hängt von Zellmix, Laborlauf und Messstellen ab. Wir berechnen diese Grenze für jedes Probenpaar einzeln. Darüber ist eine Veränderung echt."
}},
"o3": { "type": "next", "settings": {
  "title": "Ausgangslage und Veränderung trennen",
  "body": "Ein Teil dessen, was die Uhren melden, bringst du mit. Als Nächstes isolieren wir den Teil, der sich bewegt, damit klar wird, was Lebensstil wirklich verändert."
}}
```

`block_order`: `["o1", "o2", "o3"]`. Der bisherige Block „DNA und Epigenetik kombiniert“ geht in o3 auf; „Kandidaten für Universitätskooperationen“ entfällt, wenn BJ den Satz nicht halten will.

**Bildstelle:** keine, der Abschnitt läuft auf dunklem Teal ohne Bild.

## 4. Neuer Abschnitt `pruefung` (dritte Instanz von `lt-wiss-kurz`)

Steht nach `befund`. Ohne Bild, einspaltig.

**Bildstelle (optional, stark):** Ausschnitt einer Vorab-Festlegung mit Datum und Commit-Kennung als 4:5-Bild. Das macht „vorher festgelegt“ sichtbar statt nur behauptet.

```json
"pruefung": {
  "type": "lt-wiss-kurz",
  "settings": {
    "anchor_id": "pruefung",
    "heading": "So prüfen wir uns selbst.",
    "subheading": "Erst die Regel, dann die Rechnung.",
    "closer": "Was vorher nicht festgelegt war, heißt bei uns explorativ. So steht es auch im Manuskript.",
    "color_bg": "#f7f7f4",
    "color_text": "#26251e"
  },
  "blocks": {
    "p1": { "type": "criterion", "settings": {
      "title": "Vorher festgelegt",
      "body": "Bevor wir rechnen, schreiben wir auf, was als Bestätigung zählt und was nicht. 17 solcher Festlegungen gibt es bisher, jede mit Datum und Prüfsumme versioniert."
    }},
    "p2": { "type": "criterion", "settings": {
      "title": "Auch ein Nein zählt",
      "body": "Wir hatten erwartet, dass eine große Uneinigkeit der Uhren unruhige spätere Messungen ankündigt. Geprüft an 110 Menschen mit bis zu fünf Messungen: nicht bestätigt."
    }},
    "p3": { "type": "criterion", "settings": {
      "title": "Was eine Uhr nicht sieht",
      "body": "Zehn Jahre Blutwerte von 112 Menschen auf der Insel Hvar. Keine der Uhren bildet das Blutbild ab, auch nicht seine Veränderung über zehn Jahre."
    }},
    "p4": { "type": "criterion", "settings": {
      "title": "Nachrechenbar",
      "body": "Für unsere Veröffentlichungen nutzen wir öffentliche Studiendaten. Jede Zahl im Manuskript führt auf eine Datei und ein Skript zurück."
    }}
  },
  "block_order": ["p1", "p2", "p3", "p4"]
}
```

Belege: 17 Dateien `VORAB-REGISTRIERUNG_*.md`, Commits auf `epicons-vorab-registrierung` mit SHA-256 im LOG; F15 Frühwarnung (LOG 17.10., Commit 3ebe43a, rho −0,06, n 110, SATSA); F14 Blutbild (LOG 17.10., Commit 181d57b, GSE207927, 112 Personen).

**Wortwahl:** „mit Datum und Prüfsumme versioniert“, nicht „öffentlich registriert“. Die Commits sind lokal. Eine Ablage bei OSF würde „öffentlich“ erlauben.

## Quellen, die für 1 und 4 neu dazukommen (Gruppe „Zuverlässigkeit …“)

Titel am 04.11.2026 gegen Crossref geprüft, Band und Seiten ergänzt.

- Meyer, D. H. & Schumacher, B.: Aging clocks based on accumulating stochastic variation. Nature Aging (2024). doi.org/10.1038/s43587-024-00619-x
- Teschendorff, A. E.: A comparison of epigenetic mitotic-like clocks for cancer risk prediction. Genome Medicine (2020). doi.org/10.1186/s13073-020-00752-3
- Liu, Z. et al.: Underlying features of epigenetic aging clocks in vivo and in vitro. Aging Cell (2020). doi.org/10.1111/acel.13229
