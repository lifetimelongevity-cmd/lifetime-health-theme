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

Theme-Code für Items 6–8 ist auf `main` committet (3 Commits vor origin), **aber noch nirgends
live**: kein Theme-Push, keine Shopify-Admin-Änderung, keine Appstle-Änderung. Items 10 + 11 sind
noch nicht gebaut. Go-Live ist ein koordiniertes Fenster, das noch aussteht.

## Was LIVE ist: nichts davon

- Theme: die 3 Commits sind **lokal**, nicht via Theme Manager gepusht. Live läuft weiter der alte Stand.
- Shopify Admin: unverändert. Streichpreise (compare-at) stehen noch, Sale läuft.
- Appstle: unverändert. Abo rechnet weiter 30,51 €, nur 30 g abonnierbar.
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

1. **BJ/Appstle:** Brief abarbeiten (siehe unten). Preise, Kadenzen, Abo-Versand-frei.
2. **Claude, auf BJ-Signal:** Versandprofil setzen (DE 49 €, 4,90 €; AT/CH/NL 59 €).
3. **Claude, auf BJ-Signal:** compare-at auf den 3 NMN-Varianten entfernen (= Sale-Ende).
4. **BJ:** Theme via Theme Manager pushen.
5. **Gemeinsam:** Live-QA (Checkliste unten).

Falls Shopify-Token nur lesen kann (Memory `shopify-admin-write-path`): Schritte 2–3 gibt Claude als
Admin-Klicks/curl aus, BJ führt sie aus.

## Offene Bauarbeit: Items 10 + 11 (Branch, PREVIEW-pflichtig)

**Noch nicht gebaut.** Macht 60/90 g abonnierbar + Deep-Link → Abo. Der konversionsstärkste Teil,
hier NICHT previewbar in der Session → auf eigenem Branch bauen, BJ previewt vor Merge/Push.

Betroffen: `sections/lt-pdp-hero.liquid`
- Abo-Karte ist per Min-Gramm-Schleife auf die kleinste Variante gepinnt (~Z. 717–726). Auflösen.
- `applySize()` (~Z. 1611) schreibt Größe nur auf die Einmal-Karte, Kommentar „Abo-Karte bleibt 30 g".
  Muss auf BEIDE Karten schreiben und die aktuell gewählte Karte neu syncen, nicht Einmalkauf erzwingen.
- Größen-Change-Listener (~Z. 1660) ruft `applySize(this, true)` → auf `false`/kein-Force ändern.
- Größen-Pills brauchen `data-sub-price` je Variante aus `variant.selling_plan_allocations.first.price`
  (Fallback `variant.price × lt_sub_mult / 100`), damit die Abo-Karte den festen Abo-Preis je Größe zeigt.
- CSS: `.lt-bb-card--once:not(.is-selected) .lt-size { display:none }` (~Z. 2111) entfernen, sonst ist
  der Größenselektor im Abo-Modus unsichtbar. ACHTUNG Dimming: Größen-Pills dürfen nicht mitgedimmt
  werden, wenn die Einmal-Karte nicht selektiert ist → Opacity-Override prüfen ODER Selektor über beide
  Karten ziehen (§6 „erst Größe, dann Modus"). Genau das ist der Preview-Punkt.
- Item 11: Deep-Link (`lt_deeplinked`, ~Z. 735–770) darf Größe vorwählen, aber Abo als Default lassen,
  statt auf Einmalkauf zu schalten. ERST nach Item 10 sicher (sonst Feed-Preis ≠ Landingpage-Preis).
- QA-Risiko Selling Plan: `syncFromCard` nutzt `ltPlans[0].id`. Prüfen, ob je Variante derselbe Plan
  gilt (Appstle 1 Gruppe, per-Variante-Preis = ok; per-Variante-Pläne = anpassen).

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

**Appstle-Brief (fertig, zum Abschicken):**
```
Appstle – Abo-Plan „NMN Pulver" (lifetime-nmn)
1) Feste Abo-Preise je Variante: 30 g 29,90 · 60 g 53,90 · 90 g 71,90 € (nicht Prozent)
2) Alle drei Varianten (30/60/90 g) abonnierbar
3) Lieferintervalle nur alle 2/4/6 Monate, KEIN monatlich; Default 30→2, 60→4, 90→6
4) Bestehende aktive Abos NICHT ändern
5) Abo-Lieferungen versandkostenfrei
Timing: mit Theme-Push (~heute) zusammen aktivieren.
```

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
