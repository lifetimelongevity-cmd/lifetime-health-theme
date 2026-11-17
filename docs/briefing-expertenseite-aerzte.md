---
status: snapshot
last_review: 2026-07-27
canonical_for: briefing-expertenseite-aerzte
---

> **Erledigt und live am 27.07.2026.** `/pages/aerzte` liefert HTTP 200, Freigabe durch
> Prof. Limmroth liegt vor. Abweichungen vom Briefing stehen in §10, Livegang und
> Folgearbeiten in §11, das Design-Review und der Umbau auf zwei Sections in §12.
> Verifizierte Faktenlage und alles, was nicht auf die Seite darf:
> `docs/limmroth-faktenblatt.md`.

# Briefing: Expertenseite `/pages/aerzte` bauen

> Selbstständiges Briefing für eine neue Session. Alles Nötige steht hier, es muss
> nichts aus dem Vorgänger-Chat nachgeschlagen werden.
> Entstanden am 27.07.2026 als Punkt B aus dem Maßnahmenpaket „Limmroth vom Badge
> zum Inhalt". Die Punkte A, C und D sind bereits umgesetzt, siehe §5.

## 1. Was gebaut werden soll

Eine Seite unter `/pages/aerzte`, die **Prof. Dr. med. Volker Limmroth als auflösbare
Entität** etabliert: mit `Person`-Schema, `sameAs`-Verweisen auf externe Profile und
einer ehrlichen Beschreibung dessen, was er bei LIFETIME prüft und was nicht.

Das Template `templates/page.aerzte.json` **existiert bereits im Theme**. Die Shopify-Seite
mit dem Handle `aerzte` existiert **nicht** (`/pages/aerzte` gibt heute 404). Es braucht
also beides: Seite anlegen und Template zuweisen, plus Inhalt.

## 2. Warum, in einem Absatz

Limmroth kommt in **16 Theme-Sections** vor. Im gesamten Theme gibt es **kein einziges
`Person`-Schema** (verifiziert 27.07.2026 per grep über `sections/`, `snippets/`, `layout/`).
Er ist damit heute ein Textstring, der nirgendwohin auflöst. Die Wettbewerbserhebung vom
26.07. (`nmn-marktvergleich-verifiziert_2026-07-26.md` §7) hat ergeben: In keinem von zwölf
geprüften deutschen NMN-Anbietern gibt es eine benannte Ärztin oder einen benannten Arzt.
Das ist der **einzige Punkt, an dem LIFETIME allein steht**, während Uthever, öffentlicher
Prüfbericht und Novel-Food-Rahmung alle Marktstandard sind. Er wird aber wie ein
Qualifikations-Badge behandelt statt wie Inhalt.

Dazu die Sachlage bei KI-Sichtbarkeit: Die Auswertung zu KI-zitierten Gesundheitsquellen
(arXiv 2601.17109, 615 zitierte Quellen aus 100 Gesundheitsfragen) nennt vier Achsen, an
denen Autorität festgemacht wird: **Autor, Institution, Prüfprozess, Auffindbarkeit.**
LIFETIME bedient den Prüfprozess sichtbar, aber bisher weder maschinenlesbar noch
auffindbar. Diese Seite schließt beides.

## 3. Was die Seite enthalten muss

### 3.1 Inhalt

| Block | Inhalt |
|---|---|
| Kopf | Voller Name, Titel, Foto |
| Rolle | Chefarzt Neurologie · Chief Scientific Officer LIFETIME · Fachgebiet · Jahre in der Forschung |
| Was er prüft | Konkret und ehrlich: welche Inhalte durch seine fachliche Prüfung gehen |
| Was er nicht tut | Ebenso konkret: keine individuelle Beratung, keine Therapieempfehlung, keine Wirkaussage zu Produkten |
| Geprüfte Beiträge | Liste der Blog-Artikel mit seiner Byline, als Links |
| Kontakt / Redaktionsrichtlinie | Verweis auf Impressum und, falls vorhanden, redaktionelle Leitlinien |

Die Zeile **„Was er nicht tut"** ist kein Kleingedrucktes, sie ist der Grund, warum die
Seite glaubwürdig ist. Sie unterscheidet eine echte Reviewer-Rolle von einem gekauften
Arzt-Siegel.

### 3.2 Schema

