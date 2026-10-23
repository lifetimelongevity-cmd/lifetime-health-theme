---
status: snapshot
last_review: 2026-10-23
canonical_for: Text-Diät unterhalb des Heros (Startseite, AGE&DNA-PDP, NMN-PDP), Entwurf 23.10.
---

# Text-Diät 23.10.2026: alles unterhalb des Heros

Branch `claude/text-diaet-f9a604`. Vorschau-Theme **194006843767** „Claude Entwurf Text-Diät 23.10.“ (Kopie von Live, nur die drei Templates ausgetauscht):

- Startseite: https://lifetime-health-de.myshopify.com/?preview_theme_id=194006843767
- AGE&DNA: https://lifetime-health-de.myshopify.com/products/lifetime-age-dna?preview_theme_id=194006843767
- NMN: https://lifetime-health-de.myshopify.com/products/lifetime-nmn?preview_theme_id=194006843767

Ausgangslage: Live-Stand der drei Templates am 23.10. vormittags war semantisch identisch mit HEAD (`af983c1`). Geändert sind nur Text, Reihenfolge und `disabled`. Hero (`crs-hero-typewriter`, `lt-pdp-hero`), Button-Labels, Links und CSS sind unberührt. Nichts gelöscht: Ausgeblendetes trägt `"disabled": true` und steht im Theme-Editor zum Zurückschalten bereit. Keine Section-Liquid-Datei geändert.

## Wortzahl unterhalb des Heros

Zwei Messungen. **Template** = Wörter in den Text-Settings der Template-Sections (ohne Hero, ohne ausgeblendete Sections/Blöcke). **Gerendert** = Wörter im HTML der Template-Sections, Loox-SEO-Feed in der zugeklappten Bewertungslade abgezogen (vorher Live, nachher Vorschau-Theme, per curl).

| Seite | Template vorher → nachher | Gerendert vorher → nachher |
|---|---|---|
| Startseite | 725 → 292 (**−60 %**) | 751 → 309 (**−59 %**) |
| AGE&DNA-PDP | 428 → 254 (**−41 %**) | 449 → 274 (−39 %) |
| NMN-PDP | 358 → 248 (**−31 %**) | 373 → 262 (−30 %) |

**NMN verfehlt die 40 % bewusst.** Die Seite war am 22.10. schon von sechs Belege-Sections auf drei Karten verdichtet. Der Rest unterhalb des Heros ist überwiegend die zugeklappte Labortabelle (Messwerte, Methoden, Labor, maschinenlesbar für GEO und JSON-LD) und die zwei Rechts-Antworten in der FAQ (Rechtsstand, keine Verzehrempfehlung). Beides weiter zu kürzen hätte Belege bzw. die Forschungs-Einordnung angegriffen. Sichtbar beim ersten Scrollen (ohne zugeklappte Laden) ist die Belege-Section von 113 auf 85 Wörter gefallen.

## Startseite (`templates/index.json`)

Neue Reihenfolge, 6 sichtbare Sections inkl. Hero:

1. `hero` (unverändert)
2. `bekannt` Logos (unverändert)
3. `stimmen` **nach vorn**: Überschrift „Was ihr Test gezeigt hat“, 4 statt 6 Karten, die zwei mit Zahl zuerst (Markus 46 → 38 mit Foto, Anja 36 → 31, dann Julia, Petra). Ausgeblendet: Dr. Philipp R., Felix M. (beide ohne Zahl, argumentieren über App-Bedienung).
4. `test` Produkt: Lead-Satz leer (die zwei Spalten sagen dasselbe), App-Zeile gekürzt auf „Dazu in der App: AI Health Coach und Face-Scan“.
5. `fragen` Überschrift „Bevor du bestellst“, 5 statt 8 Fragen, Kaufbedenken zuerst: Kosten/Versand/Abo (offen) · Rückgabe · Ablauf (ersetzt die Ablauf-Section) · Dauer · Genauigkeit. Ausgeblendet: Datenschutz, Nährstoff-Prüfung, Vorgespräch (der Experten-Link unter der FAQ bleibt).
6. `schluss` Leiste (unverändert)

Ausgeblendet (`disabled`, ans Ende der `order` gestellt):

