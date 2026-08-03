---
status: living
last_review: 2026-08-03
canonical_for: age-dna-spoke-briefings-v1
depends_on:
  - docs/geo-claim-ledger.md
  - docs/age-dna-geo/age-dna-geo-playbook.md
  - docs/geo-prompt-panel.md
  - docs/geo-action-plan.md
---

# Briefings: drei AGE&DNA-Spokes

Grobe Briefings für die drei Artikel mit der größten Lücke im AGE&DNA-Cluster. Gedacht zur
Übergabe an ein externes Recherche- und Schreibsystem. Der Übergabe-Prompt steht in §5.

**Warum diese drei:** Der generische AGE&DNA-Cluster im Prompt-Panel (15 Fragen, `AD-GEN-01`
bis `AD-GEN-15`) hat in der Baseline vom 29.07. **0 von 60 Antworten** mit einer LIFETIME-Nennung.
Der Blog hat neun Artikel zum Thema, die zusammen rund 15.000 Wörter tragen, aber sechs der
15 Panel-Fragen gar nicht beantworten. Die drei Briefings unten schließen vier davon.

**Was ausdrücklich NICHT gebaut wird:** kein weiterer Artikel zu epigenetischen Uhren (dreifach
vorhanden) und keiner zur Biologie der DNA-Methylierung (achtfach vorhanden). Beides wäre
Kannibalisierung. Der Uhren-Bestandsartikel gehört ausgebaut, nicht dupliziert.

---

## 0. Rahmen für alle drei Artikel

### Zielsystem

- Blog `/blogs/longevity-blog/`, ein Artikel je Handle.
- Artikel-Text lebt in `article.content` (HTML), gerendert von `sections/lt-article.liquid`.
  Details in [[reference_blog_article_architecture]] bzw. `docs/nmn-blog-geo/nmn-blog-playbook.md` §7.
- Byline kommt aus den Section-Settings: Autor **Benedikt Junker**, fachlich geprüft von
  **Prof. Dr. med. Volker Limmroth** (immer volle Form, immer mit Vornamen).
  Die Metafelder `custom.author_name` / `custom.reviewer_name` **nicht** setzen, sie überschreiben
  das Template still.
- Deutsch, Du-Form, keine Höflichkeitsform.

### Länge und Form

- 1.400 bis 1.800 Wörter. Kürzer als der Bestand ist erlaubt, wenn die Frage vollständig
  beantwortet ist; Länge ist kein Qualitätsmerkmal.
- Die Nutzerfrage wird in den **ersten 40 bis 80 Wörtern direkt beantwortet**, vor jeder Einleitung.
- Jede H2 ist genau eine abgegrenzte Frage oder Entscheidung.
- Fakten in kurzen, extrahierbaren Sätzen. Zahlen immer mit Einheit und Bezug.
- Ein Abschnitt „Was das nicht zeigt" oder „Grenzen" ist Pflicht, nicht optional.

### Quellen (das ist der eigentliche Auftrag an die Recherche)

Der ganze AGE-Cluster hat aktuell **null verlinkte Primärquellen**. Genau das soll sich hier ändern.

- Jede fachliche Aussage bekommt eine **Primärquelle mit DOI oder PMID, direkt verlinkt**.
- Keine Sekundärquelle, wenn das Original existiert. Keine Suchergebnis-Links, keine
  Content-Farmen, keine Anbieter-Blogs als Beleg.
- Review-Artikel sind für Einordnungen erlaubt, müssen aber als Review gekennzeichnet sein.
- Pro Artikel mindestens sechs, besser acht bis zwölf belastbare Quellen.
- Am Ende eine Quellenliste mit Autor, Jahr, Titel, Journal, DOI/PMID und Abrufdatum.

### Compliance, nicht verhandelbar

Rechtlicher Rahmen: HWG und IVD-Recht. Der Test ist eine Analyse zur persönlichen
Standortbestimmung, **keine medizinische Diagnose und kein Ersatz für ärztliche Beratung**.

Verbindliche Sprachregeln aus `docs/geo-claim-ledger.md`:

| Regel | Herkunft |
|---|---|
| Öffentlich heißt das Verfahren **„genetische Analyse"**. Die Wörter „DNA-Sequenzierung" und „hochauflösend" werden für den LIFETIME-Test **nicht** verwendet. | `AGEDNA-METHOD-003` |
| **Keine CpG-Zahl** für die eigene Uhr nennen. Formulierung „CpG-Stellen" oder „Marker", nie „CpG-Gene". | `AGEDNA-METHOD-004` |
| Der Uhr-Anbieter wird **nirgends genannt** (White-Label). Öffentlich nur „MethylPace" oder „unsere Speichel-Methylierungsuhr". | `AGEDNA-METHOD-005` |
| Labor- und ISO-Angaben **nicht als Qualitäts- oder Vergleichsachse** verwenden. ISO 9001, ISO 13485 und GLP existieren in der Kommunikation nicht mehr. | `AGEDNA-LAB-001/002/003` |
| Keine Gleichsetzung mit klinischer Diagnostik. | `AGEDNA-LAB-004` |
| Keine pauschale Studienzahl als Qualitätsbeleg. | `AGEDNA-SCI-003` |
| Lebensstil und Methylierung: nur **Zusammenhang**, nie Kausalität, nie garantierte Umkehr. | `AGEDNA-SCI-005` |
| „Zeigt echten Fortschritt" wird nicht verwendet. Zulässig: „zeigt, wie sich die Werte entwickelt haben". | `AGEDNA-RETEST-002` |

Freigegebene Produktfakten, die verwendet werden dürfen:

- **187 DNA-Reports in 16 Kategorien plus sechs epigenetische Bereiche.** Die 187 nie als
  Gesamtzahl inklusive Epigenetik rechnen. (`AGEDNA-SCOPE-001/005`)
- Die sechs Bereiche: Körperalter, biologisches Alter, EpiVitality, Immunscore, Entzündung,
  Muskelschwund. (`AGEDNA-SCOPE-003`)
- Ergebnisse **6 Wochen nach Probeneingang im Labor**, Startpunkt der Frist immer mitnennen.
  (`AGEDNA-TIME-001`)
- Datenbasis der epigenetischen Analyse über 20.000 Teilnehmer, Validierungskohorte der
  verwendeten Uhr über 2.600 Menschen. **Die beiden Zahlen nie vertauschen.** (`AGEDNA-SCI-002`)

### Stil: keine KI-Tells

