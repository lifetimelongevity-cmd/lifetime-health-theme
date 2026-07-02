---
status: living
last_review: 2026-07-02
canonical_for: live-page-slug-to-template-mapping
---

# Live-Pages-Map

Slug → Template → Haupt-Section. Damit man bei Live-Bezug ("die Quiz-Seite", "die Ergebnis-Seite") direkt den richtigen Code findet, statt durch Liquid-File-Namen zu raten.

Bei Drift: Live gewinnt. Hier nachpflegen, sobald ein Mapping sich ändert.

## Quiz

| Live-Slug | Internes Label / Menü | Template-Datei | Haupt-Section | Result-Markup |
|---|---|---|---|---|
| `/pages/quiz-age` | **AGE Quiz** (Menü „AGE Quiz") | `templates/page.quiz-age.json` | `sections/lt-pdp-quiz-v2.liquid` | `snippets/lt-quiz-result.liquid` |

> **Redirect verifiziert (2026-06-04):** Der alte Slug `/pages/biologischer-alterstest-dna` ist weiterhin die
> **Google-Ads-Final-URL**, **301-redirectet** aber live auf `/pages/quiz-age` → ein Redirect-Hop pro bezahltem
> Klick (Latenz + Post-Click-Quality-Score). Fix: Ad-Final-URL direkt auf `/pages/quiz-age`. Details:
> `docs/mobile-lp-audit-2026-06-04.md` (F1).

**Quiz-Snippets** (alle eingebunden von `lt-pdp-quiz-v2`):
- `snippets/lt-quiz-question-age.liquid`
- `snippets/lt-quiz-question-cards.liquid`
- `snippets/lt-quiz-question-multi.liquid`
- `snippets/lt-quiz-question-slider.liquid`
- `snippets/lt-quiz-loading.liquid`
- `snippets/lt-quiz-result.liquid`

**Quiz-Assets**: `assets/lt-quiz-v2.js`, `assets/section-lt-pdp-quiz-v2.css`

## Kanonisches Fundament (die 5 SoT-Live-Seiten)

Diese 5 Seiten sind das Fundament (siehe `CLAUDE.md` § Kanonisches Fundament). Alle live verifiziert 2026-06-15 (HTTP 200):

| # | Live-URL | Template | Haupt-Section(s) |
|---|---|---|---|
| 1 | `/` (Startseite) | `templates/index.json` | Homepage-Stack (`lt-hp-*`) |
| 2 | `/products/lifetime-age-dna` (AGE&DNA-Test, €349) | `templates/product.age-dna-test.json` | PDP-Stack (`lt-pdp-*`) |
| 3 | `/pages/science` | `templates/page.science.json` | Science-Stack (`ss-*` / `lt-*`) |
| 4 | `/pages/quiz-age` | `templates/page.quiz-age.json` | `sections/lt-pdp-quiz-v2.liquid` |
| 5 | `/products/lifetime-nmn` (NMN Pulver) | `templates/product.nmn-pulver.json` | PDP-Stack |

> **Slug-Drift behoben (2026-06-15):** Der NMN-PDP-Slug ist live `/products/lifetime-nmn` (HTTP 200).
> Der früher hier geführte `/products/nmn-pulver` ist **404** (tot). Falls Google-Ads-Final-URLs oder
> interne Links noch auf `nmn-pulver` zeigen, umstellen.

## PDPs (aktive Produkte)

| Live-URL | Template | Haupt-Section(s) |
|---|---|---|
| `/products/lifetime-age-dna` (AGE&DNA-Test, €349) | `templates/product.age-dna-test.json` | PDP-Stack (`lt-pdp-*`) |
| `/products/lifetime-nmn` (NMN Pulver) | `templates/product.nmn-pulver.json` | PDP-Stack |

## Sonstige aktive Pages

| Live-Slug | Template | Notiz |
|---|---|---|
| `/pages/agedna-ergebnis-age` | `templates/page.agedna-ergebnis-age.json` | Epigenetik-Ergebnis-Detail-Page. Status fragwürdig — Inhalt hat Default-Combine-Sections (slideshow, content-toggles, text-columns); keine `lt-*`-Custom-Sections |
| `/pages/ueber-lifetime` | `templates/page.ueber-lifetime.json` | Über-uns. Seit 2026-07-02 auf `lt-*`/Token-Stack (Haupt-Sections: `lt-about-mission`, `lt-benefits`, `lt-stat-callout`, `lt-quote`, `lt-about-experts`, `lt-about-team`; Hero via `lt-science-hero`-Reuse). Live-Push ausstehend |

## Bekannt-dead Slugs (nicht aktiv)

Diese Pages existieren noch in Shopify, sind aber nicht (mehr) sinnvoll verlinkt und rendern den Default `page.json`:
- ~~`/pages/quiz-age` — alter Quiz-Slug, nur Rich-Text~~ → **überholt (2026-06-04): `/pages/quiz-age` ist jetzt die AKTIVE Quiz-Page** (volles `lt-pdp-quiz-v2`, live verifiziert). Siehe §Quiz oben.
- `/pages/meine-routine` — Duplikat-Assignment desselben Templates wie die aktive Quiz-Page. Soll im Admin gelöscht oder unpublished werden.
- `/pages/legacy-age-dna-landing` — alte LP-Variante. Template archiviert (`_archive/2026-05-19_quiz-cleanup/`).
- `/pages/agedna-ergebnis-dna-1` — DNA-Ergebnis-Variante. Template archiviert (`_archive/2026-05-19_quiz-cleanup/`).

## Nav-Cleanup 2026-07-02 (Phase 1 „Nav-Hygiene")

Ergebnis eines Live-Stil-Audits (Chrome-MCP + Shopify-MCP). Leere/veraltete publizierte Pages
**unpublished + 301-redirectet**, Schlafanalyse (Produkt DRAFT) aus den Menüs entfernt. Live verifiziert.

**Retired + Redirect (301):**

| Slug (jetzt unpublished → 404) | Redirect-Ziel | Grund |
|---|---|---|
| `/pages/agednatest` | `/products/lifetime-age-dna` | leer (Template `agedna-landing-page-x` fehlt) |
| `/pages/bioagedna-info` | `/products/lifetime-age-dna` | leer (Template `agedna-landing-termin` fehlt) |
| `/pages/alzheimer-demenz` | `/products/lifetime-age-dna` | leer (Template `demenz` fehlt); Alzheimer ≠ AGE-DNA, Ziel bewusst = nächstes lebendes Diagnostik-Produkt |
| `/pages/nmn` | `https://www.lifetime-health.de/products/lifetime-nmn` (absolut) | Legacy-Dublette zur echten NMN-PDP |
| `/pages/buecher-und-dokumentationen` | `/blogs/longevity-blog` | nicht mehr benötigt (BJ 2026-07-02); `longevity-hub`-Menü auf nur „Blog" reduziert |

**Menü-Bereinigung:** Schlafanalyse-Item aus `main-menu`, `footer`, `gesundheitsanalyse` entfernt (Produkt bleibt DRAFT).
Schlafanalyse-Karte in `templates/page.produkte.json` `disabled` + aus `block_order` (Grid `grid-3`→`grid-2`); greift mit nächstem Theme-Push.
Alle toten Diagnostik-Menü-Items (in `main-menu`, `produkte`, `agednatest`, `gesundheitsanalyse`, `experten`, `beratung`) auf
`/products/lifetime-age-dna` umgebogen; Schlafanalyse-Kind in `experten` entfernt.

**Redirect-Hygiene (erledigt 2026-07-02):** Domain-Basis: `lifetime-health.com` noch aktiv, aber **`.de` = Primärdomain**.
145 fehlgeleitete Redirect-Ziele (40 `.com`, 105 nackte myshopify-Domain) auf relative `.de`-Pfade umgestellt; Chains auf das
finale Ziel aufgelöst; Quiz-Kette (`meine-routine`/`quiz` → `quiz-age`) verkürzt. Gelöscht: Footgun `/products/lifetime-nmn → myshopify-Home`
(1507660300663) und Self-Loop `/pages/ueber-lifetime` (296221147236). **Merke:** Shopify erlaubt kein Redirect-Ziel, das selbst
Redirect-Quelle ist (Chain-Sperre) — immer auf das finale Live-Ziel setzen. Detail-Memory: `project_redirect_hygiene_2026-07`.

**Phase 3 (Content-Rebuild): im Code umgesetzt 2026-07-02, Live-Push via Theme Manager ausstehend.**
`/pages/ueber-lifetime` läuft jetzt über `templates/page.ueber-lifetime.json` mit dem Stack
`lt-science-hero` (reuse) → `lt-about-mission` → `lt-benefits` → `lt-stat-callout` → `lt-quote` → `video` (reuse) →
`lt-about-experts` → `lt-about-team`; Standorte-Sections bleiben `disabled`. Neue Patterns „expert-profile" und
„team-grid" als approved Examples unter `_examples/sections/` dokumentiert. Brief: `docs/ueber-lifetime-rebuild-prompt.md`.

## Offene Migrationen

### Template-Rename `page.meine-routine.json` → `page.quiz-age.json`

**Stand (2026-06-04, live verifiziert):** Migration ist **vollzogen** — die aktive Quiz-Page wird live unter
`/pages/quiz-age` ausgeliefert; `/pages/biologischer-alterstest-dna` redirectet dorthin (301).

**Noch im Shopify-Admin zu verifizieren / aufräumen:**
1. ✅ Live-Page liegt auf `/pages/quiz-age` (bestätigt).
2. `/pages/meine-routine` prüfen → löschen/unpublish, falls noch als Duplikat vorhanden.
3. Danach `templates/page.meine-routine.json` nach `_archive/2026-05-19_quiz-cleanup/templates/` verschieben,
   sobald kein Page-Assignment mehr darauf zeigt.
4. **Google-Ads-Final-URL** auf `/pages/quiz-age` umstellen → dann ist der Redirect-Hop weg (siehe F1).

## Bekannte Drittapp-Residuen

- **RevenueHunt** (Product-Recommendation-Quiz) — Theme-Embed lädt globalen Popup-Loader auf jeder Seite. Wird nicht aktiv genutzt. Soll im Admin deinstalliert werden.
- **Lantern** (Quiz) — App-Block-Referenz in archiviertem `page.agedna-ergebnis-dna-1.json`. Soll im Admin deinstalliert werden.

## Pflege

Diese Datei aktualisieren, wenn:
- Eine Page einen neuen Slug bekommt
- Ein Section-Refactor das Haupt-Section-Liquid umbenennt
- Eine Drittapp installiert oder entfernt wird, die Live-Sichtbarkeit hat
