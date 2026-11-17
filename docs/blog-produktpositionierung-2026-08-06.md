---
status: snapshot
last_review: 2026-08-06
canonical_for: blog-produkt-cta-mapping
depends_on:
  - docs/age-dna-product-fact-sheet.md
---

# Blog-Produktpositionierung, Rollout 2026-08-06

## Ausgangsbefund (Audit über alle 23 Artikel)

| Gruppe | Artikel | Produktlinks im Fließtext | CTA vorher |
|---|---|---|---|
| NMN | 8 | 2 bis 3 je Artikel | eigenes Template → NMN-PDP (seit 05.08.) |
| AGE, neu | 2 | 1 bis 2 je Artikel | generisch → `/pages/quiz-age` |
| Alt-Bestand | 13 | **null** | generisch → `/pages/quiz-age` |

57 Prozent der Artikel hatten keinerlei Produktbezug: kein Link, keine LIFETIME-Nennung im
Fließtext, nur die generische Quiz-CTA aus `templates/article.json`. Ursache ist plausibel der
Compliance-Sweep im Juli, bei dem mit den Claims auch der Produktbezug entfernt und nie wieder
eingesetzt wurde.

## Umgesetzt

Zwölf Artikel haben ein eigenes Template mit artikelspezifischer, begründeter CTA auf
`/products/lifetime-age-dna` bekommen. Kein Body-Eingriff, die CTA-Box wird von `lt-article`
an der über `cta_after_section` gesteuerten Position in den Text eingesetzt.

| Artikel-Handle | Template-Suffix | Pos. | CTA-Heading |
|---|---|---|---|
| `biomarker-als-schlussel-zur-langlebigkeit-…` | `biomarker-langlebigkeit` | 3 | Zwei Ebenen aus einer Speichelprobe |
| `kann-ihr-lebensstil-ihr-biologisches-alter-zuruckdrehen` | `lebensstil-biologisches-alter` | 4 | Erst messen, dann verändern |
| `epigenetische-uhren-konnen-wir-das-altern-umkehren` | `epigenetische-uhren` | 3 | Nicht eine Zahl, sondern mehrere Bereiche |
| `was-dein-biologisches-alter-uber-dich-verrat` | `biologisches-alter-verraet` | 2 | Dein Wert, im Labor bestimmt |
| `wie-deine-gene-dein-wahres-alter-bestimmen` | `gene-biologisches-alter` | 2 | Anlage und Verlauf, nicht nur eines |
| `epigenetik-erklaerung-einfluesse` | `epigenetik-erklaerung` | 4 | Von der Theorie zum eigenen Wert |
| `biologisches-alter-messen-optimieren` | `biologisches-alter-messen` | 3 | Methylierung statt Telomerlänge |
| `die-biologie-des-alterns` | `biologie-des-alterns` | 4 | Wo du gerade stehst |
| `woran-sterben-wir-volkskrankheiten-besiegen` | `woran-wir-sterben` | 5 | Eine Standortbestimmung, keine Diagnose |
| `dna-tests-ein-tiefer-einblick-in-ihre-genetik` | `dna-tests-einblick` | 3 | Genetische Anlagen plus die epigenetische Ebene |
| `wie-genau-ist-ein-epigenetischer-alterstest` | `genauigkeit-alterstest` | 4 | Mehrere Bereiche statt einer Zahl |
| `genetischer-epigenetischer-test-unterschied` | `genotyping-epigenetik` | 4 | Beide Ebenen, eine Probe |

Jede CTA trägt einen anderen Vorteil, passend zum Artikelthema. Bewusst kein einheitlicher
Textbaustein, damit die Empfehlung aus dem jeweiligen Inhalt folgt.

**Alle zwölf Templates sind Vollkopien von `templates/article.json`**, geändert wurden nur die
sechs `cta_*`-Felder. Damit bleiben `grundlagen` (crs-link-cards) und `related`
(lt-article-related) erhalten und es entstehen keine geerbten Schema-Defaults.

