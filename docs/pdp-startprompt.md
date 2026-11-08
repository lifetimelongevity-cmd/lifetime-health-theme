---
status: living
last_review: 2026-11-08
canonical_for: startprompt für den umbau der nächsten supplement-pdp
---

# Startprompt für die nächste PDP

Stand nach NAD⁺ (live 06.11.2026) und Kreatin (live 08.11.2026). In einen neuen Chat kopieren,
`<Produkt>` ersetzen. Nach jeder PDP-Runde die neuen Lehren hier und im Memory
„NAD⁺-/Kreatin-PDP als Muster“ nachziehen.

```
/denkschule Nächste Produktseite: <Produkt>. Bestehende Live-PDP ansehen und umbauen wie NAD⁺ und Kreatin (Stand in lifetime-health-theme/docs/pdp-system.md, Memory „NAD⁺-/Kreatin-PDP als Muster“). Steht oben noch „<Produkt>“, frag zuerst nach dem Produkt.

Ablauf (drei Chats wie bei Kreatin):
1. Hier: Denkschule auf die Live-Seite. Template-Suffix am Produkt per Shopify-MCP bestätigen, nicht aus dem Dateinamen raten. Danach startest du auf mein Ja eine eigene Sitzung für den Entwurf.
2. Entwurf-Sitzung: HTML-Entwurf unter lifetime-health-theme/docs/entwurf-<produkt>-pdp-<datum>.html, Vorschau über http://localhost:8789/. Bauvorlage ist docs/entwurf-kreatin-pdp-2026-11-06.html, Kette wie NAD⁺/Kreatin: lt-pdp-hero · lt-pdp-wirkprinzip · lt-pdp-belege · lt-pdp-reviews-all · lt-pdp-produktfakten · crs-faq-accordion. Bilder und Optik mit /impeccable.
3. Erst nach meinem Ja: Template und Dev-Theme in einem Unterchat. Live pushe ich selbst per Theme Manager.

Gleich wie NMN, nach jeder Optik-Runde neu abgleichen:
- Kaufzone exakt wie Live-NMN. Preis im Knopf („Abo starten, 22,41 €“) ist das Muster, kein Fehler. Zu entfernen sind Chips in den Karten, €/Tag, Streichpreis, ODER und Benefit-Listen.
- Hat das Produkt nur eine Größe: compact_sub_hint, compact_amount_grams (Grundpreis statt €/Tag) und compact_once_ship setzen. Bei „Einmalig“ unter 49 € darf nie „Versandfrei“ stehen.
- FAQ zu Versand, Abo und Garantie wörtlich von Live-NMN.
- Typografie wie NMN: sechs Größen, zwei Gewichte, H1 mobil 30 px, Karten 49 px, Knopf 48 px.

Inhalt:
- Job aus Sicht der Käuferin, 50 bis 65, zwei Drittel Frauen. Keine Sportler-Sprache.
- Im EU-Register nach zugelassenen Health Claims des Wirkstoffs suchen und den nehmen, der am besten zu 50 bis 65 passt. Fundstelle prüfen.
- Die Einblendung im Wirkprinzip nur mit einer echten Studienzahl aus passender Altersgruppe. Ohne eigenen Messwert trägt die Belege-Section eine Bildkarte.
- Kundenstimmen nur, wenn Loox echte Texte hat. Sonst die Stimmen-Karte aus und nur die Lade.
- Menge, Dosis und Reichweite einmal und nur aus dem Etikett (~/Downloads/_Archiv/2025/<Produkt>_*.png).

Bilder:
- Gesicht sichtbar: echtes Pexels-Foto ohne Produkt. Produkt im Bild: kuratierter Produktshot ohne Menschen per Codex-CLI (Befehl im Memory „Neue Bilder über ChatGPT-App“). Nie Menschen oder Hände per KI.
- Pexels-Downloads gesammelt einmal bei mir freigeben lassen.
- Das Wirkprinzip-Foto vorher so zuschneiden, dass die Glaskarte mobil und am Desktop kein Gesicht verdeckt. Einen Fokuspunkt kann man weder per Section noch per API setzen.
- Immer das größte Original verwenden, höchstens 25 MP (Shopify-Grenze), sizes an die gezeigte Breite anpassen.

Offene Fragen gleich in der ersten Runde an mich: Titelzeile, Mehrfach-Packung oder zweite Variante, Prüfbericht je Charge.

Vor meinem Push: Live-Theme in einen Zwischenordner ziehen und Dev gegen Live vergleichen. Keine unkommittierten Zeilen im Theme liegen lassen, der Theme Manager nimmt sie mit. Sag mir, welche Commits mitgehen. Nach dem Push live per Claude in Chrome prüfen (curl bekommt 429).

Git: nur eigene Dateien committen.
```
