---
status: living
last_review: 2026-06-04
canonical_for: mobile-lp-audit-findings-quiz-age
supersedes: []
---

# Mobile-Audit Quiz-LP — Befunde & Fix-Liste (2026-06-04)

> Antwort auf das Aufgaben-Briefing „Mobile-Audit Quiz-LP (AGE & DNA-Test)".
> Methode: vollständiger **Code-Audit** der Quiz-Section (Liquid + CSS + JS + Snippets)
> plus **Live-Verifikation** via Chrome-MCP (Desktop-Render + DOM/Netzwerk-Checks) und gads-MCP.
> Mobile-Pixel-Emulation war erneut blockiert (Chrome-Window klemmt auf 1440px, wie am 13.05.)
> → Layout-Aussagen sind aus dem CSS abgeleitet (hohe Sicherheit), aber **nicht** auf einem echten Gerät bestätigt. Siehe §„Noch real-device zu bestätigen".

## Verdikt zur Hypothese

**Die „katastrophaler Mobile-Bug"-Hypothese ist weitgehend widerlegt.** Im Code ist nichts kaputt:
Quiz-State-Maschine, Tap-Targets, Auto-Advance, `<meta viewport>` und das responsive Stacking sind sauber.
Es gibt **keinen** einzelnen „das Quiz funktioniert auf Mobile nicht"-Bug.

**Stattdessen: mehrere reale, sich addierende Reibungs-/Performance-Probleme**, die plausibel sowohl die
Mobile-Conversion drücken **als auch** den festhängenden Quality-Score erklären. Die zwei höchsten Hebel
liegen dabei **außerhalb des Themes** (Ads-Final-URL-Redirect + GTM-Tracking-Wiring).

## Wichtige Rahmung: die LP kann gar kein ATC erzeugen

Alle CTAs der LP führen zur **PDP** (`/products/lifetime-age-dna`); das „In den Warenkorb" passiert
**dort**. „0 ATC auf 148 Mobile-Sessions" ist also eine **Full-Funnel**-Zahl: LP → (Quiz oder Direkt-CTA)
→ PDP → ATC. Ohne Event-Tracking ist nicht unterscheidbar, **wo** Mobile abbricht:

| Abbruch-Punkt | Dann ist das Problem… |
|---|---|
| Quiz wird nie gestartet | Above-the-Fold / CTA-Sichtbarkeit / Ladezeit |
| Start, aber Abbruch mitten im Quiz | Quiz-Länge / Interaktion |
| Quiz fertig, aber kein Klick zur PDP | Result-Page (zu lang/text-lastig) |
| PDP erreicht, aber kein ATC | LP ist ok → Problem liegt auf der PDP |

→ Diese vier Fälle haben **völlig verschiedene Fixes**. Deshalb ist Tracking-Wiring (siehe F6) der
diagnostische Top-Hebel, nicht eine blinde UX-Änderung.

---

## Befunde (nach Hebel sortiert)

### F1 — [HOCH · Ads, nicht Theme] Ad-Final-URL macht einen Redirect ✅ live bestätigt
- Live-Ad (Kampagne „01) AGE & DNA Test | Search | Purchase", Ad-ID `797547118312`) Final-URL:
  `https://www.lifetime-health.de/pages/biologischer-alterstest-dna`
- Diese URL **301-redirectet** live auf `/pages/quiz-age` (`redirected:true`, opaqueredirect bestätigt).
- **Wirkung:** Jeder bezahlte Klick zahlt einen Redirect-Hop, **bevor** die LP überhaupt zu laden beginnt
  (Latenz, auf Mobilfunk schlimmer) — und ein redirectender Final-URL ist ein klassischer
  **Post-Click-Quality-Score-Drücker**. Passt exakt zum Symptom „QS 3, Post-Click BELOW_AVERAGE seit 3 Wochen".
