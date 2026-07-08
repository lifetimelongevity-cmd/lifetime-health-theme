---
status: living
last_review: 2026-07-08
canonical_for: geo-produkt-empfehlungen-beide-produkte
supersedes: []
---

# GEO-Strategie: KI-Produktempfehlungen (NMN + AGE&DNA-Test)

Kanonische Umbrella-Spec dafür, dass KI-Modelle (ChatGPT, Perplexity, Gemini/Google
AI-Mode, Copilot, Claude) **LIFETIME als Produkt empfehlen** — für beide Hero-Produkte.

Verhältnis zu bestehenden Docs:
- `docs/nmn-blog-geo/nmn-blog-playbook.md` = NMN-Content-Cluster (owned, on-site). Bleibt gültig,
  ist aber **bewusst NMN-only und owned-only**. Diese Datei erweitert den Scope auf **beide
  Produkte + Off-Site + technische Gates**, die dort fehlen.
- `docs/age-dna-geo/age-dna-geo-playbook.md` = Age-Test-Content-Cluster (neu, spiegelt NMN).

---

## 1. Kernbefund (Baseline 2026-07-08)

**On-Page ist überdurchschnittlich, Off-Site ist null.**

- ✅ Beide PDPs haben reichhaltiges Schema: `Product` + `Offer` + `AggregateRating`
  (NMN 4,7/229 · Test 4,7/111) + `FAQPage` (NMN 8, Test 11 Q&A) + `Brand` +
  `MerchantReturnPolicy` + `ShippingDetails`. AI-Crawler nicht geblockt. `llms.txt` +
  `.well-known/ucp` live (Shopify-Agentic-Commerce).
- ❌ **LIFETIME taucht in KEINER nicht-branded Kategorie-Query auf** (verifiziert per
  Wettbewerbs-Scan 2026-07-08). Weder NMN noch Alterstest. Nur der eigene Marken-/Domainname
  rankt. Jede KI-Produktempfehlung in diesen Kategorien wird aus Seiten gebaut, die LIFETIME
  nicht erwähnen.
- ❌ Age-DNA-Test hat **null GEO-Content** (größter ungenutzter Hebel: 349 € AOV, dünnes DE-Feld).
- ⚠️ Google Merchant Center Free Listings vermutlich AUS (nur Search-Ads) → **hartes Gate** zu
  Googles AI-Mode/AI-Overviews-Shopping. Zuerst verifizieren.

**Realistische Decke:** Nicht „KI empfiehlt immer LIFETIME", sondern in 3–6 Monaten von
„unsichtbar" → „konstant in der Shortlist" → mit wachsender Konsens-Masse „zuerst genannt".

---

## 2. Wie LLMs Produkte auswählen (Mechanik, Studienlage 2026)

1. **KI zerlegt eine Kauffrage in 5–10 Unter-Queries** und zieht aus Produktdatenbanken,
   **Review-Seiten, Foren, Fremd-Listicles** — nicht primär aus der eigenen Seite.
   Semrush: **62 % der KI-Zitationen führen zu keiner Markennennung** → man muss *genannt*
   werden, nicht nur verlinkt.
2. **Reddit/Community = Multiplikator:** starke Reddit/Quora-Erwähnung ≈ **4x Zitations-Chance**
   (SE Ranking). Social-Anteil an KI-Zitationen Q1 2026 > 9 %, Reddit dominiert.
3. **Google AI-Mode liest nur den Shopping Graph** (50 Mrd. Listings) ← Merchant Center.
   Ohne Feed + Free Listings = unsichtbar. GTIN ist das stärkste Matching-Signal.
4. **Struktur + Reviews + Preis/Verfügbarkeit** entscheiden, ob ein Produkt überhaupt
   extrahiert wird. Feed-Frische zählt bei AI-Mode stärker als bei klassischem Shopping
   (täglich, nicht wöchentlich).

---

## 3. Maßnahmen, priorisiert

### P0 — Technische Gates (schnell, hohe Sicherheit)

| # | Maßnahme | Status/Ort | Warum |
|---|---|---|---|
| 1 | **Merchant Center: Free Listings AN, GTIN je Variante, täglicher/Echtzeit-Feed** | Shopify → Google-&-YouTube-Channel; **verifizieren** | Einziges Tor zu Google AI-Mode/Overviews-Shopping. Ohne GTIN Rauswurf aus Produkt-Clustern. |
| 2 | **Perplexity Merchant Program + ChatGPT/Shopify-Katalog aktivieren** | Shopify-Channels | Eligibility für Perplexity/ChatGPT-Shopping (organisch). |
| 3 | **`Organization`-Schema ausbauen** | `snippets/microdata-schema.liquid` — **erledigt 2026-07-08** (logo, sameAs, description, @id-Graph) | Entitäts-Verankerung: LLMs erkennen die Marke wieder. |
| 4 | **PDP-`Offer` ↔ Feed abgleichen** (GTIN/MPN, availability, Preis) | PDP + Feed | KI cross-checkt; Widerspruch = rausgefiltert. |

### P1 — Off-Site-Konsens (der eigentliche Hebel)

Der Unterschied zwischen „technisch sauber" und „wird empfohlen". **Outreach, kein Code.**

