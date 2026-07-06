---
status: living
last_review: 2026-07-06
canonical_for: blog-template-design
supersedes: []
---

# Blog-Design Best Practices → Grundlage für das LIFETIME Blog-Roh-Template

Recherche-Stand 2026-07-06. Drei Quellenstränge: (1) Typografie/Lesbarkeit (Butterick, NN/g, Learn UI Design, WCAG, Medium/Substack/NYT-Messwerte), (2) Struktur/Navigation/Shopify (NN/g, Ahrefs, Backlinko, Baymard, Google Search Central, shopify.dev), (3) Live-Teardown von Health/Longevity-DTC-Blogs (Ritual, Tally Health, Levels, InsideTracker, Elysium, Healthline; Examine/AG1/Hims via Sekundärquellen).

Ziel: Roh-Template `article.json` + `blog.json`, das BJ zukünftig nur noch befüllt.

---

## 1. Typografie-Spec (Artikel-Body)

Konsens 2024–2026: Artikel-Body deutlich größer als UI-Text. 16px ist Accessibility-Untergrenze, nicht Ziel. Medium nutzt 21px, Substack ~20px, NYT ~18–20px.

| Element | Desktop | Mobile | Anmerkung |
|---|---|---|---|
| Body | **19–20px**, line-height **1.6** | 17–18px | größer als `--text-body` (16px), siehe §7 Token-Lücke |
| Textspalte | **max-width ~680px (42rem)** | volle Breite − Padding | = 60–75 Zeichen/Zeile (Medium: 680px) |
| H1 (Titel) | 40px | 30px | einmal pro Artikel, `--text-h1`-nah |
| H2 | 28px (`--text-h2`) | 24px | ~56–64px Abstand **oben**, 16–24px unten (Heading bindet nach unten) |
| H3 | 21px, semibold | 20px | differenziert über Gewicht, kaum über Größe |
| Captions | 15–16px, muted | gleich | Captions werden überdurchschnittlich gelesen (NN/g) |
| Textfarbe | `#1a1a1a`–`#292929` auf Weiß/Off-White | gleich | nie `#000` pur, nie heller als `#595959` |

Weitere Regeln:
- **Max. 3 sichtbare Heading-Ebenen** im Artikel (H1/H2/H3). H4+ nur bei echtem Bedarf. Nie Ebenen überspringen (SEO).
- **Absätze: 2–4 Sätze**, `margin-bottom: 1.25em`, kein Einzug.
- **Rhythmus-Break alle 300–500 Wörter**: Zwischenüberschrift, Bild, Liste oder Pull-Quote.
- **Links im Fließtext: unterstrichen + eine Farbe** (Brand-nah), Farbe nie für Nicht-Links. WCAG: Farbe allein reicht nicht.
- **Blockquotes**: Einzug + typografischer Shift (kursiv/größer). Keine farbigen Left-Borders (deckt sich mit unserer Never-Liste).
- **Font-Pairing**: max. 2 Familien. Serif-Body ist das "Editorial-Trust"-Signal (Medium/Substack/NYT, im DTC-Feld nur Ritual). Für LIFETIME gilt: keine neuen Font-Familien einführen → Lato-Body + Helvetica-Neue-Headings bleiben, Differenzierung über Größe/Maß/Weißraum.
- Kontrast: WCAG min. 4.5:1 Body; Ziel eher 12–15:1 (dunkles Grau auf Weiß/Off-White).

## 2. Inhaltsverzeichnis (TOC)

- **Wann**: ab ~1.200 Wörtern und 4+ H2-Sections. Kürzere Artikel: kein TOC.
- **Pattern** (NN/g + Teardown): Im DTC-Feld ist das schlichte **Inline-Jump-Link-Listing oben im Artikel** ("In diesem Artikel") der Standard (Healthline, InsideTracker, Elysium). Echte Sticky-Sidebar-TOC hat nur Levels (rechte Rail mit Scroll-Highlight). Empfehlung fürs Roh-Template:
  - **Mobile**: inline, einklappbar ("Inhaltsverzeichnis"), oben im Artikel, nicht sticky.
  - **Desktop ≥1024px**: optional sticky Sidebar links mit Current-Section-Highlight (ersetzt auch den Reading-Progress-Bar, für den es keine belastbare UX-Evidenz gibt).
- **Technik**: TOC in Liquid/JS aus `article.content`-H2s generieren (IDs injizieren), **kein Metafield, kein App**. Anchor-Ziele brauchen `scroll-margin-top` (Sticky-Header). TOC-Linktexte = exakt die Überschriften. Jump-Links können Google-SERP-Sitelinks erzeugen.

## 3. Artikellänge

- Wortzahl ist **kein Ranking-Faktor** (Google/Mueller, post-Helpful-Content). Padding ist negativ.
- Datenlage: Top-10-Schnitt ~1.450 Wörter (Backlinko); Traffic-Peak ~2.000 Wörter, Engagement fällt nach ~7 Min (~1.750 Wörter) (Ahrefs).
- **Zielkorridor: 1.200–2.000 Wörter** pro Informations-Artikel, ein Suchintent pro Artikel. Pillar-Guides dürfen 2.500+.