- **Fix (Ads-seitig, 0 Theme-Risiko) — exakte Werte (verifiziert 2026-06-04):**
  - Ad `797547118312` (Kampagne „01) AGE & DNA Test", AG „Anzeigengruppe 1") Final-URL:
    `…/pages/biologischer-alterstest-dna` → **`https://www.lifetime-health.de/pages/quiz-age`**
  - Sitelink `331869877934` „2-Min-Quiz starten" → **`https://www.lifetime-health.de/pages/quiz-age#quiz`**
  - Sitelink `331869877940` „Wissenschaft Dr. Limmroth" → **`https://www.lifetime-health.de/pages/quiz-age#wissenschaft`**
  - Sitelink `331869877943` „So funktioniert der Test" → **`https://www.lifetime-health.de/pages/quiz-age#ablauf`**
  - **✅ Erledigt + verifiziert (2026-06-05):** Ad `797547118312` (Kampagne `23564412660`) Final-URL jetzt
    `https://www.lifetime-health.de/pages/quiz-age`; Sitelinks `…934/940/943` auf `quiz-age#…`. Redirect-Hop weg.
    Zweite AGE-Kampagne `21163883952` (.com-Ads) ist PAUSED → kein aktiver Leak.
  - **Bonus-Fund (offen, niedrig):** Im Konto liegen alte Sitelink-Assets auf der **`.com`-Domain**
    (z.B. `lifetime-health.com/pages/agedna-start`). Nur in der PAUSED-Kampagne relevant; separat prüfen, ob
    irgendwo aktiv ausgespielt. Nicht Teil dieses Audits.

### F2 — [HOCH · Theme] Phosphor-Icons render-blocking von unpkg.com ✅ live bestätigt
- `sections/lt-pdp-quiz-v2.liquid` Z.15+17 lädt `@phosphor-icons/web@2.1.1/.../thin/style.css` von **unpkg.com**
  — render-blockierendes Third-Party-CSS **plus** Webfont-Fetch. Im Markup **doppelt** ausgegeben
  (Browser dedupliziert auf 1 Request, bleibt aber render-blocking). Live im `<head>` bestätigt.
- **Wirkung:** Verzögert FCP/LCP auf Mobile; unpkg-DNS/Verbindung/Download liegt im kritischen Pfad.
- **Fix (Theme):** Phosphor-Thin-Font lokal ins Theme legen (`assets/`) und mit `media="print" onload`-Trick
  bzw. `preload`+async laden, oder nur die ~12 genutzten Glyphen als Inline-SVG/Subset ausliefern.
  `<link>` entdoppeln. **Datei:** `sections/lt-pdp-quiz-v2.liquid`.

### F3 — [MITTEL · Theme] Intro-Bild eager + fetchpriority=high, aber auf Mobile **unter** dem Fold
- `sections/lt-pdp-quiz-v2.liquid` Z.89-96: Intro-Bild `loading="eager" fetchpriority="high"`.
- Auf Mobile stapelt das Grid (`.lt-quiz__intro-grid → 1fr`) in DOM-Reihenfolge: **Text+CTAs zuerst, Bild
  darunter**. Das große PNG ist also **below-the-fold**, beansprucht per `fetchpriority=high` aber
  Vorrang-Bandbreite gegenüber dem above-the-fold Content. Sinnvoll auf Desktop (Bild neben Text im
  Viewport), kontraproduktiv auf Mobile.
- **Fix (Theme):** `fetchpriority="high"` auf Mobile droppen (z.B. nur Desktop) bzw. `loading="lazy"` für
  Mobile; oder responsive `srcset` mit kleinerem Mobile-Asset. **Datei:** `sections/lt-pdp-quiz-v2.liquid`.

