---
status: living
last_review: 2026-08-15
canonical_for: pdp-age-dna-kausalkette
depends_on:
  - docs/PDP-DNA-UPGRADE/01-rmbc-kontext.md
  - docs/PDP-DNA-UPGRADE/03-cro-befunde.md
  - docs/PDP-DNA-UPGRADE/04-mechanismus.md
  - docs/PDP-DNA-UPGRADE/05-nutzenblock.md
review_cadence_days: 30
---

# Gesamtempfehlung: die PDP als eine Kausalkette

Ergebnis von drei `/copy-rewrite`-Durchläufen am 15.08.2026 gegen `lt-pdp-hero`, `crs-metrics-row`
und `lt-pdp-report-preview`, plus der Einordnung aller Flächen in eine durchgehende Argumentation.
Der Nutzenblock aus [`05-nutzenblock.md`](05-nutzenblock.md) ist Teil derselben Kette und wird hier
nicht wiederholt.

**Nichts davon ist gebaut.** Live-Stand geprüft am 15.08.2026 im Browser bei 375 x 812.

---

## 0. Das Zeichenbudget im Heading-Stack

**BJ-Korrektur vom 15.08.** Titel und Subline sind ein Block und laufen auf derselben Schriftgröße,
der einzige Unterschied ist die Textfarbe. Das ist die Regel aus `docs/section-heading-stack.md`
und kein Defekt. Gemessen im Hero: beide 36 px bei 41,4 px Zeilenhöhe, Subline mit Alpha 0,72.

Daraus folgt ein Zeichenbudget statt eines Größenarguments. Eine Subline wird **gekürzt, nicht
gestrichen**, und längere Einordnungen laufen über `intro` unterhalb des Stacks.

| Ebene | Schriftgröße | Zeichen pro Zeile | 1 Zeile | 2 Zeilen |
|---|---|---:|---:|---:|
| Hero (`heading_size: product_title`) | 36 px | ca. 17 | 17 Zeichen | 34 Zeichen |
| Sections (`heading_size: feature`) | 28 px | ca. 24 | 24 Zeichen | 48 Zeichen |

Zeilenkosten: 41,4 px im Hero, 32 px in den Sections.

Eine frühere Fassung dieses Dokuments und von [`05`](05-nutzenblock.md) hat drei Sublines auf
`__none__` gesetzt mit der Begründung, sie liefen auf Headline-Größe. Die Begründung war falsch,
die Empfehlungen sind unten korrigiert.

---

## 1. Die Kette

Die Section-Reihenfolge ist eingefroren (`03` §5, BJ-Entscheid offen). Die Kette wird deshalb
**innerhalb** der bestehenden Reihenfolge gebaut: nicht durch Verschieben, sondern indem jede
Fläche genau einen Schritt der Argumentation übernimmt und ihn an die nächste übergibt.

| # | Section | Aufgabe in der Kette | Zustand | Kandidat aus `04` |
|---|---|---|---|---|
| 1 | lt-pdp-hero | Problem, Versprechen, Angebot | Rewrite, §3 | — |
| 2 | crs-logo-garden | Fremdbestätigung | unangetastet, Belege ungeprüft (`01` §6) | — |
| 3 | crs-metrics-row | Aus einer Probe entstehen zwei Analysen, deshalb sechs Wochen | Rewrite, §4 | 6 Zwei Läufe |
| 4 | crs-feature-grid | Was die zwei Ebenen konkret liefern | sitzt | — |
| 5 | lt-pdp-report-preview | Wie ein Ergebnis aussieht: Werte auf Skalen, kein Urteil | Rewrite, §5 | 1 Referenzlinie |
| 6 | cta_band_report | Kaufaufforderung | sitzt | — |
| 7 | crs-expert-quotes | Was du damit entscheidest | Rewrite in [`05`](05-nutzenblock.md) | 4, 5, 3 |
| 8 | lt-comparison-table | Warum andere das nicht liefern | sitzt | — |
| 9 | crs-customer-reviews | Dass es bei anderen funktioniert hat | sitzt | — |
| 11 | lt-pdp-ideal-candidate | Ob du gemeint bist | sitzt | — |
| 12 | crs-faq-accordion | Restzweifel, inklusive Auswahlprinzip | ein Widerspruch, §2 | 2 Auswahlprinzip |
| 13 | crs-risk-free-close | Risiko weg, Handlung | sitzt | — |