`Person`-Knoten mit stabiler `@id`, damit `reviewedBy` aus den Artikeln darauf zeigen kann:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.lifetime-health.de/pages/aerzte#limmroth",
  "name": "Prof. Dr. med. Volker Limmroth",
  "jobTitle": "Chefarzt Neurologie, Chief Scientific Officer LIFETIME",
  "worksFor": { "@id": "https://www.lifetime-health.de/#organization" },
  "affiliation": { "@type": "MedicalOrganization", "name": "<Klinik einsetzen>" },
  "knowsAbout": ["Neurologie", "Longevity-Forschung", "NAD-Stoffwechsel"],
  "sameAs": ["<Klinikprofil>", "<PubMed-Autorenseite>", "<LinkedIn>"]
}
```

`sameAs` ist der eigentliche Hebel. Ohne externe Verweise bleibt die Person eine
Behauptung der eigenen Website. **Mindestens Klinikprofil und PubMed-Autorenseite
recherchieren und verifizieren, keine geratenen URLs.**

Die `Organization`-`@id` `https://www.lifetime-health.de/#organization` existiert bereits
und wird in `snippets/microdata-schema.liquid` ausgegeben. Auf diese `@id` verweisen,
keine zweite Organization anlegen.

## 4. Zu klären, bevor gebaut wird

1. **Klinik und Fachgebiet exakt.** Auf der Live-Site steht heute nur „Chefarzt Neurologie".
   `sections/nmn-pdp-v2-media-trust.liquid` nennt zusätzlich „Berlin". Vor Veröffentlichung
   mit ihm abgleichen, eine falsche Klinikangabe auf einer Autoritätsseite ist schlimmer
   als gar keine.
2. **„20+ Jahre Forschung"** steht heute im PDP-Hero. Belegbar? Sonst weglassen.
3. **Freigabe des Wortlauts durch ihn.** Die Seite beschreibt seine Rolle, das braucht
   seine Zustimmung. Das ist der einzige echte Blocker.
4. **Weitere Personen?** Der Handle heißt `aerzte`, Plural. Wenn nur eine Person darauf
   steht, entweder Handle beibehalten und die Seite als „Ärztliche Leitung" führen, oder
   von Anfang an auf mehrere Personen auslegen. Nicht künstlich auffüllen.

## 5. Was bereits umgesetzt ist und automatisch anspringt

Am 27.07.2026 umgesetzt, hängt am Anlegen dieser Seite:

- **A — `reviewedBy` im Article-Schema.** `snippets/microdata-schema.liquid` liefert für
  Artikelseiten einen Begleitknoten mit derselben `@id` wie `article | structured_data`
  (gleiches Muster wie der bestehende `aggregateRating`-Knoten für Produkte). Er enthält
  `reviewedBy` als `Person`. **Das Feld `url` wird nur ausgegeben, wenn `pages['aerzte']`
  existiert**, damit das Schema nicht auf einen 404 zeigt.
- **C — Byline-Links.** `sections/lt-article.liquid` verlinkt Autor und Reviewer auf
  `pages['aerzte']`, ebenfalls nur wenn die Seite existiert. Sonst bleibt reiner Text.

**Es gibt also nichts umzuschalten.** In dem Moment, in dem die Seite mit dem Handle
`aerzte` angelegt und veröffentlicht ist, werden aus 40 toten Namen in 20 Artikeln
40 interne Links, und `reviewedBy` bekommt seine `url`. Danach nur verifizieren.

Ebenfalls am 27.07. umgesetzt (D): Auf der NMN-PDP steht Limmroth jetzt als erster Block
in `crs-expert-quotes` (`templates/product.nmn-pulver.json`), vor den externen Forschenden,
mit einer Rollenbeschreibung in LIFETIME-Stimme. Sobald ein von ihm freigegebenes Zitat
vorliegt, ersetzt es diesen Text. Siehe §7.

## 6. Leitplanken

- **Compliance.** Keine gesundheitsbezogene Aussage, kein Wirkversprechen, kein
  Krankheitsbezug. Er ordnet Methode und Evidenzlage ein, nicht Nutzen.
  Governance: `docs/conversion-messaging.md`.
- **Keine erfundenen Credentials.** Alles auf der Seite muss belegbar sein. Wenn eine
  Angabe nicht verifiziert ist, kommt sie nicht auf die Seite. Das gilt besonders für
  Titel, Klinik, Publikationen und Jahreszahlen.