## 4. E-E-A-T (für Health-Content der größte Hebel)

Kanonisches Muster (Healthline, von allen kopiert): direkt unter dem H1:

> **Medizinisch geprüft von {Name, Credential}** · Geschrieben von {Autor} · Aktualisiert am {Datum}

- **Nie "Team"-Bylines.** Name + Credential, verlinkt auf Autoren-Bio-Seite (Foto, Qualifikation, LinkedIn/PubMed-Links).
- **Quellen-Section**: nummerierte Inline-Zitate `[1]…[n]` → ausklappbare Referenzliste (PubMed/DOI) am Ende. Machen Tally, InsideTracker, Healthline, Elysium alle. Dockt an unsere Science-Evidenzbasis an (`docs/nmn-pdp-evidence-base.md`).
- **Sichtbares Veröffentlicht-/Aktualisiert-Datum**, gespiegelt in `datePublished`/`dateModified` Structured Data (`BlogPosting` + `Person` + `BreadcrumbList` Schema).
- Compliance: E-E-A-T = Autoritätssignal, keine Heilversprechen. `docs/conversion-messaging.md` gilt unverändert; Reviewer-Credential + Prüfdatum ist bei unserer Novel-Food-Lage auch ein Defensibility-Asset.

## 5. Wiederkehrende Vorbild-Patterns (Teardown-Synthese)

Die 4 Patterns, die bei den besten Health-DTC-Blogs durchgängig auftauchen:

1. **Takeaways-Box direkt unter dem Titel** (Ritual "Essential Takeaways", Levels "Article Highlights", Elysium/InsideTracker "Key Takeaways"): 3–4 Bullets vor dem Intro. Meistkopierbares Pattern, geringster Aufwand.
2. **Credentialed Byline + Review-Label + Update-Datum** unter dem H1 (§4).
3. **Nummerierte Zitate + echte Referenzliste** (§4).
4. **Kontextueller Produkt-/Quiz-Einschub mitten im Artikel** statt nur End-CTA: Levels bindet App+Labs themenbezogen ein, Tally den TallyAge-Test nach dem Intro. Für LIFETIME ist das natürliche Pendant der **Quiz-CTA (`/pages/quiz-age`)** bzw. eine kompakte Produktkarte (Bild, Name, 1 Benefit-Zeile, Preis).

Sekundär: "Lesezeit" (Ritual/Levels/InsideTracker, in DE-Markt üblich), Healthlines Revision-History als Premium-Trust-Flourish, Examines Evidence-Grade-Badges als Ideengeber für spätere Ausbaustufe.

## 6. Blog-Index, Navigation, Conversion

**Index (`blog.json`)**
- Featured-Hero (neuester/strategischer Artikel groß) + Card-Grid darunter (Bild, Kategorie-Label, Headline, 1–2-Zeilen-Excerpt, Datum/Lesezeit).
- **Kategorien = Tags** (4–7 Stück, z. B. NMN/NAD⁺, Epigenetik, Longevity-Basics, Routinen, Studien) als horizontale Filterleiste; Filter-URLs via `link_to_tag`. **Ein Blog, keine Multi-Blog-Architektur.**
- **"Mehr laden"-Button** statt Infinite Scroll oder klassischer Pagination (Baymard); mit `history.pushState` für Back-Button. `{% paginate blog.articles by N %}`.

**Im Artikel**
- Breadcrumb `Home → Blog → Artikel` (mobil nur "← Blog"), mit Schema.
- Lesezeit: in Liquid `{{ article.content | strip_html | split: ' ' | size | divided_by: 180 }}` (DE ~180 wpm).
- Related Articles: 3er-Grid am Ende (gleicher Tag, Fallback gleicher Blog).

**Conversion (ohne UX-Schaden)**
- **Ein** kontextueller Einschub mitte des Artikels + **ein** End-CTA. Nicht stapeln, thematisch passend (Erklär-Artikel → Quiz oder passende PDP, nie generischer Shop-Link).
- E-Mail-Capture: **inline am Artikelende** (mit Anreiz, z. B. Guide-PDF), **keine Entry-Popups** (NN/g).

## 7. Shopify-Architektur fürs Roh-Template

- **Templates**: `blog.json` + `article.json` als OS-2.0-Section-Stacks (Reihenfolge im Editor änderbar), im `lt-*`-Token-System. Optional `article.longform.json` via `template_suffix` für Pillar-Artikel mit Sidebar-TOC.
- **Metafields/Metaobjects statt Apps**:
  - Metaobject `author_reviewer` (Name, Credential, Foto, Bio, sameAs-Links) → referenziert via `custom.author_profile` und `custom.medical_reviewer` (natives `article.author` ist nur ein String).
  - `custom.reviewed_date` (Datum), `custom.featured_products` (Produkt-Referenzliste für Inline-Karten), `custom.sources` (Rich Text/JSON für Referenzen).
  - TOC + Lesezeit brauchen **kein** Metafield (aus `article.content` generieren).
