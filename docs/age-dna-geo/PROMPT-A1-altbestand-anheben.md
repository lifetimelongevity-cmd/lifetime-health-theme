---
status: living
last_review: 2026-08-11
canonical_for: age-cluster-altbestand-upgrade-briefing
depends_on:
  - docs/age-dna-geo/chatgpt-status-analyse_2026-08-11.md
  - docs/age-dna-geo/age-dna-geo-playbook.md
  - docs/age-dna-product-fact-sheet.md
  - docs/conversion-messaging.md
---

# Prompt A1: den AGE-Altbestand auf NMN-Niveau ziehen

Fertiger Arbeitsauftrag. In einer neuen Session ab „## Auftrag" einfügen.

---

## Auftrag

Zieh die neun veralteten Artikel des AGE&DNA-Clusters auf denselben Stand wie den
NMN-Cluster. Arbeite Artikel für Artikel, nicht alle auf einmal.

### Warum das gemacht wird

Gemessen am 11.08.2026:

- ChatGPT schickt Käufer zu NMN (25 Sessions, 5 Käufe in 30 Tagen), aber nicht zum
  AGE&DNA-Test (4 Sessions, 0 Käufe).
- Ursache ist die organische Sichtbarkeit: NMN steht bei gewichteter Position 9,1 mit 92 %
  der Impressionen auf Seite 1, der AGE-Cluster bei 22,0 mit 21 %.
- Der Unterschied liegt im Cluster selbst: **9 von 9 NMN-Artikeln** haben FAQPage-Schema und
  wurden 2026 aktualisiert. Im AGE-Cluster sind es **3 von 12**.
- Beleg, dass das Rezept wirkt: Die zwei im August gebauten AGE-Artikel ranken nach einer Woche
  auf Position 1,0 bei „welcher epigenetische alterstest ist der zuverlässigste" und 4,0 bei
  „welcher altersdiagnostik-test hat die stärkste wissenschaftliche begründung".

Vollständige Analyse: `docs/age-dna-geo/chatgpt-status-analyse_2026-08-11.md`.

### Zielzustand je Artikel

Das Muster steht in den NMN-Artikeln, zum Beispiel
`templates/article.nmn-vs-nr.json` und `templates/article.was-ist-resveratrol.json`.
Fertig ist ein Artikel, wenn er hat:

1. **FAQPage-Schema** über eine `crs-faq-accordion`-Section im Template, 5 bis 6 Fragen.
2. **Aktuelle Faktenlage**, geprüft gegen `docs/age-dna-product-fact-sheet.md`.
3. **Primärquellen** mit Jahr und Link, sichtbar im Text.
4. **Byline** Benedikt Junker, fachlich geprüft Prof. Dr. med. Volker Limmroth, plus
   `custom.reviewed_date` auf das Bearbeitungsdatum.
5. **Takeaways** in `custom.takeaways` als umsetzbare Konsequenz, keine TL;DR-Paraphrase.
6. **Interne Links** auf Hub, PDP und ein bis zwei Nachbarartikel, ohne Redirect-Hop.
7. **Gehobenes `dateModified`**, weil der Artikel tatsächlich überarbeitet wurde.

### Die neun Artikel, in dieser Reihenfolge

Reihenfolge nach tatsächlich vorhandener Suchfläche, gemessen über 90 Tage. Alle neun werden
bearbeitet, die Reihenfolge bestimmt nur, wo die Sorgfalt zuerst hingeht.