- **Kein erfundenes Zitat.** Es darf keine Aussage in wörtlicher Rede stehen, die er
  nicht freigegeben hat. Rollenbeschreibung in LIFETIME-Stimme ist zulässig, wörtliche
  Rede nur mit seiner Freigabe.
- **Design.** `.cursor/rules/design-components.mdc` und `design-tokens.mdc`. Keine
  hartkodierten Hex-Werte oder px, keine farbigen Left-Borders, keine neuen
  Layout-Muster. Nächstes approved Muster vor dem Bauen ansehen.
- **Keine KI-Tells.** Keine Em-Dashes, keine Dreiklang-Slogans.
  Detail: `lifetime-health-theme/CLAUDE.md` §„Keine KI-Tells".

## 7. Angrenzender Fund, gehört nicht zur Seite, aber zur Entscheidung

Die Section `crs-expert-quotes` auf der NMN-PDP zeigt neben Limmroth **Fotos und Namen von
Prof. David Sinclair, Prof. Andrew Huberman und Dr. Rhonda Patrick**, mit dem Hinweis, dass
damit keine Aussage zum Produkt verbunden ist. Keine der drei Personen hat LIFETIME
irgendetwas zugesagt.

Zwei Gründe, das zu überdenken:

1. **Rechtlich.** Fotos realer Personen auf einer kommerziellen Produktseite ohne deren
   Einwilligung berühren das Recht am eigenen Bild, und die Nähe zum Produkt kann als
   Rufausnutzung nach § 6 UWG gelesen werden. Der Disclaimer schwächt das ab, er räumt
   es nicht aus. **Kein Rechtsrat, anwaltlich klären.**
2. **Strategisch.** Geliehene Autorität schwächt die eigene. Die ganze Positionierung
   beruht darauf, dass LIFETIME einen echten benannten Arzt hat, während zwölf
   Wettbewerber keinen haben. Drei berühmte Namen, die nichts zum Produkt sagen,
   verwässern genau das.

Empfehlung: Fotos der drei externen Personen entfernen und den Abschnitt auf Limmroth plus
neutral referenzierte Forschung reduzieren. **Entscheidung BJ, nicht eigenmächtig ausführen.**

## 8. Verifikation nach dem Bau

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://www.lifetime-health.de/pages/aerzte
```

Danach an einem beliebigen Blog-Artikel prüfen:

- Byline-Namen sind verlinkt und das Ziel liefert HTTP 200
- im JSON-LD steht ein Knoten mit `reviewedBy` und darin `url` auf `/pages/aerzte`
- die `@id` des Begleitknotens ist identisch mit der `@id` des `Article`-Knotens
  (Form: `/blogs/<blog>/<article>#article`), sonst mergen die beiden Knoten nicht
- Rich-Results-Test über die Artikel-URL, `Article` muss weiterhin valide sein

## 9. Referenzen

- Wettbewerbslage und der Limmroth-Befund: `nmn-marktvergleich-verifiziert_2026-07-26.md` §7
- Autoritätsachsen und Block D: `nmn-ai-visibility-actionplan_2026-07-23.md` §4 Block D
  (der dort genannte Blocker „keine benannte Reviewer-Person" ist überholt, die Byline
  steht seit Anfang Juli)
- Byline-Konvention: Memory `blog-byline`, plus `docs/nmn-blog-geo/redaktionsplan.md` Schritt 6
- Bestehendes Begleitknoten-Muster: `snippets/microdata-schema.liquid`, `aggregateRating`

## 10. Umsetzung 27.07.2026, Abweichungen vom Briefing

Fünf Annahmen dieses Briefings haben sich beim Bauen als falsch oder unvollständig
herausgestellt. Der Text oben bleibt unverändert stehen, damit nachvollziehbar ist, was
angenommen wurde.

1. **`templates/page.aerzte.json` war belegt.** Dort liegt das B2B-Ärzte-Quiz
   (`lt-doctor-quiz`), zugewiesen an die publizierte Seite `/pages/fueraerzte`.
   Überschreiben hätte diese Seite gekippt. Die Expertenseite läuft deshalb auf
   `templates/page.aerztliche-leitung.json`, der Handle bleibt wie geplant `aerzte`.

