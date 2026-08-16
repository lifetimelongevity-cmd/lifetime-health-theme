---
status: living
last_review: 2026-08-16
canonical_for: pdp-age-dna-offer-architektur
depends_on:
  - docs/PDP-DNA-UPGRADE/01-rmbc-kontext.md
  - docs/PDP-DNA-UPGRADE/03-cro-befunde.md
  - docs/PDP-DNA-UPGRADE/04-mechanismus.md
  - docs/age-dna-product-fact-sheet.md
review_cadence_days: 30
---

# AGE&DNA: Offer-Architektur

Ergebnis des Dreierlaufs `/competitor-offer-analysis` → `/pricing-strategy` → `/offer-stack`
vom 16.08.2026, inklusive BJ-Inputs vom selben Tag (Gesprächswert, Kapazität, Einkaufspreise).
Beantwortet C9 aus [`03`](03-cro-befunde.md) und gibt der Kandidat-3-These aus [`04`](04-mechanismus.md)
(die zweite Messung ist das Produkt) erstmals eine Preisform.

**Gebaut am 16.08.: der neue Angebots-Stack im Hero (§4), committet, nicht gepusht.**
Vor dem Push gilt das Gate in §6. Die Preisentscheidungen in §3 sind Empfehlungen und
gehen erst nach ausdrücklicher BJ-Zustimmung live.

---

## 1. Wettbewerbsbefund (live geprüft 16.08.2026)

Kernfrage war das Verlaufs-/Retest-Angebot. Ergebnis: zwei von vier Anbietern bepreisen
den Verlauf, keiner verbindet ihn mit einer These.

| Anbieter | Ersttest | Verlaufsangebot | effektiver Retest-Preis |
|---|---|---|---|
| epiAge | 199,95 € | 2er-Bundle 379,95 € („Vorher-Nachher"), 5er 849,95 € | ~190 € / ~170 € |
| TruDiagnostic | $499 | Subscribe & Save $249/Test, Kadenz 3 bis 6 Monate | 50 % des Erstpreises |
| neotes | 299 € Basic / 935 € Premium | keins. Empfiehlt Retest „alle 6 bis 12 Monate" ohne Preis | – |
| Cerascreen | 399 € (von 499 €) | weiterhin **ausverkauft**, nicht bestellbar | – |
| LIFETIME (vorher) | 349 € | Folgetest 299 € als separates, unverlinktes Produkt | 86 % des Erstpreises |

**Der härteste Befund:** LIFETIME ist seit dem 16.08. der einzige Anbieter, dessen PDP die
Zweitmessung zur Produktthese macht, und hatte gleichzeitig die schlechteste, unsichtbarste
Retest-Ökonomie im Feld. These und Preisarchitektur widersprachen sich öffentlich.

Weitere Live-Funde: neotes wirbt mit „935.000 Methylierungsmustern" (die perfekte Wand für
Kandidat 2, Auswahlprinzip). neotes' Beratung ist nur im 935-€-Paket erreichbar, Cerascreens
inkludierte 15-Minuten-Beratung ist mit dem Produkt aus dem Markt. 45 Minuten auf Deutsch für
+100 € ist damit die zugänglichste Beratung im deutschen Feld. Der Zwei-Ebenen-Differenziator
hält dem Stresstest stand, bleibt aber kopierbar; die Verteidigung ist die installierte
Verlaufsbeziehung mit Preislogik, nicht der Umfang.

Datenbasis-Ergänzung: `docs/age-dna-geo/competitor-data-2026-08-11.yml` nennt für die
LIFETIME-Beratung noch „80 EUR (429 EUR total)", der Live-Stand ist 100 € / 449 €. Beim
nächsten Review des YML nachziehen.

---

## 2. BJ-Inputs und Deckungsbeitrag (16.08.2026)

| Input | Wert |
|---|---|
| Einzelwert 45-Minuten-Ergebnisgespräch | **149 €** |
| Kapazität Gespräche pro Woche | 6 bis 10 (kein Engpass, heutiges Volumen 1 bis 2 Verkäufe/Woche) |
| Einkauf Vollkit (Kit + beide Analysen + Versand) | **200 €** |
| Einkauf Folgetest (nur Epigenetik) | **~160 €** |

Deckungsbeitrag netto (19 % USt):

