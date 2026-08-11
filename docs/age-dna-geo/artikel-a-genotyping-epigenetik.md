---
status: living
last_review: 2026-08-04
canonical_for: genetischer-epigenetischer-test-unterschied
depends_on:
  - docs/age-dna-geo/BRIEFINGS-age-cluster-2026-08-03.md
  - docs/age-dna-geo/artikel-a-genotyping-epigenetik-recherche.md
---

# Artikel A: Genotyping und Epigenetik

> **LIVE seit 04.08.2026** unter
> `/blogs/longevity-blog/genetischer-epigenetischer-test-unterschied` (HTTP 200, verifiziert).
> Artikel-ID `gid://shopify/Article/1024676233591`, `publishedAt` 2026-08-04T11:00:43Z.
>
> Live gegengeprüft am 04.08.2026: Meta-Zeile „Stand: August 2026 · Von Benedikt Junker ·
> Fachlich geprüft von Prof. Dr. med. Volker Limmroth · 12 Min. Lesezeit" · Takeaways rendern als
> „Das Wichtigste in Kürze" · alle 13 H2/H3 vorhanden · Cover plus beide SVGs laden mit HTTP 200 ·
> alle fünf internen Links vorhanden · die drei Wettbewerber-Links tragen `rel="nofollow noopener"` ·
> Artikel erscheint auf dem Blog-Index.
>
> **Body-Abgleich bestanden:** 226 von 226 Sätzen aus
> `artikel-a-genotyping-epigenetik-body.html` sind live wiedergefunden, kein Textverlust durch
> Shopify-Normalisierung.
>
> **Rückverlinkung erledigt am 04.08.2026, live verifiziert:**
> Der AGE-Hub `/pages/biologisches-alter-testen` hat eine neue `lt-blog-cards`-Section „Die
> Methodenfragen im Detail" zwischen FAQ und CTA, mit drei Karten (dieser Artikel, die
> Genauigkeitsseite, der Epigenetik-Erklärer). Die AGE&DNA-PDP verlinkt aus der FAQ-Antwort
> `faq_6` („Unterschied genetisches Profil und biologisches Alter"). Gepusht wurde ausschließlich
> `templates/page.biologisches-alter-testen.json` und `templates/product.age-dna-test.json`
> per `--only`, `config/settings_data.json` blieb unangetastet.

## Anzulegende Felder

| Feld | Wert |
|---|---|
| **Handle** | `genetischer-epigenetischer-test-unterschied` |
| **Artikel-Titel (H1)** | Genetischer und epigenetischer Test: Was dein DNA-Test wirklich misst |
| **Title-Tag (SERP)** | Genetischer vs. epigenetischer Test: der Unterschied |
| **Meta-Description** | Genetische Tests lesen Varianten in deiner DNA, epigenetische lesen chemische Markierungen darauf. Was der Unterschied für dein Testergebnis bedeutet. |
| **Blog** | `longevity-blog` (`gid://shopify/Blog/84651049060`) |
| **Artikel-ID** | `gid://shopify/Article/1024676233591` |
| **Tag** | `Epigenetik & biologisches Alter` (5er-Taxonomie, ein Tag je Artikel) |
| **templateSuffix** | leer, rendert über `templates/article.json` |
| **Body** | `artikel-a-genotyping-epigenetik-body.html` |
| **Ziel-Query** | „unterschied genetischer epigenetischer test", „was misst ein dna test", „genotyping vs epigenetik", „was ist ein epigenetischer test" |
| **Panel-Fragen** | `AD-GEN-04` (primär), `AD-GEN-05`, Teile von `AD-GEN-03` |
| **Format** | Fließtext plus zwei Tabellen plus zwei Infografiken. Bewusst anders als der Befundbericht-Stil der NMN-Reihe. |

### Handle-Begründung

Der Handle trägt die Panel-Frage wörtlich („Unterschied zwischen einem genetischen und einem
epigenetischen Test") und kommt ohne Markenbegriff aus, weil die Frage nicht branded gestellt wird.
Der Artikeltitel ist bewusst länger als der Title-Tag: Als H1 trägt er zusätzlich die Nutzenfrage
(„was dein DNA-Test wirklich misst"), in der SERP wäre er abgeschnitten.

**Kein Redirect nötig**, der Artikel ist neu. Es gibt keinen Bestands-Handle, der kollidiert.

## Gesetzte Metafelder

| Metafeld | Typ | Wert |
|---|---|---|
| `global.title_tag` | single_line_text_field | Genetischer vs. epigenetischer Test: der Unterschied |
| `global.description_tag` | single_line_text_field | siehe Meta-Description oben |
| `custom.reviewed_date` | date | 2026-08-04 |
| `custom.takeaways` | multi_line_text_field | vier Zeilen |

`custom.author_name` und `custom.reviewer_name` sind bewusst **nicht** gesetzt.

## Byline

Aus den Section-Settings von `lt-article`, nicht aus Metafeldern:

- Autor: **Benedikt Junker**
- Fachlich geprüft von: **Prof. Dr. med. Volker Limmroth** (volle Form, mit Vornamen)
- `custom.author_name` und `custom.reviewer_name` **nicht setzen**, sie überschreiben das Template still.
- `custom.reviewed_date` auf `2026-08-04`.

## H2-Struktur

1. Die kurze Antwort *(direkte Antwort in 78 Wörtern)*
2. Was eine genetische Analyse liest
3. Was eine Methylierungsanalyse liest
4. Die beiden Ebenen im direkten Vergleich *(Tabelle)*
5. Warum wir beide Ebenen messen
   - H3 Die meisten Alterstests lesen nur eine der beiden Ebenen *(Wettbewerbstabelle)*
   - H3 Was du bei uns aus einer Probe bekommst
   - H3 Ein Report nützt nur so viel, wie du davon verstehst
6. Was eine Speichelprobe liefert und was nicht
7. Grenzen
   - H3 Was die genetische Ebene nicht kann
   - H3 Was die epigenetische Ebene nicht kann
8. Quellen

1.805 Wörter ohne Quellenliste. 17 verlinkte Primärquellen.

## Bilder

| Position | Datei | Alt-Text |
|---|---|---|
| Aufmacher | `svg-src/dna-zwei-leseweisen.svg` | Schema: dieselbe DNA, zweimal gelesen. Oben die genetische Analyse mit Varianten an definierten Stellen, unten die epigenetische Analyse mit chemischen Markierungen auf der DNA. |
| Vor der Vergleichstabelle | `svg-src/genetik-epigenetik-vergleich.svg` | Vergleich der genetischen und der epigenetischen Ebene in vier Zeilen: was gemessen wird, ob es sich verändert, ob es für alle Gewebe gilt und wofür es taugt. |

Beide auf viewBox 620 gezeichnet, kleinste Schrift 15 px (2,42 Prozent der viewBox-Breite),
Palette aus den bestehenden AGE-SVGs (`#f7f4ee`, `#4a8c85`, `#a8cfc9`, `#26251e`, `#6b6b63`).
Keine Menschen, keine Wirkbilder, keine Vorher-Nachher-Logik.

**Hochgeladen am 04.08.2026** als `GenericFile` (SVGs sind in Shopify kein `MediaImage`):

- `gid://shopify/GenericFile/70266080919927` → `https://cdn.shopify.com/s/files/1/0621/2173/8340/files/dna-zwei-leseweisen.svg?v=1785826820`
- `gid://shopify/GenericFile/70266080952695` → `https://cdn.shopify.com/s/files/1/0621/2173/8340/files/genetik-epigenetik-vergleich.svg?v=1785826820`

Beide sind im Body als `<img>` mit Alt-Text und `width`/`height` gesetzt. **Ein Cover für Index-
und Tag-Karte fehlt noch** und muss separat aus der bestehenden Cover-Serie erzeugt werden;
**Cover (Index- und Tag-Karte, `article.image`):** `docs/cover-genetischer-epigenetischer-test.png`,
1200 x 800, erzeugt als Eintrag 9 in `docs/blog-cover-generator.py` (Layout `columns`, Kicker
„Grundlagen"). Live unter
`https://www.lifetime-health.de/cdn/shop/articles/cover-genetischer-epigenetischer-test.png?v=1785841244`.
Alt-Text gesetzt. Rein typografisch, keine Menschen, keine Wirkbilder.

## Interne Verlinkung

Im Artikel gesetzt, alle am 03.08.2026 mit HTTP 200 ohne Redirect geprüft:
`/products/lifetime-age-dna` · `/pages/was-ist-enthalten` · `/pages/science` · `/pages/quiz-age` ·
`/pages/biologisches-alter-testen`

**Rücklinks gesetzt am 04.08.2026:**

| Von | Wie |
|---|---|
| `/pages/biologisches-alter-testen` | neue Section `blog` (`lt-blog-cards`) zwischen `faq` und `cta`, Flächen-Rhythmus `#f7f7f4` vor dem dunklen CTA |
| `/products/lifetime-age-dna` | Satz plus Link am Ende der FAQ-Antwort `faq_6` |

Beide Richtungen live geprüft: Artikel → Hub und PDP, Hub und PDP → Artikel.

## Wiedervorlage

Die Wettbewerbstabelle (epiAge, Cerascreen, TruDiagnostic) ist ein Snapshot vom 04.08.2026.
Vor jedem Re-Publish und mindestens halbjährlich gegen die drei Anbieterseiten prüfen, Belegkette
in `artikel-a-genotyping-epigenetik-recherche.md` §3.