**Reihenfolge beim Rollout:** erst Templates pushen, dann `templateSuffix` setzen. Andersherum
rendert der Artikel zwischenzeitlich ohne Template. Shopify fällt bei fehlendem Suffix-Template
auf `article.json` zurück, es gibt keinen 404.

## Kollision mit dem Portal-Audit vom selben Tag

Während des Rollouts wurde das Fact-Sheet um den Helix-Portal-Audit erweitert, der 187 und 16
widerlegt. Zwei Templates trugen diese Zahlen bereits und wurden **vor** dem Aktivieren des
Suffix zahlenfrei umformuliert:

- `dna-tests-einblick`: „187 DNA-Reports" → „Genetische Anlagen plus die epigenetische Ebene",
  „in 16 Kategorien" → „über viele Themenkategorien hinweg"
- `genotyping-epigenetik`: „187 genetische Reports in 16 Kategorien" → „die genetische Ebene"

Ebenfalls korrigiert wurde der Body des Genauigkeitsartikels: Das Körperalter heißt laut Portal
**Höralter, Augenalter und Gedächtnisalter** (nicht Gehirn-, Gehör-, Augenalter), und das
biologische Alter ist ein **Wert innerhalb von MethylPace**, kein eigenständiger Bereich.

**Keine der zwölf CTAs nennt eine Report- oder Kategorienzahl.** Sobald BJ zwischen
„23 Kategorien" und „über 150 Einzelergebnisse" entschieden hat, können die zwei oben genannten
CTAs eine Mengenaussage zurückbekommen.

## Bewusst nicht umgestellt

| Artikel | Grund |
|---|---|
| 8 NMN-Artikel | haben seit 05.08. eigene Templates mit CTA auf die NMN-PDP |
| `brain-health-…`, `schlaf-…` | thematisch zu weit weg, Quiz-CTA passt besser |
| `nervenentzuendung-im-schulterbereich` | 200 Wörter über neuralgische Amyotrophie, thematischer Fremdkörper im Longevity-Blog. **Löschung zur Prüfung vorgeschlagen**, nicht ausgeführt |

## Ehrlichkeitsgrenze bei NMN

Der Auftrag „Vorteile gegenüber Wettbewerbern" lässt sich bei NMN nicht weiter verstärken, ohne
gegen die eigene Wettbewerbsrecherche zu argumentieren: Uthever und der öffentliche Prüfbericht
sind Marktstandard, kein Alleinstellungsmerkmal, und beim Preis pro Gramm liegt LIFETIME auf
Platz 7 von 9. Belastbar ist dort allein die ärztliche Verantwortung durch Limmroth. Bei
AGE&DNA ist die Lage umgekehrt, „beide Ebenen aus einer Probe" ist per Anbietertabelle in
`artikel-a-genotyping-epigenetik.md` belegt.

## Offen

- ~~**Live-Bestand mit 187 und 16**~~ **Erledigt 06.08.2026:** alle Templates, die
  Section-Defaults, die Shopify-Produktbeschreibung und die Page-SEO-Metafelder sind auf
  „23 Kategorien" gezogen, 0 Resttreffer gegen den gerenderten Dev-Server geprüft.
- ~~**Artikel A** trägt in der Wettbewerbstabelle „187 in 16 Kategorien" und listet das
  biologische Alter noch als eigenen Bereich.~~ **Erledigt 06.08.2026:** Body korrigiert auf
  „23 Kategorien" und MethylPace, das biologische Alter jetzt als Wert darin beschrieben.
  Der Artikel ist unter `/blogs/longevity-blog/genotyping-epigenetik` noch nicht live (404),
  die Korrektur greift also vor Veröffentlichung.
- **Produktlinks im Fließtext** fehlen den zehn Alt-Artikeln weiterhin. Die CTA-Box ist gesetzt,
  ein Textlink im Fließtext wäre der nächste Ausbauschritt.