| Variante | brutto | netto | Einkauf | DB | Marge |
|---|---|---|---|---|---|
| Test heute | 349 € | 293,28 € | 200 € | 93,28 € | 27 % |
| Test ab 31.08. | 399 € | 335,29 € | 200 € | 135,29 € | 34 % |
| Test + Gespräch | 449 € | 377,31 € | 200 € | 177,31 € | 40 % |
| Folgetest | 299 € | 251,26 € | 160 € | 91,26 € | 31 % |
| Folgetest zum Testkunden-Preis | 249 € | 209,24 € | 160 € | 49,24 € | 20 % |

**Zwei Konsequenzen.** Erstens: Die Premium-Variante verkauft nicht Zeit gegen 100 €, sie ist
der beste DB-Hebel der Seite. Ein Attach bringt +84 € netto (fast ein ganzer zusätzlicher
Testverkauf), vergütet BJs Stunde mit ~70 bis 84 € netto und die Kapazität liegt beim Drei-
bis Fünffachen des Volumens. Sie verdient offensive Bewerbung. Zweitens: Ein epiAge-Konter
über den Retest-Einzelpreis ist nicht baubar (199 € ließen 7 € DB), der Verlauf läuft über
Architektur statt Preisaggression.

---

## 3. Preisarchitektur