- **In die Vergleichs-/„Testsieger"-Listicles, aus denen KI zitiert:**
  - NMN: `supplements-for-longevity.com/nmn-vergleich`, `gorilla.green/nmn-supplement`,
    `nmn-vergleich.com`, `intelletics.com`, `vitamondo.net`
  - Test: `bioage-test.de`, `zukunftsessen.de` (platzieren epiAge/MOLEQLAR/TruDiagnostic)
  - **Wichtig (verifiziert 2026-07-08):** Das sind KEINE neutralen Vergleiche, sondern
    Affiliate-Publisher. `bioage-test.de` = TMM UG / Till Mönig (Münster), Amazon-Affiliate,
    rankt TruDiagnostic/GlycanAge (Cerascreen nur Randnotiz, 3× vs. 12×). Sie listen nur Marken,
    die sie **monetarisieren** können → LIFETIME ist dort nur listbar mit eigenem Affiliate-Programm
    (Awin/Financeads) oder Amazon-Listing, nicht per Merit-Pitch. Vor jedem Deal Impressum prüfen
    (competitor-owned Fronts meiden). LLMs werten dünne Affiliate-Seiten zunehmend ab.
    Deshalb: **eigenes Money-Piece + High-Trust-Quellen zuerst**, Affiliate-Placement nur mit offenen Augen.
- **Trustpilot-Profil + off-site Review-Masse** (Post-Purchase-Mail Tag 14/30). LLMs lesen
  Trustpilot als Konsens, nicht nur die PDP-AggregateRating.
- **Wikidata-Eintrag** „LIFETIME Health" (Entität + `sameAs`-Anker; Wikipedia schwer, Wikidata machbar).
- **Reddit/Community** (`r/NMN`, `r/longevity`, `r/Biohackers`): ~4x-Hebel. DE-sprachig dünn =
  Chance, aber ehrlich mitspielen (kein Astroturf).

### P1/P2 — Age-DNA-Test-Cluster (größter ungenutzter Hebel)

Eigener Hub-and-Spoke, Details in `docs/age-dna-geo/age-dna-geo-playbook.md`. Money-Piece =
faire Vergleichsseite „Welcher Alterstest? epiAge vs. TruDiagnostic vs. GlycanAge vs. LIFETIME"
(KI beantwortet „welcher Test" mit einer Tabelle → wer die faire Tabelle besitzt, wird zitiert).
Wedge = „Was kann ich mit dem Ergebnis tun?" (die #1-Skepsis gegen Alterstests, LIFETIME hat die
Antwort inkl. NMN im eigenen Sortiment).

### Querschnitt — Substanz schlägt Schema

- **NMN-Differenzierung fehlt:** „Uthever >99,9 %" verkaufen LIFETIME, MOLEQLAR, Xonigen,
  Nuoneo, eternal-vitality identisch → Kategorie-Standard, kein Moat. Braucht echten,
  zitierbaren Unterschied (öffentliches CoA, ISO-17025-Laborname, Chargen-Transparenz,
  Prof.-Reviewer, Bundle mit dem Test). Sonst empfiehlt KI den billigeren Uthever-Klon.
- **MOLEQLAR = Benchmark:** gleiche München-DNA, gleiche Doppelstrategie NMN + Test, rankt in
  beiden. Struktur-Blaupause.

### P3 — Messung (erweitern, Ansatz existiert im NMN-Playbook §8)

Prompt-Panel (15 Prompts × 5 Engines) + GA4-AI-Referral-Report **auf beide Produkte** ausdehnen.
Neue KPI: monatlich prüfen, in welche Ziel-Listicles man aufgenommen wurde.

---

## 4. Bewusst deprioritisieren

- **Eigene (custom) `llms.txt` schreiben** (NMN-Playbook-TODO): für KI-*Suche* ein Dud.
  Google/Mueller nutzt sie nicht; Ahrefs 05/2026: 97 % aller llms.txt bekommen null KI-Requests.
  Die nützliche Variante (Shopify-UCP für Kauf-Agenten) ist bereits automatisch live. TODO streichen.

---

## 5. Start in den nächsten 14 Tagen

1. Merchant Center prüfen (Free Listings? GTINs? Feed-Frequenz?) — größter Single-Fix.
2. ✅ `Organization`-Entity-Schema (erledigt) + ✅ **Wikidata** (erledigt 2026-07-08, Item
   `Q140462409` „Diga Health GmbH", 9 Statements inkl. Website + Socials + Impressum-Beleg).
3. Age-Test-Vergleichsseite konzipieren (Money-Piece).
4. Outreach-Liste an die 6 Ziel-Vergleichsseiten.
5. Trustpilot einrichten + Review-Ask scharfstellen.

---

## Quellen (Best-Practice-Stand 2026-07-08)

Semrush Ghost-Citations · CMSWire Reddit-AI-Citations · SE Ranking (4x) · Tinuiti Q1 2026 ·
Shopify (Perplexity Shopping / Google AI Shopping) · Paz.ai (Merchant Center für AI-Mode) ·
Search Engine Journal + PPC.land (llms.txt-Realität). Wettbewerbs-Scan: interner Agent 2026-07-08.
