---
status: living
last_review: 2026-07-24
canonical_for: nmn-pdp-umsetzung-execution-state
supersedes: []
---

# NMN-PDP Umsetzung — Übergabe-Protokoll

Execution-State zum Konzept `docs/nmn-angebotsarchitektur.md` (= kanonische Strategie, dort steht
das Warum). Diese Datei ist der Ausführungsstand: was gebaut, was live, was offen. Wird superseded,
sobald das Paket live und QA-bestätigt ist.

## Stand in einem Satz

**LIVE seit 24.07. abends, QA grün.** Das komplette Paket ist deployed: Items 6–8, neue Buybox
(Größe in beiden Modi, Deep-Link → Abo, Takt je Größe), Appstle-Größen-Abos, Versandmodell
(Profil + Auto-Discount + Richtlinie + Theme-Copy), Sale-Ende. Live-QA per curl bestanden
(Buybox-Daten, Deep-Link-SSR, Supplement-Pillen, Cart-Bar 49 €). Offen nur noch: manuelle
Checkout-Testbestellung (BJ) und Merchant-Center-Re-Check ~26.07.

## Was LIVE ist (Stand 24.07. nachmittags)

- Theme: Commits sind **lokal**, nicht via Theme Manager gepusht. Live läuft weiter der alte Stand.
- Shopify Admin: unverändert. Streichpreise (compare-at) stehen noch, Sale läuft.
- **Appstle: UMGESTELLT und live** (BJ, 24.07., per API verifiziert): drei größenspezifische
  Gruppen „NMN 30/60/90 g" mit festen Preisen 29,90/53,90/71,90 € und Takt 2/4/6 Monate, je genau
  einer Variante zugeordnet. Alte „Spar-Abo"-Gruppe (10 %) ist vom NMN-Produkt entfernt (Gruppe
  existiert weiter für andere Produkte). Nebenwirkung auf die Live-PDP: die alte Buybox zieht den
  Abo-Preis aus der Allocation → 30-g-Abo zeigt live bereits 29,90 € statt 30,51 €. Kein kaputter
  Zustand, aber ein Grund, das Go-Live-Fenster zeitnah zu schließen.
- Merchant-Center-Check läuft noch bis ~26.07.

## Committet auf main (nicht gepusht)

| Commit | Inhalt |
|---|---|
| `a3e10ff` | Items 6–8 Theme: Chips reduziert, Siegel „Laborgeprüft", 13_nmn archiviert, €/100 g, Garantie/Kündigung novel-food-konform, Promo/Benefit-Icons aus, Trust-Pills entschlackt, Versand-Subline, Abo-Benefits, Badge echter %, CTA ohne Em-Dash |
| `912a76b` | Konzeptdokument `nmn-angebotsarchitektur.md` |
| `b924683` | Vorher vorhandener Working-Tree-Stand (parallele Arbeit, Blog-GEO, Housekeeping) |

Working Tree: nur `_examples/PlumberPowerUpSwiftUI.swift` + `plumber-power-up-preview.html` liegen
untracked herum. Gehören NICHT zum Theme (SwiftUI-Spiel-Demo), nicht committen, ggf. löschen.

## Entscheidungen (fix, nicht neu aufrollen)

- **Sommerpreis: sauber beenden**, kein neuer Streichpreis. 33,90/59,90/80,90 werden reguläre Preise.
  (Neuer Streichpreis wäre PAngV-widrig, weil 39,90 die letzten 30 Tage nicht verlangt wurde.)
- **Versandmodell bestätigt:** Abo immer frei; Einmalkauf DE gratis ab 49 €, sonst 4,90 €; AT/CH/NL
  Schwelle 99,01 → 59 €.
- **Kadenzen:** alle 2 / 4 / 6 Monate, KEIN monatlich (30 g reicht ~2 Monate). Default je Größe
  vorgewählt: 30→2, 60→4, 90→6.
- **Abo-Preise (fest, via Appstle):** 30 g 29,90 · 60 g 53,90 · 90 g 71,90.
- **Bestandsabos (35,91 €): NICHT anfassen** (BJ-Entscheid). Nicht angleichen, nicht anschreiben.
- **Zerlegung der Bestellzahlen: NICHT gemacht** (BJ-Entscheid, war optional).
- **90 g als Vorauswahl: verworfen.** 30 g bleibt Default. Variantenreihenfolge NICHT drehen
  (löst PAngV-Verstoß über compare-at-Kaskade aus). Details Konzept §6, §9a.
