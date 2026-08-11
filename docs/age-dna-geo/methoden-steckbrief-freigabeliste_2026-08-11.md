---
status: living
last_review: 2026-08-11
canonical_for: age-dna-methoden-steckbrief-freigabe
depends_on:
  - docs/age-dna-product-fact-sheet.md
  - docs/age-dna-evidence-request-pack-2026-07-29.md
  - docs/geo-claim-ledger.md
---

# Methoden-Steckbrief: was publizierbar ist und was noch fehlt

Auftrag BJ vom 11.08.2026 („ok bitte aufführen"). Dies ist **keine Freigabe** und kein
Publikationsentwurf, sondern die Aufstellung: Welcher Methodenfakt liegt intern vor, was davon
darf heute nach außen, und welcher konkrete Nachweis fehlt für den Rest.

## Warum das überhaupt zählt

Auf `/products/lifetime-age-dna` kommt das Wort **CpG kein einziges Mal vor**. Die drei im
deutschen Markt meistzitierten Wettbewerber liefern je einen Satz, den ein Sprachmodell wörtlich
als Methodenaussage zitieren kann:

| Anbieter | zitierbarer Methodensatz |
|---|---|
| epiAge | epigenetischer Test, Triple Sequencing mit NGS von Illumina |
| cerascreen | DNA-Methylierung per EPIC-seq |
| TruDiagnostic | OMICmAge, SYMPHONYAge und DunedinPACE |
| **LIFETIME** | **kein extrahierbarer Methodenfakt öffentlich** |

Bei einer Methodenfrage kann ein Modell uns deshalb schlicht nicht nennen. Das ist die Lücke,
nicht die Technik der Seite.

## Was heute schon publizierbar ist

Diese Aussagen sind freigegeben und stehen teilweise bereits live. Sie können ohne weitere
Rückfrage im Methodenabschnitt verdichtet werden:

| Aussage | Freigabe |
|---|---|
| Nicht-invasive Speichelprobe, zu Hause entnommen | BJ, laufend |
| Die epigenetische Auswertung basiert auf einer Speichel-Methylierungsuhr | BJ |
| Die Uhr orientiert sich an der Methode von Horvath, kommt aber mit deutlich weniger Messstellen aus als dessen Modell mit 353 Positionen | BJ, 06.08. |
| Sachlicher Anker: Messstellen sind unterschiedlich verlässlich, die Auswahl zählt mehr als die Menge (Sugden et al., Patterns 2020) | BJ, 06.08. |
| Laboranalyse bei Eurofins Genomics nach ISO 17025 | BJ, 29.07., mit Evidenzgrenze unten |
| DNA-Ergebnisse in 23 Kategorien, über 150 Einzelergebnisse | Portal-Audit 06.08. |
| Sechs epigenetische Bereiche: Körperalter, MethylPace, EpiVitality, Immunscore, Entzündung, Muskelschwund | Portal-Audit 06.08. |
| MethylPace enthält biologisches Alter und Alterungsgeschwindigkeit | Portal-Audit 06.08. |
| EpiVitality ist ausdrücklich kein Alterswert | Portal-Audit 06.08. |
| Sechs Wochen ab Probeneingang im Labor | BJ, 30.07. |
| Standortbestimmung, keine medizinische Diagnose | BJ |

**Das reicht für einen brauchbaren Methodenabschnitt bereits aus**, mit einer Ausnahme: Es fehlt
weiterhin jede Zahl, an der sich ein Modell festhalten kann.

## Primärquelle, direkt gelesen am 11.08.2026

BJ hat am 11.08.2026 entschieden: **Wir sind die Quelle.** Wir verlinken den Preprint nicht,
kommunizieren die Zusammenarbeit mit einem Partner aber wie beim Labor. Damit sind die
Methodenfakten grundsätzlich verwendbar. Die folgende Aufstellung stammt aus dem Volltext, nicht
aus einer Zusammenfassung.

**Dokument:** Collins C, Brown J, Berkley N. *MuhdoAge: A Novel Saliva Based Epigenetic Clock
that Has a Strong Association with Ageing in a Healthy, Disease-Free Cohort.* Preprints.org,
16.04.2024, doi 10.20944/preprints202404.0985.v1. **Nicht peer-reviewed.** Autoren sind bei
Muhdo Health Ltd. beschäftigt; „Conflicts of Interest: none declared".

### Verfahren

| Angabe | Wert |
|---|---|
| Probe | 2 ml passiver Speichel, GeneFiX Saliva DNA/RNA Collection |
| Array | Illumina Infinium MethylationEPIC, rund 850.000 CpG-Stellen analysiert |
| Labor | Eurofins Global Laboratory, ISO 17025:2005 und ISO 17025:2017 |
| Auswahlweg | 850.000 → 662 signifikant (p ≤ 0,05) → 4 wegen Ausfallrate entfernt → 658 (R² 0,238) → verschärft auf p ≤ 0,01 → **237 CpG-Stellen** für die Uhr |
| Gewichtung | Vier Robustheitsstufen: 10 zeitrobuste, 5 zeitgetriebene, 150 pathologiebeeinflusste, 72 lebensstilbeeinflusste. Formel M1 + 0,07·M2 + 0,02·M3 + 0,005·M4 |

### Kohorten und Kennwerte

| Kohorte | n | R² | MAE |
|---|---:|---:|---:|
| Gesamt getestet | 23.589 | | |
| Trainingskohorte (≥2 EPIC-Tests in <6 Monaten) | 2.109 | 0,652 nach Ausreißerbereinigung (2.091) | |
| Neue Prüfkohorte | 2.682 | **0,726** | **5,97 Jahre** |
| Gesunde Teilkohorte | 1.844 | **0,878** | **3,49 Jahre** |

Mittlere Abweichung Vorhersage zu Kalenderalter: gesunde Teilkohorte +2,29 Jahre, Gesamtkohorte
+4,19 Jahre. Die Autoren lesen das als Hinweis auf beschleunigte Alterung in pathologischen
Gruppen.

Vom Preprint selbst genannte Vergleichswerte anderer Uhren: Horvath R² 0,96 über alle Gewebe,
CheekAge 0,93, Hannum 0,81, GrimAge 0,75.

### Vom Preprint selbst benannte Grenzen

Geografisch und ethnisch begrenzte Kohorte, Daten aus einem Direktvertriebsmodell,
Fragebogenangaben durch die Teilnehmenden selbst, Selektionseffekt durch die Kaufbereitschaft
für einen kostenpflichtigen Test. Longitudinale Validierung steht aus.

### Was der Preprint ausdrücklich nicht abdeckt

**Die genetische Ebene.** Das Dokument beschreibt ausschließlich die epigenetische Uhr. Zur
Genotypisierung, aus der die 23 DNA-Kategorien entstehen, steht dort nur, dass das Unternehmen
Illumina-Arrays verwendet, „some of which are combined IP". Keine Array-Bezeichnung, keine
Variantenzahl, keine Referenzpanels. **Für die genetische Ebene existiert weiterhin keine
Methodenbeschreibung.** Epigenetik und Genetik dürfen in der Kommunikation deshalb nicht in
einem Atemzug mit Zahlen belegt werden.

### Offener Punkt zur Identifizierbarkeit

Die Uhr heißt MuhdoAge, das Unternehmen Muhdo Health Ltd. Wer 237 CpG-Stellen, den
MethylationEPIC-Array, GeneFiX und Eurofins Global Laboratory zusammen veröffentlicht,
beschreibt einen eindeutigen Fingerabdruck. Der Preprint ist damit in wenigen Sekunden
auffindbar. „Partner nicht nennen" und „Methode vollständig beschreiben" schließen einander
praktisch aus. Entscheidung dazu steht aus, siehe unten.

## Was gesperrt ist, obwohl die Zahl intern vorliegt

Die Zahlen stehen im Anbieter-Preprint
(`lifetime-produktdetails/MuhdoAge_A_Novel_Saliva_Based_Epigenetic_Clock_tha.pdf`, 16.04.2024).
Das Dokument ist auf jeder Seite als **nicht peer-reviewed** gekennzeichnet und stammt vom
White-Label-Lieferanten, der nicht genannt werden darf.

| # | Fakt | Interner Wert | Warum gesperrt | Was ihn freigibt |
|---:|---|---|---|---|
| 1 | Anzahl ausgewerteter CpG-Stellen | **237** | Preprint des Lieferanten, nicht peer-reviewed. Unbestätigt, ob das heute verkaufte Kit unverändert dieselbe Uhr nutzt | Schriftliche Bestätigung des Lieferanten, dass die aktuell ausgelieferte Version 237 Positionen auswertet, mit Versions- oder Gültigkeitsdatum |
| 2 | Analyseplattform | Illumina Infinium MethylationEPIC-Array | Gleiche Quelle. „Plattform- oder Gesamt-CpG-Zahl" ist ausdrücklich gesperrt | Dieselbe Bestätigung wie #1, zusätzlich die Angabe, ob EPIC v1 oder v2 im Einsatz ist |
| 3 | Referenzkohorte | 2.109 Konstruktion, 2.682 Prüfpopulation, 23.589 insgesamt getestet | Nur im Preprint belegt, ohne eigene gebrandete Zusammenfassung nicht zeigbar | Eigene Validierungs-Zusammenfassung mit Limitationen (im Evidence-Pack als GEO-016 geführt) |
| 4 | Genauigkeit | mittlere absolute Abweichung **5,97 Jahre**, in der gesunden Teilkohorte 3,49; R² 0,726 | Präzisionsaussagen sind mit dieser Streuung nicht haltbar; zulässig ist nur Einordnung plus Entwicklung über die Zeit | Wird voraussichtlich **nicht** freigegeben. Die ehrliche Alternative steht unten |
| 5 | Probenkit | GeneFiX-Sammelkit | Zulieferername | Freigabe nur, wenn der Kit-Hersteller genannt werden darf |
| 6 | Genetisches Verfahren | unbekannt | Es liegt keine Methodenbeschreibung für die genetische Ebene vor | Methodenbeschreibung von Science oder Labor anfordern |
| 7 | Name der Uhr | „MethylPace" steht live auf der PDP | Ungeklärt, ob Eigenname von LIFETIME oder des Lieferanten | Rechteklärung: Dürfen wir MethylPace als eigene Bezeichnung führen? |

### Sonderfall Labor und ISO 17025

Freigegeben ist der Satz „Die Laboranalyse erfolgt bei Eurofins Genomics nach ISO 17025".
Die Evidenzgrenze: Diese Aussage stützt sich bisher **nur auf die Methodenunterlage des
Lieferanten**, nicht auf eine Akkreditierungsurkunde in LIFETIME-Besitz. Der Preprint spricht
zudem unspezifisch von „Eurofins Global Laboratory".

Solange der Satz wie heute beiläufig steht, ist das vertretbar. Sobald ISO 17025 als
**Qualitäts- oder Vergleichsargument hervorgehoben** wird, braucht es die Urkunde plus
Scope-Anlage, und zwar für genau den Standort, der die LIFETIME-Proben bearbeitet. Deshalb ist
Labor/ISO im Anbietervergleich bewusst keine Vergleichsachse.

Dauerhaft entfernt und nicht wieder aufzunehmen: ISO 9001, ISO 13485, GLP-zertifiziert,
„medizinischer Standard", „dieselben Standards wie in der klinischen Diagnostik",
„Deutsches Labor".

## Die drei Anfragen, die den Steckbrief lösen

### Anfrage A, an den Uhr-Lieferanten (löst #1, #2, #5, #7)

> Für die öffentliche Methodenbeschreibung unseres Produkts benötigen wir eine schriftliche
> Bestätigung zum aktuell ausgelieferten Stand:
> 1. Wie viele CpG-Positionen wertet die derzeit ausgelieferte Version der Uhr aus?
> 2. Welche Analyseplattform kommt zum Einsatz, und in welcher Version?
> 3. Seit wann gilt dieser Stand, und wie werden wir über Änderungen informiert?
> 4. Dürfen wir die Bezeichnung MethylPace als eigene Produktbezeichnung öffentlich führen?
> 5. Dürfen Hersteller und Bezeichnung des Probensammelkits genannt werden?
> 6. Existiert eine peer-reviewte Fassung der Validierung, oder ist eine geplant?

### Anfrage B, an Operations bzw. Eurofins (löst die ISO-Evidenzgrenze)

> Welche Eurofins-Gesellschaft und welcher Standort bearbeitet unsere Proben? Bitte die
> ISO/IEC-17025-Urkunde samt Scope-Anlage für genau diesen Standort und Analyseumfang.
> Nur erforderlich, wenn wir ISO 17025 künftig aktiv als Qualitätsargument nutzen wollen.

### Anfrage C, an Science (löst #3, #6 und GEO-016)

> Wir brauchen eine eigene, gebrandete Validierungs-Zusammenfassung: Was misst die Uhr, an
> welcher Population wurde sie entwickelt und geprüft, wie groß ist die Streuung, und welche
> Limitationen nennen wir selbst? Zusätzlich eine Methodenbeschreibung der genetischen Ebene.

## Empfehlung zur Genauigkeitszahl

Punkt #4 wird sich vermutlich nicht in eine Werbeaussage verwandeln lassen, und das ist kein
Verlust. Eine mittlere Abweichung von rund sechs Jahren als „Genauigkeit" zu verkaufen, wäre
angreifbar. Der belastbare und zugleich zitierfähige Weg ist der umgekehrte:

> Ein einzelner Alterswert ist eine Einordnung, keine exakte Zahl. Aussagekraft entsteht im
> Verlauf mehrerer Messungen mit demselben Verfahren.

Diese Aussage steht bereits im Genauigkeitsartikel und in dessen FAQ. Sie ist ehrlich, sie ist
belegbar, und sie ist genau die Art von ausgewogener Formulierung, die von Sprachmodellen
bevorzugt zitiert wird. Der Wettbewerbsvorteil liegt hier nicht in einer besseren Zahl, sondern
darin, die Grenze offen zu benennen, während andere sie verschweigen.

## Nächster Schritt

Sobald Anfrage A beantwortet ist, lässt sich ein Methodenabschnitt auf `/pages/science` und ein
kompakter Steckbrief auf der PDP bauen. Ohne Anfrage A bleibt der Abschnitt qualitativ, also
ohne die eine Zahl, die ihn zitierfähig machen würde.

Anfrage A ist zusätzlich Voraussetzung für die Redaktionsansprache bei `slowrecovery.de`. Diese
Redaktion bewertet epigenetische Tests ausdrücklich nach CpG-Zahl, Reliabilität und Transparenz.
Ohne belastbare Methodenangabe sind wir dort nicht prüfbar und fallen aus dem Vergleich.
