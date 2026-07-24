---
status: living
last_review: 2026-07-23
canonical_for: nmn-preis-versand-abo-garantie-architektur
supersedes: []
---

# NMN Angebotsarchitektur

Preis, Größenwahl, Versand, Garantie und Abo auf der NMN-PDP als ein zusammenhängendes System.
Gilt für `/products/lifetime-nmn` (`templates/product.nmn-pulver.json`, `sections/lt-pdp-hero.liquid`).

Dieses Dokument beschreibt den Zielzustand. Der Live-Zustand vom 23.07.2026 weicht davon ab,
die Abweichungen stehen jeweils unter "Heute".

---

## 1 Warum dieses Dokument

Die fünf Elemente Preis, Größe, Versand, Garantie und Kündbarkeit sind heute unabhängig voneinander
gewachsen und widersprechen sich an mehreren Stellen. Sie lassen sich nur gemeinsam ändern, weil
jede einzelne Änderung die anderen kippt. Beispiel: Ein Abo-Preis von 29,90 € ist psychologisch
besser als 30,51 €, löst aber mit der bestehenden Versandschwelle von 30 € plötzlich 5,50 €
Versandkosten aus.

## 2 Datengrundlage (90 Tage, 24.04. bis 22.07.2026)

| Kennzahl | Wert |
|---|---|
| PDP-Sessions | 1.316 (80 % mobil) |
| Trafficquelle | 84 % bezahlt, 64 Sessions organisch |
| ATC-Rate auf der PDP | 6,7 % (shopweit 2,9 %) |
| NMN-Bestellungen | 73, Ø 46,09 € |
| Kosten pro Conversion (NMN Search + PMax) | 145,74 € bei 3.206 € Spend |
| Retourenquote NMN (180 Tage) | 4,3 % |
| Abo-Anteil bei Neukunden | rund 10 % |
| Versandeinnahmen (180 Tage) | 53,29 € bei 199 Bestellungen |
| Kündigung nach Lieferung 1 | laut BJ unkritisch (23.07.2026) |

Die entscheidende Zahl ist das Verhältnis von 145,74 € Akquisekosten zu 46,09 € Erstbestellwert.
Die Erstbestellung ist unter keiner Annahme profitabel. Die gesamte Ökonomie hängt an der zweiten
und dritten Lieferung, also am Abo-Anteil. Jede Entscheidung in diesem Dokument wird daran gemessen.

## 3 Leitprinzipien

**Ein Anker.** Referenzpreis ist immer der Einmalkaufpreis derselben Größe. Jede Ersparnisangabe
auf der Seite rechnet gegen genau diese Zahl. Heute existieren vier Bezugsgrößen nebeneinander
(24 %, 15 %, 10 %, "Du sparst 3,39 €") und zwei verschiedene Streichpreise.

**Struktur- statt Zeitrabatt.** Rabatte entstehen aus Menge und Abo, nicht aus Aktionen. Zeitrabatte
sind nach § 11 PAngV fragil, erziehen zum Warten und entwerten den Listenpreis. Struktur­rabatte
sind dauerhaft belegbar und steuern genau das Verhalten, das die Ökonomie braucht.

**Belegbare Labels.** Keine unbelegten Sozialbeweise wie "Beliebteste Größe". Bei einer Marke, deren
gesamter USP der öffentliche Prüfbericht ist, wirkt "Bester Grundpreis" stärker, weil es nachrechenbar ist.

**Risiko sichtbar machen, nicht Rabatt erhöhen.** Der Abo-Anteil von 10 % ist kein Preisproblem.
Garantie und Kündbarkeit machen das Abo bereits heute zur risikoärmeren Option, das steht nur an
keiner Stelle, an der entschieden wird.

**Keine Verzehrbezüge.** Kein Preis pro Portion, kein "reicht für X Tage", keine Reichweite. Das
schließt die im Supplement-Markt übliche Preis-pro-Tag-Logik aus. Ersatz ist der Grundpreis pro 100 g.

## 4 Preisraster

Voraussetzung: Sommerpreis läuft aus, die heutigen Aktionspreise werden reguläre Preise,
Streichpreise entfallen.

**Einmalkauf**

| Größe | Preis | Grundpreis | Vorteil gegenüber gleicher Menge in 30-g-Beuteln |
|---|---|---|---|
| 30 g | 33,90 € | 113,00 €/100 g | Referenz |
| 60 g | 59,90 € | 99,83 €/100 g | 7,90 € |
| 90 g | 80,90 € | 89,89 €/100 g | 20,80 € |

**Abo** (gesetzte Preise, nicht gerechnete)

| Größe | Preis | Grundpreis | Vorteil gegenüber Einmalkauf |
|---|---|---|---|
| 30 g | 29,90 € | 99,67 €/100 g | 4,00 € |
| 60 g | 53,90 € | 89,83 €/100 g | 6,00 € |
| 90 g | 71,90 € | 79,89 €/100 g | 9,00 € |

