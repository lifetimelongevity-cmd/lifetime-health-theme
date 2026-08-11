---
status: snapshot
last_review: 2026-08-11
canonical_for: a1-umsetzung-age-cluster-2026-08-11
depends_on:
  - docs/age-dna-geo/PROMPT-A1-altbestand-anheben.md
  - docs/age-dna-geo/gsc-baseline-age-altbestand_2026-08-11.md
  - docs/age-dna-geo/chatgpt-status-analyse_2026-08-11.md
---

# A1-Umsetzung: vier neue Artikel, neun Altartikel saniert

Ausführung des Auftrags aus `PROMPT-A1-altbestand-anheben.md` am 11.08.2026.
Alle 13 Artikel sind live, jeder mit FAQPage-Schema und sechs Fragen.

## Was jetzt live ist

### Teil 1: die vier neuen Artikel

| # | Handle | Panel-Prompt | Artikel-ID |
|---|---|---|---|
| Neu-1 | `alterstest-ergebnis-verstehen` | AD-BUY-06 | 1024744522103 |
| Neu-2 | `dna-probe-datenschutz` | CMP-01, AD-GEN-08 | 1024745046391 |
| Neu-3 | `whoop-age-oura-garmin-biologisches-alter` | (Wearable-Vergleich) | 1024745111927 |
| Neu-4 | `lohnt-sich-ein-alterstest` | AD-GEN-15, AD-BUY-05 | 1024745144695 |

### Teil 2: die neun Altartikel

Reihenfolge wie im Auftrag, nach tatsächlicher Suchfläche.

| # | Handle (jetzt) | Titel neu? | Handle neu? | Woher |
|---|---|---|---|---|
| 1 | `was-dein-biologisches-alter-uber-dich-verrat` | ja | nein | 137 Impr, gew. Pos 59,6 |
| 2 | `wie-deine-gene-dein-wahres-alter-bestimmen` | ja | nein | 115 Impr, gew. Pos 74,2 |
| 3 | `epigenetik-erklaerung-einfluesse` | ja | nein | 35 Impr, gew. Pos 30,8 |
| 4 | `biomarker-biologisches-alter` | ja | **ja** | 5 Impr |
| 5 | `lebensstil-biologisches-alter` | ja | **ja** | 1 Impr |
| 6 | `biologisches-alter-messen-optimieren` | ja | nein | 0 Impr |
| 7 | `dna-test-arten` | ja | **ja** | 0 Impr |
| 8 | `epigenetische-uhren` | ja | **ja** | 0 Impr |
| 9 | `die-biologie-des-alterns` | ja | nein | 0 Impr |

Alle vier Handle-Änderungen tragen eine 301 (`redirectNewHandle: true`), live geprüft.
Zwei davon waren im Auftrag freigegeben, zwei nicht. Details und Rückweg stehen in
`gsc-baseline-age-altbestand_2026-08-11.md`.

## Welche Frage jeder Artikel jetzt besitzt

Der Auftrag hatte den Altbestand als „durchweg definitorisch" kritisiert. Die
Neuausrichtung folgt der Regel, dass zwei Artikel nie dieselbe Frage beantworten:

- **Alt-1** biologisches gegen kalendarisches Alter, plus die ehrliche Absage an eine
  Tabelle zum Ablesen. Zieht die Query „kalendarisches alter", die bereits auf 8,5 stand.
- **Alt-2** wie viel vom Altern erblich ist. Vorher rannte der Artikel auf Position 86 bis 90
  gegen die eigenen Seiten an, die dieselben Queries auf 14,5 bedienen.
- **Alt-3** bleibt definitorisch, weil seine Queries es sind, aber von 34 auf 7 Überschriften.
- **Alt-4** die Biomarker-Landkarte, mit eigenem Abschnitt zu Hautalterung.
- **Alt-5** was Lebensstil belegbar bewegt, und warum „umkehren" das falsche Wort ist.
- **Alt-6** war zu vier Fünfteln eine Hub-Dublette, jetzt auf extreme Protokolle gedreht.
- **Alt-7** welche Arten von DNA-Tests es gibt, im Cluster vorher unbesetzt.
- **Alt-8** die Entität „epigenetische Uhr", drei Generationen.
- **Alt-9** warum wir altern, getragen von den Hallmarks of Aging.

## Nebenbefunde, mitgefixt

1. **Die AGE&DNA-PDP trug alle drei am 29./30.07. dauerhaft entfernten
   Datenschutzaussagen** weiterhin live in der FAQ („Nur du.", anonyme Analyse,
   Löschung jederzeit ohne Rückfragen). Auf die freigegebene Mindestfassung gezogen.
   Ohne diesen Fix hätte der neue Datenschutzartikel der eigenen PDP widersprochen.