- **Treuestaffel: zurückgestellt**, nicht bauen. Re-Check erst bei 100 aktiven Abos.

## Go-Live-Sequenz (koordiniertes Fenster, Reihenfolge zwingend)

Die drei Live-Änderungen müssen zusammen passieren, sonst Mischzustand auf bezahlter PDP.

1. ~~**BJ/Appstle:** Brief abarbeiten.~~ **ERLEDIGT 24.07.** inkl. Plan-Namen 60/90 g und
   Rebill-Versandbefreiung (BJ bestätigt). Preise/Kadenzen wirken bereits live.
2. ~~**Claude:** Versandprofil setzen.~~ **ERLEDIGT 24.07., live und verifiziert:** DE 4,90 € bis
   48,99 €, frei ab 49 €; AT/CH/NL/IT 8,90 € bis 58,99 €, frei ab 59 € (Methode dort in
   „Gratisversand" umbenannt). Dazu Theme-weiter Versand-Copy-Sweep auf `main` (`fcaa267`,
   62 Stellen in 47 Dateien: alte 30/35/100-€-Schwellen und pauschales „Gratisversand" → 49-€-
   Formel; Cart-Gratisversand-Bar 35 → 49; Abo-Kontext-Aussagen bewusst belassen). Copy wirkt
   mit dem nächsten Theme-Push. **Versandrichtlinie: aktualisiert (BJ, 24.07., per API
   verifiziert)** — neue Fassung nennt 4,90/49 € DE, 8,90/59 € AT/CH/NL/IT und die
   Abo-Versandbefreiung ab Lieferung 1.
3. ~~**Claude:** compare-at entfernen.~~ **ERLEDIGT 24.07. auf BJ-Go, verifiziert:** alle drei
   compare-at leer, Zahlpreise 33,90/59,90/80,90 € unverändert = reguläre Preise. Rollback-Werte
   siehe unten. **Bis zum Theme-Push zeigt die Live-PDP noch den alten Promo-Banner (15 %,
   Countdown) ohne Streichpreise → Push zügig.**
4. ~~Branch mergen~~ **Merge auf main erledigt (Claude, 24.07., `496fd0c` + Format-Fix `33b4045`).**
   Syntax-/Schema-/JSON-Checks grün, Design-Review durch. **BJ (JETZT): Theme via Theme Manager pushen.**
