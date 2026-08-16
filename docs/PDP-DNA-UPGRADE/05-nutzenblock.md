---
status: living
last_review: 2026-08-16
canonical_for: pdp-age-dna-nutzenblock
depends_on:
  - docs/PDP-DNA-UPGRADE/01-rmbc-kontext.md
  - docs/PDP-DNA-UPGRADE/04-mechanismus.md
  - docs/age-dna-product-fact-sheet.md
supersedes: []
review_cadence_days: 30
---

# crs-expert-quotes wird Nutzenblock

Ergebnis von `/copy-rewrite` gegen `sections/crs-expert-quotes.liquid` auf der AGE&DNA-PDP,
15.08.2026. Enthält den Copy-Vorschlag, den Sperren-Check, die Höhenrechnung und die Bauvorgaben.
**Gebaut am 2026-08-16** (`28d499c`), Live-Push durch BJ am selben Tag. Der Live-Stand unten
beschreibt die Section **vor** dem Umbau. Die Höhen sind Erwartungswerte, noch nicht nachgemessen.

Live-Stand geprüft am 15.08.2026 im Browser bei 375 x 812, nicht aus dem Code gelesen.

---

## 1. Der Richtungswechsel

Der erste Entwurf war ein **Methodenblock** nach [`04-mechanismus.md`](04-mechanismus.md)
Kandidat 2: Horvath als Referenz, Sugden et al. als Befund, LIFETIME als Konsequenz. Fachlich
tragfähig, alle Sperren eingehalten.

**BJ-Entscheid vom 15.08.:** Die Methode darf genannt werden, aber wir rechtfertigen sie nicht.
Interessant ist, was sich aus dem Ergebnis lesen lässt und welches Problem der Test löst.

Damit wird die Fläche ein **Nutzenblock**. Der Mechanismus stirbt nicht, er wird umgeparkt
(siehe §8).

**Zur Formulierung „präziseste Methode der Welt".** Als Überzeugung intern in Ordnung, auf der
Seite nicht. Nicht nur wegen der Sperrliste in [`01`](01-rmbc-kontext.md) §2, sondern weil unser
eigener Genauigkeitsartikel live das Gegenteil belegt (Higgins-Chen und Levine 2022,
Wiederholungsstreuung verbreiteter Uhren). Ein Wettbewerber bräuchte dafür einen Screenshot
unserer eigenen Seite. Die stärkste Fassung, die trägt, steht bereits live in der
Vergleichstabelle: **„DNA-Methylierung (Goldstandard)"**. Damit ist die Methode benannt, ohne
Rechtfertigung. Im Nutzenblock muss sie deshalb gar nicht vorkommen.

---

## 2. Live-Befund, gemessen

| Größe | Wert |
|---|---|
| Section-Höhe bei 375 px | 1.348 px |
| beginnt bei | 6.249 px |
| Kopfblock (Überschrift plus Unterüberschrift) | 290 px |
| Kartenraster | 898 px (328 / 277 / 277 plus 2 x 8 Lücke) |
| Padding | 2 x 56,25 px (aus `min(80px, 15vw)`) |

Rechnerisch: 112,5 + 290 + 48 + 898 = 1.348,5.

**Zwei Sperr-Verstöße stehen heute live in dieser Section.**

| Stelle | Text live | verletzte Sperre |
|---|---|---|
| Unterüberschrift | „eine der **präzisesten** Methoden" | keine Präzisions- oder Genauigkeitsaussage |
| Horvath-Karte | „einer der **genauesten** Indikatoren" | dito, zusätzlich direkt am Produkt |

Beide fallen mit dem Umbau weg. Sie sind unabhängig davon ein Compliance-Punkt: wenn der Umbau
nicht kommt, müssen die zwei Formulierungen trotzdem raus.

> **Entscheid BJ, 2026-08-16: raus, unabhängig vom Umbau.** Eingetragen und begründet in
> [`06`](06-kausalkette.md) §2.3. Mit diesem Umbau erledigt (`28d499c`).

