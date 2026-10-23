---
status: snapshot
last_review: 2026-10-23
canonical_for: erster Bildschirm mobil (375×812) auf Startseite, AGE&DNA-PDP, NMN-PDP
---

# Entwurf 23.10.2026: Erster Bildschirm kauft

Ziel: Auf 375×812 ohne Scrollen sind Bild, Name, Nutzen, Bewertung, Preis und Kauf-Knopf sichtbar.
Gemessen per Headless-Chrome über CDP (`Emulation.setDeviceMetricsOverride` 375×812, DPR 2, Mobile-UA),
Cookie-Banner entfernt, y = Oberkante des Knopfs ab Seitenanfang. Vorher = Live-Theme
`lifetime-genesis-2026-APR` (192529400183), nachher = Vorschau-Theme
**„Claude Entwurf Erster Bildschirm 23.10.“ (194006974839)**,
<https://lifetime-health-de.myshopify.com/?preview_theme_id=194006974839>.

Ausgangslage: Live-Stand der drei Templates und beider Sections war identisch mit HEAD (af983c1), kein Drift.

## Knopf-Position

| Seite | Knopf | vorher y (oben–unten) | nachher y | Falz 812 |
|---|---|---|---|---|
| AGE&DNA-PDP | „Test bestellen, 349 €“ | 930–978 | **678–726** | vorher drunter, jetzt drin (86 px Luft) |
| NMN-PDP | „Abo starten, 28,90 €“ | 934–982 | **733–781** | vorher drunter, jetzt drin (31 px Luft) |
| Startseite | „Zum AGE & DNA-Test“ | 477–520 | **321–365** | war drin; Bild begann bei 611, jetzt ganz drin (443–803) |

Screenshots in `docs/entwurf-2026-10-23-erster-bildschirm/` (`vorher-*` und `nachher-*`, je 375 px, 2x).

## PDPs (`sections/lt-pdp-hero.liquid`)

Alles hängt an der vorhandenen Root-Klasse `.lt-pdp-hero-section--compact` (Setting `bb_compact`,
nur NMN und AGE&DNA), die 16 anderen PDPs bleiben unberührt. Mobil (≤ 767 px):

- Galerie 86 % hoch statt quadratisch, `object-fit: cover`, Bildausschnitt bei 35 % vertikal (Titel „AGE & DNA“ und Beutelkopf bleiben im Bild).
- Abstände Header → Bild 24 → 8 px, Bild → Text 24 → 12 px, Punkte-Navigation enger.
- Überschrift-Paar 33,75 → 30 px, Abstand darunter 24 → 12 px.
- AGE&DNA-Bullets in Body-sm (14 px), dadurch zwei der drei einzeilig. **Überschrift-Paar und drei Bullets bleiben** (BJ-Entscheid af983c1).
- Preisnotiz „Einmalig, kein Abo. Der Alterswert allein …“ steht in der kompakten Kaufzone jetzt **unter dem Knopf** (neue Zeile `.lt-pdp-hero__post-note`, gilt auch Desktop). Preis 349 € mit Streichpreis bleibt über dem Knopf.
- NMN: Größen-Pills 56 → 44 px, Modus-Kacheln einzeilig („Einmalig 33,90 €“ bricht nicht mehr um), Hinweis „Lieferung alle 2 Monate, versandfrei.“ und Grundpreis in einer Zeile.
- Sticky-Kaufleiste: war vorhanden und korrekt (erscheint, sobald der Knopf aus dem Bild ist, `data-lt-sticky-gate`). Einzige Korrektur: Knopftext nicht mehr in Versalien, damit er wie der Hero-Knopf liest.
- Direktweg zur Kasse (`direct_checkout`) unangetastet.

NMN: Der Untertitel bleibt „Uthever®, laborgeprüft“, kein Wirk-Nutzen-Satz (VSW-Vergleich).

## Startseite (`sections/crs-hero-typewriter.liquid`, `templates/index.json`)

- Kein Schreibmaschinen-Effekt im Spiel: die Überschrift steht statisch, Animation gibt es nur in der Dashboard-Variante. Nichts verzögert Satz oder Knopf.
- Lead-Satz „Der einzige Test, der …“ geleert (`lead: ""`), es bleibt ein Satz (Überschrift-Paar), Sterne, ein Knopf direkt zur AGE&DNA-PDP, Faktenzeile.
- Mobil (≤ 640 px): Oben-Padding höchstens 64 px statt 120 (Header liegt transparent darüber, 47 px), engere Abstände, Bild auf 360 px Höhe begrenzt statt Breite, damit es samt eingebrannter Ergebniskarten (49 / 42 Jahre) ganz im ersten Bildschirm steht. Das Bild wird nicht beschnitten (die Karten sitzen im unteren Drittel).
- Quiz-Link bleibt als leiser Textlink unter dem Bild.
- Bild unverändert `lt-hero-sport-alter.webp` (vorhandene Shop-Datei).

## Nicht in meiner Zuständigkeit, gesehen

- **Chat-Blase (Shopify Inbox) unten rechts liegt mobil auf dem Kauf-Knopf** (AGE&DNA bei y≈674–724, NMN ähnlich) und verdeckt dessen rechtes Ende. Sollte mobil nach oben versetzt oder auf PDPs ausgeblendet werden.
- Sticky-Leiste zeigt den Preis mit „,00“ („349,00 €“), der Hero ohne.
- Das erste AGE&DNA-Produktbild ist die Marketing-Kachel (App-Badges, Eurofins), kein Kit-Foto. Bessere Wahl wäre `Product-gallery_tst.png` als erstes Medium, das ist aber eine Produkt-Änderung in Shopify.

## Vor dem Push prüfen

Templates: nur `templates/index.json` (eine Zeile, `lead`). Vor dem Push Live-Template ziehen (Pull-vor-Push), sonst überspringt die CLI das JSON still.
