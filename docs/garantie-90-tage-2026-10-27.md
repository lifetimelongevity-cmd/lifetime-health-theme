---
status: snapshot
last_review: 2026-10-27
canonical_for: garantie-frist-90-tage-umstellung
---

# 90-Tage-Garantie: Umstellung im Theme (27.10.2026)

BJ-Entscheid 27.10.2026: Die Garantie gilt **90 Tage** statt 30, Bedingung **„solange versiegelt“**. Die Google-Brand-Anzeigen werben schon so („90 Tage Geld-zurück“, Sitelink „90 Tage risikofrei“). Dieser Commit zieht Theme und Startseite nach. Die Shopify-Rückgaberichtlinie (`/policies/refund-policy`, liegt im Admin, nicht im Theme) wird separat per Shopify-MCP geändert, erst nach BJs Ja.

## Was die Richtlinie heute sagt (live gelesen 27.10.2026)

- **Widerrufsrecht: 30 Tage** ab Erhalt (gesetzlich wären 14). Erlischt bei versiegelter Hygieneware, sobald das Siegel entfernt ist. Rücksendekosten trägt der Kunde, Erstattung auf den ursprünglichen Zahlungsweg binnen 14 Tagen.
- **90-Tage-Zufriedenheitsgarantie zusätzlich zum Widerruf**, gibt es schon: Erstkauf, geöffnete Einheit mit Restmenge plus Foto, weitere Einheiten versiegelt, 90 Tage zum Anmelden, 14 Tage Rücksendung nach RMA, Erstattung ohne Versandkosten. **Ausgenommen: Diagnostik/Tests, Probiergrößen, stark rabattierte Bundles.**

Die Supplement-PDPs haben die 90 Tage also bisher unterverkauft (sie sagten 30). Der Test hatte nur die 30 Tage Widerruf.

## Entwurf Richtlinienänderung (noch nicht geschrieben)

Kleinster Eingriff, der BJs Satz „90 Tage Rückgabe solange versiegelt“ für alle Produkte wahr macht: **die vertragliche Widerrufsfrist von 30 auf 90 Tage verlängern.** Drei Stellen im Text, alles andere bleibt:

1. „Sie haben das Recht, binnen **neunzig (90) Tagen** ohne Angabe von Gründen diesen Vertrag zu widerrufen.“
2. „Die Widerrufsfrist beträgt **neunzig Tage** ab dem Tag, an dem Sie … die Waren in Besitz genommen haben.“
3. Überschrift „Besondere Konstellationen (Fristbeginn bei **90** Tagen)“.

Der Versiegelt-Vorbehalt steht schon drin (Erlöschen bei entfernter Versiegelung), ebenso Rücksendekosten beim Kunden und Erstattung auf den Zahlungsweg. Die 90-Tage-Zufriedenheitsgarantie bleibt unverändert als zweite, weitergehende Zusage für geöffnete Supplements. AGB und Versandrichtlinie nennen keine Frist, die angepasst werden müsste.

Alternative, falls BJ den Widerruf bei 30 Tagen lassen will: eigener Absatz „90-Tage-Rückgabe für versiegelte Ware“ unter der Zufriedenheitsgarantie. Dann sagen die PDPs weiter die Wahrheit, nur die Rechtsgrundlage heißt anders.

## Geänderte Stellen im Theme (36 Dateien, nur Zahl und Frist, keine Struktur)

**Live-PDPs und Startseite**

| Datei | Stelle | Neu |
|---|---|---|
| `templates/product.nmn-pulver.json` | `guarantee_text`, Popup-Titel, Popup-Text, FAQ „Wie funktioniert die Geld-zurück-Garantie?“, Trust-Zeile im Subtitle-Liquid | 90 Tage Geld zurück, E-Mail innerhalb von 90 Tagen |
| `templates/product.age-dna-test.json` | `guarantee_text`, Popup-Text, FAQ „Kann ich das Kit zurückgeben?“ | 90 Tage Rückgabe, solange versiegelt. Popup spricht von „zurückgeben“ statt „Widerrufsrecht“, damit er unabhängig von der Rechtskonstruktion stimmt; Link heißt „Rückgabe und Widerruf im Detail“ |
| `templates/index.json` | Vertrauens-Zeile und FAQ zum Kit | 90 Tage, solange versiegelt |
| `snippets/lt-quiz-result.liquid` | Zeile unter dem Bestellknopf im Quiz-Ergebnis | „90 Tage Rückgabe, solange versiegelt · auf Wunsch in Raten mit Klarna“ |
| `templates/page.dein-longevity-plan.json` | Badge am CTA | „90 Tage Rückgabe, solange versiegelt · Deine Daten gehören dir.“ |

