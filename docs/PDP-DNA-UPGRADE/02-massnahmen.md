---
status: living
last_review: 2026-08-16
canonical_for: pdp-age-dna-massnahmen
depends_on:
  - docs/PDP-DNA-UPGRADE/01-rmbc-kontext.md
  - docs/age-dna-product-fact-sheet.md
review_cadence_days: 14
---

# AGE&DNA-PDP: Maßnahmen

Abgeleitet aus dem Baseline-Audit vom 14.08.2026 (siehe [`01-rmbc-kontext.md`](01-rmbc-kontext.md) §5).
Sortiert nach Hebel, nicht nach Aufwand.

Baseline: **65 / 100**. Proof 18, CTA 17, Result Specificity 16, Mechanism Novelty 14.

**Spalte „Entscheid":** BJ heißt, es braucht eine Festlegung oder eine Zahl, die nicht im Repo liegt.
Assistent heißt, ich kann das mit vorhandenem Material bauen.

| # | Maßnahme | Wirkt auf | Aufwand | Entscheid |
|---|---|---|---|---|
| 1 | Mechanismus schärfen | Mechanism +6 bis +8 | mittel | Assistent |
| 2 | Ergebnis-Konkretheit aus eigenen Stimmen | Result Specificity +5 | klein | Assistent |
| 3 | Urgency auf echter Batch-Zahl | CTA +5 | klein im Bau | BJ (Zahl) |
| 4 | NMN-Brücke einziehen | AOV, Cross-Sell | klein | Assistent |
| 5 | App-Kundensicht verifizieren | entsperrt 3 Sections | klein, braucht Zugang | BJ (Zugang) |
| 6 | „Bekannt aus" belegen oder ziehen | Proof +2 | klein | BJ |
| 7 | Ads-Landing entscheiden | Ads-CR | klein | BJ |

