# Cursor Prompt — LIFETIME NMN PDP

Build a high-converting product detail page (PDP) for LIFETIME NMN Pulver. This is a German supplement brand. Use Next.js + Tailwind CSS + Lucide React. The page is already styled — do NOT define colors, spacing scales, or font sizes. Focus exclusively on component structure and layout logic.

---

## Product Facts (do not change these)
- Product: NMN Pulver Premium by LIFETIME (lifetime-health.de)
- Substance: β-Nicotinamide Mononucleotide, >99.9% purity
- Format: Powder, 30g per pouch, 1 scoop = ~500mg, ~60 servings = ~60 days supply
- Subscription price: 34,90 €/month (saves 12.5%, ~1.16€/day, 60€/year)
- One-time price: 39,90 €
- Guarantee: 90-day money-back, no questions asked
- Free shipping from 35€ (both options qualify automatically)
- Certifications: GMP, HACCP, independent lab-tested in Germany
- Raw material: Uthever® (patented branded NMN)
- Company: Diga Health GmbH, Berlin, doctor-led (in-house neurologist)
- Media: RTL Punkt 12, SAT.1, SWR1, Spiegel Bestseller
- Reviews: 4.7 stars, 102 verified reviews
- Novel Food note: sold for research/analysis purposes in EU

---

## Page Architecture (13 sections, in order)

### SECTION 1 — Trust Bar
- Integrate into sticky navigation, NOT a separate section block
- 44px height strip, 4 trust items inline on desktop
- Mobile: CSS-only marquee animation (all 4 items scrolling)
- Items: shield-check icon + "90-Tage Geld-zurück" | package icon + "Gratis Versand ab 35€" | star icon + "4,7 aus 102 Bewertungen" | pause-circle icon + "Abo jederzeit flexibel"
- Icons: Lucide, 16px, outline style

---

### SECTION 2 — Hero (2-column split)
Layout: CSS Grid, 50% left / 50% right on desktop. Stack vertically on mobile (image first).

