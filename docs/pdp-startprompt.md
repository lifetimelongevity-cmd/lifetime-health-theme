---
status: living
last_review: 2026-11-16
canonical_for: startprompt für den umbau der nächsten supplement-pdp
---

# Startprompt für die nächste PDP

Stand nach NAD⁺, Kreatin, Resveratrol, D3+K2, TMG und den sieben parallel gebauten PDPs vom 16.11.2026 (Spermidin, Fisetin, CaAKG, Hyaluron, B-Komplex, Schlafspray, Astaxanthin, alle live seit 16.11. 18:03). Offen sind nur noch die Bundles. In einen neuen Chat kopieren,
`<Produkt>` ersetzen. Nach jeder PDP-Runde die neuen Lehren hier und im Memory
„NAD⁺-/Kreatin-PDP als Muster“ nachziehen.

```
/denkschule Nächste Produktseite: <Produkt>. Bestehende Live-PDP ansehen und umbauen wie NAD⁺, Kreatin und Resveratrol (Stand in lifetime-health-theme/docs/pdp-system.md, Memory „NAD⁺-/Kreatin-PDP als Muster“). Steht oben noch „<Produkt>“, frag zuerst nach dem Produkt.

Ablauf (drei Chats wie bei Kreatin):
1. Hier: Denkschule auf die Live-Seite. Template-Suffix am Produkt per Shopify-MCP bestätigen, nicht aus dem Dateinamen raten. Danach startest du auf mein Ja eine eigene Sitzung für den Entwurf.
2. Entwurf-Sitzung: HTML-Entwurf unter lifetime-health-theme/docs/entwurf-<produkt>-pdp-<datum>.html, Vorschau über http://localhost:8789/. Bauvorlage ist docs/entwurf-tmg-pdp-2026-11-16.html (mit zugelassenem Claim), docs/entwurf-resveratrol-pdp-2026-11-08.html (ohne Claim) oder docs/entwurf-d3k2-pdp-2026-11-08.html (ohne Abo), Kette wie NAD⁺/Kreatin: lt-pdp-hero · lt-pdp-wirkprinzip · lt-pdp-belege · lt-pdp-reviews-all · lt-pdp-produktfakten · crs-faq-accordion. main_product_hidden fliegt raus. Bilder und Optik mit /impeccable.
3. Erst nach meinem Ja: Template bauen. Ein Vorschau-Theme nur, wenn ich es will (16.11.: „alle ohne vorschau theme“, die Theme-Bibliothek hat nur 20 Plätze); sonst lt-check und theme check, nach meinem Push live bei 375 und 1280 px messen und den Warenkorb in Chrome testen. Live pushe ich selbst per Theme Manager.
Die drei Schritte dürfen in einer Sitzung laufen. Laufen mehrere PDPs parallel, Titelzeilen untereinander abgleichen (16.11. zielten Hyaluron und Astaxanthin beide auf Haut).

Gleich wie NMN, nach jeder Optik-Runde neu abgleichen:
- Kaufzone exakt wie Live-NMN. Preis im Knopf („Abo starten, 22,41 €“) ist das Muster, kein Fehler. Zu entfernen sind Chips in den Karten, €/Tag, Streichpreis, ODER und Benefit-Listen.
- Hat das Produkt nur eine Größe: compact_sub_hint, compact_amount_grams (Grundpreis statt €/Tag) und compact_once_ship setzen. Bei „Einmalig“ unter 49 € darf nie „Versandfrei“ stehen. Fehlt die Füllmenge, frag mich, bevor der Tagespreis stehen bleibt.
- FAQ zu Versand, Abo und Garantie wörtlich von Live-NMN.
- Typografie wie NMN: sechs Größen, zwei Gewichte, H1 mobil 30 px, H2 mobil 28 px (nur FAQ 24 px), Karten 49 px, Knopf 48 px.

Inhalt:
- Job aus Sicht der Käuferin, 50 bis 65, zwei Drittel Frauen. Keine Sportler-Sprache.
- Im EU-Register nach zugelassenen Health Claims des Wirkstoffs suchen und den nehmen, der am besten zu 50 bis 65 passt. Fundstelle prüfen.
- Gibt es keinen zugelassenen Claim, von Anfang an die Grauzonen-Fassung: Die Titelzeile spricht die Lage an, ohne Wirkung zu versprechen (Muster „Für Frauen, die an ihre Knochen denken.“), Studien stehen als „erforscht an“, keine Wirkverben wie „bremst“ oder „mehr“. Zugelassene Claims von Begleitnährstoffen dürfen rein.
- Die Einblendung im Wirkprinzip nur mit einer echten Studienzahl aus passender Altersgruppe, am Volltext geprüft. Studiendosis und ein fremdes Präparat stehen in der Quellenzeile. Ohne eigenen Messwert trägt die Belege-Section eine Bildkarte.
- Kundenstimmen nur, wenn Loox echte Texte hat. Sonst die Stimmen-Karte aus und nur die Lade.
- Menge, Dosis und Reichweite einmal und nur aus dem Etikett der heute verkauften Form. Die aktuellen Druck-PDFs liegen unter ~/Desktop/Projekte/Produkte/2 Druckdaten/ (Druckfreigaben Juni 2025/, Etiketten Dosen/), finden per mdfind, rendern mit pdftoppm -r 400 bis -r 700. Im Download-Archiv liegen oft nur alte Formen (bei TMG das Pulver-Sachet). Form gegen die SKU prüfen.
- Bei Novel-Food-Wirkstoffen Höchstmenge, Herkunft und Pflichthinweis der Zulassung gegen das Etikett prüfen und mir das einmal in der ersten Runde sagen.

Bilder:
- Gesicht sichtbar: echtes Pexels-Foto ohne Produkt. Produkt im Bild: kuratierter Produktshot ohne Menschen per Codex-CLI (Befehl im Memory „Neue Bilder über ChatGPT-App“). Nie Menschen oder Hände per KI.
- Pexels-Downloads gesammelt einmal bei mir freigeben lassen.
- Das Wirkprinzip-Foto vorher so zuschneiden, dass die Glaskarte mobil und am Desktop kein Gesicht verdeckt. Einen Fokuspunkt kann man weder per Section noch per API setzen.
- Immer das größte Original verwenden, höchstens 25 MP (Shopify-Grenze), sizes an die gezeigte Breite anpassen.

Stolpersteine aus den acht PDPs vom 16.11.2026:
- Erste Runde per Shopify-MCP auch sellingPlanGroupsCount, totalInventory und inventoryPolicy abfragen (Schlafspray hatte eine Abo-Karte ohne Plan, Astaxanthin ist ausverkauft) und die SEO-Beschreibung am Produkt mitlesen (TMG: „Pulver“ statt Kapseln).
- Grundpreis je kg, nicht je 100 g (§ 5 PAngV): compact_amount_unit „kg“, Füllmenge aus „℮ … g“ auf dem Etikett. Der Chip „Du sparst X € inkl. Versand“ (compact_save_ship) ist Standard.
- Hero-Punkte höchstens etwa 45 Zeichen. Marken auf der Belege-Bildkarte rechts von 55 % setzen, ab 1008 px ist nur die rechte Bildhälfte zu sehen; im Theme messen, nicht im Screenshot.
- Darstellung „Fakten“ zeigt in der Lade keine Nährstoffe: Gehalt und NRV als ersten Satz in legal_note. Bei vielen Nährstoffen muss der Etikett-Ausschnitt die ganze Tabelle zeigen (Zoom etwa 1,55), sonst passt Zoom 1,8 bei 4,5 % / 11 %.
- Wirkprinzip-Foto im Querformat: Gesicht im oberen Drittel, einbl_mobile_vw etwa 80 × Seitenverhältnis. Die Glaskarte braucht einen Unterschied zwischen Gruppen; Studien ohne Vergleichsgruppe nicht nehmen.
- Claim-Bedingung wörtlich lesen (Melatonin: genau 1 mg). Mineralsalze gegen Anhang II der RL 2002/46/EG prüfen. Novel-Food-Katalog nach Wirkstoff und nach Pflanze oder Alge getrennt durchsuchen. Katalog und EUR-Lex liest nur Chrome (document.body.innerText), WebFetch liefert leere Seiten. Captchas nicht lösen, Volltexte aus PMC nehmen.
- „NMN nie als Begleiter“ gilt auch für das Warenkorb-Angebot: Das kommt aus den Ergänzungsprodukten des Produkts (Metafeld complementary_products).
- Loox: alte Blöcke stehen teils auf is_sample: true. Gegenprobe über loox.io/widget/26RXJPC59s/reviews/<product_id>.
- Pexels im Entwurf direkt vom CDN verlinken, Zuschnitt per object-view-box. Geladen wird erst nach meinem Ja zum Entwurf. Hochladen ohne mich: stagedUploadsCreate, curl mit --form-string, fileCreate mit filename; Tausch per fileUpdate. Bilder im Entwurfsordner nur bis etwa 2000 px committen. Codex-Stillleben mit zwei -i (freigestellte Dose plus ein früheres Stillleben als Vorlage).
- Produktbild 1 kommt aus den Produktmedien (gallery_first_only). Alte Claim-Bilder dort wirken in Google Shopping weiter: in der ersten Runde ansprechen.
- Sofort nach dem Schreiben committen, erst dann prüfen: Der Theme Manager nimmt unkommittierte Templates mit (16.11. gingen so drei Templates live). Bei parallelen Sitzungen lt-check nur auf die eigene Datei, --changed läuft Minuten.
- 403-Meldungen von Shop Pay und einem Lambda-Pixel im Headless-Test sind die Bot-Sperre, kein Fehler der Seite.

Offene Fragen gleich in der ersten Runde an mich: Titelzeile, Mehrfach-Packung oder zweite Variante, Prüfbericht je Charge, Füllmenge für den Grundpreis.

Vor meinem Push: Live-Theme in einen Zwischenordner ziehen und Dev gegen Live vergleichen. Keine unkommittierten Zeilen im Theme liegen lassen, der Theme Manager nimmt sie mit. Sag mir, welche Commits mitgehen. Nach dem Push live per Claude in Chrome prüfen (curl bekommt 429), ist Chrome nicht verbunden, im eingebauten Browser.

Git: nur eigene Dateien committen.
```