> **Statusnachtrag 2026-08-16.** Der Copy-Umbau ist gebaut und live, Details in
> [`06`](06-kausalkette.md) §7 und im [README](README.md).
>
> | # | Status |
> |---|---|
> | 1 Mechanismus schärfen | **gebaut.** Kandidat 2, 3 und 6 aus `04` liegen in `crs-expert-quotes`, `crs-metrics-row` und `lt-pdp-report-preview` |
> | 2 Ergebnis-Konkretheit | **weitgehend gebaut** über die drei Karten des Nutzenblocks (`05` §5). Die Loox-Volltext-Auswertung per `/customer-research` ist damit **nicht** erledigt |
> | 4 NMN-Brücke | **angelegt**, nicht ausgebaut. Karte 2 des Nutzenblocks nennt NMN erstmals auf der PDP, ein eigener Cross-Sell-Weg fehlt weiter |
> | 3, 5, 6, 7 | unverändert offen, alle vier hängen an einer Zahl oder Festlegung von BJ |
>
> Ob die Punkte in Klammern („Mechanism +6 bis +8") eingetreten sind, sagt erst
> `/rmbc-copy-audit` gegen die Baseline 65 / 100. Bis dahin sind es Erwartungen.

---

## 1. Mechanismus schärfen

**Warum.** Die schwächste Dimension und laut RMBC die teuerste. Aktuell differenziert die Seite über
Umfang („zwei Ebenen statt einer"). Umfang ist kopierbar, sobald ein Wettbewerber die zweite Ebene
dazukauft. Was fehlt, ist die Erklärung, warum das Ergebnis belastbar ist.

**Die Spur.** Die Genauigkeitsfrage ist im deutschen Markt von keinem Anbieter besetzt, verifiziert
am 03.08. Gleichzeitig ist der Horvath-Bezug seit 06.08. freigegeben. Beides zeigt in dieselbe
Richtung: nicht „wir messen genauer", sondern offen sagen, was eine Einzelmessung leisten kann und
was nicht, und daraus die Entwicklung über die Zeit zum eigentlichen Produktwert machen. Das ist die
einzige Rahmung, die mit der mittleren Abweichung von 5,97 Jahren lebt statt gegen sie zu arbeiten.

**Nötig.** Kein neuer Fakt. Material liegt im Fact Sheet §Probe und Methode.

**Sperren beachten:** kein Anbietername, keine CpG-Zahl, keine Präzisionsaussage. Vollständige Liste
in `01-rmbc-kontext.md` §2.

**Nächster Schritt:** `/mechanism-ideation` gegen §2 des Kontext-Dokuments.

---

## 2. Ergebnis-Konkretheit aus den eigenen Kundenstimmen

**Warum.** Die Seite sagt sehr genau, was geliefert wird (23 Kategorien, sechs Bereiche, 6 Wochen,
App). Sie sagt kaum, was sich für den Kunden ändert. Genau das steht schon auf der Seite, nur an der
falschen Stelle: in den Reviews.

Ungenutzt weiter oben verfügbar:
- „Ich bin 46, mein biologisches Alter: 38."
- „Ich habe vorher viele Supplemente genommen und nie gewusst, ob sie wirklich zu mir passen."
- „Ich weiß jetzt, wo ich ansetzen muss."

**Nötig.** Loox-Volltexte für mehr Auswahl (per `review_source=loox` abrufbar), optional
App-Screenshots aus Maßnahme 5.

**Achtung.** Kundenstimmen sind von der Herkunfts-Regel ausgenommen, alte Berlin-Nennungen darin
bleiben stehen.

---

## 3. Urgency auf einer echten Batch-Zahl

**Warum.** Die Seite hat null Urgency. Risk Reversal ist stark (30 Tage versiegelt, kostenloses
Ersatzkit, einmalige Zahlung), aber es gibt keinen Grund, heute statt in drei Wochen zu kaufen.

**Bauweise.** Die AGE&DNA-Kits sind real batch-limitiert über die Laborkapazität. Diese Zahl ist
wahr, darf offensiv gezeigt werden und braucht keinen Timer. Alternativ oder zusätzlich eine echte
Per-Kunden-Frist, serverseitig gespeichert, mit einem Code, der wirklich abläuft.

**Nicht gebaut wird:** Timer ohne dahinterliegende Frist, erfundene Lagerbestände, erfundene
Betrachterzahlen. Nicht aus Vorsicht, sondern weil die echte Variante dasselbe leistet.

**Offen für BJ:** die reale Batch-Größe und die Kadenz. Ohne diese Zahl ist die Maßnahme blockiert.

---

## 4. NMN-Brücke einziehen

**Warum.** In der Kategorie Nahrungsergänzungsmittel liegt ein eigener Report **„NMN und Ausdauer"**,
der die individuelle NMN-Ansprechbarkeit ausweist. Der Test liefert also ab Werk eine NMN-Einordnung.
Das ist die sachlich sauberste Brücke zwischen den beiden Hauptprodukten und in keinem einzigen
Touchpoint genutzt.

**Wirkung in zwei Richtungen.** Auf der AGE&DNA-PDP macht es den Test konkreter („du erfährst, ob NMN
bei dir überhaupt greift"). Auf der NMN-PDP macht es den Test zum logischen Vorschritt. Die
Startseiten-Haltung „Erst testen, dann ergänzen" ist bereits genau das, nur ohne Beleg dahinter.

**Nötig.** Nichts Neues, der Report ist im Portal belegt (Fact Sheet §Produktbezug).

---

## 5. App-Kundensicht verifizieren

**Warum.** Das ist die größte Beleglücke im ganzen Produkt. Alles im Fact Sheet stammt aus dem
Anbieter-Backend. Ob die Kundin in der LIFETIME App dieselben 23 Kategorien sieht, ob die
Bereichsnamen identisch sind, ob Höralter, Augenalter und Gedächtnisalter dort so heißen: alles
unverifiziert.

**Was daran hängt.** Feature-Grid, Report-Preview und ein Großteil des FAQ-Blocks arbeiten mit
„in der App siehst du …". Solange das nicht belegt ist, steht ein sichtbarer Teil der PDP auf
Annahmen aus dem Backend.

**Nötig von BJ:** App-Zugang oder ein Screenshot-Satz. Danach fällt Maßnahme 2 mit ab, weil die
Screenshots gleichzeitig das beste Demonstrations-Proof wären, das die Seite haben könnte.

---

## 6. „Bekannt aus" belegen oder ziehen

Die `crs-logo-garden` steht direkt unter dem Hero, also an der teuersten Stelle der Seite. Welche
Nennungen dahinterstehen und ob sie belegbar sind, steht in keinem Dokument. Entweder es gibt die
Belege, dann gehören sie ins Fact Sheet, oder die Section kommt weg und macht Platz für Proof, der
trägt.

---

## 7. Ads-Landing entscheiden

Kein Copy-Thema, aber es steht vor jeder Ad-Copy-Arbeit. Die AGE&DNA-Search-Kampagne landet auf
`/pages/quiz-age` und hat in der Referenzperiode bei 320 Klicks null Käufe erzeugt. Alle
AGE&DNA-Verkäufe derselben Periode kamen organisch mit PDP- oder Collection-Landing, und die
Suchbegriffe der Kampagne sind transaktional („biologisches alter test").

Naheliegend ist ein Test auf die PDP als Ziel. Solange das offen ist, optimiert jede Anzeigen-Copy
auf ein Ziel, das nicht konvertiert.

**Separat und größer:** Das Quiz-E-Mail-Gate verliert 444 `quiz_completed` auf 7 Abgaben in 60 Tagen.
Das ist das größte absolute Leck im gesamten Funnel, gehört aber auf eine andere Fläche und nicht in
dieses Paket.

---

## Nicht angefasst

- **Die Section-Reihenfolge.** Sie ist approbiert und wird gefüllt, nicht umgeworfen.
- **Der Preis.** 349 € und 449 € sind BJ-Entscheide vom 08.08. und 14.08.
- **Das Ergebnisgespräch als ärztliche Leistung.** Bewusst nicht ärztlich, nie mit Limmroth-Badge
  bewerben.
- **Die gesperrten Krankheitsreports.** Teil des Produkts, kein Werbeargument.