### F4 — [MITTEL · Theme/UX] Kein persistenter CTA auf Mobile (Checklist #2)
- Es existiert **kein** globaler Sticky-Bottom-CTA. Das einzige `position:sticky`-Element ist
  `.lt-quiz__footer` (der „Weiter"-Button) **innerhalb** Q6/Q8 im Fullscreen-Container
  (`assets/section-lt-pdp-quiz-v2.css` Z.831).
- **Wirkung:** Sobald der User die Intro nach unten scrollt, ist kein „Quiz starten / Test ansehen" mehr
  sichtbar — bis ganz unten die `risk_free_close`-Section (5 Sections tiefer).
- **Fix (Theme, optional/Test):** Mobile-Sticky-CTA-Leiste auf der Intro (z.B. „2-Min-Quiz starten" /
  „Test ansehen") die beim Scrollen pinnt. A/B-würdig.

### F5 — [MITTEL · UX] Langer Pfad zur PDP; Direkt-Pfad ist de-emphasiert (Checklist #6)
- **Direkt (1 Tap):** Intro-Sekundär-CTA „Jetzt Test bestellen →" → PDP. Aber **Ghost-Button**
  (visuell zurückgenommen), zweite Position.
- **Quiz (lang):** Start → **8 Fragen** (≈8-10 Taps inkl. 2× „Weiter") → **3s erzwungenes Loading** →
  langes, text-lastiges Result (3 Themen-Blöcke + 16 Pills) → erst dann PDP-CTA „Zum AGE&DNA-Test · 349€".
- **Wirkung:** High-Intent-Sucher („biologisches alter test") werden in einen langen Detour gezwungen oder
  müssen den unauffälligen Ghost-Button finden.
- **Fix (Theme, Test):** Direkt-zur-PDP-Pfad auf Mobile prominenter machen; ggf. Quiz kürzen / Loading
  verkürzen. Erst nach Tracking (F6) entscheiden, ob hier wirklich der Drop ist.

### F6 — [HOCH · Diagnostik, GTM nicht Theme] Tracking-Events existieren bereits ✅ live bestätigt
- **Korrektur zum Briefing:** `assets/lt-quiz-v2.js` pusht bereits in `window.dataLayer`:
  `quiz_started` (Intro-Button + URL-Param), `quiz_completed`, `quiz_pdp_click`, `quiz_email_submitted`.
- Live bestätigt: `window.dataLayer` existiert, **GTM (`gtm.js`) ist geladen**, gtag ist geladen,
  `lt-quiz-v2.js` ist live.
- **GTM-Forwarding live verifiziert (2026-06-04):** Klick auf „Quiz starten" feuert **1 GA4/Ads-Collect-Hit**
  (`quiz_started`); das erzwungene Result feuert **1 weiteren** (`quiz_completed`). GTM + `dataLayer` live,
  `lt-quiz-v2.js` lädt. **→ Tracking ist verdrahtet UND forwarded** (BJ hatte das vor ~Wochen gebaut — bestätigt).
- **Heißt:** Die Funnel-Daten **liegen bereits in GA4**. Es muss nichts gebaut werden.
- **Fix (Analyse, nicht Code):** In GA4 eine **device-segmentierte Funnel-Exploration** ziehen:
  `quiz_started → quiz_completed → quiz_pdp_click → (PDP) add_to_cart`, gefiltert auf die LP. Damit sieht man
  **direkt**, welcher der vier Funnel-Fälle oben Mobile killt — ohne Raten. **Das ist der diagnostische Top-Hebel.**
- **Caveat:** Verifiziert ist, dass `quiz_started` + `quiz_completed` je 1 Hit forwarden. Ob auch
  `quiz_pdp_click` / `quiz_email_submitted` als eigene GA4-Events ankommen, in GA4 DebugView kurz gegenprüfen.

### F7 — [Doku-Drift] live-pages-map.md ist veraltet ✅ live bestätigt
- `docs/live-pages-map.md` listet `/pages/quiz-age` als **„dead slug … heute nur Rich-Text"**.
- **Live-Realität:** `/pages/quiz-age` **ist** die aktive Quiz-Page (volles `lt-pdp-quiz-v2`,
  Section-ID `template--28347792130423__quiz_v2`), und `/pages/biologischer-alterstest-dna` redirectet
  dorthin. Die in der Map als „offen" gelistete Migration wurde also ausgeführt, aber nicht nachgepflegt.
- **Fix (Doku):** `live-pages-map.md` aktualisieren (Live gewinnt): quiz-age = aktiv; biologischer-… =
  Redirect-Quelle. Briefing-Referenz `page.meine-routine.json` ist vermutlich ebenfalls stale.

---

## Was im Code **gut** ist (widerlegt als Ursache)
- `<meta viewport>` korrekt (`width=device-width, initial-scale=1`) → Mobile rendert **nicht** desktop-skaliert.
- Quiz-Interaktion korrekt verdrahtet: jedes Snippet setzt `data-quiz-step` / `data-question-mode` /
  Advance-Hooks, die das JS erwartet.
- Tap-Targets ok: Slider-Stops 44×44px; Cards auf Mobile Full-width-Rows `min-height:88px`; Age = native Range.
- Above-the-Fold (Checklist #1) **wahrscheinlich ok**: Mobile stapelt Content (inkl. CTAs) **vor** dem Bild;
  Primary-CTA liegt damit über dem Bild. (Desktop-Messung: CTA-Unterkante 544 bei vh 670 = above fold.)
- Anchors `#quiz`, `#wissenschaft`, `#ablauf` existieren alle (in quiz-v2 / lt-hp-video-authority /
  lt-pdp-process-steps), je mit `scroll-margin-top:100px`.

## Noch real-device zu bestätigen (Chrome-Emulation blockiert)
1. **Above-the-Fold auf kleinen Phones** (iPhone SE ~667px): sitzt der Primary-CTA wirklich über dem Fold,
   oder drückt die große Headline + 3-Zeilen-Body ihn runter?
2. **Fullscreen-Takeover auf echtem iOS-Safari**: `position:fixed; inset:0` + `body{overflow:hidden}` ist
   eine bekannte iOS-Glitch-Zone; läuft das Quiz von q1→Result sauber durch, klebt der Sticky-„Weiter" (Q6/Q8)?
3. **Consent-Banner auf frischer Mobile-Session**: überlagert ein Cookie-/Consent-Layer den ersten Screen?
   (Im Desktop-Render kein blockierendes Banner sichtbar, aber Session war evtl. schon consented.)
4. **Anchor-Sprung `#wissenschaft`/`#ablauf` auf Mobile-Safari** real prüfen (Sitelink-Ziele).
- **Input:** 4-6 Handy-Screenshots (First Screen → Quiz-Fragen → Quiz-Ende → Result-CTA) reichen.

## Empfohlene Reihenfolge
1. **F1** Ad-Final-URL fix (Ads) — sofort, 0 Risiko, trifft QS + Latenz für **alle** Klicks.
2. **F6** GA4-Funnel ziehen — Wiring steht & forwarded (live bestätigt), Daten liegen schon in GA4. Device-segmentiert auswerten, bevor man UX blind ändert.
3. **F2 + F3** Perf-Fixes (Theme) — sichere Wins.
4. Danach datengetrieben **F4/F5** (Sticky-CTA / Pfad-Verkürzung) als A/B.

## Re-Messung (DoD)
Nach F1+F2+F3: 5-7 Tage Mobile-ATC-Rate auf der LP neu messen (Ziel zurück über Baseline 0,77 %).
Mit F6 zusätzlich: Quiz-Start-Rate, Mid-Quiz-Drop, Result→PDP-Klickrate, PDP→ATC — pro Device.
Eintrag ins Änderungs-Log von `google-ads-status.md`.

---

## Nachtrag 2026-06-05 — Funnel-Diagnose + Result-Page-Redesign (umgesetzt, gestaged)

**GA4-Funnel device-segmentiert gezogen (über GAds, Quiz-Events sind als GA4-Conversions importiert).**
Mobile (925 Klicks): `quiz_started` 170 (18,4 %) → `quiz_completed` 139 (**82 % der Starter**) → `quiz_pdp_click`
**18 (13 % der Completer)** → ATC 4. **Befund: Quiz top, Leak = Result-Page → PDP** (87 % der Completer klicken
nie weiter; Desktop ähnlich ~14 % → generelle Result-Page-Schwäche, Mobile = 88 % Volumen).

**Umgesetzt im Theme (gestaged):** Sticky-CTA, Früh-CTA in der Bio-Alter-Karte (dark teal), Guide-Form demoted;
Design: Bio-Alter-Reveal (Count-up + Delta-Skala statt rotem Dreieck), Data-as-Hero (Stockfoto raus),
Gen-Marker als Tokens, Thema #1 hervorgehoben, Scope-Pills teal-dominant + Count, leichter Header-Eintritt;
Mobile-Spacing oben + unter Subline gekürzt; tote Hero-Config entfernt. Zurückgestellt: Surface-Band-Rhythmus (#6, A/B).
Voller Eintrag: `lifetime-ads/google-ads-status.md` (2026-06-05, „Result-Page Conversion-Redesign").