**LEFT — Product Gallery**
- position: sticky, top: 0, scrolls until end of purchase area
- Main image: full width, square aspect ratio, gray placeholder bg-[#C8C5BF]
- Thumbnails: horizontal row of 5 below main image, 60px height, gray placeholders
- Mobile: fullwidth swipeable gallery, CSS scroll-snap, dots navigation below, no auto-rotation, no loop animation

**RIGHT — Purchase Area** (see Section 3)

---

### SECTION 3 — Purchase Area (right column of hero)
Layout: vertical stack, no images, no illustrations. Pure typography + UI components.

Order top to bottom:
1. Star rating row: 5 SVG stars, "4,7 (102 Bewertungen)" inline
2. H1: "NMN Pulver – Dein täglicher NAD⁺-Baustein"
3. Subtitle: "Hochreines Uthever® NMN · >99,9% rein · arzt-geführt · laborgeprüft in DE"
4. Price block: large subscription price + strikethrough one-time price small
5. Subscription toggle — 2-button group side by side:
   - Button A (DEFAULT SELECTED, dark filled bg): "Monatliche Lieferung / 34,90 € / Monat / ✓ Empfohlen · 12,5% gespart"
   - Button B (unselected, light bg): "Einmaliger Kauf / 39,90 €"
   - React useState drives: CTA text, price display, info line, warning message
6. Info line below toggle:
   - Abo state: "30 g · ca. 60 Portionen à 500 mg · ca. 60 Tage · ca. 1,16 €/Tag · 60 € günstiger im Jahr"
   - Einzel state: same + warning text "Du sparst mit dem Abo 5 € / Monat · 60 € / Jahr"
7. Primary CTA button: full width
   - Abo: "Longevity-Routine starten — 34,90 €/Monat"
   - Einzel: "Einmalig kaufen — 39,90 €"
8. Trust trio: 3 items flex row — shield-check + "90-Tage Garantie" | pause-circle + "Jederzeit flexibel" | package + "Gratis Versand"

---

### SECTION 4 — Benefit Strip
Layout: 4-column grid desktop, 2-column grid tablet + mobile (do NOT collapse to 1 column on mobile)
No card borders, no individual backgrounds — open grid with a subtle section-level background change
Each cell: Lucide icon 32px → bold headline → 1 sentence body text
Icons: zap (Energie) | shield (Zellschutz) | heart-pulse (Stoffwechsel) | brain (Gehirn)

---

### SECTION 5 — Media Trust ("Bekannt aus")
Layout: horizontal centered flex row
Logo placeholders (gray rounded boxes with text if SVGs unavailable): RTL | SAT.1 | SWR1 | Spiegel
CSS: filter: grayscale(100%) on all logos, hover: grayscale(0%) with transition 0.2s
Below logos: single line — "Entwickelt von einem Arzt-Team · In-House Neurologe (Chefarzt) · Berlin"
Mobile: flex-wrap or 2×2 grid

---

### SECTION 6 — Timeline "Was kannst du erwarten?"
**Desktop:** Vertical timeline — left column: line + 4 dots | right column: content
**Mobile:** Horizontal snap-scroll cards (CSS scroll-snap-type: x mandatory), dots indicator row on top

4 timeline points:
- Woche 4 (dot: filled): "Mehr Energie" — "NAD⁺-Stoffwechsel: erste messbare Veränderungen. Viele berichten von einem konstanteren Energiegefühl im Alltag."
- Monat 2 / 1. Abo-Lieferung (dot: filled): "Spürbar fitter" — "Teilnehmer einer 60-Tage-Studie legten im 6-Minuten-Gehtest signifikant mehr Strecke zurück als Placebo. Biologisches Alter blieb stabil."
- Monat 3 (dot: filled): "Herz & Stoffwechsel" — "Verbesserte Insulinsensitivität. Tendenz zu reduzierter arterieller Steifheit. NAD⁺-Werte im Blut mehr als verdoppelt."
- Monat 4 (dot: outline): "Deep Longevity Benefits" — "Kumulative Effekte auf Stoffwechsel, Gefäßgesundheit, Zellreparatur." + special callout box: "Nach Absetzen: NAD⁺ fällt in 4 Wochen auf Ausgangswert zurück — Kontinuität ist entscheidend."

No photos. Typography + timeline line + dots only.

---

### SECTION 7 — Social Proof
**Aggregate block (top):**
- Large "4,7" rating number
- "102 Bewertungen"
- 5-row rating distribution bars (width set via inline style as % of total)

**3 Review cards (below):**
- Layout: 3-col grid desktop, 1-col mobile
- Each card: avatar circle (initials, brand bg) | name + handle | 5 SVG stars | date | review text max 4 sentences | "Verifizierter Kauf" badge with check-circle icon
- Reviews:
  - "S" avatar — Sven — ★★★★★ — "Ich habe das Buch von David Sinclair gelesen und wollte es ausprobieren. Ich fühle mich insgesamt energiegeladener und weniger erschöpft im Alltag."
  - "C" avatar — @christinehei — ★★★★★ — "Ich bin 58 Jahre alt und arbeite als Best-Age Model - und hier kommt mein Geheimnis für mehr Energie & kürzere Regenerationszeit."
  - "M" avatar — @misscasiraghi — ★★★★★ — "Es ist nicht nur ein Longevity-Trend, es ist wissenschaftlich bewiesen."

No stock photos, no AI faces. Initials-only avatars.

---

### SECTION 8 — Science + Quality (Bento Grid)
Layout: 2-column bento grid (50/50) on desktop. Stack on mobile, science tile first.

**LEFT tile — Wirkungsweise:**
- NAD gif: `<img src="https://www.lifetime-health.de/cdn/shop/files/graph-nad-level-sinken-im-alter-v2.gif" alt="NAD+ sinkt mit dem Alter" />`
- 2 study cards below (bordered): study headline + 1-sentence result + source citation
  - "NMN erhöhte NAD⁺-Spiegel signifikant bei Erwachsenen mittleren Alters (Yi et al., GeroScience 2022)"
  - "Verbesserte aerobe Kapazität und Muskelkraft bei älteren Erwachsenen (Liao et al.)"

**RIGHT tile — Qualität:**
- 4 feature icons (Lucide: leaf, flask-conical, badge-check, shield-check) 24px each, with text labels
- Download button: "Prüfbericht ansehen →" href="https://cdn.shopify.com/s/files/1/0621/2173/8340/files/Pruefbericht_L-24-04702.pdf"
- Uthever® badge/pill
- Compact comparison table (2 columns, no table tag — use divs):
  | Kriterium | LIFETIME ✓ | Typisch ✗ |
  | Reinheit >99% | ✓ | ? |
  | Made in Germany | ✓ | ? |
  | Drittlabor COA | ✓ | ✗ |
  | Ohne Füllstoffe | ✓ | ? |
  | 90-Tage Garantie | ✓ | ✗ |

---

### SECTION 9 — FAQ (Accordion)
Layout: full width, max-width 720px, margin 0 auto
8 accordion items. Each: question text left, plus/x icon right (Lucide)
Animation: max-height: 0 → max-height: 500px transition (NOT display:none toggle). Icon rotates on open.

Questions in order:
1. "Was bedeutet Novel Food?" → "NMN ist in der EU als Novel Food eingestuft. Dieses Produkt wird daher nicht als Lebensmittel oder Nahrungsergänzungsmittel angeboten. Die Abgabe erfolgt ausschließlich zu Forschungs- und Analysezwecken."
2. "Wann spüre ich erste Ergebnisse?" → "Erste messbare Veränderungen berichten viele nach 4 Wochen. Maximale Effekte entwickeln sich nach 3–4 Monaten kontinuierlicher Einnahme."
3. "Wie nehme ich das Pulver ein?" → "Morgens 1 Messlöffel (ca. 500 mg) in Wasser, Saft oder Smoothie einrühren. Der Messlöffel liegt dem Beutel bei."
4. "Kann ich das Abo jederzeit kündigen?" → "Ja, das Abo ist jederzeit flexibel anpassbar, pausierbar oder kündbar — direkt in deinem Kundenkonto, ohne Angabe von Gründen."
5. "Was ist Uthever® NMN?" → "Uthever® ist ein patentierter Markenrohstoff — klinisch untersucht, nach GMP hergestellt, mit öffentlich einsehbarem COA."
6. "Ist NMN in Deutschland legal?" → "Ja. NMN ist legal erhältlich und wird von LIFETIME zu Forschungs- und Analysezwecken angeboten."
7. "Wie lange reicht ein Beutel?" → "30 g enthält ca. 60 Portionen à 500 mg (1 Messlöffel). Das entspricht ca. 60 Tagen Versorgung — also 2 Monate pro Beutel."
8. "Gilt die 90-Tage-Garantie auch für Abo-Bestellungen?" → "Ja. Die 90-Tage Geld-zurück-Garantie gilt für alle Bestellungen — einmalig und Abo. Einfach E-Mail an team@lifetime-health.de."
   → Render this item with a shield-check icon before the question text

Below accordion: `<a>Weitere Fragen? Schreib uns →</a>` as small text link

---

### SECTION 10 — Guarantee Block
Layout: centered card, max-width 480px, margin 0 auto, brand-tinted background (not white, not neutral)
Content centered vertically and horizontally:
- shield-check icon (Lucide, 48px)
- Large "90" number (72px bold)
- "Tage – Volle Geld-zurück-Garantie"
- "Nicht überzeugt? Wir erstatten jeden Cent — kein Kommentar, kein Kleingedrucktes."
- "Einfach schreiben an:" + `<a href="mailto:team@lifetime-health.de">team@lifetime-health.de</a>`

---

### SECTION 11 — Upsell (2 product cards)
Layout: 2-column grid on ALL screen sizes (no stacking on mobile — just smaller cells)
Each card:
- Product image: aspect-ratio 1/1, gray placeholder bg-[#C8C5BF], labeled text
- Product name
- 1-sentence description
- Price
- CTA button
Cards:
- "NMN + NAD⁺-Booster Bundle" — "Die komplette NAD⁺-Strategie in einem Paket"
- "NAD⁺-Booster (liposomal)" — "Liposomale Aufnahme für maximale Bioverfügbarkeit" — 34,90 €/Monat Abo

---

### SECTION 12 — Final CTA
Layout: full-width section with brand-tinted background, content centered (max-width 600px)

- H2: "Starte deine Longevity-Routine — noch heute"
- 3 checkmark bullets (check-circle Lucide 16px + text, flex column):
  - "Uthever® NMN >99,9% rein"
  - "Arzt-geführt aus Berlin · unabhängig laborgeprüft"
  - "90-Tage Geld-zurück-Garantie ohne Wenn und Aber"
- Primary CTA button (max-width 400px, centered): "Abo starten — 34,90 €/Monat · jederzeit flexibel"
- Below CTA: secondary text link "Oder einmalig kaufen — 39,90 €"
- Guarantee reminder: small muted text "Risikolos testen · 90-Tage Garantie"

---

### SECTION 13 — Sticky Bottom Bar (Mobile only)
- CSS: display: none at ≥768px breakpoint
- position: fixed, bottom: 0, left: 0, right: 0, z-index: 100
- padding-bottom: env(safe-area-inset-bottom)
- Height: 64px + safe area inset
- Visibility logic: IntersectionObserver watches `#hero-cta-button`
  - Bar becomes visible when hero CTA scrolls out of viewport
  - Bar hides when hero CTA is visible again
- Layout: flex row, space-between
  - Left: product name small + price bold
  - Right: CTA button "Abo starten — 34,90 €"

---

## Technical Notes
- Framework: Next.js App Router
- Icons: Lucide React (all icons)
- Placeholder images: `<div className="bg-[#C8C5BF] aspect-square w-full rounded-lg flex items-center justify-center text-xs text-gray-600">[Image description]</div>`
- All placeholder copy is real final copy, not Lorem Ipsum
- Subscription toggle: React useState('abo' | 'einzel'), prop-drills or context to CTA + price + info line
- Mobile gallery: CSS scroll-snap-type: x mandatory on container, scroll-snap-align: start on each slide
- Timeline mobile: same CSS scroll-snap pattern, horizontal
- FAQ accordion: max-height transition (0 → 500px), not display toggle
- NAD+ gif URL: `https://www.lifetime-health.de/cdn/shop/files/graph-nad-level-sinken-im-alter-v2.gif`
- COA PDF URL: `https://cdn.shopify.com/s/files/1/0621/2173/8340/files/Pruefbericht_L-24-04702.pdf`
- IntersectionObserver for sticky bar — observe `#hero-cta-button`, toggle bar visibility
- No external UI component libraries required (Lucide is fine, shadcn accordion acceptable)
- Do NOT hardcode any color values, spacing values, or font-size values
- Do NOT add animations beyond: scroll-snap, max-height accordion, grayscale hover, CTA hover state
