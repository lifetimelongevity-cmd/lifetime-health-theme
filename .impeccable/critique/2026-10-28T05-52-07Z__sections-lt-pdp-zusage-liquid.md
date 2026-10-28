---
target: sections/lt-pdp-zusage.liquid (warum_jetzt, bonus_stack, garantie)
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-10-28T05-52-07Z
slug: sections-lt-pdp-zusage-liquid
---
Method: dual-agent (A: Designkritik · B: Detector + Browser-Overlay)

# Critique: lt-pdp-zusage (warum_jetzt, bonus_stack, garantie), 375 px, 28.10.2026

## Design Health Score
| # | Heuristik | Score | Befund |
|---|---|---|---|
| 1 | Systemstatus | 2 | 6 Wochen (Ergebnis) und 6 Monate (Nachmessung) unverbunden |
| 2 | Sprache | 2 | „auswertbar“ dreimal, „Ausgangswert“, „Face Scan“; „Labor“ fällt nie |
| 3 | Kontrolle | 3 | Garantie ist genau das |
| 4 | Konsistenz | 2 | „ungeöffnet“ gegen „versiegelt“; zwei gleiche Karten übereinander |
| 5 | Fehlervermeidung | 3 | Stufe 2 nimmt die größte Angst vorweg |
| 6 | Wiedererkennen | 2 | „einzeln 299 €“ sagt nicht, was einzeln ist |
| 7 | Flexibilität | n/a | Persuade |
| 8 | Minimalismus | 2 | Warum jetzt sagt dasselbe dreimal; Garantie-Peak als Fußnote |
| 9 | Fehlerbehebung | 3 | neues Kit konkret beschrieben |
| 10 | Hilfe | n/a | FAQ folgt separat |
| Total | | 19/32 (59 %) | Acceptable |

## Spezifität
Warum jetzt: authored (Gabel zeigt das Geschäftsmodell). Bonus und Garantie: Inhalt spezifisch, Form austauschbar (Pricing-Card, Zahl-über-Überschrift).
Detector (Liquid): 1 advisory, 13px im SVG-Text (Zeile 207). Preview-Scan degraded (HTML-Parser fehlt), in-target nur dieselbe 13px-Regel. Browser-Overlay: `cramped-padding` auf .zbtn (Fehlalarm, min-height 52 px per Flex). Kein horizontales Scrollen bei 375. Höhen 375 px: 583 / 549 / 560.

## Priority Issues
- [P0] Garantie: 48-px-Zahl „90 Tage“ über beiden Stufen, gilt nur für Stufe 1; Überschrift wiederholt Hero-Zeile; „ungeöffnet“ vs. „versiegelt“; Begründung als 14-px-Fußnote. Fix: je Stufe Zahl vor Text (90 Tage / 0 €), Hülle einheitlich „versiegelt“. → bolder, clarify
- [P1] Warum jetzt: ein Gedanke dreimal (Unterzeile, z_2, z_4), Witwe „es?“ in der Überschrift, „älter“ oben liest als Fortschritt. Fix: ein Absatz, bewusster Umbruch, Achsenbeschriftung. → distill, delight
- [P1] Bonus-Stack: 299 € als dritte Zeile 14 px grau; Analysen doppelt zu den Belegen; kein Preis als Entscheidung. Fix: Posten-Liste mit Wert rechts, Summenzeile mit Variantenpreis. → bolder
- [P2] Zwei gleiche Karten übereinander (weiß, mint). Fix: Bonus ohne Karte, Garantie bleibt die eine Karte. → layout
- [P2] Labor-Backend-Sprache. → clarify
- [P3] Note zentriert grau; Knopftext zweimal identisch. → typeset

## Personas
Jordan: „Ausgangswert“, „einzeln 299 €“ als Zusatzkauf missverstanden; Kauf springt ohne Warenkorb in die Kasse. Casey: Grafik ohne Erklärsatz im ersten Bildschirm; Bonus ohne Knopf. Sabine (58, Meta, skeptisch): „Face Scan“, „150 Ergebnisse“ riechen nach App-Spielerei; „Labor“ fehlt als Vertrauenswort; weibliche Form „Ärztin“ als Marketing-Signal.

## Fragen
1. Wofür ist die Garantie-Section da, wenn der Hero die 90 Tage schon sagt: für die 90 Tage oder für das Labor-Versprechen?
2. Die Gabel zeigt einen zweiten Punkt, den der Kauf nicht enthält (Folgetest 299 €).
3. Warum trägt die Section, die den Preis erklärt, keinen Knopf?

Questions skipped: Richtungen standen im Auftrag (bolder, delight je Section, Ziele je Section vorgegeben).