**Weitere Supplement-PDPs** (bisher „30-Tage Geld-zurück-Garantie“, Popup gleichlautend): TMG, CaAKG, Fisetin, Kreatin, Resveratrol, D3K2, Schlafspray, Astafit, Hyaluron, B-Komplex (`guarantee_text`, Popup-Titel, Popup-Text). Spermidin an acht Stellen (Trust-Zeile, Garantie-Popup, Trust-Line im Abschluss, Abo-Intro, FAQ-Frage und -Antwort). NAD liposomal `trust_1` „90-Tage-Zell-Versprechen“. `templates/product.json` (Standard-Template) `trust_1`.

**Nicht gepushte Hormozi-LP** (`page.dna-lp.json`, `page.dna-lp-pdp.json`, `sections/lt-dna-lp-hero.liquid`): „Versiegelt 90 Tage zurück“.

**Legacy-Hinweisblock** in `templates/page.nmn.json` und `templates/product.02_02_bundle_regeneration.json`: „90-Tage-Zufriedenheitsgarantie“, 90 Tage Zeit, innerhalb 90 Tagen anmelden. Hinweis: Die Richtlinie nimmt rabattierte Bundles von der Zufriedenheitsgarantie aus, der Bundle-Block behauptete sie schon vorher mit 30 Tagen. Das ist eine Altlast, kein neuer Widerspruch.

**Sections, Schema-Defaults und Presets**: `announcement-bar` (`[garantie]` für Tests/Bundles jetzt „90 Tage Rückgaberecht“, Kommentar und Info-Text), `lt-pdp-hero` (Defaults Trust-Zeile, Garantie-Zeile, Popup-Titel, Popup-Text, Fallback im Liquid), `lt-pdp-final-cta` (Unterzeile, `trust_1`, Preset), `lt-hp-trust-ticker`, `lifetime-trustbar` (zugleich Gedankenstrich durch Komma ersetzt), `crs-faq-accordion`, `crs-risk-free-close`, `lt-comparison-table` (Garantie-Zeile im Preset), `main-product` (NMN-CTA-Footer, hart codiert), `nmn-pdp-v2-faq`, `nmn-pdp-v2-final-cta`, `nmn-pdp-v2-science-quality`, `nmn-pdp-v2-guarantee` (nur Kommentar, Zahl war schon 90).

**Bewusst nicht angefasst**: Vorratsangaben wie „1 Dose (ca. 30 Tage)“, „reicht für 30 Tage“, „30 Tagesportionen“. Ältere Docs mit 30-Tage-Wortlaut (`pdp-copy-deck.md`, `nmn-angebotsarchitektur.md`, `pdp-supplement-rollout.md`, `agedna-pdp-distill-2026-08-19.md`) bleiben als Momentaufnahmen stehen.

## Offene Lesart für BJ

Die NMN-PDP und die übrigen Supplement-PDPs behalten die Zufriedenheits-Logik („hält die erste Lieferung nicht, was wir beschreiben, voller Betrag zurück“, also auch angebrochen), weil die Live-Richtlinie genau das als 90-Tage-Zufriedenheitsgarantie zusagt. BJs Satz „solange versiegelt“ ist auf den Test gemünzt. Soll auch bei Supplements nur versiegelte Ware zurückgehen, sind es zwei Zeilen je PDP.

## Push

Alles im Theme-Ordner per Theme Manager pushen, Live-Check danach: NMN-PDP, AGE&DNA-PDP, Startseite, Quiz-Ergebnis (`/pages/quiz-age`), Longevity-Plan. Die Richtlinie wird nicht gepusht, sondern per Shopify-MCP (`shopPolicyUpdate`) geschrieben.