| # | Handle | templateSuffix | Impr / 90 T | gew. Pos | warum diese Position |
|---:|---|---|---:|---:|---|
| 1 | `was-dein-biologisches-alter-uber-dich-verrat` | `biologisches-alter-verraet` | **137** | 59,6 | Größte vorhandene Fläche, 25 Queries. Rankt auf „biologisches alter" (56 Impr) und steht bei „kalendarisches alter" schon auf 8,5 |
| 2 | `wie-deine-gene-dein-wahres-alter-bestimmen` | `gene-biologisches-alter` | **115** | 74,2 | Zweitgrößte Fläche, 13 Queries, aber sehr tiefe Position. Viel Luft nach oben |
| 3 | `epigenetik-erklaerung-einfluesse` | `epigenetik-erklaerung` | 35 | 30,8 | Prioritätsset #13, 19 Queries rund um „epigenetik", beste Position der drei mit Fläche |
| 4 | `biomarker-als-schlussel-zur-langlebigkeit-was-dein-blut-und-speichel-uber-dein-biologisches-alter-verraten` | `biomarker-langlebigkeit` | 5 | 43,6 | Handle-Kürzung mitnehmen |
| 5 | `kann-ihr-lebensstil-ihr-biologisches-alter-zuruckdrehen` | `lebensstil-biologisches-alter` | 1 | 9,0 | Claim- und Sie-Form-Problem, Titel und Handle ändern |
| 6 | `biologisches-alter-messen-optimieren` | `biologisches-alter-messen` | **0** | - | Prioritätsset #12, rankt aktuell auf nichts. Thema ist stark, die Umsetzung offensichtlich nicht |
| 7 | `dna-tests-ein-tiefer-einblick-in-ihre-genetik` | `dna-tests-einblick` | **0** | - | Prioritätsset #14, DNA-Test-Grundlagen |
| 8 | `epigenetische-uhren-konnen-wir-das-altern-umkehren` | `epigenetische-uhren` | **0** | - | Grenzt an den Genauigkeitsartikel, Abgrenzung sauber halten |
| 9 | `die-biologie-des-alterns` | `biologie-des-alterns` | **0** | - | Grundlagen, geringste Dringlichkeit |

Die vier Nullen sind keine Nebensache: Vier von neun Artikeln erzeugen seit 90 Tagen **keine
einzige Impression**. Bei denen ist die Frage nicht „wie hebe ich die Position", sondern ob
Thema und Titel überhaupt eine echte Nutzerfrage treffen. Titel und H1 dort neu denken, nicht
nur den Body auffrischen.

### Handles dürfen geändert werden, BJ-Entscheid vom 11.08.2026

Die übliche Sorge „Handle-Wechsel kostet Position" wurde gegen die Search Console geprüft und
trägt hier nicht. Über 90 Tage: `lebensstil-biologisches-alter` hat **1 Impression** aus einer
einzigen Query, `biomarker-langlebigkeit` hat **5 Impressionen** und in den letzten 14 Tagen
keine. Beide Artikel haben null Klicks. Es ist nichts zu verlieren.

Damit sind freigegeben:

- **Nr. 8** „Kann Ihr Lebensstil Ihr biologisches Alter zurückdrehen?": Titel und H1 auf Du-Form
  umstellen und „zurückdrehen" ersetzen, das liegt zu nah an der roten Claim-Kategorie
  „kehrt Alterung um". Handle mitziehen, 301 setzen.
- **Nr. 7**: Handle von 104 Zeichen auf eine lesbare Länge kürzen, 301 setzen.

Bei jedem Handle-Wechsel den 301 live prüfen, bevor der nächste Artikel drankommt.

### Tempo: alle neun, nicht gestaffelt

BJ-Entscheid vom 11.08.2026. Der Ausgangsstand rechtfertigt das: Alle neun Artikel zusammen
bringen über 90 Tage **293 Impressionen und null Klicks**, vier davon ranken auf gar nichts.
Es gibt keinen Bestand, den eine Staffelung schützen würde.

Der Ausgangsstand ist bereits gesichert in
`docs/age-dna-geo/gsc-baseline-age-altbestand_2026-08-11.md`, mit Impressionen, Klicks,
gewichteter Position und den Zielqueries je Artikel. Dieselbe Abfrage 30 Tage nach dem Upgrade
wiederholen. Erfolgskriterium ist die gewichtete Position und die Zahl der Queries je Artikel,
nicht der Klick. Klicks folgen erst unterhalb von Position 10.

## Arbeitsablauf je Artikel

1. **Live lesen.** `curl` auf `https://www.lifetime-health.de/blogs/longevity-blog/<handle>`.
   Live ist die Wahrheit, nicht die MD-Beschreibung.
2. **Fakten prüfen** gegen `docs/age-dna-product-fact-sheet.md`. Jede Produktzahl im Text muss
   dort gedeckt sein. Erwartete Funde in Texten von 2023/2024: veraltete Reportzahlen,
   „6 bis 8 Wochen" statt sechs Wochen, überzogene Datenschutzaussagen.