Damit ist jeder der sieben Mechanismus-Kandidaten aus `04` genau einmal verortet, keiner doppelt.
Kandidat 7 „Doppellesung" bleibt still, bis der Anbieter die Frage aus `04` § Offene Punkte
beantwortet hat.

**Die Seite als ein Satz.** Aus einer Speichelprobe laufen zwei Analysen (3), die dir zwei Ebenen
liefern (4), die du als Werte auf Skalen liest statt als Urteil (5), woraus drei Entscheidungen
folgen (7), die dir kein anderer Anbieter so gibt (8), was diese Leute bestätigen (9), falls du
dieser Mensch bist (11), ohne Risiko (13).

**Wo sie heute bricht.** Position 3 erzählt Logistik statt Kausalität. Position 5 erzählt den Kanal
statt die Form des Ergebnisses. Position 7 erzählt gar nichts über das Produkt. Drei Flächen,
3.270 px mobil, ohne einen Schritt der Argumentation.

---

## 2. Live-Funde, die unabhängig von jeder Copy-Freigabe gelten

Absteigend nach Dringlichkeit.

### 2.1 „Hallo, ich bin MAISIE." steht lesbar auf der PDP

Im App-Bild von `lt-pdp-report-preview`, Datei `Group_40820.png`, drittes Phone. MAISIE ist in
[`01`](01-rmbc-kontext.md) §2 gesperrt: „Name des Uhr-Anbieters und des Coach-Systems (MAISIE):
nie, nirgends." Auf dem vierten Phone steht zusätzlich eine Kit-ID „MOO11285OW", deren MOO-Präfix
in Richtung Anbieter zeigt, deutlich schwächer.

Das ist die bekannte Klasse Problem: die Aussage liegt im Bild, wo Template-Audits nicht hinsehen.

### 2.2 Der Hero widerspricht der eigenen FAQ

| Ort | Text |
|---|---|
| Hero, Bullet 1 | „Aus DNA-Methylierung gemessen. **Nicht geschätzt.**" |
| FAQ 2 | „Dein biologisches Alter ist ein **Schätzwert** aus der Methylierungsanalyse." |

Beide live, dieselbe Seite. Die FAQ hat recht.

### 2.3 Zwei Präzisionsaussagen in `crs-expert-quotes`

„eine der präzisesten Methoden" und „einer der genauesten Indikatoren". Details in
[`05`](05-nutzenblock.md) §2. Fallen mit dem Umbau weg, müssen aber auch ohne ihn raus.

### 2.4 Der Arzt-Badge steht unter einer Kaufoption, die es im Juli noch nicht gab

Seit 14.08. wählt der Kunde „Test + Ergebnisgespräch" rund 350 px über dem Badge „Fachlich geprüft
von · Prof. Dr. med. Volker Limmroth". Das Gespräch ist laut `01` §2 ausdrücklich **nicht
ärztlich**. Zusätzlich lässt sich „Fachlich geprüft von" als „dein Report wird von ihm geprüft"
lesen, was ebenfalls nicht stimmt.

### 2.5 Eine Superlative ohne Beleg

`crs-metrics-row`, Schritt 3: „Führendes Genomik-Labor in Europa". Der belegte Satz steht in der
Freigabeliste und ist stärker: Eurofins Genomics, ISO 17025.

### 2.6 Vier scharfe Settings im Hero

| Setting | Inhalt | Zustand |
|---|---|---|
| `promo_banner_*` | „15 % Rabatt auf **NMN-Pulver**", Deadline 16.07.2026 | aus. Einschalten schreibt NMN-Copy mit abgelaufenem Timer auf die DNA-PDP |
| `coa_purity_label` | „>99,9 % Reinheit" | rendert, sobald `product.metafields.custom.coa_url` gesetzt wird. Heute leer |
| `benefit_1_text` | „Weißt du, wie du alterst, nicht nur wann." | aus, grammatisch kaputt |
| `stack_old_total` | „449,00 €" | seit 14.08. exakt der Premium-Preis, harmlos solange `show_value_stack: false` (schon in `01` §6) |