Der Korridor spannt sich von 113,00 €/100 g (kleinste Einheit, einmalig) bis 79,89 €/100 g
(größte Einheit, Abo). Das sind 29 % Unterschied und die eigentliche Verkaufsgeschichte der Seite.

**Heute:** Abo-Preise entstehen aus `variant.price | times: 0.90 | round` und ergeben Krummpreise
wie 30,51 €. Ein errechneter Preis signalisiert Beliebigkeit, und 30,51 € überschreitet die
30er-Schwelle, die 29,90 € unterbietet. Der Abo-Rabatt bleibt bei allen Größen einheitlich rund 10 %,
eine zusätzliche Staffelung nach Größe wäre ein Doppelrabatt auf derselben Achse.

**Bestandsverträge:** Laufende Abos rechnen auf 35,91 € (10 % auf den alten Listenpreis 39,90 €).
Nach der Umstellung zahlen Bestandskunden mehr als Neukunden. Die Verträge müssen in Appstle auf
das neue Niveau migriert und aktiv angeschrieben werden. Das ist eine Retention-Chance, keine Last.

## 5 Informationshierarchie der Entscheidungszone

Kein Styling, das regeln `.cursor/rules/design-components.mdc` und `design-tokens.mdc`. Hier geht es
nur darum, welche Information überhaupt in der Entscheidungszone steht und in welcher Reihenfolge.

**Grundregel:** Jede Information erscheint genau einmal, an der Stelle, an der sie eine Entscheidung
beeinflusst. Alles, was belegt statt entscheidet, gehört unter die Buybox oder in ein Popup.

**Vier Fragen, vier Zonen.** Der Besucher beantwortet nacheinander: Bin ich hier richtig? Wie viel
nehme ich? Wie oft? Was riskiere ich? Jede Zone beantwortet genau eine davon. Heute werden alle vier
gleichzeitig angeboten, deshalb konkurrieren gute Einzelaussagen miteinander.

| Zone | Frage | Inhalt | Maximal |
|---|---|---|---|
| A Einordnung | Bin ich hier richtig? | H1, eine differenzierende Zeile, Rating, ein Prüfbericht-Link | 4 Elemente |
| B Menge | Wie viel? | Größenzeile mit Grundpreis je Größe | 3 Optionen |
| C Modus | Wie oft? | zwei Karten, je ein Preis | 2 Optionen |
| D Risiko | Was riskiere ich? | direkt unter dem CTA: Kündbarkeit, Garantie, Versand | 3 Zeilen |

Mobil liegt die durchschnittliche Verweildauer bei 26 Sekunden. Die Entscheidung fällt in dieser
Zone oder gar nicht. Dichte ist dort teurer als Länge, die Seite selbst ist mit rund zwölf
Bildschirmhöhen nicht zu lang.

**Was heute mehrfach vorkommt** (Live-Zählung 23.07.2026, Hero-Zone):

| Aussage | Nennungen | Wo |
|---|---|---|
| Reinheit >99,9 % | 4 | Tagline, Bullet, Prüfbericht-Label, Benefit-Icon |
| Uthever® | 3 | Tagline, Bullet, Benefit-Icon |
| Forschungszweck | 3 | Trust-Pill, Benefit-Icon, Popup |
| Versand | 3 | Promo-Note, Abo-Benefit, Trust-Pill |
| GMP | 2 | Tagline, Bullet |
| Kündbarkeit | 2 | Abo-Benefit, Zeile unter CTA |
| Preis | 4 Darstellungen gleichzeitig | Standalone-Block, Abo-Karte, Einmalkauf-Karte, Sticky-Bar |

**Was aus der Entscheidungszone verschwindet:**
- Die Benefit-Icon-Reihe unter der Buybox (`show_benefits_icons`). Drei Elemente, die die Tagline
  mit anderen Worten wiederholen.
- Die Versand-Trust-Pill. Nach der Umstellung steht die Versandaussage in der Abo-Karte und in der
  Subline der Einmalkauf-Karte, dort ist sie entscheidungsnah. Eine dritte Nennung ist Rauschen.
- Der Promo-Banner samt Countdown, vier Zeilen, fällt mit dem Auslaufen des Sale ohnehin weg.
- Eine der beiden Preisdarstellungen oberhalb der Karten.

**Was bleibt, obwohl es nach Redundanz aussieht:** Lieferzeit und "ohne Zusätze und Trägerstoffe"
stehen an keiner anderen Stelle der Seite und beeinflussen die Entscheidung. Der
Forschungszweck-Hinweis ist regulatorisch nötig, nicht optional.

Netto verschwinden damit rund zehn Textelemente aus der Zone, ohne dass eine einzige
entscheidungsrelevante Aussage verloren geht.