3. **Claims prüfen** gegen die Claim-Ampel in `docs/age-dna-geo/age-dna-geo-playbook.md` §4.
   Rote Formulierungen ersetzen, nicht abschwächen.
4. **Body überarbeiten**, lokale Arbeitsfassung als
   `docs/age-dna-geo/artikel-<kurzname>-body.html` ablegen. Struktur nach Playbook §5:
   direkte Antwort oben, eine H2 gleich eine echte Nutzerfrage, erster Satz ist die Antwort.
5. **Body nach Shopify** per `articleUpdate`, Metafelder mitschreiben.
6. **Template anlegen oder ergänzen**: `crs-faq-accordion` als Section `faq` zwischen `main` und
   dem Rest, `order` ergänzen. Muster: `templates/article.alterstest-vergleich.json`.
7. **Pushen** mit `shopify theme push --store lifetime-health-de.myshopify.com --theme 192529400183 --allow-live --only templates/<datei>.json`.
8. **Live verifizieren**: HTTP 200, FAQPage parsebar, Fragenzahl korrekt, `dateModified` neu.

## Harte Grenzen

Aus `docs/age-dna-product-fact-sheet.md` § Weiterhin gesperrt. Diese Angaben dürfen **nicht**
in die Texte, auch nicht wenn sie in der alten Fassung stehen:

- jede exakte Gesamtzahl an DNA-Reports, insbesondere „187". Zulässig sind „23 Kategorien" und
  „über 150 Einzelergebnisse"
- eine eigene CpG-Zahl oder Plattformangabe, „hochaufgelöste DNA-Sequenzierung", „CpG-Gene"
- Name des Uhr-Anbieters und des Coach-Systems, beides White-Label
- Validierungszahlen und Genauigkeitsangaben zur eigenen Uhr
- ISO 9001, ISO 13485, GLP, „medizinischer Standard", „Deutsches Labor"
- „nur du hast Zugriff", „anonymisiert analysiert", „jederzeit vollständig löschbar"
- Diagnose-, Krankheits- oder Lebenserwartungsaussagen

Zulässig und erwünscht: Speichelprobe zu Hause, Speichel-Methylierungsuhr, Orientierung an der
Horvath-Methode mit deutlich weniger Messstellen als dessen 353 Positionen, Eurofins Genomics
nach ISO 17025 als beiläufige Angabe, sechs Wochen ab Laboreingang, 23 Kategorien, sechs
epigenetische Bereiche, Standortbestimmung statt Diagnose.

## Dedup-Regel für die FAQ

Der Cluster hat bereits **31 FAQ-Fragen**. Neue Fragen dürfen keine davon wiederholen. Der Hub
besitzt die generischen Einstiegsfragen, die Artikel besitzen die vertiefenden Folgefragen.

Prüfe jede neue Frage gegen die Liste unten. Als Schwelle hat sich eine
`difflib.SequenceMatcher`-Ähnlichkeit von 0,72 bewährt. Darüber ist es ein Duplikat.

<details>
<summary>Die 31 bestehenden Fragen</summary>

**Hub `/pages/biologisches-alter-testen`**
- Biologisches Alter testen: Welcher Test passt zu dir?
- Was ist das biologische Alter und wie unterscheidet es sich vom chronologischen Alter?
- Mit welchen Methoden lässt sich das biologische Alter messen?
- Wie funktioniert ein epigenetischer Alterstest?
- Was ist der Unterschied zwischen einem genetischen und einem epigenetischen Test?
- Welche Informationen kann eine Speichelprobe liefern?
- Was sollte ein guter Ergebnisbericht erklären?
- Wie zuverlässig sind Tests zum biologischen Alter?
- Worauf sollte ich beim Datenschutz eines DNA-Tests achten?
- Wie häufig ist ein erneuter Test sinnvoll?
- Können Lebensstiländerungen das biologische Alter beeinflussen?
- Wie läuft ein Test zum biologischen Alter für zuhause ab?
- Ist ein Test zum biologischen Alter eine medizinische Diagnose und für wen ist er geeignet?