| Section | Grund |
|---|---|
| `video_vsl` (Limmroth, Podcast) | Autorität ohne Kaufschritt; Limmroth steht auf der PDP in der Belege-Karte. |
| `normbereich` (Check-up vs. Gene) | Stärkste Emotions-Section, aber zweites Problem-Argument neben dem Hero. **Erster Kandidat zum Wiedereinschalten**, dann zwischen `stimmen` und `test`, und dafür `bekannt` aus. |
| `ablauf` (4 Schritte) | Steckt jetzt als eine Antwort in der FAQ. |
| `bereiche` (Supplement-Ziele + NMN) | Führt weg vom Test-Kauf. |

## AGE&DNA-PDP (`templates/product.age-dna-test.json`)

`lt-pdp-belege`:
- Karte 1: Meta ohne „eine Speichelprobe“, Text auf „6 Altersbereiche und deine Gene in 23 Kategorien.“, Lade-Text gekürzt (Folgetest 299 € bleibt), Absatz zu den 23 Kategorien raus. Bereichs-Tabelle bleibt (GEO).
- Karte 2: Meta „Per Video · AI Health Coach · PDF für deinen Arzt“, Text „Der Coach erklärt dir jede Zahl.“ (Face-Scan-Satz raus). Ablauf-Lade entfernt, weil die FAQ ihn trägt; die Management-Summary-Zeile steht seit `af983c1` unter dem Kaufknopf.
- Karte 3: 2 statt 3 Stimmen (Markus T., Sandra K.); Thomas R. ausgeblendet (längstes Zitat). Kundenzitate nicht umformuliert.

`lt-pdp-reviews-all`: unverändert, ist schon eine einzige zugeklappte Zeile.

`crs-faq-accordion`, 5 Fragen, Kaufbedenken zuerst, jede Antwort höchstens 2 Sätze:
1. Kommen Versand oder ein Abo dazu? (neu, `faq_6`)
2. Kann ich das Kit zurückgeben?
3. Wie nehme ich die Probe? (mit Ergebniszeit)
4. Warum 349 € statt 200 €?
5. Stimmt die Zahl?

Ausgeblendet: „Ist das eine medizinische Diagnose?“ (`faq_4`).

## NMN-PDP (`templates/product.nmn-pulver.json`)

`lt-pdp-belege`:
- Karte 1: Lade-Text auf die Chargennummer reduziert (Labor und Datum stehen schon in der Tabellen-Überschrift), Labor-Zeile kürzer, NUS-Vergleich in einem Satz mit Link.
- Karte 2: Meta „Patentiert, nach GMP hergestellt“, Text „Der erste NMN-Rohstoff mit positivem EU-Gutachten.“, Votum vom 25.09.2026 und Amtsblatt-Stand in die Lade. Firmenzeile (Diga Health GmbH, HRB) aus der Lade entfernt, Firmenname steht weiter im Footer und JSON-LD. Rolle Limmroth „Chefarzt Neurologie, prüft unsere NMN-Inhalte“.
- Karte 3: 2 statt 3 Stimmen (Hannelore M., Christa V.); Hans-Werner G. ausgeblendet (gleiche Aussage wie Hannelore).

`crs-faq-accordion`, 4 Fragen, Kaufbedenken zuerst:
1. Was kostet der Versand? (neu, `faq_9`, Angaben aus dem Live-Hero: Gratisversand alle Größen, 1–2 Werktage)
2. Kann ich das Abo jederzeit kündigen?
3. Wie funktioniert die Geld-zurück-Garantie? (Hinweis auf das Widerrufsrecht bleibt)
4. Ist NMN in Deutschland legal? (nimmt jetzt „ohne Verzehrempfehlung“ mit auf)

Ausgeblendet: „Gibt es eine Verzehrempfehlung?“ (`faq_3`, in Frage 4 aufgegangen), „Wie lagere ich das Pulver?“ (`faq_7`). Forschungs-Einordnung und VSW-Linie unverändert.

## Offen für BJ

- `normbereich` wieder rein? Siehe Tabelle oben.
- NMN-Versand-FAQ: „alle Größen gratis“ ist aus dem Live-Hero übernommen. Die DE-Versandregel ist sonst „gratis ab 49 €“; stimmt das für die 30-g-Größe nicht, die Antwort anpassen.
- Merge: Die Hero-Felder in allen drei Templates sind unberührt. In `index.json` hat das Neuschreiben die Einrückung von drei Zeilen in `video_vsl` korrigiert (vorher 2 statt 8 Leerzeichen), sonst sind alle Diffs auf die Sections unter dem Hero begrenzt.