**Dritter Punkt, kleiner.** Der Horvath-Karte ist *Genome Biology, 2013* als Quelle zugeordnet.
Der zweite Satz („Es erfasst, was der Kalender nicht erfassen kann") liest sich wie ein
Marketing-Zusatz und ist nicht gegengeprüft. Mit dem Umbau erledigt.

**Vierter Punkt.** Die Unterüberschrift läuft auf Headline-Größe, sechs Zeilen mobil, und
wiederholt die Überschrift („kein Trend" steht zweimal). 190 px ohne Informationsgewinn. Das ist
die Fläche, aus der der Nutzenblock bezahlt wird.

---

## 3. Warum genau hier

Die Sections der PDP liegen auf klar getrennten Achsen. Eine fehlt.

| Section | Achse | sagt |
|---|---|---|
| feature_grid | Lieferumfang | was drin ist, sechs Positionen |
| report_preview | Darstellung | wo es erscheint |
| **expert_quotes** | **—** | **heute nichts über das Produkt** |
| comparison_table | Abgrenzung | was andere nicht können |
| customer_reviews | sozialer Beleg | dass es Leuten gefällt |

Zwischen „hier sind deine Werte" und „andere können das nicht" fehlt **„und damit machst du
Folgendes"**. Das ist derselbe Befund wie Result Specificity 16 / 25 in [`01`](01-rmbc-kontext.md)
§5: „was sich nach dem Test in seinem Alltag ändert, sagt nur eine einzige Kundenstimme".

---

## 4. Das Problem, das der Test löst

Aus der Sprachbank in [`01`](01-rmbc-kontext.md) §1, wörtlich von verifizierten Käufern:

> „Ich habe vorher viele Supplemente genommen und nie gewusst, ob sie wirklich zu mir passen."
> „Ich weiß jetzt, wo ich ansetzen muss."

Der Kunde macht bereits etwas: Supplemente, Training, Schlaf. Er bekommt nur keine Rückmeldung,
ob irgendetwas davon bei ihm greift, und er weiß nicht, womit er anfangen soll. Er optimiert nach
Empfehlungen, die für einen Durchschnittsmenschen gebaut sind, den es nicht gibt.

Drei Entscheidungen fallen danach anders. Eine pro Karte.

---

## 5. Copy-Vorschlag, Vorher gegen Nachher

### Überschrift

| | |
|---|---|
| **vorher** | Epigenetische Diagnostik: Die Methode, nicht der Trend |
| **nachher** | **Danach weißt du, wo du ansetzt.** |

Nah an der Kundenstimme, die es selbst so sagt. Alternative, härter: „Was du danach anders machst."

### Subline

| | |
|---|---|
| **vorher** | Epigenetische Diagnostik ist kein Trend. Sie ist eine der präzisesten Methoden, den Zustand des Körpers zu messen. Unabhängig vom Geburtsjahr. (141 Zeichen, 6 Zeilen) |
| **nachher** | **Drei Entscheidungen, die du heute rätst.** (40 Zeichen, 2 Zeilen) |

**Korrigiert am 15.08. nach BJ-Hinweis.** Eine frühere Fassung setzte die Subline auf `__none__`
mit der Begründung, sie laufe auf Headline-Größe. Das ist die Regel, nicht der Fehler: Titel und
Subline sind ein Block auf derselben Größe, unterschieden nur durch die Textfarbe. Zu kürzen war
die Länge, nicht die Existenz. Zeichenbudget und Zeilenkosten stehen in
[`06-kausalkette.md`](06-kausalkette.md) §0.

Die neue Subline nennt das Problemwort (raten) und kündigt die drei Karten an.

### Einleitung (`intro`, heute ungenutzt)

| | |
|---|---|
| **vorher** | `__none__` |
| **nachher** | Supplemente, Training, Schlaf: Bisher entscheidest du das nach allgemeinen Empfehlungen. Der Test ersetzt die Empfehlung für alle durch deine eigenen Werte. |

Fließtext gehört nach `docs/section-heading-stack.md` in `intro`, nicht in die Unterüberschrift.
Dort läuft er auf Fließtextgröße statt auf Headline-Größe.

### Karte 1

| | |
|---|---|
| **vorher** | Limmroth-Zitat über chronologisches Alter und Prävention |
| **nachher** | **Wo du anfängst.** Dein Körper altert nicht an einem Stück. Der Test weist Höralter, Augenalter und Gedächtnisalter als getrennte Werte in Jahren aus, dazu Entzündung, Immunscore und Muskelschwund. Du siehst, welcher Bereich vorläuft, statt an allem gleichzeitig zu arbeiten. |

Löst: drei Baustellen parallel, bei keiner Fortschritt. Quelle der Bereiche ist der Portal-Audit
vom 06.08. Entspricht Kandidat 4 „Auflösung" aus `04`.

### Karte 2

| | |
|---|---|
| **vorher** | Horvath-Zitat („einer der genauesten Indikatoren") |
| **nachher** | **Was bei dir wirkt.** 18 der DNA-Reports betreffen konkrete Wirkstoffe, darunter NMN, Kreatin, Omega-3, Vitamin D und Magnesium. Du siehst, wofür du genetisch gut aufgestellt bist und wofür weniger. Genug, um dein Regal auszumisten. |

Löst: das Regal voller Dosen ohne Rückmeldung, der wörtlich häufigste Pain im Bestand. Entspricht
Kandidat 5 „Ansprechbarkeit". Nebeneffekt: hier hängt die NMN-Brücke, die laut `01` §1 in keinem
einzigen Touchpoint genutzt wird.

### Karte 3

| | |
|---|---|
| **vorher** | Sinclair-Zitat („die Mittel, es zu messen – und zu verlangsamen") |
| **nachher** | **Ob es etwas gebracht hat.** Ein einzelner Wert ordnet dich ein. Erst der zweite zeigt eine Richtung. Nach sechs Monaten misst du mit derselben Methode im selben Labor und siehst, wie sich deine Werte entwickelt haben. |

Löst: du änderst etwas und erfährst nie, ob es gewirkt hat. Entspricht Kandidat 3 „Zweitmessung"
und macht den Retest zum Produktbestandteil statt zum Nachverkauf.

### Zusammengesetzt

```
ÜBERSCHRIFT   Danach weißt du, wo du ansetzt.
SUBLINE       Drei Entscheidungen, die du heute rätst.

EINLEITUNG    Supplemente, Training, Schlaf: Bisher entscheidest du das
              nach allgemeinen Empfehlungen. Der Test ersetzt die
              Empfehlung für alle durch deine eigenen Werte.

KARTE 1   Wo du anfängst
          Dein Körper altert nicht an einem Stück. Der Test weist Höralter,
          Augenalter und Gedächtnisalter als getrennte Werte in Jahren aus,
          dazu Entzündung, Immunscore und Muskelschwund. Du siehst, welcher
          Bereich vorläuft, statt an allem gleichzeitig zu arbeiten.

KARTE 2   Was bei dir wirkt
          18 der DNA-Reports betreffen konkrete Wirkstoffe, darunter NMN,
          Kreatin, Omega-3, Vitamin D und Magnesium. Du siehst, wofür du
          genetisch gut aufgestellt bist und wofür weniger. Genug, um dein
          Regal auszumisten.

KARTE 3   Ob es etwas gebracht hat
          Ein einzelner Wert ordnet dich ein. Erst der zweite zeigt eine
          Richtung. Nach sechs Monaten misst du mit derselben Methode im
          selben Labor und siehst, wie sich deine Werte entwickelt haben.
```

---

## 6. Sperren-Check

| Sperre | Status im Vorschlag |
|---|---|
| Keine CpG- oder Messstellenzahl | Kommt nicht vor. Der ganze Mengenstreit ist raus |
| Keine Präzisions- oder Genauigkeitsaussage | Kein Wort. Die zwei Live-Verstöße aus §2 fallen weg |
| Horvath und Sinclair nie als Produkt-Endorsement | Beide sind aus der Section raus |
| Keine Diagnose | Karte 1 nennt Höralter, Augenalter, Gedächtnisalter ausdrücklich als **Werte in Jahren**, nicht als Befunde zu Hören, Sehen oder Gedächtnis |
| Keine Therapieempfehlung, keine garantierte Wirkung | Karte 2 sagt „gut aufgestellt", nicht „nimm das". Karte 3 nutzt die zulässige Formulierung „wie sich deine Werte entwickelt haben" |
| Keine feste Gesamtzahl an DNA-Reports | Die 18 sind eine Teilmenge aus dem Portal-Audit, keine Gesamtzahl. Rückfallvariante: „Mehrere der DNA-Reports" |
| Name des Uhr-Anbieters, MAISIE | kommen nicht vor |
| `docs/conversion-messaging.md` §9 | keine Gedankenstriche, kein Dreiklang, kein Kicker, keine Superlative |

**Zwei Formulierungen bewusst nicht gebaut.** Kein „Das ist keine Verschreibung" unter Karte 2,
das ist defensives Meta und der Ausschluss steht bereits in der Ideal-Candidate-Section. Kein
„in der App siehst du", weil die App-Kundensicht laut `01` §6 unbelegt ist. Durchgehend „der Test
liefert".

---

## 7. Höhe

Gerechnet auf die gemessenen Live-Werte: Fließtext 16 px / 1,6, Kartentext 15 px / 1,7,
`--space-4` 16, `--space-5` 24, `--space-7` 48.

| Element | alt | neu |
|---|---:|---:|
| Padding oben und unten | 112,5 | 112,5 |
| Überschrift | 97 | 65 |
| Subline | 193 | 65 |
| Abstand Kopf | 48 | 16 |
| Einleitung plus Abstand | 0 | 150 |
| Karten plus Lücken | 898 | ca. 795 |
| **Summe** | **1.348** | **ca. 1.202** |

Rund **145 px kürzer**, weil die Autorenzeile mit Foto in allen drei Karten entfällt und die
Subline von sechs auf zwei Zeilen geht. Bei 20,6 Bildschirmhöhen (`03` §8.2) ist das ein
Nebengewinn, keine Nebensache. Die Zahl ist eine Rechnung, gemessen wird nach dem Bau bei
375 x 812.

**Korrigiert am 15.08.** Eine frühere Fassung nannte −210 px und rechnete mit einer gestrichenen
Subline. Sie bleibt, gekürzt, siehe oben.

---

## 8. Was aus dem Methodenblock wird

Kandidat 2 „Auswahlprinzip" aus [`04`](04-mechanismus.md) bleibt gültig, nur nicht auf dieser
Fläche. Er gehört dorthin, wo jemand die Frage tatsächlich stellt:

- **FAQ „Ist eine Speichelprobe aussagekräftig"** auf der PDP
- **`artikel-genauigkeit-alterstest`**, wo die Argumentation seit 06.08. live steht

Die Bausteine sind BJ-freigegeben (`methoden-steckbrief-freigabeliste_2026-08-11.md`, Zeile
„orientiert sich an der Methode von Horvath, kommt aber mit deutlich weniger Messstellen aus als
dessen Modell mit 353 Positionen") und im Artikel bereits publiziert. Für den FAQ-Eintrag muss
nichts neu erfunden werden.

Der verworfene Methodenblock in Kurzform, falls er später gebraucht wird: Karte 1 Horvath 2013
(rund 8.000 Proben aus 51 Geweben, 353 Messstellen, Genome Biology 2013), Karte 2 Sugden et al.
(350 Blutproben, Messstellen unterschiedlich verlässlich, Patterns 2020), Karte 3 die eigene
Entwurfsentscheidung. Zahlen alle aus dem eigenen publizierten Genauigkeitsartikel.

**Der Preisanker „349 € und nicht 900" aus `04` Kandidat 2 wird nicht gebaut.** Für die 900 gibt
es keinen benennbaren Anbieter, der teuerste im verifizierten Wettbewerbsfeld liegt bei 399 €.
Ein Anker gegen ein Phantom kostet mehr, als er bringt. Der publizierte Artikel löst es über den
Preisrahmen („hält den Test in einem Preisrahmen, in dem eine Wiederholung realistisch bleibt"),
das ist die tragfähige Fassung.

---

## 9. Bauvorgaben, nach Freigabe

`crs-expert-quotes` wird **nur** von `templates/product.age-dna-test.json` benutzt, geprüft am
15.08. Umbauten haben keine Regression auf anderen Seiten. Nach dem Umbau ist die Section in
keinem Sinn mehr „Expert Quotes".

1. Block-Feld `label` ergänzen, rendert als Kartenüberschrift über dem Text.
2. Autorenzeile abschaltbar machen: Section-Setting `show_author`, Default `true`, hier `false`.
   Foto, Name, Titel und Quelle entfallen damit sauber statt über leergeräumte Felder.
3. `blockquote` und `.eq-quote-text` werden zu `.eq-card-body`. Es sind keine Zitate mehr, das ist
   auch für Screenreader relevant.
4. Schema-Preset unangetastet lassen, es ist die Vorlage für spätere Sections.
5. Section-Reihenfolge, `heading_size: feature` und Padding 80 / 80 bleiben.
6. Nach dem Bau Höhe bei 375 x 812 messen und gegen die 1.348 px stellen.

Der Zwischenschritt „Fläche wird umgewidmet, nicht hinzugefügt" aus `04` § Was das für den Bau
heißt gilt unverändert: keine neue Section, keine Verlängerung, Reihenfolge unangetastet, solange
der BJ-Entscheid aus `03` §5 offen ist.

---

## 10. Offen bei BJ

| # | Punkt | Konsequenz |
|---|---|---|
| 1 | Horvath verschwindet mit dem Umbau ganz von der PDP, Limmroth bleibt nur im Arzt-Badge unter dem CTA | Compliance-Gewinn, aber die Seitenmitte verliert ihr wissenschaftliches Gewicht. Wenn das fehlt, ist es eine eigene Entscheidung und gehört nicht in diese Karten |
| 2 | „18 der DNA-Reports" ist die einzige Zahl im Block, Quelle Portal-Audit 06.08. | behalten oder auf „mehrere" zurücknehmen |
| 3 | FAQ-Eintrag zum Auswahlprinzip (§8) | mitliefern oder Mechanismus vorerst stillegen |
| 4 | Freigabe des Copy-Vorschlags | ohne sie wird nichts gebaut |

Unabhängig von allem: die zwei Sperr-Verstöße aus §2 stehen live und müssen auch dann raus, wenn
der Umbau nicht kommt.