> **Überholt durch BJ-Entscheid 16.08. (abends), siehe §3a.** Die ursprüngliche Empfehlung
> unten bleibt als Herleitung stehen; wo sie §3a widerspricht (499-Premium, 249-Rabatt,
> „kein compareAt als Anker"), gilt §3a.

## 3a. BJ-Entscheid 16.08.: Streichpreis-Regime 449 / 549

- **Regulärpreis Test: 449 €** (Streichpreis auf Variante 1, Aktionspreis 349 € bis 30.08.)
- **Regulärpreis Test + Ergebnisgespräch: 549 €** (Streichpreis auf Variante 2, aktuell 449 €)
- ~~**Value-Stack-Einzelwerte: DNA 300 € und Epigenetik 300 €**~~ **überholt am 16.08. abends
  (clarify-Lauf), siehe §3b**
- **Folgetest: 299 € für alle**, kein Testkunden-Rabatt (siehe §5)

Die Preisleiter liest sich so (BJ-Klarstellung 16.08.): 300 € ist der Wert **je Ebene
einzeln**; **DNA + Epigenetik zusammen kosten ohne Aktion 449 €** — der Kombipreis ist der
Streichpreis, nicht die Summe der Einzelwerte. Deshalb behauptet der Stack bewusst keine
600er-Gesamtsumme: die Zeilen tragen nur ihre Einzelwerte, die Ersparnis-Aussage kommt
allein aus compare_at (449/549) gegen den Aktionspreis.

Konsequenzen im Bau (alles dynamisch, committet 16.08.): Karten lesen compare_at je Variante,
die Aktionszeile rechnet die Ersparnis je Paket (dann „Du sparst 100 €" auf beiden). Der
„Einzeln zusammen 498 €"-Anker auf Karte 2 und die Anker-Note im Stack sind auf
`compare_at`-Abwesenheit gegated: sobald die 549 in Shopify gesetzt ist, übernimmt der
Streichpreis die Ersparnis-Aussage und die Komponenten-Rechnung verschwindet automatisch.

**Konsistenz-Pflicht (echte-Frist-Bauweise):** Der 449/549-Strich ist nur haltbar, wenn ab
31.08. real 449 bzw. 549 verlangt wird (Aktionsende 30.08. bleibt). Die frühere
399-Pflicht aus [[project_agedna_aktionsfrist_2026-08]] ist damit durch 449 ersetzt.

## 3b. BJ-Entscheid 16.08. abends: nur nachprüfbare Werte im Stack

Der 300/300-Stand hatte drei Zahlen auf einer Fläche, die sich gegenseitig widerlegten: der
Leser addiert 600, der Streichpreis darüber sagt 449, und die Verlaufszeile drei Zeilen tiefer
nennt für dieselbe epigenetische Ebene 299 €. Dazu behauptete „einzeln" eine Einzel-Kaufbarkeit,
die es für keine der beiden Analysen gibt. Ersetzt durch:

| Zeile | Wert-Label | Warum belegbar |
|---|---|---|
| Epigenetische Analyse | **einzeln 299 €** | Live-Preis des Folgetests, im selben Shop kaufbar |
| Genetische Analyse | **nur im Test** | keine erfundene Zahl, weil es keinen Einzelpreis gibt |
| LIFETIME App | inklusive | unverändert |
| Ergebnisgespräch | **nur im Paket** / **im Paket enthalten** | 149-€-SKU existiert nicht (§6) |

**Der Anker ist damit eine Leiter statt einer Summe:** eine Ebene allein 299 €, beide Ebenen
349 € in der Aktion, regulär 449 €. Die zweite Ebene kostet sichtbar 50 € mehr statt das
Doppelte, und jede Zahl darin ist im Shop nachprüfbar. Das ist genau der Struktur-Anker aus
§3 Punkt 2, nur schon jetzt statt ab September. Bewusst in Kauf genommen: der behauptete
Gesamtwert sinkt von 600 auf 299 plus Unbeziffertes.

**Regel für künftige Stack-Zeilen:** ein Wert-Label trägt nur dann eine Zahl, wenn diese Zahl
als Preis irgendwo real verlangt wird. Sonst trägt es eine Zustandsangabe („nur im Test",
„inklusive", „im Paket enthalten"). Keine addierten Gesamtwerte.

**Zwei Kaufstufen bleiben.** Eine dritte Prepaid-Verlaufsstufe wurde geprüft und verworfen:
ein rabattiertes Bundle verkauft den zweiten DB für ~8 € Aufpreis (sequenziell 184 € DB gegen
101 € im 549-€-Bundle), erhöht die Buy-Box-Last auf der schwächsten Fläche (mobil 2,8 % ATC)
und schafft 6 Monate Fulfillment- und Widerrufs-Exposure.

| Maßnahme | Wert | Wann |
|---|---|---|
| Neue SKU „Ergebnisgespräch (45 Minuten)", einzeln kaufbar | 149 € | vor dem Theme-Push (§6) |
| Premium-Variante | 449 → **499 €** | 31.08., zusammen mit der 399-Umstellung |
| Folgetest | bleibt 299 € | – |
| Testkunden-Rabatt Folgetest, Segment „hat AGE&DNA gekauft" | **249 €** | vor dem Theme-Push (§6) |

**Warum die 149-€-SKU der Schlüssel ist:** Sie macht den Paket-Anker wahr und dauerhaft.
Heute: 349 + 149 = 498, Paket 449, echte 49 € Ersparnis. Ab 31.08.: 399 + 149 = 548, Paket
499, wieder 49 €. Die Summe zweier real verkaufter Einzelleistungen gehört als Text in Karte
und Stack, nicht als `compareAtPrice` (ein Streichpreis behauptet einen früher verlangten
Preis, die Komponenten-Summe ist die unangreifbare Form). Zielgruppe der Einzel-SKU existiert
real: Testkäufer, die nach dem Ergebnis Einordnung wollen. Fulfillment wie die Premium-SKU
manuell.

**Was den toten Dauerstreichpreis 399 ersetzt** (er stirbt am 31.08. planmäßig):

1. Komponenten-Anker Premium: „Einzeln zusammen 548 €, im Paket 499 €."
2. Interner Struktur-Anker Basistest: Der Folgetest ist der öffentliche Preis der
   epigenetischen Ebene allein (299 €). Ab September wörtlich: die Epigenetik allein 299 €,
   beide Ebenen 399 €. Zwei eigene Live-Preise, kein Ablaufdatum, und die Zwei-Ebenen-
   Differenzierung wird zur Preislogik.
3. Marktrahmen sparsam: neotes-Beratungsstufe 935 €, epiAge 199,95 € für eine Ebene.

**Urgency bis 30.08.:** Die Preiserhöhung selbst aussprechen. Die Banner-Note sagt jetzt
„Ab dem 1. September gilt dauerhaft der reguläre Preis von 399 €." (gebaut, §4). Wahr per
BJ-Entscheid, und die angekündigte Erhöhung ist die stärkste ehrliche Urgency-Form.

**Der Verlauf wird angebunden, nicht vorverkauft:** feste Position im Angebots-Stack
(299 €, als Testkunde 249 €), Rabatt serverseitig über ein Shopify-Kundensegment
(`products_purchased`), kommuniziert auf der PDP und im Ergebnis-Moment. Damit hat als
erster deutscher Anbieter die Retest-These auch einen Retest-Preis. Das strukturelle
Argument gehört dazu: die DNA-Ebene ist beim Ersttest abgeräumt, der Folgetest misst nur,
was sich ändert. Das kann kein Ein-Ebenen-Anbieter erzählen.

---

## 4. Der neue Angebots-Stack (gebaut 16.08.)

Der alte Stack (starres Vier-Zeilen-Gerüst, `stack_old_total` als Handpflege-Anker, zuletzt
exakt auf dem Premium-Preis, siehe `01` §6.5) ist ersetzt. Neu:

**Form: Kassenzettel unter dem CTA.** Bewusst nicht vor dem Kauf-Button: der Hero ist mobil
die längste Section der Seite (`03` §8.6, M5), der Stack begründet den Preis, darf aber den
Weg zum CTA nicht verlängern. Wer zögert, findet die Rechnung eine Wischbewegung unter dem
Button, vor der Garantie.

**Inhalt, jede Zeile Fact-Sheet-belegt:**

| Zeile | Copy | Beleg | Wert-Label |
|---|---|---|---|
| 1 | Epigenetische Analyse: sechs Bereiche, zwölf Werte (Körperalter mit Hör-, Augen-, Gedächtnisalter, MethylPace, EpiVitality, Immunscore, Entzündung, Muskelschwund) | Portal-Audit 06.08. | **einzeln 299 €** (= Live-Preis des Folgetests) |
| 2 | Genetische Analyse: 23 Kategorien, über 150 Einzelergebnisse, 18 Wirkstoff-Reports darunter NMN und Ausdauer, 32 Lifestyle-Reports | Fact Sheet §Produktumfang; NMN-Brücke = Maßnahme 4 aus `02` | nur im Test |
| 3 | LIFETIME App, lebenslanger Zugriff, AI Health Coach, PDF-Export, Face Scan | freigegeben 30.07. | inklusive |
| 4 | Ergebnisgespräch, 45 Minuten (folgt der Paketwahl) | Premium-Variante live | Paket 1: „nur im Paket" gedimmt · Paket 2: „im Paket enthalten" (§3b/§6) |
| Summe | „Du zahlst heute" + Paketpreis, im Paket zusätzlich „Einzeln zusammen 498 € · du sparst 49 €" | Variantenpreise + `stack_talk_value_cents` | dynamisch |
| Konditionen | Einmalzahlung · kein Abo · keine Folgekosten | Risk-Reversal-Bestand | – |
| Verlauf | „Später weitermessen: Folgetest (nur Epigenetik) 299 €. Deine DNA-Ergebnisse bleiben, gemessen wird, was sich verändert hat." | Folgetest live. **BJ-Entscheid 16.08.: kein Testkunden-Rabatt, 299 € für alle** (die 249-€-Empfehlung aus §3 ist verworfen) | abgesetzte Schlusszeile |

Bewusst ohne Zeitintervall in der Verlaufszeile: das Fact Sheet (§Retest) hält „sechs Monate"
bis zur Product/Science-Bestätigung offen, die Kandidat-3-Formulierung „nach sechs Monaten"
wird deshalb nicht übernommen. Fact Sheet schlägt Paket-Doc.

**Mechanik (alles in `sections/lt-pdp-hero.liquid`):**

- Kein `stack_old_total` mehr, kein addierter Fantasie-Gesamtwert. Einzelsumme und Ersparnis
  werden aus Variante 1 + `stack_talk_value_cents` gerechnet und erscheinen nur, wenn die
  Summe wirklich über dem Paketpreis liegt.
- `applyPkg` schaltet beim Paketwechsel: Gesprächszeile an/aus, „Du zahlst heute", Anker-Note.
  SSR-Zustand entspricht Paket 1, ohne JS bleibt die Seite wahr.
- **C9-Fix:** Paketkarte 2 trägt die Zeile „Einzeln zusammen 498 € · du sparst 49 €" (SSR,
  gleiche Rechnung). Rendert nur mit gesetztem Einzelwert.
- Schema generisch (row1 bis row3 + Zusatzleistung + Verlaufszeile), auf allen anderen 13
  PDP-Templates bleibt der Stack aus. Default `show_value_stack: false`.
- Die 31.08.-Preisumstellung braucht am Stack **keinen Edit**: alle Beträge außer dem
  149-Einzelwert kommen aus Variantenpreisen. Steigt Premium auf 499, rechnet der Anker
  automatisch 548/49.

**Verifiziert am 16.08.** per `shopify theme dev` + curl (SSR: alle Zeilen, Position nach
`</product-form>`, Anker in Karte 2, Talk-Zeile off) und im Browser-Pane mobil 375 px
(Paketwechsel hin und zurück schaltet Talk-Zeile, Anker, Summe 349↔449, CTA und
Varianten-Input; kein horizontaler Überlauf; `settings_data.json` nach Dev-Server-Lauf
unverändert). theme-check: keine neuen Befunde.

---

## 5. Was dieses Paket an offenen Punkten schließt und öffnet

**Geschlossen:** C9 (Anker auf der 449er, `03` §3), die `stack_old_total`-Falle (`01` §6.5),
die Frage „Einzelpreis Ergebnisgespräch" (README §Offen bei BJ: 149 €), NMN-Brücke jetzt
auch in der Buy-Box (Maßnahme 4, bisher nur Nutzenblock-Karte 2).

**Neu geöffnet:**

| # | Punkt | Für |
|---|---|---|
| 1 | SKU „Ergebnisgespräch" 149 € anlegen | BJ (Shopify Admin, Fulfillment wie Premium-SKU) |
| 2 | ~~Segment-Rabatt Folgetest 249 € für Testkäufer~~ **verworfen (BJ 16.08.): 299 € für alle, Verlaufszeile entsprechend angepasst** | erledigt |
| 3 | ~~Premium 449 → 499 € am 31.08.~~ **überholt (BJ 16.08., §3a): Regulärpreise 449 (Test) / 549 (Paket) als compare_at, ab 31.08. real** | BJ (Shopify Admin, Teil der Push-Sequenz §6) |
| 4 | Folgetest-Hinweis in die Ergebnis-Mail (Klaviyo-Strecke) | nach Kanalaufbau, eigene Fläche |
| 5 | `competitor-data-2026-08-11.yml`: Beratungszeile 80/429 € auf 100/449 € nachziehen | Assistent, beim nächsten YML-Review |

---

## 6. Push-Gate und Reihenfolge

Der Commit enthält zwei Aussagen, die erst nach zwei Admin-Handgriffen wahr sind. **Nicht
pushen, bevor beides existiert**, sonst stehen ein Anker ohne Angebot und ein Rabatt ohne
Rabatt auf der Seite (genau die Klasse Fehler, die dieses Paket sonst abbaut):

1. **„einzeln 149 €" / „Einzeln zusammen 498 €"** braucht die live kaufbare Gesprächs-SKU
   zu 149 €.
2. ~~**„als Testkunde 249 €"** braucht den serverseitig durchgesetzten Segment-Rabatt auf den
   Folgetest.~~ **Entfallen (BJ 16.08.): kein Testkunden-Rabatt, die Verlaufszeile nennt nur
   noch 299 €.** Das Gate besteht damit nur noch aus Punkt 1.

**Stand 16.08. abends: die Sequenz ist gelaufen — außerplanmäßig.** Der Theme Manager lief
und hatte den Buy-Box-Stand bereits live gepusht, bevor SKU und compare_at existierten
(genau das Szenario aus der Warnung unten). Daraufhin wurde konsistent nachgezogen statt
zurückgerollt: compare_at 449/549 per API gesetzt, die drei CTA-Bänder auf „statt 449",
Karten-Anzeigenamen und Streichungen gepusht (Commit `a622db7`). Live rechnet seitdem:
Karte 1 „4̶4̶9̶ 349", Karte 2 „5̶4̶9̶ 449", Aktionszeile „Du sparst 100 €" je Paket,
Komponenten-Anker über das compare_at-Gate verschwunden.

~~**Einziger offener Gate-Punkt: die Gesprächs-SKU 149 €.**~~ **Geschlossen am 16.08. abends
(clarify-Lauf):** Die Zahl ist raus. `stack_talk_value_cents: 0`, die Gesprächszeile sagt jetzt
„nur im Paket" (Paket 1) bzw. „im Paket enthalten" (Paket 2). Dafür kam das Schema-Setting
`stack_talk_on_label` dazu, weil das Paket-2-Label vorher hartcodiert „einzeln <Wert>" war und
mit Wert 0 die Preiszelle leer geblieben wäre. Wird die SKU später angelegt, kann der Einzelwert
über `stack_talk_value_cents` zurück; die Anker-Rechnung auf Karte 2 hängt weiterhin daran.

**Gleicher Lauf, weitere Copy-Fixes auf der Fläche:** Aktionskarte rendert jetzt
`promo_banner_note` („Danach gilt wieder der reguläre Preis.", bewusst ohne Betrag, weil Paket 1
und 2 verschiedene Regulärpreise haben) — die Frist hatte vorher keine Folge. Chargenzeile sagt
„aktuelle Laborcharge" statt „Charge". Aus Stack-Zeile 2 sind die exakten Reportzahlen 18/32
raus (schwanken je Kunde, Fact Sheet erlaubt nur „über 150"). Die Gesprächs-Unterzeile war
wortgleich die Notiz der Paketkarte darüber. Die Verlaufszeile ist als Option formuliert, sonst
las sie sich als Widerspruch zu „keine Folgekosten" zwei Zeilen darüber.