2. **„40 tote Namen in 20 Artikeln" waren 14 in 7.** Nur die sieben NMN-Artikel setzen
   Autor und Reviewer über ihre Template-Settings, die dreizehn Altartikel laufen auf
   `templates/article.json` und zeigen gar keine Byline. Der `reviewedBy`-Knoten feuerte
   dort trotzdem, über den Default im Snippet. Damit behauptete das Schema auf dreizehn
   Seiten eine Prüfung, die die Seite selbst nicht zeigt. **Nicht angefasst**, das ist
   eine Entscheidung über die Altartikel, nicht über diese Seite. Siehe offene Punkte.

3. **`reviewedBy` zeigte nicht auf die Person, es lag nur daneben.** Ausgegeben wurde ein
   `Person`-Objekt mit `name` und (nach Anlegen der Seite) `url`, aber ohne `@id`. Ohne
   `@id` ist das eine namensgleiche Person mit einer URL-Eigenschaft, kein Verweis auf
   den Knoten der Expertenseite. `snippets/microdata-schema.liquid` gibt jetzt
   `@id` **und** `url` auf `/pages/aerzte#limmroth` aus, beides weiterhin nur, wenn die
   Seite existiert. Der Anker ist über `custom.reviewer_anchor` pro Artikel
   überschreibbar, Default `limmroth`.

4. **`knowsAbout` aus §3.2 wäre falsch gewesen.** Der Entwurf schlug
   `["Neurologie", "Longevity-Forschung", "NAD-Stoffwechsel"]` vor. Er hat **null**
   Publikationen zu Longevity, NAD⁺, NMN, Alternsbiologie, Seneszenz, Telomeren oder
   epigenetischen Uhren, bestätigt über PubMed, OpenAlex-Volltext und einen Scan seiner
   109 Publikationsorgane. Die letzten beiden Einträge wären mit einer einzigen
   PubMed-Abfrage widerlegbar gewesen. `knowsAbout` steht jetzt auf Neurologie, Multiple
   Sklerose, Kopfschmerz und Migräne, Schlaganfall. Details: Faktenblatt §5.

5. **„Berlin" in `nmn-pdp-v2-media-trust` ist nicht seine Klinik.** Berlin ist der Sitz
   der Diga Health GmbH. Er arbeitet in Köln-Merheim. Die Klinikangabe ist geklärt:
   Klinik für Neurologie Köln-Merheim, Kliniken der Stadt Köln gGmbH, seit Januar 2006
   (Deutsches Ärzteblatt 5/2006). Die Frage aus §4.1 ist damit beantwortet, §4.2 auch:
   „20+ Jahre" stimmt und ist zu niedrig, das Problem ist nicht die Zahl, sondern dass
   sie neben der NMN-Buybox nach 20 Jahren NMN-Forschung aussieht.

Zusätzlich umgesetzt, weil die Seite sonst nicht funktioniert:

- Auf den sieben Artikeln mit Byline sind jetzt die Metafelder `custom.author_name` und
  `custom.reviewer_name` gesetzt. Der Reviewer heißt überall **„Prof. Dr. med. Volker
  Limmroth"** statt „Prof. Dr. Limmroth". Grund: auf `/pages/ueber-lifetime` steht auch
  **Dr. med. Christina Limmroth**, eine andere reale Person am selben Klinikträger. Ohne
  Vornamen laufen beide in Entity-Systemen zusammen. Die sieben Artikel-Templates wurden
  auf denselben Wortlaut nachgezogen, damit Metafeld und Fallback nicht auseinanderlaufen.
- Die Liste der geprüften Beiträge zieht aus genau diesem Metafeld. Ein Artikel, der den
  Reviewer nur über Section-Settings setzt, erscheint dort nicht.

Zu §7 (Sinclair, Huberman, Patrick auf der NMN-PDP): unverändert, wie dort verlangt.

## 11. Freigabe und Livegang, 27.07.2026

BJ meldet „reviewed und approved" durch Prof. Limmroth. Damit ist §4.3 erledigt und
folgendes umgesetzt und live gegengeprüft:

