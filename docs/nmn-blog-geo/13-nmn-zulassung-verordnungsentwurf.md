---
status: living
last_review: 2026-10-12
canonical_for: nmn-blog-artikel-13-zulassung-verordnungsentwurf
review_cadence_days: 7
artikel_rolle: Regulatorik-News (Aktualitäts-Artikel, wird bei jeder Verfahrensstufe fortgeschrieben)
besitz_thema: Inhalt des Verordnungsentwurfs PLAN/2026/1613 und Stand der Ausschuss-Abstimmung
---

# Artikel 13: NMN-Zulassung, Verordnungsentwurf und Abstimmung vom 25.09.2026

- **Live seit 28.09.2026, 15:18 Uhr:** https://www.lifetime-health.de/blogs/longevity-blog/nmn-zulassung-eu-verordnungsentwurf (geprüft: H1, Takeaways, CTA, Tabelle, Quellen, FAQPage- und BlogPosting-Schema, alle 10 internen Links 200)
- **Shopify:** `gid://shopify/Article/1025134199159`, Handle `nmn-zulassung-eu-verordnungsentwurf`, Blog `longevity-blog`, Tag „Recht & Regulatorik“
- **Template:** `templates/article.nmn-zulassung-eu.json` (lt-article + eigene FAQ, Reviewer bewusst leer). Einzeln per `shopify theme push --live --allow-live --nodelete --only …` ins Live-Theme gepusht, lokal noch nicht committet.
- **Body-Quelle:** `13-nmn-zulassung-verordnungsentwurf-body.html` (Body in Shopify ist Kopie davon)
- **Cover:** `docs/cover-nmn-zulassung-eu-verordnungsentwurf.png` (Nr. 19 in `blog-cover-generator.py`)
- **Illustrationen (wie alle NMN-Artikel zwei SVGs, 1200 × 675):** `svg-src/nmn-zulassung-zeitstrahl.svg` (unter „Kurz gesagt“, eager) und `svg-src/nmn-zulassung-antraege.svg` (Ende Abschnitt „Warum im Entwurf nur EffePharm genannt ist“, lazy). Im Store als Shopify-Datei `…/files/nmn-zulassung-*.svg?v=1790601959`, seit 28.09.2026 15:27 im Body; Zeitstrahl seit 12.10.2026 als `?v=1791816536`. Beim Ergebnis den Zeitstrahl nachziehen (Knoten 4 auf erledigt, Schätzung 5 und 6 anpassen), neu hochladen, `?v=` im Body tauschen.
- **Besitz:** was konkret im Entwurf steht und wo die Abstimmung steht. Verfahrensmechanik und Artikel 26 allgemein gehören #10 (`novel-food-efsa-verfahren`), Rechtslage für Verbraucher #1 (`ist-nmn-in-deutschland-legal`), nur verlinkt.

## Belegte Fakten (Stand 12.10.2026)

| Fakt | Quelle |
|---|---|
| Punkt B.08 der PAFF-Sitzung 25.09.2026 (Sektion Novel Food & Tox), „exchange of views and possible opinion“, PLAN/2026/1613, Prüfverfahren | Tagesordnung `reg-com_toxic_20260925_agenda.pdf` auf food.ec.europa.eu |
| Entwurf dem Ausschuss übermittelt 11.09.2026, Dokument D118035/01, Meeting CMTD(2026)32 | Komitologie-Register, API `core/api/front/documents/118035/1` |
| **Befürwortende Stellungnahme 25.09.2026: 27 von 27 Mitgliedstaaten dafür, 100 % Bevölkerung, förmliche Abstimmung (kein Konsens)** | Abstimmungsblatt V118291/01 (Ares(2026)9287258, 01.10.2026), Register `core/api/front/documents/118291/1`, PDF über `core/api/integration/ers/547492/118291/1/attachment` |
| Entwurf seit 30.09.2026 als D118035/02 „Act“ (Ares(2026)9251475), Stufe `positive_examination`, Inhalt unverändert | Register `core/api/front/documents/118035/2` |
| Sitzungsbericht `reg-com_toxic_20260925_sum.pdf` am 12.10.2026 noch nicht erschienen | food.ec.europa.eu, Ausschussseite |
| Entwurf: NEM für Erwachsene ohne Schwangere/Stillende, 300 mg/Tag (= 109,7 mg Nicotinamid), Kennzeichnung, Spezifikation (Reinheit ≥ 99,0 %, Assay 99 bis 102 % TM, chemische Synthese aus NR-Chlorid) | Anhang zum Entwurf, Ares(2026)8946844 |
| Datenschutz Art. 26 gewährt, 5 Jahre nur EffePharm (Art. 2, 3 des Entwurfs) | Entwurf, Erwägungsgründe 8 bis 12 |
| EFSA-Gutachten angenommen 04.03.2026; Auftrag an EFSA 11.04.2024 | Entwurf, Erwägungsgründe 5, 6 |
| Tempo Ausschuss bis Amtsblatt: NR-Chlorid 18.11.2019 → ABl. 13.01.2020; Inulin-Propionat-Ester 14.04.2026 → VO 2026/1219, ABl. 10.06.2026 | Register + EUR-Lex |
| V-Dokumente dieser Sektion erscheinen 12 bis 46 Tage nach der Sitzung, Kurzberichte nach 3 bis 4 Monaten | Register, Sitzungen 09/2025 bis 05/2026 |

## Fortschreiben, wenn

1. ~~Abstimmungsblatt erscheint~~ **Erledigt 12.10.2026:** Ergebnis in Kurz-gesagt, Abschnitt „Wie hat der Ausschuss abgestimmt?“, Takeaways, Tabelle, FAQ „q-zugelassen“, „q-ergebnis“, „q-wann“, Titel und Summary, Zeitstrahl-SVG (Knoten 4 erledigt).
2. **Verordnung im Amtsblatt:** Nummer, Datum, Inkrafttreten. Dann auch #1, #10 und den Hub `nmn-deutschland` nachziehen, Tag-eins-Paket anstoßen.
3. Jede Änderung: `Zuletzt aktualisiert`, Disclaimer-Datum, Metafeld `custom.reviewed_date`.

## Bewusst nicht im Artikel

- Keine Aussage, ob LIFETIME NMN die Spezifikation erfüllt (NMR-Gehalt gegen Deklaration ist nicht dasselbe wie Assay auf Trockenmasse, Messunsicherheit reicht unter 99 %).
- Keine eigene Dosierung und keine Einnahme-Kommunikation (VSW-Vergleich, K 4a/4b).
- EFSA-Veröffentlichungsdatum nur als „Mai 2026“: EFSA Journal epub 11.05.2026, die älteren Artikel sagen 13.05. (PubMed-Eingang). Abgleich offen.