- **Performance**: Hero-Bild = LCP → `fetchpriority="high"`, **nie** `loading="lazy"` auf dem Hero; alles unter dem Fold lazy; `width`/`height` überall (CLS); `image_url` + `srcset` (Shopify-CDN liefert WebP/AVIF); Section-CSS schlank halten.
- **Token-Lücke**: Artikel-Body braucht 19–20px, unser größtes Body-Token ist `--text-body-lg: 18px`. Beim Template-Bau entweder `--text-body-lg` für Artikel nutzen (pragmatisch, minimal unter Ideal) oder ein Token `--text-article: 19px` in `docs/design-governance.md §3` ergänzen. Kein Hardcoding im Section-CSS.
- **Ist-Zustand (Drift)**: ~~`templates/article.json` steuert Typografie über hartkodiertes `custom_css`~~ **Gebaut am 2026-07-06**: `sections/lt-article.liquid` (Artikel-Kern inkl. Auto-TOC, Takeaways, Byline, Quellen, Inline-CTA), `sections/lt-article-related.liquid`, `sections/lt-blog-index.liquid`; Templates `article.json`, `blog.json`, `page.blog.json` umgestellt; Token `--text-article: 19px` (mobil 17px) in `assets/theme.css`; 7 Artikel-Metafield-Definitionen (`custom.takeaways`, `author_name`, `author_credential`, `reviewer_name`, `reviewer_credential`, `reviewed_date`, `sources`) im Admin angelegt. **Offen**: die 6 alten `article.*.json`-Suffix-Templates (Alt-Artikel) laufen noch auf `main-article` mit Custom-CSS; auf das neue Template konsolidieren, wenn die Alt-Artikel überarbeitet werden.

## 8. Roh-Template-Blueprint (Section-Reihenfolge `article.json`)

1. Breadcrumb ("← Blog" mobil)
2. H1 + Meta-Zeile (Kategorie-Tag · Lesezeit · Aktualisiert am)
3. Byline-Block: Geprüft von {Reviewer} · Geschrieben von {Autor}
4. Takeaways-Box (3–4 Bullets, „Das Wichtigste in Kürze")
5. Hero-Bild (`fetchpriority="high"`)
6. TOC (mobil inline-collapsible; Desktop optional Sticky-Sidebar)
7. Artikel-Body (680px-Spalte, Spec §1) mit einem kontextuellen Produkt-/Quiz-Einschub
8. Quellen (ausklappbar, nummeriert)
9. Autoren-/Reviewer-Box (expandiert, Link zur Bio-Seite)
10. End-CTA (Quiz oder passende PDP)
11. Related Articles (3er-Grid)
12. E-Mail-Capture inline

`blog.json`: Hero (Featured Article) → Tag-Filterleiste → Card-Grid → "Mehr laden".

---

## Quellen (Auswahl)

Typografie: [Learn UI Design Font-Size-Guide](https://www.learnui.design/blog/mobile-desktop-website-font-size-guidelines.html) · Butterick's Practical Typography (via Sekundärquellen) · [NN/g Link-Visualisierung](https://www.nngroup.com/articles/guidelines-for-visualizing-links/) · [WebAIM Contrast](https://webaim.org/articles/contrast/)
Struktur/SEO: [NN/g TOC-Guide](https://www.nngroup.com/articles/table-of-contents/) · [NN/g In-Page-Links](https://www.nngroup.com/articles/in-page-links/) · [NN/g Breadcrumbs](https://www.nngroup.com/articles/breadcrumbs/) · [NN/g Popups](https://www.nngroup.com/articles/popups/) · [Ahrefs Blog-Post-Length](https://ahrefs.com/blog/blog-post-length/) · [Backlinko Ranking-Faktoren](https://backlinko.com/search-engine-ranking) · [Baymard/Smashing Load-More](https://www.smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons/) · [Google Publication Dates](https://developers.google.com/search/docs/appearance/publication-dates) · [web.dev LCP](https://web.dev/articles/lcp)
Shopify: [article-Objekt](https://shopify.dev/docs/api/liquid/objects/article) · [Blog-Template](https://shopify.dev/docs/storefronts/themes/architecture/templates/blog) · [Metaobjects](https://help.shopify.com/en/manual/custom-data/metaobjects)
Teardowns (Live-HTML 2026-07-06): ritual.com/blogs/science · tallyhealth.com/blogs/learn · levels.com/blog · insidetracker.com/a/articles · elysiumhealth.com/blogs/aging101 · healthline.com/nutrition · [Examine Grades](https://examine.com/about/grades/) · [Hims Editorial Standards](https://www.hims.com/editorial-standards) (AG1, Hims-Blog, sunday.de/wissen bot-blockiert)