Das ist dieselbe Lage wie in `project_pdp_refit_phase0`: geerbte Defaults, die niemand gesetzt hat
und die niemand prüft.

---

## 3. lt-pdp-hero

Live 1.635 px, CTA-Button bei 1.230. Audit 17 / 30, die stärkste Section der Seite.

| Dimension | grade | Befund |
|---|---|---|
| Hook | 3 | Die Frage stoppt, trägt aber kein Keyword und keinen Einsatz |
| Problem-Agitation | 1 | Im gesamten Hero steht kein Problem, nur Messung und Umfang |
| Mechanismus | 2 | DNA-Methylierung benannt, Bullet 1 widerspricht der FAQ |
| Proof | 4 | 4,7 aus 121 über dem Fold, Eurofins, Limmroth mit Foto, DSGVO |
| Angebot | 3 | Zwei Pakete, echter Streichpreis. Für die 100 € Aufpreis kein Anker |
| CTA | 4 | Preis im Button, Sticky-ATC, Garantie und Klarna darunter. Keine Urgency |

### Vorher gegen Nachher

| Element | vorher | nachher |
|---|---|---|
| Headline | Wie alt ist dein Körper? (24 Z., 2 Zeilen) | **Wie alt ist dein Körper wirklich?** (33 Z., 2 Zeilen) |
| Subline (`tagline`) | Dein biologisches Alter, wissenschaftlich gemessen. (51 Z., 3 Zeilen) | **Ein Speicheltest misst es.** (26 Z., 2 Zeilen) |
| Bullet 1 | Aus DNA-Methylierung gemessen. Nicht geschätzt. | **Dein biologisches Alter plus 23 DNA-Kategorien, aus einer Speichelprobe.** |
| Bullet 2 | Plus DNA-Ergebnisse aus 23 Kategorien zu deinem genetischen Profil. | **Du siehst, welcher Bereich vorläuft und für welche Wirkstoffe du gut aufgestellt bist.** |
| Bullet 3 | Andere Tests zeigen eine Ebene. Du bekommst beide. | unverändert |
| `pkg_note_2` | Plus 45 Minuten Video-Gespräch zu deinem Report, Termin nach Ergebnis-Eingang. | **Plus 45 Minuten Video-Gespräch. Wir gehen deinen Report gemeinsam durch und beantworten deine Fragen. Termin nach Ergebnis-Eingang.** |
| `founder_endorsed` | FACHLICH GEPRÜFT VON | **WISSENSCHAFTLICHE LEITUNG** |

**Begründungen.** „wirklich" öffnet die Lücke zwischen Pass und Körper. Die Headline wird bewusst
**nicht** auf ein Keyword umgebaut: sie ist die H1, und Google organisch ist laut `01` §1 der
einzige Kanal, der bei 349 € konvertiert. Das ist eine SEO-Entscheidung und gehört nicht in einen
Copy-Rewrite.

Die Subline verliert die Validitätsbehauptung („wissenschaftlich gemessen" ist genau das defensive
Meta, das wir sonst streichen) und liest sich mit der Headline als ein Gedanke: Frage, Antwort.
Nebeneffekt: „Speicheltest" steht damit in der größten Type der Seite statt erst 2.100 px tiefer.
Verworfene Alternativen: „Zwei Ebenen, eine Probe." (24 Z.) trägt den Differenzierer, benutzt aber
mit „Ebene" einen Begriff, den erst Bullet 3 erklärt. „Finde es heraus." (16 Z.) spart eine weitere
Zeile, sagt aber nichts, was die Headline nicht schon sagt.

Bullet 1 löst den FAQ-Widerspruch. Bullet 2 legt den Nutzenblock aus `05` vor. Die Paket-Note gibt
den 100 € Aufpreis erstmals eine Aufgabe, bewusst ohne Rollenangabe, weil in keinem Dokument steht,
wer das Gespräch führt, und „Arzt" falsch wäre. Der Badge sagt dasselbe über das Unternehmen,
behauptet aber nicht mehr, dass Limmroth den Report prüft oder das Gespräch führt.