**Der Nudge kommt aus der Struktur, nicht aus Badges.** Der sichtbare Grundpreis je Größe ist der
eigentliche Lenkungsmechanismus. Eine Zahl, die zeigt, wirkt bei dieser Zielgruppe stärker als ein
Badge, das behauptet. Deshalb höchstens ein Label pro Zone, und nur belegbare (siehe §3).

**Die Belegzone beginnt unter dem CTA.** Prüfbericht-Details, GMP, Novel-Food-Erklärung und
Uthever-Herkunft sind Belege für Leute, die schon überzeugt werden wollen. Sie gehören unter die
Buybox, nicht hinein. Einzige Ausnahme oben: ein Prüfbericht-Link, weil er der differenzierende
Grund für dieses Produkt ist.

### Wo welcher Preis steht

Von oben nach unten, mobil. Regel: genau eine Referenz ist gleichzeitig sichtbar.

| Position | Zeigt | Zeigt nicht |
|---|---|---|
| Sticky-Bar | Preis der gewählten Kombination | eigenen Streichpreis |
| Preisblock über der Buybox | Preis der gewählten Kombination, Grundpreis | Prozente, Streichpreis, "Du sparst" |
| Größenzeile | Menge, Grundpreis, Mengenvorteil in Euro | Aktionsersparnis gegen UVP |
| Abo-Karte | Preis der gewählten Größe, ein Rabattausweis gegen den Einmalkauf derselben Größe | zweite Referenz |
| Einmalkauf-Karte | Preis der gewählten Größe, Grundpreis | Badge (sie ist die Referenz) |
| CTA | Aktion plus Preis der Kombination | Em-Dash |
| Unter dem CTA | Versand, Kündbarkeit, Garantie | Preis, neue Produktargumente |
| Abo-Section unten | derselbe Preis, dieselbe Formel wie oben | dritte Bezugsgröße |

**Einheiten:** durchgängig €/100 g. Heute steht €/100 g in der Größenzeile (PAngV-Fix vom 18.07.)
und €/g in den Buybox-Karten. Bei Packungen unter 250 g ist der 100-g-Bezug zulässig und vergleichbarer.

**Prozent oder Euro:** In dieser Preislage wirken Prozentangaben stärker. Prozente dürfen bleiben,
aber nur einmal pro Karte und nur gegen die eine Referenz.

## 6 Auswahlarchitektur

**Größe in beiden Modi.** Dies ist der wichtigste Eingriff des gesamten Konzepts. Drei Mechanismen
im Theme arbeiten heute gegen das Abo, alle drei am 23.07.2026 im Code verifiziert:

1. **Das Abo ist auf die kleinste Variante gepinnt.** Eine Min-Gramm-Schleife setzt `lt_abo_variant`
   fest (Kommentar im Code: "Abo = kleinste Gramm-Variante, nicht stur variants.first, robust gegen
   Umsortierung"). Im Abo sind ausschließlich 30 g bestellbar.
2. **Wer eine Größe wählt, verlässt das Abo.** Der Change-Handler ruft `applySize(this, true)`, und
   `selectOnce=true` schaltet zwingend auf die Einmalkauf-Karte. Kommentar im Code: "Größe betrifft
   NUR den Einmalkauf. Abo-Karte bleibt 30 g."
3. **Deep-Links wählen das Abo ab.** Sobald `?variant=` ankommt, wird `lt_deeplinked` gesetzt, und
   die Abo-Karte erhält `is-selected` nur `{% unless lt_deeplinked %}`. Shopping-Klicks landen also
   mit vorausgewähltem Einmalkauf. Das betrifft rund 20 % der Landing-Sessions (GA4: 225 von 1.117).

Wichtig für die richtige Diagnose: Punkt 3 erklärt nur ein Fünftel des Traffics. Rund 80 % der
Sessions sehen das Abo vorausgewählt und lehnen es trotzdem ab. Die 10-Prozent-Quote ist also nicht
allein ein Frontend-Artefakt, aber die Punkte 1 und 2 gelten für 100 % des Traffics und schließen
16 Bestellungen mit 1.198 EUR, also 36 % des NMN-Umsatzes, strukturell vom Abo aus.

**Korrektur zur früheren Fassung:** Appstle ist keine Voraussetzung. Alle drei Varianten haben
bereits Selling Plans (`sellingPlanGroupsCount: 1`). Der Fix ist reine Liquid- und JS-Arbeit an drei
Stellen. Der Abo-Preis je Größe kann aus der echten Selling-Plan-Allocation gezogen werden, das
Muster steht bereits im Code.

**Reihenfolge innerhalb des Fixes:** Punkt 3 zuletzt. Solange die Abo-Karte nur 30 g kann, würde ein
60-g-Shopping-Klick mit Abo-Vorauswahl auf einen 30-g-Preis fallen, und Feed-Preis und
Landingpage-Preis liefen auseinander. Das ist ein Merchant-Center-Problem, kein UX-Problem.

**Reihenfolge: erst Größe, dann Modus.** Die Größenwahl ist die Wertentscheidung und setzt den Anker,
die Moduswahl ist die Rabattentscheidung und wirkt danach als Gewinn. Heute ist es umgekehrt: Der
Kunde verankert auf 30,51 € und soll dann eine Größe wählen, die den Betrag verdreifacht. Zusätzlich
sinkt die Entscheidungslast von sechs gleichzeitigen Optionen auf drei plus zwei, und beide
Modus-Karten zeigen dieselbe Menge, werden also direkt vergleichbar.

**Vorauswahl bleibt 30 g** (revidiert am 23.07.2026). Die frühere Empfehlung, 60 g vorauszuwählen,
stützte sich auf den Compromise-Effekt, also darauf, dass bei drei Optionen die Mitte zieht. Die
Daten zeigen diese Struktur nicht: 60 g holt 9 % der Bestellungen bei 18 % der Shopping-Impressionen
und ist damit auf beiden Achsen die schwächste Option. 90 g holt umgekehrt 12 % der Bestellungen bei
5 % der Impressionen. Das sieht nach zwei getrennten Segmenten aus, nicht nach einer Mitte, die
zieht: Risikominimierer beim Ersteinkauf einer unbekannten Marke mit "nicht zum Verzehr"-Rahmen, und
eine kleine informierte Gruppe, die ohnehin direkt zur größten Packung greift. Letztere findet die
90 g heute schon ohne Vorauswahl.

Dazu kommt, dass eine Vorauswahl-Rochade auf dieser Seite nicht validierbar ist. Für den Nachweis
einer 20-prozentigen Relativänderung der ATC-Rate braucht es grob 5.000 Sessions je Arm, bei rund
440 PDP-Sessions im Monat läuft das über ein Jahr. Die 6,7 % ATC sind der einzige klar
überdurchschnittliche Wert im Konto. Man setzt ihn nicht für einen Mixeffekt aufs Spiel, der
hinterher nicht messbar ist.

Alle Größen werden im Abo **verfügbar**, keine wird vorgewählt. Die Lenkung übernimmt der Grundpreis
je Größe, siehe §5.

**Labels:** 90 g trägt "Bester Grundpreis" (nachrechenbar), 60 g trägt "Empfohlen" oder nichts.

**Lieferrhythmus** skaliert mit der Größe. Angebotene Intervalle nur **alle 2, 4 und 6 Monate**,
Default je Größe vorgewählt (30 g alle 2, 60 g alle 4, 90 g alle 6). **Kein monatliches Intervall**:
Bei ~500 mg/Tag reicht schon 30 g etwa 2 Monate, monatlich würde also selbst beim kleinsten Beutel
doppelt liefern und Stornos erzeugen. Zu kurze Intervalle (Überlieferung) sind schädlicher als zu
lange, weil sichtbarer Überschuss direkt zur Kündigung führt, deshalb keine Option unter dem
Verbrauch. Der passende Default muss still gesetzt sein, ohne Begründungstext daneben, weil jede
Reichweitenangabe eine Verzehrmenge unterstellt (Novel-Food). Formulierung als Lieferrhythmus, nie
als Reichweite.

## 7 Versandmodell

**Bestätigt (BJ 2026-07-24).**

| | Regel |
|---|---|
| Abo | immer versandkostenfrei, jede Größe, auch Folgelieferungen |
| Einmalkauf DE | versandkostenfrei ab 49 €, darunter 4,90 € |
| AT/CH/NL/LI/IT | Schwelle von 99,01 € auf 59 € senken |

**Heute:** DE 5,50 € bis 29,99 €, gratis ab 30,00 €. AT/CH/NL/LI/IT 8,90 € bis 99,00 €, gratis ab
99,01 €. Weil das billigste Produkt rund 30 € kostet, greift die DE-Schwelle faktisch nie: 53,29 €
Versandeinnahmen in 180 Tagen. Damit existieren alle Nachteile einer Schwelle ohne jeden Nutzen,
und der Abo-Vorteil "Gratis Versand bei Abo-Lieferungen" ist eine Nullaussage, weil der Einmalkauf
ebenfalls gratis versendet wird.

**Wirkung des neuen Modells** bei 30 g:

| Weg | Kunde zahlt |
|---|---|
| 30 g einmalig | 33,90 € plus 4,90 € = 38,80 € |
| 30 g im Abo | 29,90 €, versandfrei |
| 60 g einmalig | 59,90 €, versandfrei |

Es gibt zwei kostenlose Auswege aus der Versandgebühr, und beide sind mehr wert als 4,90 €:
größere Menge oder Abo. Zwischen 38,80 € und 29,90 € entsteht ein Abstand von 23 %.

Eine klassische Auffüll-Schwelle funktioniert hier nicht, weil kein Sortiment für kleine
Ergänzungsbeträge existiert. Der nächste Schritt ist immer ein großer, deshalb liegt die Schwelle
bei 49 € und nicht niedriger.

**Ertragserwartung:** Der direkte Versandumsatz bleibt bei grob 60 bis 100 € pro Quartal. Der Wert
liegt vollständig in der Mix-Verschiebung. Als Einnahmequelle lohnt die Änderung nicht, als
Steuerungsinstrument schon.

**Risiko:** Der kleinste Einstieg wird für kalte Zielgruppen um 4,90 € teurer. Bei 84 % bezahltem
Traffic ist das die sensibelste Stelle des Konzepts und der erste Kandidat für einen Rückbau,
falls die Erstconversion einbricht.

## 8 Garantie und Kündbarkeit

Beide Zusagen bleiben unverändert bestehen. Sie werden nicht eingeschränkt, sondern sichtbar gemacht.

**Warum sie kein Kostenrisiko sind:** Die Retourenquote liegt bei 4,3 %, das sind fünf bis sieben
Erstattungen in 180 Tagen. Kündigungen nach der ersten Lieferung sind laut BJ unkritisch. Bei
145,74 € Akquisekosten ist eine 4,3-prozentige Erstattungsquote ein sehr günstiger Preis für ein
Vertrauenssignal, das auf jeder Seite steht.

**Die Arbitrage-Lücke bleibt bewusst offen.** Weil die Garantie für die Erstbestellung unabhängig
vom Kaufmodus gilt und das Abo sofort kündbar ist, könnte man das Abo nehmen, kündigen und damit
einen billigeren Einmalkauf machen. Mit dem neuen Versandmodell wächst dieser Vorteil auf 8,90 €.
Das ist gewollt: Wer so handelt, hat Zahlungsdaten hinterlegt, einen Vertrag im System und ist
reaktivierbar. Bei diesem CAC ist dieser Kunde deutlich mehr wert als ein anonymer Einmalkäufer.
Die Lücke ist ein Trial-Mechanismus, kein Leck.

**Falls sie kippt** (Kündigung nach Lieferung 1 über 50 %), ist der Hebel ein gestaffelter
Abo-Rabatt: 10 % auf die erste Lieferung, 15 % ab der dritten. Appstle kann das nach Zyklusnummer
abbilden. Solange der Abo-Anteil bei 10 % liegt, darf nichts verschärft werden.

**Inkonsistenz in der Garantie-Formulierung (bereinigt, BJ 23.07.2026):** "Wenn du aus irgendeinem
Grund nicht zufrieden bist" war die einzige Stelle der Seite, die implizit ein Ergebnisversprechen
zuließ. Alles andere ist streng auf Qualität, Reinheit und Dokumentation ausgerichtet. Die neue
Formulierung bindet die Garantie an das, was die Seite tatsächlich behauptet, ohne die Zusage
abzuschwächen, und ergänzt den fehlenden Hinweis auf das gesetzliche Widerrufsrecht.

## 9 Copy-Bausteine

Settings für `templates/product.nmn-pulver.json`, Section `main` (`lt-pdp-hero`):

```json
{
  "guarantee_text": "30-Tage Geld-zurück-Garantie",
  "guarantee_popup_title": "30-Tage Geld-zurück-Garantie",
  "guarantee_popup_body": "<p>Wenn deine erste Lieferung nicht hält, was wir hier beschreiben, bekommst du den vollen Kaufbetrag zurück. Das gilt für Qualität und Zustand der Ware ebenso wie für die Dokumentation. Eine E-Mail innerhalb von 30 Tagen nach Erhalt genügt.</p><p>Die Garantie gilt für deine erste Bestellung, einmalig oder im Abo. Dein gesetzliches Widerrufsrecht bleibt davon unberührt.</p>",

  "bb_sub1_title": "Im Abo",
  "bb_sub1_subline": "Lieferrhythmus frei wählbar",
  "bb_benefit_1": "Jederzeit kündbar, auch direkt nach der ersten Lieferung",
  "bb_benefit_2": "Erste Lieferung mit 30-Tage-Geld-zurück-Garantie",
  "bb_benefit_3": "Immer versandkostenfrei, unabhängig von der Menge",

  "cancel_popup_title": "Abo jederzeit kündbar",
  "cancel_popup_body": "<p>Du kannst dein Abo jederzeit pausieren, anpassen oder kündigen. Direkt im Kundenkonto, ohne Angabe von Gründen, ohne Fristen, ohne Anruf. Das gilt auch unmittelbar nach deiner ersten Lieferung.</p>",

  "bb_once_title": "Einmaliger Kauf",
  "bb_once_subline": "Versandkostenfrei ab 49 €",

  "trust_1": "Lieferung in 2–3 Werktagen",
  "trust_2": "Ohne Zusätze und Trägerstoffe",
  "trust_3": "",
  "trust_4": "Forschungs-/Analysezwecke · Nicht zum Verzehr",

  "show_benefits_icons": false,
  "show_promo_banner": false,
  "show_price_standalone": true
}
```

Settings für Section `risk_free_close`:

```json
{
  "badge_text": "Abo-Vorteil",
  "kicker": "Regelmäßig geliefert. Jederzeit flexibel.",
  "headline": "NMN-Pulver im flexiblen Abo",
  "subheading": "Im Abo zahlst du weniger pro 100 g, der Versand ist immer frei, und du kannst nach jeder Lieferung kündigen.",
  "price_fallback": "ab 29,90 € pro Beutel",
  "cta_label": "Abo starten"
}
```

CTA-Label im Hero: Aktion plus Preis der gewählten Kombination, zum Beispiel `Abo starten, 53,90 €`.
Das heutige `Abo: 30,51 € — Jetzt kaufen →` enthält einen Em-Dash und verstößt gegen die Copy-Regeln
in `docs/conversion-messaging.md` §9.

## 9a Bewertung der Parallelmaßnahmen (Stand 23.07.2026)

Parallel zu diesem Konzept wurden Maßnahmen aus einer zweiten Quelle umgesetzt oder vorgeschlagen.
Bewertung nach Prüfung gegen Code und Daten.

| Maßnahme | Urteil | Grund |
|---|---|---|
| 90 g auf Position 1 der Varianten | **nicht durchführen** | löst PAngV-Verstoß aus, siehe unten |
| Reorder wirkt auf den Feed | **Prämisse falsch** | drei eigene Item-IDs, keine Primärvariante |
| Abo-Treuestaffel | **zurückstellen** | wirkt auf n ≈ 7 pro Quartal, falsche Trichterseite |
| Arzt-Badge aktivieren | **halten**, zwei Chips kürzen | steht bereits in der Belegzone |
| Health Claims entschärfen | **halten und live pushen** | Änderung ist noch nicht live |
| Rechtslage-Seite verlinken | **halten** | unstrittig, zusätzlich aus FAQ 1 verlinken |

**Warum der Reorder unterbleiben muss.** `lt_compare_price` bezieht den compare-at-Preis aus
`product.selected_or_first_available_variant`, also aus der ersten Variante. Dieser Wert wird als
`baseComparePrice` ins JS gereicht und in `updateCardFacades()` als Streichpreis und Rabattbasis der
**Abo-Karte** verwendet. Die Abo-Karte führt aber weiterhin den Preis der kleinsten Variante, weil
sie darauf gepinnt ist. Heute ergibt das 39,90 gegen 30,51 und den Badge "SPARE 24 %". Nach einem
Reorder auf 90 g stünde der compare-at von 94,90 als Streichpreis neben einem Preis von 30,51 EUR,
also ein ausgewiesener Rabatt von rund 68 % auf eine Menge, die gar nicht im Warenkorb landet. Das
ist kein Darstellungsfehler, sondern ein Verstoß gegen § 11 PAngV.

Das naheliegende Gegenargument, der Reorder lasse den Headline-Preis auf 80,90 springen, trifft
dagegen nicht zu: `syncFromCard()` überschreibt den Hauptpreis beim Init mit dem Preis der aktiven
Karte, und das ist ohne Deep-Link die auf 30 g gepinnte Abo-Karte.

Die Stoßrichtung der Empfehlung bleibt richtig: 90 g holt 12 % der Bestellungen bei 5 % der
Shopping-Impressionen, performt also deutlich über ihrer Exposition. Der passende Hebel dafür ist
eine eigene Listing Group je Item-ID mit eigenem Gebot, also Kampagnenstruktur. Die
Shopify-Sortierung leistet das nicht und löst zusätzlich einen Merchant-Center-Resync aus, mitten im
laufenden Policy-Check.

**Zur Reichweiten-Begründung.** "90 g reichen sechs Monate" ist als interne Kalkulationsgrundlage
korrekt und darf nicht in die Kundenkommunikation. Die Aussage unterstellt eine Tagesmenge und wäre
damit ein Beleg dafür, dass ein nicht zugelassenes Novel Food als Lebensmittel in Verkehr gebracht
wird. Das Theme hat diese Entscheidung bereits getroffen, die Einheitenanzeige wurde bewusst von
EUR/Tag auf reinen Mengenpreis umgestellt.

**Zum Arzt-Badge.** Der Block wird nach dem schließenden `</product-form>` ausgegeben, steht also
bereits unter dem Kaufbutton in der Belegzone. Es gibt keinen Konflikt mit der Ausdünnung aus §5.
Zu kürzen sind zwei echte Dubletten: "Chefarzt Neurologie" steht doppelt (in `founder_title` und als
Chip), "Spiegel Bestseller" steht als Chip und eine Bildschirmhöhe darunter als Logo im
`logo_garden`. Achtung: Die Chips sind hartcodiert und nicht im Schema. Eine Änderung trifft
**34 Templates**, darunter die 349-EUR-PDP des AGE&DNA-Tests. Entweder bewusst global ändern oder
vorher ein Schema-Setting anlegen. Das Siegel trägt `aria-label="Wissenschaftlich geprüft"`,
belegbar ist "laborgeprüft".

**Zwei Befunde zum Umsetzungsstand.**
Erstens: Die Entschärfung der Expertenzitate ist **nicht live**. `git show HEAD` liefert weiterhin
"Was führende Forscher sagen", die neue Fassung existiert nur im Working Tree. Das rechtliche Risiko
besteht bis zum nächsten Push unverändert fort.
Zweitens: Auch nach der Textentschärfung bleibt ein Risiko, das der Text nicht adressiert. Live
werden drei Porträts (`sinclair.jpg`, `huberman.jpg`, `rhonda.jpg`) vom eigenen CDN ausgeliefert.
Die kommerzielle Nutzung erkennbarer Bildnisse ohne Einwilligung ist nach § 22 KUG unabhängig vom
Begleittext angreifbar, und ein Klarstellungssatz unterhalb eines prominenten Porträtrasters nimmt
am Blickfang nicht teil. Die belastbare Lösung ist, den Platz mit dem eigenen CSO zu belegen, der
eine echte Verbindung zum Produkt hat, mit einer Aussage ausschließlich zu Prozess und
Nachprüfbarkeit.

## 10 Umsetzung in Phasen

**Phase 0a, sofort, ohne Theme-Änderung: die Bestellzahl zerlegen.**
Die 73 bis 74 NMN-Bestellungen sind keine Erstbestellungen. Sie enthalten Abo-Folgelieferungen und
Wiederkäufe. Der Gegencheck: 1.316 PDP-Sessions mal 6,7 % ergeben rund 88 Warenkörbe, und
shopweit schließen laut Shopify in denselben 90 Tagen nur 63 Sessions einen Kauf ab. Eine
Cart-zu-Kauf-Quote von 83 % ist bei kaltem, überwiegend bezahltem Mobiltraffic nicht plausibel.
Solange die Zahl nicht in Erstbestellung, Abo-Verlängerung und Wiederkauf zerlegt ist, ist auch der
in §2 genannte Erstbestellwert von 46,09 EUR nicht das, was sein Name sagt, und jede Rechnung gegen
den CPA von 145,74 EUR steht auf unsicherem Grund. Zerlegbar über die `selling_plan`-Präsenz auf der
Order-Line. Erwartung nach Stichprobe: 20 bis 25 % Folgelieferungen.

**Phase 0b, sofort: Bestandsabo-Preis korrigieren.**
Laufende Abos rechnen auf 35,91 EUR, während der Einmalkauf auf derselben Seite 33,90 EUR kostet.
Der Abonnent zahlt heute also mehr als der Laufkunde, obwohl das Abo als günstigere Option verkauft
wurde. Das ist kein Preisdetail, sondern ein Retentionsrisiko in dem Moment, in dem ein
Bestandskunde die Seite besucht. Vor jeder weiteren Rabattlogik anzugleichen und aktiv zu
kommunizieren.

**Phase 0c, Entscheidungen (BJ)**
Sommerpreis zum 31.07. auslaufen lassen. Versandmodell aus §7 bestätigen oder die konservative
Variante wählen (alles versandkostenfrei, Abo-Benefit anders belegen).

**Kein Buybox-Deploy vor dem 01.08.** Solange der Sommerpreis läuft, erzeugen variantenabhängige
Abo-Preise neue Kombinationen aus Streichpreis, Abo-Rabatt und Grundpreis, die je einzeln die
30-Tage-Bestpreisregel und die Grundpreispflicht erfüllen müssen.

**Phase 1 + 2 gehen gemeinsam live**, weil 29,90 € ohne Abo-Gratisversand eine Versandfalle wäre.

**Phase 1, Preis- und Textkonsistenz** (ein Tag)
- Abo-Preise als gesetzte Werte statt `times: 0.90` (`lt-pdp-hero.liquid` ~Z. 261)
- Badge-Logik auf eine Referenz (~Z. 786, 1451, 1494)
- "Du sparst"-Zeile aus dem Standalone-Block (~Z. 664)
- `formatUnit` von €/g auf €/100 g (~Z. 1332)
- Sticky-Bar ohne eigenen Streichpreis
- Copy-Bausteine aus §9 in `product.nmn-pulver.json`
- Compare-at-Preise in Shopify bereinigen, Promo-Banner aus

**Phase 2, Versand** (halber Tag)
- Delivery Profile "Allgemeines Profil": DE-Schwelle auf 49 €, Rate 4,90 €
- Abo-Versandbefreiung über Appstle oder eine eigene Versandgruppe
- AT/CH/NL/LI/IT-Schwelle von 99,01 € auf 59 €
- Bestandsverträge von 35,91 € auf das neue Raster migrieren und anschreiben

**Phase 3, Größe im Abo** (ein bis zwei Tage, der eigentliche Hebel)
Selling Plans sind bereits an allen drei Varianten, es ist reine Frontend-Arbeit:
- Min-Gramm-Schleife auflösen, die `lt_abo_variant` festnagelt (~Z. 717 bis 726)
- `applySize()` entkoppeln, sodass ein Größenklick nicht mehr `selectOnce=true` auslöst
  (~Z. 1607 und Change-Handler ~Z. 1656). Die Größe muss auf beide Karten schreiben.
- Abo-Preis je Größe aus der Selling-Plan-Allocation ziehen, Muster steht bereits im Code (~Z. 729)
- Mengenvorteil auf den Pills statt Aktionsersparnis (~Z. 909)
- Kadenzen in Appstle anlegen und je Größe still vorbelegen, ohne Begründungstext

**Phase 4, Deep-Link** (erst nach Phase 3, nie davor)
- `lt_deeplinked` so ändern, dass ein Shopping-Klick die angeklickte Größe in die Abo-Karte
  schreibt und das Abo vorwählt, statt in den Einmalkauf zu fallen (~Z. 735 bis 739 und 757)
- Vorher unmöglich, weil sonst Feed-Preis und Landingpage-Preis auseinanderlaufen

**Gestrichen: die Vorauswahl-Rochade.** 30 g bleibt Position 1 und Vorauswahl, siehe §6.

Zeilennummern sind Stand 23.07.2026 und verschieben sich mit jeder Änderung.

## 11 Messung

Ein A/B-Test auf die Conversion Rate ist bei 73 Bestellungen pro Quartal nicht möglich, die
Laufzeit läge bei Quartalen. GA4 ist zusätzlich durch den Consent-Default gedeckelt, alle
GA4-Zahlen sind Untergrenzen.

Gemessen wird über Shopify, vorher gegen nachher:

| Leitkennzahl | Heute | Sichtbar nach |
|---|---|---|
| Umsatz pro NMN-Bestellung | 46,09 € | ~40 Bestellungen, rund 6 Wochen |
| Abo-Anteil bei Neukunden | rund 10 % | ~40 Bestellungen |
| Anteil Abo-Bestellungen über 30 g | 0 % (strukturbedingt) | sofort nach Phase 3 |
| Retourenquote | 4,3 % | Kontrollgröße, sollte stabil bleiben |
| Kündigung nach Lieferung 1 | unkritisch | Kontrollgröße, Appstle-Dashboard |

Bei der Bewertung aller sessionbasierten Conversion-Zahlen beachten: 996 der 7.633 Sessions in
90 Tagen kommen aus den USA, wohin nicht geliefert wird. Bereinigt liegt die Store-CR bei etwa
0,98 % statt 0,80 %.

## 12 Offene Punkte

- Reale Versandkosten pro 30-g-Beutel sind hier nicht hinterlegt. Sie entscheiden, ob 4,90 € kostendeckend sind.
- Ob Appstle die Versandbefreiung sauber auf Abo-Rebills anwendet, ist vor Phase 2 zu testen.
- Die Trust-Pill-Formulierung ist länderabhängig korrekt zu halten. "Versandkostenfrei im Abo" gilt überall, eine pauschale Aussage "Gratisversand" gilt für AT/CH/NL nicht.
- `templates/product.13_nmn.json` ist nicht live, enthält aber Wirkaussage ("Zellreparatur und DNA-Erhalt", "Biologisches Alter stabilisieren"), Dosierung ("ca. 60 Portionen à 500 mg") und Reichweite ("1 Beutel, ca. 60 Tage"). Solange die Datei existiert, genügt eine versehentliche Template-Zuweisung, um alle drei gleichzeitig live zu schalten. Gehört archiviert.
- Der Engpass liegt möglicherweise gar nicht auf dieser Seite. Shopweit gehen 47 % der Warenkörbe vor dem Checkout verloren und weitere 48 % im Checkout (228 Cart-Additions, 121 erreichte Checkouts, 63 Abschlüsse). Dieses Konzept adressiert ausschließlich die Zone vor dem Add-to-Cart. Nach Phase 0a prüfen, ob Cart und Checkout nicht der lohnendere Ort sind.
- NMN trägt 73 Bestellungen und 3.365 EUR, der AGE&DNA-Test 17 Bestellungen und 5.866 EUR. Der Test macht mehr als die Hälfte des Shop-Umsatzes aus einem Sechstel der Bestellungen. Die NMN-PDP verweist nirgends darauf. Ob NMN als Akquiseprodukt für den Test geführt werden soll, ist eine Entscheidung oberhalb dieses Dokuments, verändert aber dessen Zielgrößen.
- Seit dem 23.07. läuft NMN im Katalog als Nahrungsergänzungsmittel, während die PDP "nicht zum Verzehr" sagt. Diese Kombination ist ein bekannter Auslöser für Feed-Disapproval unter der Supplement-Policy, und 82 % der NMN-Shopping-Kosten hängen an einer einzigen Item-ID. Gehört in den Merchant-Center-Check zum 26.07.