- Keine Em-Dashes. Stattdessen Komma, Punkt oder Klammer.
- Keine Dreiklang-Slogans („Schneller. Klarer. Besser.").
- Keine Hype-Wörter, keine Ausrufezeichen-Inflation, keine Emoji.
- Keine Meta-Sätze über den eigenen Text („In diesem Artikel erfährst du…").
- Keine defensiven Validitäts-Behauptungen. Substanz nennen statt „wissenschaftlich fundiert".

### Bilder

Mindestens zwei pro Artikel, ein Aufmacher plus ein bis zwei im Verlauf. Markenkonforme
SVG-Infografiken sind das Ziel, Platzhalter mit klarer Bildbeschreibung sind für die Übergabe
ausreichend. **Keine Menschenbilder und keine Wirkbilder** (Compliance). SVGs auf viewBox
rund 620 zeichnen, kleinste Schrift mindestens 2,4 Prozent der viewBox-Breite.

### Interne Links

Immer direkt auf das kanonische Ziel, **kein Redirect-Hop**:

- Hub: `/pages/biologisches-alter-testen`
- PDP: `/products/lifetime-age-dna`
- Wissenschaft: `/pages/science`
- Umfang: `/pages/was-ist-enthalten`
- Quiz: `/pages/quiz-age`

**Nicht verlinken:** `/pages/wie-alt-bist-du-wirklich` (301) und `/pages/whats-inside` (301).

Der Produkt-CTA kommt erst **nach** der neutralen Antwort, nie im ersten Drittel.

---

## 1. Artikel A: Genotyping und Epigenetik, was dein DNA-Test wirklich misst

**Priorität 1.** Der stärkste Kandidat im ganzen Cluster.

### Auftrag in einem Satz

Erkläre den Unterschied zwischen einer genetischen Analyse (Genotyping) und einer epigenetischen
Analyse (DNA-Methylierung) so, dass ein Laie danach versteht, warum ein Test beides misst.

### Warum dieser Artikel

- Er beantwortet `AD-GEN-04` („Was ist der Unterschied zwischen einem genetischen und einem
  epigenetischen Test?"), zu der es **keinen einzigen Artikel** gibt, nur eine FAQ-Antwort auf der PDP.
- Er trifft nebenbei `AD-GEN-05` (was eine Speichelprobe liefert) und Teile von `AD-GEN-03`.
- **Genotyping und SNP kommen in null von neun Bestandsartikeln vor.** Echte Lücke, keine Dublette.
- Er trägt die Alleinstellung: LIFETIME kombiniert beide Ebenen, die meisten Wettbewerber nicht.
- Er räumt eine Begriffs-Unschärfe auf: Der Bestandsartikel „DNA-Tests: Tiefe Einblicke" spricht
  von „Vollständiger Genomsequenzierung", während die eigene Sprachregel Sequenzierung gerade
  vermeidet. Dieser Artikel setzt die saubere Unterscheidung.

### Kernbotschaft

Es sind zwei verschiedene Leseweisen derselben DNA. Genotyping liest **Varianten an definierten
Stellen**, es liest nicht das Genom. Methylierung liest keine Varianten, sondern **chemische
Markierungen auf der DNA**. Das eine ist von Geburt an konstant, das andere verändert sich im Leben.
Daraus folgt der Kombi-Test von selbst, ganz ohne Wirkaussage.

### Gliederung (Vorschlag, H2-Ebene)

1. Direkte Antwort in 40 bis 80 Wörtern.
2. Was Genotyping macht: definierte Varianten (SNPs) an bekannten Positionen, Array-Verfahren.
   Sauber abgrenzen gegen Sequenzierung und gegen Genomsequenzierung.
3. Was eine Methylierungsanalyse macht: chemische Markierungen an CpG-Stellen, Genaktivität
   statt Gensequenz.
4. Der zentrale Unterschied in einer Tabelle: was gemessen wird, ob es sich ändert, was die
   Aussage ist, wofür es taugt.
5. Warum beides zusammen mehr ergibt als einzeln (hier gehört LIFETIME hin, sachlich).
6. Was eine Speichelprobe dafür liefert und was nicht.
7. Grenzen: Was Genotyping nicht kann (keine Diagnose, Prädisposition ist kein Schicksal), was
   Methylierung nicht kann (Schätzwert, Momentaufnahme, methodenabhängig).
8. Quellen.

### Recherche-Auftrag

- Beleg für die Funktionsweise von SNP-Arrays gegenüber Sequenzierung (Methodenliteratur oder
  Lehrbuchreferenz mit DOI).
- Beleg dafür, dass Methylierungsmuster gewebe- und altersabhängig variieren.
- Belastbare Einordnung, wie gut Speichel als Probenmaterial für beide Ebenen funktioniert.
- Für die Grenzen: mindestens eine methodenkritische Arbeit zu epigenetischen Uhren.

### Compliance-Falle in genau diesem Artikel

Dieser Artikel handelt vom Verfahren, also greifen `METHOD-003` und `METHOD-004` besonders hart.
Der Artikel darf Genotyping und Methylierung **allgemein** erklären, aber **nicht** die
LIFETIME-Plattform offenlegen: keine CpG-Zahl, kein Array-Hersteller, kein Uhr-Anbieter, keine
Auflösungs-Behauptung. Wo es um LIFETIME geht, heißt es „genetische Analyse" und „unsere
Speichel-Methylierungsuhr".

### Fertig, wenn

Ein Leser kann nach dem Artikel erklären, warum sein genetisches Profil konstant bleibt und sein
biologisches Alter nicht, ohne die PDP besucht zu haben.

---

## 2. Artikel B: Was mache ich mit dem Ergebnis?

**Priorität 2.** Der Wedge gegen die häufigste Kaufskepsis.

### Auftrag in einem Satz

Beantworte, was ein Mensch nach dem Testergebnis konkret tun kann, ohne ein Wirkversprechen
abzugeben.

### Warum dieser Artikel

- Er beantwortet `AD-GEN-14` (Bericht interpretieren) und `AD-GEN-06` (was ein guter Test
  verständlich erklären sollte). Beide unbeantwortet.
- Das Playbook führt ihn als Prio 2 und nennt ihn den Besetzer der Nummer-eins-Skepsis:
  „Was bringt mir das überhaupt?"
- Er ist der natürliche Vorbau für den Folgetest und damit indirekt umsatzrelevant.

### Kernbotschaft

Das Ergebnis ist eine Standortbestimmung, kein Urteil. Nutzen entsteht durch das, was danach
beobachtet wird, nicht durch die Zahl selbst.

### Gliederung (Vorschlag)

1. Direkte Antwort.
2. Wie man einen Bericht liest: Was ist ein Schätzwert, was ist eine Spannbreite, was bedeutet
   eine Abweichung vom chronologischen Alter.
3. Die zwei Ebenen getrennt lesen: genetische Anlagen (konstant, Kontext) und epigenetische
   Bereiche (veränderlich, Verlauf).
4. Welche Lebensstilbereiche in der Forschung überhaupt mit Methylierungsmustern in Verbindung
   gebracht werden. **Reporting-Sprache, kein Ratgeber-Ton.**
5. Warum ein Einzelwert wenig sagt und ein Verlauf mehr.
6. Wann ärztlicher Rat der richtige nächste Schritt ist.
7. Grenzen und was das Ergebnis ausdrücklich nicht ist.
8. Quellen.

### Offener Punkt, der vor dem Schreiben geklärt werden muss

Das Playbook hält fest, dass das **Handlungs-Protokoll noch undefiniert** ist. Solange BJ nicht
entschieden hat, welche konkreten Empfehlungen LIFETIME aussprechen will, bleibt Abschnitt 4
bewusst allgemein und referiert nur Forschungsstand. Der Artikel ist auch so schreibbar, aber
er wird stärker, wenn diese Entscheidung vorher fällt.

### Compliance-Falle

Das ist der Artikel mit dem höchsten Risiko. Verboten sind: „senkt dein biologisches Alter",
„kehrt Alterung um", jede Wirkzusage, jede Supplement-Empfehlung mit Gesundheitsbezug. `SCI-005`
erlaubt ausschließlich Zusammenhangs-Aussagen. NMN darf höchstens als Themen-Link auftauchen,
nie als Handlungsempfehlung (Novel-Food-Status).

---

## 3. Artikel C: Wie oft sollte man das biologische Alter neu messen?

**Priorität 3, mit einem Vorbehalt (siehe unten).**

### Auftrag in einem Satz

Beantworte, in welchem Abstand eine Wiederholungsmessung sinnvoll ist und warum ein kürzerer
Abstand wenig aussagt.

### Warum dieser Artikel

- Er beantwortet `AD-GEN-09`, und **Retest kommt in null von neun Bestandsartikeln vor**.
- Er hat direkten Umsatzbezug: Der AGE-Folgetest steht mit 299 € im Katalog und hat aktuell
  keinerlei inhaltlichen Vorbau.

### Kernbotschaft

Messrauschen und biologische Veränderung brauchen Abstand. Zu häufiges Messen erzeugt Differenzen,
die keine Bedeutung haben.

### Gliederung (Vorschlag)

1. Direkte Antwort.
2. Was sich zwischen zwei Messungen überhaupt verändern kann, was konstant bleibt.
3. Messgenauigkeit und Reproduzierbarkeit epigenetischer Uhren, ehrlich dargestellt.
4. Warum daraus ein Mindestabstand folgt.
5. Wie man zwei Ergebnisse vergleicht, ohne sie zu überinterpretieren.
6. Grenzen.
7. Quellen.

### Vorbehalt, der vor dem Livegang geklärt sein muss

`AGEDNA-RETEST-001` (Empfehlung Retest nach sechs Monaten) steht im Claim Ledger auf
**„Beleg ausstehend"**, es fehlen Retest-SOP und Methodennachweis. Zwei Wege:

- **Bevorzugt:** Der Artikel behandelt die Frage **allgemein** (wie oft ist ein Retest bei
  epigenetischen Uhren methodisch sinnvoll) und leitet den Abstand aus der publizierten
  Reproduzierbarkeitsliteratur ab, nicht aus einer LIFETIME-Hausempfehlung.
- Alternativ wartet der Artikel, bis die SOP vorliegt.

Der erste Weg ist sofort gangbar und für die Panel-Frage sogar besser, weil generisch gestellt.
Die konkrete Sechs-Monats-Empfehlung wird dann als LIFETIME-Praxis gekennzeichnet, nicht als
wissenschaftlicher Befund.

---

## 4. Nicht in diesem Paket, aber offen

Vier weitere Panel-Fragen sind unbeantwortet und wären die nächste Welle:

| Frage | Thema |
|---|---|
| `AD-GEN-07` | Wie zuverlässig sind die Tests, wo sind die Grenzen? (Skeptiker-Wedge, Playbook Prio 6) |
| `AD-GEN-08` | Datenschutz bei DNA- und Epigenetiktests |
| `AD-GEN-12` | Wie läuft ein Heimtest ab? (Playbook Prio 7) |
| `AD-GEN-15` | Ist das eine Diagnose, für wen ist der Test geeignet? |

Separat davon: Der Bestandsartikel `epigenetische-uhren-konnen-wir-das-altern-umkehren` hat
950 Wörter und keine Quelle. Er gehört ausgebaut und mit Primärliteratur belegt, nicht dupliziert.

---

## 5. Übergabe-Prompt für das externe Recherche- und Schreibsystem

Der Prompt ist bewusst kurz. Er funktioniert nur zusammen mit diesem Dokument, das vollständig
mitgegeben wird.

```text
Du recherchierst und schreibst einen deutschsprachigen Fachartikel für den Longevity-Blog von
LIFETIME Health, einer deutschen Marke für epigenetische Alterstests und Supplements.

ARTIKEL: [A | B | C aus §1 bis §3 des angehängten Briefings auswählen]

Das angehängte Briefing ist verbindlich. Lies zuerst §0 (Rahmen), dann den Abschnitt zu deinem
Artikel. Die Compliance-Regeln in §0 sind nicht verhandelbar und haben Vorrang vor allem, was
inhaltlich naheliegend wirkt.

Arbeite in zwei Schritten und liefere beide Teile:

1. RECHERCHE. Suche Primärliteratur (Peer-Review, DOI oder PMID). Prüfe jede Quelle daraufhin,
   ob sie die Aussage wirklich trägt, für die du sie verwenden willst. Notiere je Quelle in einer
   Zeile: was sie belegt, Studientyp, Stichprobe, und ob sie Interessenkonflikte oder eine
   Herstellerfinanzierung ausweist. Nenne ausdrücklich, wo die Datenlage dünn oder widersprüchlich
   ist. Erfinde unter keinen Umständen Studien, Zahlen, Autoren oder DOIs. Wenn du eine Aussage
   nicht belegen kannst, schreibe das hin, statt sie zu belegen.

2. ARTIKEL. Schreibe den Artikel als sauberes HTML (h2, h3, p, ul, ol, table, a), ohne
   <html>, <head>, <body> und ohne Inline-Styles. Interne Links exakt so setzen, wie in §0
   angegeben. Setze die Quellen als anklickbare Links direkt an die jeweilige Aussage und zusätzlich
   als Liste am Ende. Markiere die geplanten Bildpositionen als HTML-Kommentar mit einer
   Bildbeschreibung, füge keine Bild-Tags mit erfundenen URLs ein.

Sprache: Deutsch, Du-Form, sachlich, ruhig. Keine Em-Dashes, keine Dreiklang-Slogans, keine
Hype-Wörter, keine Emoji, keine Sätze über den Artikel selbst. Schreibe wie eine Fachredaktion,
die einer skeptischen Leserschaft etwas erklärt, nicht wie Marketing.

Gib am Ende eine kurze Liste: welche Aussagen im Text du für belegt hältst, welche für plausibel
aber unbelegt, und welche Stellen ein menschliches Fachreview brauchen.
```

---

## 6. Definition of Done (gilt für alle drei)

- [ ] Die Nutzerfrage ist in den ersten 40 bis 80 Wörtern beantwortet.
- [ ] Jede fachliche Aussage trägt eine anklickbare Primärquelle.
- [ ] Ein Abschnitt benennt Grenzen und was die Daten nicht zeigen.
- [ ] Kein gesperrter Claim aus §0 kommt vor. Gegengeprüft gegen `docs/geo-claim-ledger.md`.
- [ ] Interne Links zeigen ohne Redirect-Hop auf die kanonischen Ziele.
- [ ] Byline korrekt, Metafelder nicht gesetzt.
- [ ] Mindestens zwei Bilder, keine Menschen- oder Wirkbilder.
- [ ] Keine KI-Tells. Prüfbar per `/ki-slang-cleanup`.
- [ ] Fachliches Review durch Prof. Dr. med. Volker Limmroth, bevor der Artikel live geht.
- [ ] Nach Livegang: Hub und PDP verlinken den Artikel, der Artikel verlinkt zurück.