Alles unterhalb des CTA (Garantie, Zahlarten, Trust-Block, Kontakt-Fallback) bleibt unangetastet,
die Reihenfolge ist seit 14.08. bewusst so gesetzt (`01` §4).

**Höhe:** Subline eine Zeile weniger (−41), Bullet 1 eine Zeile mehr (+26), Paket-Note eine Zeile
mehr (+21). Netto **+6 px**, praktisch unverändert. Der Hero war nie das Längenproblem, der CTA
bleibt bei rund 1.230.

---

## 4. crs-metrics-row

Live 793 px, beginnt bei 2.136. Audit 10 / 30.

Der Prozess bleibt, seine Aussage ändert sich. Aus Logistik wird der Beleg für das Umfangsargument,
das die ganze Seite trägt: ein Wettbewerber kann „zwei Ebenen" morgen behaupten, zwei getrennte
Laborläufe mit zwei Fertigstellungsterminen kann er nicht behaupten, ohne sie zu haben. Damit
werden die sechs Wochen vom Einwand zum Beweis.

| Element | vorher | nachher |
|---|---|---|
| Überschrift | So einfach geht's. | **Eine Probe, zwei Analysen.** |
| Subline | Ohne Arztbesuch & ohne Blut. (28 Z.) | **Ohne Arztbesuch, ohne Blut.** (27 Z.) |
| `intro` (ungenutzt) | — | **Deine Probe durchläuft im Labor zwei getrennte Auswertungen. Deshalb zwei Ebenen statt einer, und deshalb sechs Wochen.** |
| Schritt 1 | Bestelle dein Testkit / Erhalte dein Kit nach wenigen Tagen | **Kit bestellen und Probe zu Hause nehmen / Fünf Minuten, zu Hause.** |
| Schritt 2 | Scanne das Kit & sammle die Probe / Einfache Speichelprobe in Minuten | **Kostenlos ins Labor schicken / Eurofins Genomics, Analyse nach ISO 17025.** |
| Schritt 3 | Versende es kostenlos / Führendes Genomik-Labor in Europa | **Zwei Auswertungen, ein Ergebnis / Genetik und Epigenetik laufen getrennt. Sechs Wochen ab Eingang der Probe, dann liegt beides in der App.** |
| Schritt 4 | Erhalte deine Ergebnisse / ca. 6 Wochen bis zur fertigen Auswertung | entfällt |

„Bestelle dein Testkit" als eigener nummerierter Schritt ist Füllung, das vollständige
Probenverfahren steht ohnehin in FAQ 1. Drei Schritte halten die Section auf ihrer heutigen Höhe,
vier kosten 136 px mehr.

**Die Subline bleibt.** Sie war mit 28 Zeichen bereits im Budget und ist der Reibungslöser der
Section. Eine frühere Fassung wollte sie streichen, das war falsch (§0). Weil sie bleibt, entfällt
die Wiederholung im Detail von Schritt 1.

**Sperren.** Die 29 realen Tage werden nicht zur Zusage, öffentlich bleiben sechs Wochen ab
Probeneingang. ISO 17025 steht als Nennung, nicht als Vergleichsachse gegen Wettbewerber.

**Höhe:** ca. 790, unverändert.

---

## 5. lt-pdp-report-preview

Live 1.129 px, beginnt bei 4.753. Audit 12 / 30.

### Die Dublette, die die Seite lang macht

`crs-feature-grid` direkt darüber und `report_preview` sagen zwei Mal dasselbe:

| feature_grid | report_preview |
|---|---|
| **Biologisches Alter** — „Dein epigenetisches Alter aus unserer Speichel-Methylierungsuhr…" | **Biologisches Alter** — „Dein epigenetisches Alter im Vergleich zu deinem chronologischen…" |
| **AI Health Coach** — „Erklärt deine Werte in Klartext, beantwortet deine Fragen…" | **AI Health Coach** — „Stellt dir Fragen, erklärt deine Werte…" |
| **App mit allen Ergebnissen** | Überschrift „Alle Ergebnisse erscheinen in der App" |

