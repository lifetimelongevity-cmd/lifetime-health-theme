---
status: snapshot
last_review: 2026-10-23
canonical_for: Klickweg Startseite/PDP bis Kasse, Entwurf 23.10.2026
---

# Klickweg zur Kasse, Entwurf 23.10.2026

Branch `claude/klickweg-kasse-09f8e5`. Vorschau-Theme „Claude Entwurf Klickweg 23.10.“ = **194006909303**
(https://lifetime-health-de.myshopify.com?preview_theme_id=194006909303). Gebaut als Live-Kopie
(Pull vom 23.10.) plus die fünf Dateien unten; Roundtrip per Pull geprüft, Shopify behält die
geleerten Settings.

Ausgangslage: Live-Templates `index.json`, `product.age-dna-test.json`, `product.nmn-pulver.json`,
`config/settings_data.json`, `sections/header-group.json` waren am 23.10. semantisch gleich HEAD.

## Klicks bis zur Checkout-URL (mobil 375×812, Browser-Pane, nichts gekauft)

| Weg | Vorher (Live) | Nachher (Vorschau) |
|---|---|---|
| Startseite → Test-PDP → Kasse | 2 (Hero-Knopf, „Test bestellen“ = Direktweg) | 2, gemessen |
| Test-PDP → Kasse | 1 (Direktweg `direct_checkout`) | 1, gemessen |
| NMN-PDP → Kasse, Abo (vorausgewählt) | 2 (Kaufknopf, „Zur Kasse“ im Drawer, Knopf bei 501 px) | 2 |
| NMN-PDP → Kasse, einmalig | 3 (Karte „Einmalig“, Kaufknopf, „Zur Kasse“ bei 544 px) | 3, gemessen |
| Startseite → NMN → Kasse (Abo) | 3 (Knopf „Größe wählen“ in Bereiche, Kaufknopf, Kasse) | 3, Knopf heißt jetzt „NMN bestellen“ |

Die Klickzahl war schon am Minimum für den Test. Gewonnen hat der Entwurf bei den Abzweigungen:
**Ausgänge mitten im Kaufweg 6 → 2** (die zwei verbleibenden sind Richtext der Text-Diät, siehe unten),
**Kauf-Labels 7 Varianten → 2 Muster** („Test bestellen“, „NMN bestellen“, auf den PDPs mit Preis-Zusatz).

## Fixes

| Wo | Vorher | Nachher |
|---|---|---|
| Startseite Hero (`cta_label`) | „Zum AGE & DNA-Test →“ | „Test bestellen →“, Ziel unverändert Test-PDP |
| Startseite `lt-hp-test` Knopf | „AGE & DNA-Test bestellen →“ | „Test bestellen →“ |
| Startseite `lt-hp-test` Link | „Was genau enthalten ist →“ auf `/pages/was-ist-enthalten` | entfernt (`link_label` leer) |
| Startseite `lt-hp-video-vsl` | „Wie wir forschen →“ auf `/pages/unsere-forschung` | entfernt (`forschung_link_url` leer) |
| Startseite `lt-hp-bereiche` NMN-Karte | „Größe wählen“ | „NMN bestellen“ |
| Startseite `lt-leiste` (Schluss) | „AGE & DNA-Test bestellen →“ | „Test bestellen →“, ein Knopf, Ziel Test-PDP; Schema-Default mitgezogen |
| Mobiles Menü (`mc_cta_label`) | „Biologisches Alter ermitteln“ | „Test bestellen“ |
| Test-PDP `lt-pdp-belege` | „Alle Details“ auf `/pages/was-ist-enthalten` | entfernt (`labor_reports_url` leer) |
| NMN-PDP `lt-pdp-belege` | „Alle Prüfberichte je Charge“ auf `/pages/nmn-pruefberichte` | entfernt; der Prüfbericht-PDF bleibt im Hero (neuer Tab) |
| NMN-PDP `cta_label`/`sticky_cta_label` | Setting fehlte („Jetzt kaufen →“), Sticky „Abo starten“ | beide „NMN bestellen“ (Erst-Render und ohne JS) |

Bewusst geblieben: Bewertungs-Link der Startseite (führt auf die Test-PDP), „Produkte ansehen“ in
`lt-hp-bereiche` (Sortimentsweg, vorletzte Section), Beratungs-Links in `lt-hp-fragen` (am Ende),
Rechts- und Datenschutz-Popups im Hero, Muster-Auswertung und Prüfbericht (öffnen im neuen Tab).

## Geprüft, ohne Änderung

- **Direktweg Test:** Klick bis Checkout funktioniert auf Live und Vorschau, Drawer bleibt zu.
- **Drawer NMN:** Abo landet mit Plan „Alle 2 Monate“ im Korb, einmalig ohne Plan; „Zur Kasse“
  oberhalb des Kreatin-Angebots ohne Scrollen sichtbar, Shop Pay/PayPal/G Pay darunter.
- **Entscheid NMN ohne Direktweg:** Der Drawer kostet einen Klick, trägt aber das einzige
  AOV-Angebot (Kreatin) und den Abo-Wechsel. Umschalten wäre ein Template-Setting
  (`direct_checkout: true` am `main` in `product.nmn-pulver.json`), kein Code.
- **Overlays:** Theme-Popups (`popups`, `exit-intent-popup`, Altersabfrage) sind alle aus.
  Ankündigungsleiste einzeilig, ohne Link. Shopify-Inbox-Chat (50 px, unten rechts) rückt über die
  Sticky-Kaufleiste (Chat 689–739 px, Leiste ab 751 px), verdeckt also keinen Kaufknopf.

## Offene Punkte

Außerhalb des Themes oder außerhalb meiner Dateien:

1. **Consentmo-Banner und Klaviyo-Popup nicht gemessen.** Die Browser-Pane hatte den Consent im
   localStorage (`csmConsentIdentifier`, `gdprCache`), auch nach Löschen der Cookies kam kein Banner.
   Messung braucht ein frisches Profil; Änderungen an Consentmo/Klaviyo-Formularen bewusst nicht gemacht.
2. **NMN-Kauflabel per JS:** `lt-pdp-hero` überschreibt das Label nach dem Laden mit
   „Abo starten, 28,90 €“ / „Einmalig kaufen, 33,90 €“ (Haupt- und Sticky-Knopf, Zeile ~2572). Das
   nenne ich gut (sagt, was gekauft wird), es weicht aber vom Muster „NMN bestellen“ ab. Hero-Datei
   gehört dem Unterchat „Erster Bildschirm“.
3. **Test-PDP Kaufknopf liegt bei 930 px**, also unter dem ersten Bildschirm (812 px); auf NMN 934 px.
   Hero-Aufbau, an „Erster Bildschirm“.
4. **Hero-Startseite:** Quiz-Link „Passt der Test zu mir?“ direkt unter dem Kaufknopf ist ein zweiter
   Weg im ersten Bildschirm. Gelassen (Quiz-Funnel mit eigener Messung), Entscheidung Hero-Unterchat.
5. **Zwei Blog-Links in NMN-Belege** (`labor_compare` → nmn-gehalt-marktanalysen,
   `rohstoff_details_body` → uthever-nmn) und einer in der NMN-FAQ (Rechtsstand, am Seitenende).
   Richtext gehört der Text-Diät, Bitte ist dort hinterlegt.
6. **Test-Kauflabel mit festem Preis** („Test bestellen, 349 €“ in `cta_label`): ändert sich der Preis,
   muss das Label von Hand mit. Hero hängt im Standalone-Pfad keinen Preis an.
7. **Appstle-Hinweis im Drawer** bei Abo: „Ein oder mehrere Artikel in deinem Warenkorb ist/sind ein…“
   (Grammatik, abgeschnitten). Text kommt aus Appstle, nicht aus dem Theme.

## Geänderte Dateien

`templates/index.json`, `templates/product.age-dna-test.json`, `templates/product.nmn-pulver.json`,
`sections/header-group.json`, `sections/lt-leiste.liquid`, dieses Dokument.