1. **Seite veröffentlicht.** `/pages/aerzte` liefert HTTP 200. Die beiden wartenden
   Automatiken sind angesprungen: **42 Byline-Links aus 21 Artikeln**, und `reviewedBy`
   trägt jetzt `@id` und `url` auf `/pages/aerzte#limmroth`, identisch mit der `@id` des
   `Person`-Knotens der Seite. `/pages/fueraerzte` (Ärzte-Quiz) unverändert HTTP 200.

2. **Byline auf allen Artikeln, über Section-Settings.** Die 13 Altartikel bekommen sie
   aus `templates/article.json`, das jetzt `author_name` und `reviewer_name` setzt. Damit
   deckt sich der sichtbare Text wieder mit dem `reviewedBy`-Knoten, der vorher auch auf
   Artikeln ohne sichtbare Byline feuerte.

   **Korrektur gegenüber §10:** Der erste Ansatz lief über die Metafelder
   `custom.author_name` / `custom.reviewer_name`. Das verstößt gegen die Byline-Regel
   (Memory `blog-byline`), weil Metafelder die Template-Settings still überschreiben. Die
   Metafelder sind wieder entfernt. `lt-expert-articles` filtert deshalb nicht mehr über
   ein Metafeld, sondern listet den ganzen Blog; der Metafeld-Filter bleibt als optionale
   Einstellung für den Fall eines zweiten Prüfers.

3. **Falsche Zahlen korrigiert.** Neun Stellen in drei Dateien, Einzelaufstellung in
   `docs/limmroth-faktenblatt.md` §8.

4. **Footer-Link.** „Ärztliche Leitung" im `legal`-Menü, direkt nach „NMN in Deutschland".
   Nicht im `footer`- oder `footer-1`-Menü, weil der zugehörige Footer-Block
   `disabled: true` ist und live gar nicht rendert.

Was bewusst offen bleibt, steht in `docs/limmroth-faktenblatt.md` §9.

## 12. Design-Review und Umbau auf zwei Sections, 27.07.2026

BJ-Rückfrage: „ich glaube es reicht die erste Section". Nachgemessen war die Diagnose
richtig, die Ursache aber eine andere: nicht die Anzahl der Sections war das Problem,
sondern dass die **falsche** Section die Seite dominierte.

**Messung vor dem Umbau** (Textfläche in px², Desktop 1280):

| Fläche | Textfläche | davon fett |
|---|---|---|
| Beitragsliste | 821k | 448k |
| Profil (die Person) | 299k | **0** |
| Prüfumfang | 256k | 23k |

Der Name stand mit 36px/400 als leichteste Überschrift der Seite, während 21 Artikeltitel
mit 20px/700 liefen. Seitenhöhe 3918 px Desktop, 6650 px Mobil, die Beitragsliste allein
3,1 Mobil-Screens und beginnend erst 3,7 Screens unterhalb des Seitenanfangs.

**Umgesetzt:**

1. Prüfumfang aus der eigenen Section nach `lt-expert-profile` verschoben, als zwei
   schlichte Listen ohne Karten, ohne eigene h2. Begründung: es ist eine Beschreibung der
   Rolle, keine zweite Aussage. Zusätzlich hob die Karten-Variante die Zeile „keine Karten,
   die Seite ist ein Dokument, kein Raster" aus der Spec der Profil-Section auf.
2. Beitragsliste demoted: Titel von `--text-section`/bold auf `--text-body`/regular in der
   Body-Schrift, Überschrift ohne `headline_lg`, warme Fläche, Kicker und Untertitel raus.
   Headline auf „Geprüfte Beiträge" gekürzt.
3. Rollenzeile unter dem Namen von 66 auf 33 Zeichen: „Chefarzt Neurologie, Köln-Merheim".
   Sie war mobil drei Zeilen à 36px und damit flächiger als der Name selbst, und sie
   wiederholte den CSO-Titel, der schon im Steckbrief steht.

**Messung danach:** Profil 483k Textfläche gegen 454k Beitragsliste, fett nur noch 17k und
zwar im Profil, in der Liste null. Desktop 3139 px statt 3918, Mobil 5445 statt 6650.
Der Schwerpunkt liegt jetzt bei der Person.

**Warum nicht wirklich nur eine Section:** die Zeile „Was er nicht tut" wäre als Absatz im
Hero genau das Kleingedruckte geworden, das §3.1 ausschließt, und die 21 Beiträge sind der
einzige Beleg auf der Seite plus 21 interne Links in den Longevity-Cluster.