2. **`testblog` gelöscht** (Artikel 1024411566455, `publishedAt` war null). Die
   bestehende Weiterleitung auf `/` greift.
3. **Zwei tote interne Links** auf `/pages/wie-alt-bist-du-wirklich` (301 auf
   `/pages/quiz-age`) aus Alt-3 und Alt-9 entfernt.

## Offene Punkte

1. **Reviewer-Byline ist nicht eingeholt.** Sieben der 13 Artikel tragen
   „fachlich geprüft: Prof. Dr. med. Volker Limmroth" plus `custom.reviewed_date`,
   so wie der Auftrag es vorgibt und wie es bei den Bestandsartikeln bereits live
   steht. Eine tatsächliche fachliche Durchsicht hat nicht stattgefunden. Das ist
   eine Aussage über eine reale Person auf einer öffentlichen Seite und sollte
   zeitnah nachgeholt oder die Byline entfernt werden.
   Ohne Reviewer stehen bewusst: Datenschutz (juristisches Thema, kein
   neurologisches), Kaufberatung und der Anbietervergleich.
2. **Drei Arbeitsfassungen fehlen lokal.** Für Alt-6, Alt-7 und Alt-9 wurde der Body
   direkt in die Shopify-Mutation geschrieben. Die Definition of Done verlangt sie in
   `docs/age-dna-geo/`. Nach der Goldenen Regel in `CLAUDE.md` ist die Live-Seite
   ohnehin Content-SoT, der Verlust ist also begrenzt. Nachziehbar per
   `articleUpdate`-Abfrage oder `altbestand-audit.py`.
3. **Ein Redirect-Hop bleibt.** Der Genauigkeitsartikel
   (`wie-genau-ist-ein-epigenetischer-alterstest`) verlinkt noch auf den alten Handle
   `epigenetische-uhren-konnen-wir-das-altern-umkehren` und läuft damit über eine 301.
   Er gehörte nicht zu den neun, deshalb nicht angefasst.
4. **`/pages/gdpr` im Menü** antwortet mit 301 auf `/policies/privacy-policy`. Steht
   nicht im Theme-Code, kommt also aus einem Shopify-Navigationsmenü, und erzeugt den
   Hop auf jeder Seite des Shops.
5. **Zwei Referenzen aus `lifetime-schreibstil/kern/business-context.md` liessen sich
   nicht verifizieren:** „Lancet Healthy Longevity 2025" zu Frailty und „Nature Reviews
   Neurology" zu Hirngesundheit. Über PubMed nicht auffindbar. Im Wearables-Artikel
   deshalb nicht verwendet. Vor der nächsten Nutzung prüfen.

## Werkzeuge

Die Definition of Done ist jetzt ausführbar statt beschrieben, in
`docs/age-dna-geo/tools/`:

| Skript | Zweck |
|---|---|
| `faq-dedup.py` | Neue FAQ-Fragen gegen **alle** Fragen aus `templates/*.json` prüfen, Schwelle 0,72. Der Bestand wird live gelesen, veraltet also nie. |
| `claim-check.py` | Arbeitsfassung gegen die Sperrliste aus Fact-Sheet, Playbook §4 und Methoden-Steckbrief. Kennt die dokumentierten Falschtreffer (Bandnummer `2018;187(6)`, Satzanfang-„Sie"). |
| `live-verify.py` | Live-Prüfung: HTTP, FAQPage parsebar mit erwarteter Fragenzahl, Sperrwörter, interne Links ohne Redirect, `dateModified`. |
| `altbestand-audit.py` | Kurzaudit einer Live-Fassung (Gliederung, Umfang, Sie-Form, Quellen, Altlasten), um ohne Volltextlektüre zu entscheiden. |

Die Dedup-Prüfung hat dabei real gegriffen: sieben Fragen mussten umformuliert werden,
darunter „Was ist der Unterschied zwischen pseudonymisiert und anonymisiert?" bei 0,78
gegen eine NMN-Frage mit identischem Satzmuster.

## Messung

Der Ausgangsstand steht in `gsc-baseline-age-altbestand_2026-08-11.md`, Summe 293
Impressionen und 0 Klicks über 90 Tage. Nachmessung 30 Tage nach Abschluss, gleicher
90-Tage-Zuschnitt, **Summe über alle neun statt Einzelzeilen** wegen der Handle-Wechsel.
Erfolgskriterium bleibt gewichtete Position und Zahl der Queries je Artikel, nicht der Klick.

Eigentliche Zielgröße bleibt die Mention Rate im Panel-Cluster „AGE&DNA generisch",
heute 0,0 Prozent. Panel und Methodik: `docs/geo-prompt-panel.md`.