5. **Live-QA (24.07., per curl auf der Live-Seite): BESTANDEN.** Kein Banner/Countdown/
   Streichpreis, Abo-Karte 29,90 € mit Plan „Alle 2 Monate", Pills mit data-sub-price/-plan-id je
   Größe (53,90/„Alle 4 Monate", 71,90/„Alle 6 Monate"), Grundpreise zweistellig, „spart
   7,90/20,80 €", Once-Subline 49 €, Deep-Link `?variant=60g` → Abo bleibt Default mit 60-g-Daten
   im SSR, Supplement-PDPs zeigen „Versandkostenfrei ab 49 €", Cart-Bar rechnet 49 €.
   **Manuell offen (BJ):** eine Checkout-Testbestellung (unter 49 € → 4,90 €; mit Abo →
   Rabattzeile „Gratisversand im Abo", 0 € Versand) + kurzer Mobile-Blick echtes Handy.

Falls Shopify-Token nur lesen kann (Memory `shopify-admin-write-path`): Schritte 2–3 gibt Claude als
Admin-Klicks/curl aus, BJ führt sie aus.

## Items 10 + 11: GEBAUT auf Branch, PREVIEW offen (24.07.)

**Gebaut und committet auf `feat/nmn-abo-groessen-2026-07-24` (Commit `80dd831`), nicht auf main.**
BJ previewt vor Merge/Push (Theme Manager: Branch auschecken, danach zwingend zurück auf main,
sonst kann ein Auto-Push die ungetestete Buybox live schieben).

Was gebaut wurde (`sections/lt-pdp-hero.liquid` + `templates/product.nmn-pulver.json`):
- Größen-Selector als eigene Zone VOR den beiden Kaufoption-Karten (§6 „erst Größe, dann Modus",
  die im Preview-Punkt genannte strukturelle Variante statt Opacity-Overrides). Immer sichtbar,
  kein Dimming-Konflikt, `bb_size_hint` (Render, JS, Schema) entfernt.
- `applySize()` schreibt die Größe auf BEIDE Karten und synct die aktive Karte neu; Größenklick
  erzwingt keinen Einmalkauf mehr. Min-Gramm-Schleife bestimmt nur noch den 30-g-Default.
- Abo-Preis je Größe aus `variant.selling_plan_allocations.first.price` als `data-sub-price` je
  Pill (Fallback `price × lt_sub_mult / 100`). Abo-Badge/-Streichpreis rechnen gegen den
  Einmalpreis derselben Größe.
- Liefertakt + Abo-Preis je Größe direkt aus der Varianten-Allocation (`data-plan-id` je Pill,
  Commit `ab65c0c`, ersetzt das frühere Namens-Mapping). Selektion über die Allocation mit fester
  Preis-Policy, damit eine parallel liegende Prozent-Gruppe nie fälschlich greift. Auf allen
  Nicht-Size-PDPs unverändert `ltPlans[0]`.
- Item 11: Deep-Link (`?variant=`) wählt nur noch die Größe vor, Abo bleibt Default; der
  Einmalpreis (= Feed-Preis) bleibt auf der Einmal-Karte sichtbar.
- Pills zeigen Mengenvorteil in Euro („spart 7,90 / 20,80 €") statt Aktionsersparnis; Grundpreis
  €/100 g bleibt. Once-Subline „Versandkostenfrei ab 49 €" rendert wieder. Template: Abo-Karte
  heißt „Im Abo" + Subline „Lieferrhythmus frei wählbar" (statt fix „Alle 2 Monate").

Bekannte Preview-Artefakte (self-correcting im Go-Live-Fenster): solange compare-at gesetzt ist,
zeigt die 30-g-Abo-Karte den Sale-Bezug (24 %); bis zur Appstle-Umstellung sind Abo-Preise noch
10-%-Krummpreise (30,51 € statt 29,90 €).

## Nachschärfungen 24.07. abends (BJ-Feedback + Erstkauf-Fokus)

- Pills nur noch Menge (30/60/90 g) + Störer „Bester Grundpreis" auf der 90-g-Pille; Abo-Subline
  = echter Liefertakt je Größe; Einmalkauf-Subline dynamisch (unter 49 € „zzgl. 4,90 € Versand",
  darüber „Versandkostenfrei"). aria-live am CTA-Text.
- **Fokus-Entscheid: 30-g-Abo ist der Default-Fokus** (niedrigste Hürde 29,90 € versandfrei,
  höchster Jahreswert 179,40 € bei 6 Touchpoints, knappste Deckung = geringstes
  Überlieferungs-/Kündigungsrisiko, bester Umsatz je Gramm). 90 g = Selbstläufer-Segment über
  den Grundpreis-Störer, 60 g ohne Förderung, Einmalkauf = Fallback mit Versand-Malus.
- Erstkauf-Enabler: Trust-Pill 3 „Kauf auf Rechnung (Klarna)" (Klarna in enabled_payment_types
  verifiziert) + Abo-Perk 4 Willkommens-Deal „Zur ersten Lieferung: Forschungsdossier (PDF) und
  10 % auf den AGE & DNA-Test" (neues Setting bb_benefit_4, nur bei NMN gefüllt).
- Einlösung des Willkommens-Deals: **Code angelegt und AKTIV** — `WILLKOMMEN10`
  (`DiscountCodeNode/2358693790071`), 10 % nur auf den AGE & DNA-Test, einmal pro Kunde,
  kombinierbar mit Versandrabatten. **PFLICHT-To-do (BJ): Zustellung einbauen** — Snippet für die
  Bestellbestätigung (Shopify Admin → Einstellungen → Benachrichtigungen → Bestellbestätigung)
  steht im Chat-Protokoll 24.07.; Dossier-PDF-URL dort einsetzen. Solange die Mail nicht live ist,
  wird der beworbene Vorteil nicht eingelöst → zeitnah einbauen oder Perk 4 vorerst leeren.
- Fokus-Konsolidierung (BJ-Entscheid): EIN Störer, „Willkommens-Vorteil" solid auf der Oberkante
  der Abo-Karte (`bb_sub_flag`); der 90-g-Pill-Störer „Bester Grundpreis" wurde wieder entfernt.

## Exakte Live-Aktionen (Werte)

**compare-at entfernen (Sale-Ende), Rollback-Werte notiert:**
- Produkt `gid://shopify/Product/7430130892900`
- 30 g `43186991136868`: compare-at 39,90 → leer
- 60 g `43186991169636`: compare-at 69,90 → leer
- 90 g `43186991202404`: compare-at 94,90 → leer
- Variantenpreise (bleiben): 33,90 / 59,90 / 80,90

**Versandprofil (Default „Allgemeines Profil", `gid://shopify/DeliveryProfile/86333554788`):**
- Zone Deutschland: Standardversand 4,90 € für 0–48,99 €; Gratis ab 49 €
  (heute: 5,50 € bis 29,99 €, gratis ab 30 €)
- Zone ACHNLIT: Gratis-Schwelle 99,01 → 59 €
- Abo-Lieferungen generell versandfrei: über Appstle (native Delivery-Profiles können „nur Abo" nicht)

**Appstle-Brief — Status 24.07. (per API verifiziert):**
```
1) Feste Abo-Preise 29,90 / 53,90 / 71,90 €        ERLEDIGT
2) Alle drei Varianten abonnierbar                  ERLEDIGT (je Größe eigene Gruppe)
3) Intervalle 2/4/6 Monate, kein monatlich          ERLEDIGT (Takt hängt an der Gruppe je Größe)
4) Bestehende aktive Abos nicht ändern              unberührt (Contracts snapshotten Konditionen)
5) Abo-Lieferungen versandkostenfrei                OFFEN — in Appstle bestätigen/testen
```

**Appstle-Restpunkte (BJ, vor oder mit dem Go-Live-Fenster):**
- Plan-Namen der 60-/90-g-Gruppen umbenennen: heute „Monthly Subscription" (sachlich falsch bei
  4/6-Monats-Takt und englisch), Ziel „Alle 4 Monate" / „Alle 6 Monate". Kundensichtbar in Cart,
  Checkout, Bestellbestätigung und Kundenkonto. Der 30-g-Plan heißt bereits korrekt „Alle 2 Monate".
  (Die Buybox mappt seit `ab65c0c` NICHT mehr über Namen — rein kosmetisch/kundenseitig.)
- Punkt 5 (Abo versandkostenfrei): **GELÖST 24.07., zweiteilig.** Appstle kann nur die
  Folgelieferungen befreien (ab Lieferung 2, weil Appstle nur die Rebills selbst erzeugt; die
  Erstbestellung läuft durch den normalen Shopify-Checkout mit Versandprofil). Deshalb:
  - Lieferung 1: automatischer Shopify-Rabatt **„Gratisversand im Abo"** angelegt und AKTIV
    (`gid://shopify/DiscountAutomaticNode/2358572319095`, `appliesOnSubscription: true`,
    `appliesOnOneTimePurchase: false`, alle Länder, recurringCycleLimit 1). Die zuvor offene
    Versandfalle (29,90-€-Abo unter der 30-€-Grenze → 5,50 € Versand) ist damit geschlossen.
  - Lieferung 2+: Appstle-Einstellung „versandkostenfrei ab 2. Lieferung" (BJ, in Appstle).
    Muss aktiv sein, sonst kosten Rebills Versand — bei Live-QA mitprüfen.

## Harte Rahmenbedingungen

- **Theme Manager pusht täglich** aus dem lokalen Stand → alles auf `main` kann jederzeit live gehen.
  Deshalb geht Item 10 auf einen Branch, nicht auf main, bis previewt.
- **Kein Preview in der Claude-Session** (kein `shopify theme dev`-Auth bestätigt). Buybox-Änderungen
  müssen von BJ im Theme Manager previewt werden.
- **Shopify Write-Path unsicher** (Memory `shopify-admin-write-path`): ggf. nur Env-Vars + curl.
- **Merchant-Center-Check bis ~26.07.** Sale-Ende ist harmlos (Streichpreis weg, Zahlpreis bleibt),
  aber es ist eine Feed-Änderung im laufenden Check. Bewusst akzeptiert.

## QA-Checkliste nach Push (live prüfen)

- Kein Promo-Banner/Countdown mehr, kein Streichpreis auf Einmalpreis
- Abo-Karte: Preis (nach Appstle 29,90), Badge zeigt echten % (~12 %), nicht 24 %
- Grundpreis überall €/100 g (Buybox-Karten + Size-Pills konsistent)
- Trust-Pills: Lieferzeit + ohne Zusätze + Forschungszweck (kein „Gratisversand"-Pill)
- Arzt-Badge: nur noch Chip „20+ Jahre Forschung", Siegel-alt-Text „Laborgeprüft"
- Garantie-Popup: neue novel-food-konforme Fassung + Widerrufsrecht
- Kasse: Versand 4,90 € unter 49 €, frei ab 49 €, Abo frei
- (nach Item 10) 60/90 g im Abo bestellbar, Kadenz je Größe korrekt vorgewählt