**Artikel Genauigkeit**
- Warum liefern zwei Anbieter unterschiedliche biologische Alter?
- Was bedeutet Test-Retest-Reliabilität bei epigenetischen Uhren?
- Was unterscheidet die Uhren von Horvath, PhenoAge und DunedinPACE?
- Ist eine Uhr mit mehr Messstellen genauer?
- Misst die Telomerlänge dasselbe wie eine epigenetische Uhr?
- Was sagt es aus, wenn mein biologisches Alter unter meinem Kalenderalter liegt?

**Artikel Genotyping**
- Kann ich aus einem Gentest mein biologisches Alter ablesen?
- Verändert sich mein Genotyp im Lauf des Lebens?
- Warum liefert eine Speichelprobe keine Blutwerte?
- Gilt ein epigenetisches Ergebnis aus Speichel auch für andere Gewebe?
- Was bedeutet es, wenn ein Gentest ein erhöhtes Risiko anzeigt?
- Brauche ich beide Analysen oder reicht eine?

**Artikel Vergleich**
- Welcher epigenetische Alterstest ist der beste?
- Was kostet ein epigenetischer Alterstest in Deutschland?
- Gibt es einen Test, der genetische Analyse und biologisches Alter kombiniert?
- Warum kostet LIFETIME mehr als epiAge?
- Welcher Alterstest liefert am schnellsten ein Ergebnis?
- Warum fehlt cerascreen in der Vergleichstabelle?

</details>

## Tonalität

Nach `docs/conversion-messaging.md`: Deutsch, Du-Form, ruhig, sachlich. Keine Em-Dashes, keine
Dreiklang-Slogans, keine farbigen Accent-Borders. Antwort zuerst, Begründung danach. Zahlen mit
Einheit und Jahr. Wenn etwas unsicher ist, wird die Unsicherheit benannt, nicht weggelassen.
Die Texte von 2023/2024 sind teils in der Sie-Form geschrieben, die wird auf Du umgestellt.

## Definition of Done je Artikel

- [ ] HTTP 200, FAQPage-JSON-LD parsebar, Fragenzahl stimmt
- [ ] Keine gesperrte Formulierung mehr im Live-HTML, per `grep` geprüft
- [ ] `dateModified` trägt das Bearbeitungsdatum
- [ ] Byline und `custom.reviewed_date` gesetzt
- [ ] Interne Links geprüft, alle HTTP 200 ohne Redirect
- [ ] Keine neue FAQ-Frage über Ähnlichkeit 0,72 zu einer der 31 bestehenden
- [ ] Arbeitsfassung des Bodys liegt in `docs/age-dna-geo/`
- [ ] Ein Commit je Artikel, nicht ein Sammelcommit

## Was ausdrücklich nicht zu tun ist

- Keine Handles ändern ohne BJ-Freigabe, das kostet bestehende Positionen.
- Keine neuen Sections bauen. `crs-faq-accordion`, `crs-link-cards` und `lt-article` reichen.
- Keine Wettbewerbernamen in diese neun Artikel. Der Anbietervergleich hat seine eigene Seite,
  eine zweite Stelle wäre doppelte Pflege und doppeltes Rechtsrisiko.
- Keine Genauigkeits- oder Wirkversprechen, auch nicht in abgeschwächter Form.
- **Den Kopfbegriff „biologisches alter test" nicht anvisieren.** Diese Query bringt 192
  Impressionen und landet heute auf der PDP (Position 12,9) und dem Quiz (13,9), also auf den
  Seiten, die konvertieren. Die Blogartikel bedienen die informationalen Langformen
  („wie funktioniert", „was bedeutet", „woran erkenne ich"), nicht den kommerziellen Kopf.
  Sonst nehmen wir uns selbst die Position weg.

## Nebenbefund zum Mitnehmen

Im Blog liegt ein Artikel `testblog` (`gid://shopify/Article/1024411566455`, templateSuffix
„Standard-Blog-Beitrag"). Er ist unveröffentlicht, `publishedAt` ist null, also aktuell
unkritisch. Er sollte trotzdem gelöscht werden, der GEO-Action-Plan führt Index-Hygiene als
offene Lücke.