Gleiche Labels, gleiche Aussagen, 1.129 px auseinander. Das ist der Grund, warum die Seite lang
wirkt, ohne mehr zu sagen.

### Vorher gegen Nachher

| Element | vorher | nachher |
|---|---|---|
| Überschrift | Alle Ergebnisse erscheinen in der App (37 Z., 2 Zeilen) | **Anlage oder Alltag?** (19 Z., 1 Zeile) |
| Subline | Verständlich aufbereitet, jederzeit abrufbar und mit deinem Arzt teilbar. (73 Z., 3 Zeilen) | **Ein Wert allein sagt es dir nicht.** (34 Z., 2 Zeilen) |
| Callout 1 | Biologisches Alter | **Was sich bewegt** — Die epigenetischen Werte liegen auf festen Skalen, nicht auf einer Note. Genau deshalb kannst du sie in sechs Monaten wieder ablesen und vergleichen. |
| Callout 2 | DNA-Report: Supplements | **Was fest bleibt** — Deine 23 DNA-Kategorien ändern sich nie. Sie sind der Bezugspunkt, an dem du einen epigenetischen Wert überhaupt einordnen kannst. |
| Callout 3 | Epigenetik: Immunoscore | **Was du fragen kannst** — Der AI Health Coach liest deine Werte mit und beantwortet Rückfragen in normaler Sprache, ohne Fachjargon. |
| Callout 4 | AI Health Coach | entfällt |
| `retest_note` | Nach 6 Monaten lohnt ein Retest… | `retest_show: false` |
| App-Bild | `Group_40820.png` | neu exportieren, siehe §2.1 |

Kanalaussage raus, Deutungsebene rein. Der Heading-Stack wird zur Frage, die die beiden ersten
Callouts direkt beantworten: „Was sich bewegt" und „Was fest bleibt". Die alte Unterüberschrift
stand fast wörtlich noch einmal im `format_note`, eine der beiden musste ohnehin weichen.

Der Supplements-Callout wird nicht gestrichen, er zieht in den Nutzenblock (`05`, Karte 2), wo er
als Entscheidung mehr leistet denn als Aufzählung. Der Retest-Satz trägt heute als Fußnote die
stärkste These der Seite und bekommt in `05` Karte 3 eine eigene Fläche.

**Sperre.** Callout 2 hält die Kalibrierungs-Sperre aus `04` Kandidat 1 ein: „Bezugspunkt, an dem
du einordnen kannst" ist Deutungsebene. Kein „kalibriert", kein „abgeglichen", kein „korrigiert um".

**Höhe:** ca. 900, minus 230.

---

## 6. Höhenbudget

| Section | heute | neu | Δ |
|---|---:|---:|---:|
| lt-pdp-hero | 1.635 | ca. 1.641 | +6 |
| crs-metrics-row | 793 | ca. 781 | −12 |
| lt-pdp-report-preview | 1.129 | ca. 917 | −212 |
| crs-expert-quotes (`05`) | 1.348 | ca. 1.202 | −146 |
| **Summe** | **4.905** | **ca. 4.541** | **−364** |

Rund 0,45 Bildschirmhöhen kürzer bei deutlich mehr Aussage. Die Seite liegt danach bei etwa
16.320 px statt 16.688, also bei rund 20,1 statt 20,6 Bildschirmen.

**Korrigiert am 15.08.** Eine frühere Fassung nannte −500 px. Die Rechnung lag auf falschen
Zeilenwerten für den Heading-Stack (§0): eine Headline-Zeile kostet 41,4 px, nicht mehr, und die
Sublines werden gekürzt statt gestrichen. Der Hero bleibt damit praktisch gleich hoch, die
gesparte Subline-Zeile wird von der zweizeiligen Bullet 1 und der längeren Premium-Note
aufgebraucht.

Alle Werte sind gerechnet auf den am 15.08. gemessenen Live-Größen, gemessen wird nach dem Bau bei
375 x 812.

---

## 7. Bauvorgaben und Reihenfolge

Empfohlene Reihenfolge, weil sie mit dem größten Risiko anfängt und mit dem größten Aufwand endet:

| Schritt | Umfang | Aufwand |
|---|---|---|
| 1 | MAISIE-Bild tauschen (§2.1) | Bildarbeit plus Upload |
| 2 | Hero: sieben Textfelder, davon eines der FAQ-Widerspruch (§3) | reine Template-Edits |
| 3 | `crs-metrics-row` (§4) | reine Template-Edits, ein Block gelöscht |
| 4 | `lt-pdp-report-preview` (§5) | reine Template-Edits, ein Block gelöscht, `retest_show: false` |
| 5 | Nutzenblock (`05`) | zwei Schema-Felder plus Markup, einzige Liquid-Änderung im ganzen Paket |
| 6 | Vier scharfe Hero-Settings aufräumen (§2.6) | Template-Hygiene, jederzeit |

**Zum Bildtausch.** Nicht per `fileUpdate` überschreiben: die alte `?v=`-URL liefert weiter die
alten Bytes. Neue Datei hochladen, `app_visual` im Template neu setzen, alte Datei danach löschen.
Zwei Varianten: Sprechblase auf „Hallo, ich bin dein AI Health Coach" ändern, oder das Phone
weglassen und mit drei Phones exportieren.

**Zu den Templates.** Vier der fünf Copy-Schritte sind reine `templates/product.age-dna-test.json`-
Edits ohne Liquid. `crs-expert-quotes` wird nur von dieser einen Datei benutzt, geprüft am 15.08.,
deshalb hat der Liquid-Umbau in Schritt 5 keine Regression auf anderen Seiten. Template-Änderungen
zuletzt schreiben, wenn per CLI gepusht wird.

**Was nicht angefasst wird.** Section-Reihenfolge, `heading_size` (überall `feature`, im Hero
`product_title`), Paddings, die Reihenfolge unter dem CTA, `crs-feature-grid`,
`lt-comparison-table`, `crs-customer-reviews`, `lt-pdp-ideal-candidate`, `crs-risk-free-close`.

---

## 8. Was die Kette nicht löst

- **Urgency.** `01` §5 gibt der CTA-Klarheit 17 / 25 mit der Begründung „null Grund für heute". Das
  bleibt so. Die einzige belastbare Bauweise wäre die reale Batch-Knappheit der Kits, und diese
  Zahl fehlt weiterhin.
- **Die App-Beleglücke.** Jede Aussage der Form „in der App siehst du" steht ohne Beleg (`01` §6).
  Die Rewrites umgehen sie durchgehend mit „der Test liefert", lösen sie aber nicht.
- **„Bekannt aus".** Die Belege hinter der Logo-Garden sind weiterhin ungeprüft.
- **Die Section-Reihenfolge.** `03` §5 hält fest, dass 1.209 px „wer sind wir" und „wie läuft es ab"
  vor der ersten Nutzenaussage liegen. Die Kette macht diese 1.209 px inhaltlich wertvoller, sie
  räumt sie nicht weg.
- **Die Traffic-Größenordnung.** 672 Sessions in 90 Tagen sind 7,5 Besucher am Tag. Der ehrliche
  Deckel dieser Arbeit liegt laut `03` §2 bei rund 6.500 € netto im Jahr. Die PDP ist nicht der
  bindende Constraint, Traffic ist es.

---

## 9. Offen bei BJ

| # | Punkt | Blockiert |
|---|---|---|
| 1 | MAISIE-Bild sofort tauschen oder mit dem Paket zusammen | nichts, aber es steht live |
| 2 | Drei oder vier Prozessschritte in `crs-metrics-row` | Höhe, 136 px Unterschied |
| 3 | Supplements-Callout einmal (Nutzenblock) oder zweimal | Höhe, 126 px |
| 4 | Wer führt das Ergebnisgespräch | die Paket-Note kann sonst keine Rolle nennen |
| 5 | Horvath verschwindet mit `05` ganz von der PDP | siehe [`05`](05-nutzenblock.md) §10 |
| 6 | „18 der DNA-Reports" behalten oder auf „mehrere" zurück | siehe [`05`](05-nutzenblock.md) §10 |
| 7 | Freigabe für Hero, metrics_row, report_preview | der Bau |
