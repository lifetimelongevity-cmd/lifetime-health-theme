---
status: living
last_review: 2026-07-29
canonical_for: pdp-copy-korridore-supplements
---

# PDP Copy Deck

Die gemessenen Korridore für jedes Textfeld einer Supplement-PDP, mit je zwei
Beispielen: eines aus dem Nordstern `product.nmn-pulver.json`, eines aus dem
Phase-3-Piloten `product.02_spermidin.json`.

Entstanden als Artefakt aus §9 Phase 3 von `briefing-pdp-refit.md`. Korridore
gemessen an den beiden Nordsternen, nicht geschätzt.

Zeichen inklusive Leerzeichen. **Korridor** ist der Zielbereich, **hart** ist die
Grenze, ab der die Zeile umgebaut wird statt gekürzt.

---

## 1. Hero

| Feld | Korridor | hart | NMN | Spermidin |
|---|---|---|---|---|
| `hero_headline` | 20–35 | 45 | „NMN-Pulver mit Laborbericht" (26) | „Spermidin aus Weizenkeimextrakt" (31) |
| `tagline` | 25–45 | 55, ein Satz | „Uthever® · >99,9 % Reinheit" (27) | „10 mg pro Tagesportion, vegane Kapseln." (39) |
| `hero_bullet_1..3` | 15–35 | 45, drei Stück | „Nach GMP-Standard hergestellt." (30) | „10 mg Spermidin pro Tagesportion" (32) |
| `pill_1_label` | 12–24 | 30 | „1 Beutel · 30 g" (15) | „1 Dose · 60 Kapseln" (19) |
| `trust_1..4` | 20–40 | 50 | „Ohne Zusätze und Trägerstoffe" (29) | „Enthält Weizen (Gluten)" (23) |
| `bb_benefit_1..4` | 25–50 | 60 | „Jederzeit kündbar, auch direkt nach der ersten Lieferung" (56) | „Gratisversand bei jeder Abo-Lieferung" (37) |

**Die eine Regel, die am häufigsten verletzt wird:** Headline und Tagline dürfen
nicht dasselbe sagen. Der Ist-Zustand vor dem Piloten war

> `hero_headline`: „Spermidin aus standardisiertem Weizenkeimextrakt."
> `tagline`: „Spermidin aus Weizenkeimextrakt, unabhängig laborgeprüft."

Eine Aussage in zwei Feldern, dazu 48 Zeichen Headline über der harten Grenze.
Wenn die Tagline nichts Neues sagt, streichen oder mit Substanz füllen. Im Piloten
trägt die Headline den Rohstoff und die Tagline die Menge.

---

## 2. Section-Ebene

| Feld | Korridor | hart | NMN | Spermidin |
|---|---|---|---|---|
| `heading` / `headline` | 20–40 | 55 | „Was LIFETIME NMN unterscheidet" (30) | „Was diese Kapseln unterscheidet" (31) |
| `subheading` | 25–50 | 70, ein Satz | „Entscheidend ist, wie viel wirklich drin ist." (45) | „Vom Weizenkeim zur standardisierten Kapsel." (43) |
| `intro` / `body` | 90–150 | 170, max. 3× pro Seite | „Eine unabhängige Untersuchung der National University of Singapore hat 2024 nachgemessen, wie viel NMN wirklich in Handelsprodukten steckt." (139) | „Überzeugt dich das Produkt nicht, bekommst du innerhalb von 30 Tagen den vollen Betrag zurück." (94) |
| Karten-Beschreibung | 60–110 | 130 | „Patentierter Markenrohstoff mit dokumentierter Herkunft. Kein No-Name-NMN." (74) | „Der Weizenkeimextrakt ist auf einen festen Spermidingehalt eingestellt: 5 mg je Kapsel." (87) |
| FAQ-Antwort | 60–250 | 300 | „Ein Beutel enthält 30 g NMN-Pulver mit >99,9 % Reinheit." (56) | „Eine Dose enthält 60 Kapseln. Bei 2 Kapseln täglich reicht sie 30 Tage." (71) |
| `stage_body` (Wirkprinzip) | 80–120 | 140, ein Satz | – | „Spermidin ist ein Polyamin. Es kommt in jeder Körperzelle vor und steckt in Weizenkeimen, Pilzen und reifem Käse." (113) |

Zwei Ausnahmen nach unten sind kanonisch und kein Fehler: `heading` „Bekannt aus"
(11) im Logo Garden und „Häufige Fragen" (14) in der FAQ. Beide stehen so im
Nordstern und bleiben so.

---

## 3. Harte Ausschlüsse

| Verboten | Beispiel aus dem Bestand | Stattdessen |
|---|---|---|
| Em-Dash `—` | „Feuchtigkeit, Elastizität, Gelenkfunktion — von innen." (Hyaluron) | Komma, Punkt, Klammer |
| Dreiklang | „Starke Abwehrkräfte, belastbare Knochen, mehr Vitalität" (D3K2) | ein normaler Satz |
| Leerer Superlativ | „Das kraftvollste Antioxidans, das die Natur entwickelt hat." (Astaxanthin) | „>99 % natürliches Astaxanthin aus *Haematococcus pluvialis*." |
| Claim-Stacking | Badge + Benefit-Icons + Bullets nebeneinander | genau eine Ebene |
| Unbelegter Sozialbeweis | `badge_text: "Bestseller"` | echte Loox-Zahl oder nichts |
| Kicker ohne Informationsgewinn | Kicker „Qualität" über einer Qualitäts-Section | `"__none__"` |
| Meta-Beteuerung | „wissenschaftlich fundiert und nachprüfbar validiert" | „Prüfbericht der Charge L-25-09126, öffentlich" |

Halbgeviertstrich `–` bleibt als Bis-Strich erlaubt („2–3 Werktage"). Bindestriche
in Komposita bleiben erlaubt.

**Prüfbefehl vor jedem Push:**

```bash
grep -c '—' templates/product.<suffix>.json
```

Muss `0` liefern. Zusätzlich auf unsichtbare Zeichen prüfen: Soft-Hyphen U+00AD
steckt in `05_kreatin` und `11_b-komplex`, Narrow-NBSP U+202F in `04_fisetin`,
`07_d3k2`, `11_b-komplex`. Beide sind im Diff und beim Zeichenzählen unsichtbar.

---

## 4. Tonalität

Deutsch, Du-Form, durchgehend. Vier PDPs stehen heute noch in Sie-Form: TMG,
Resveratrol, Hyaluron, B-Komplex.

Ruhig, präzise, ohne Verkaufsdruck. Eine Aussage pro Element. Zahl statt
Behauptung. Substanz statt Beteuerung.

Ein „Sie" am Satzanfang als Pronomen („Sie gilt für deine erste Bestellung") ist
grammatisch richtig, erzeugt aber beim Grep einen Fehlalarm und liest sich im
Du-Text unsauber. Im Piloten umformuliert zu „Ja, für deine erste Bestellung".

---

## 5. Compliance, nicht verhandelbar

Rechtsrahmen: VO (EG) 1924/2006 Art. 10(1) plus Unionsliste VO (EU) 432/2012.
Gesundheitsbezogene Angaben sind verboten, außer sie sind zugelassen und
wortlautnah verwendet, **unabhängig davon, ob Studien existieren**.

Das Referenzmuster für eine zulässige Wirkaussage steht im eigenen Bestand,
`product.08_schlafspray.json`: Claim-Satz plus Bedingungssatz direkt aneinander.

> „Melatonin trägt dazu bei, die Einschlafzeit zu verkürzen. Die positive Wirkung
> stellt sich ein, wenn 1 mg Melatonin kurz vor dem Schlafengehen verzehrt wird."

**Wenn kein zugelassener Claim existiert, bleibt die Seite claimfrei.** Der Pilot
zeigt, wie das aussieht. Spermidin hat keinen zugelassenen Claim, also beschreibt
die Wirkprinzip-Section Herkunft und Standardisierung statt Wirkung:

| gestrichen (Ist-Zustand bis 29.07.) | ersetzt durch |
|---|---|
| „Indem Autophagie unterstützt wird, kann der Körper die Zellen länger gesund halten." | „Der Extrakt wird auf einen festen Gehalt eingestellt: 5 mg je Kapsel, 10 mg je Tagesportion." |
| „Aktivierung der Autophagie", „Erhaltung der zellulären Funktion", „zelluläre Erneuerung", „mitochondriale Gesundheit" | ersatzlos. Es bleiben Produktfakten: Menge, Form, Herkunft, Prüfung. |

Das reicht für eine gute Seite. Der Beweis steht live unter
`/products/spermidin-kapseln`.

**Bilder tragen Claims mit.** VO (EG) 1924/2006 Art. 2 Abs. 2 Nr. 1 erfasst auch
bildliche Darstellungen. Deshalb steht im Piloten kein Bild in der
Wirkprinzip-Section: die vorhandene Motivbibliothek enthält
`cell-recycling-cleaning-metaphor-spermidine.jpg`, also genau die Aussage, die im
Text gestrichen wurde.

---

## 6. Pflichtangaben, die in `lt-pdp-produktfakten` gehören

Für Nahrungsergänzungsmittel Pflicht, nicht optional. Der NMN-Sonderweg
(Forschungschemikalie, keine Verzehrempfehlung) gilt ausschließlich für NMN.

| Angabe | Rechtsgrundlage | Feld |
|---|---|---|
| Zutatenverzeichnis, absteigende Gewichtsreihenfolge | LMIV Art. 18 | `ingredients_text` |
| Allergen hervorgehoben | LMIV Art. 21 Abs. 1 lit. a, Anhang II | `ingredients_text`, GROSSBUCHSTABEN |
| Allergen vor Vertragsschluss verfügbar | LMIV Art. 14 Abs. 1 lit. a (Fernabsatz) | zusätzlich `trust_4` im Hero |
| Verzehrempfehlung | NemV § 4 Abs. 2 | `intake_text` |
| „kein Ersatz für eine ausgewogene Ernährung" | NemV § 4 Abs. 2 Nr. 1 | `legal_note` |
| „außerhalb der Reichweite von kleinen Kindern" | NemV § 4 Abs. 2 Nr. 2 | `legal_note` |
| „empfohlene tägliche Verzehrmenge nicht überschreiten" | NemV § 4 Abs. 2 Nr. 3 | `legal_note` |
| zugelassene Bezeichnung eines Novel Food | Unionsliste, DVO (EU) 2017/2470 | `ingredients_text`, erste Zutat |
| Zielgruppe / Ausschlüsse eines Novel Food | Verwendungsbedingung der jeweiligen DVO | `intake_text` |

Der `legal_note`-Default der Section trägt nur zwei der drei NemV-Sätze. Der dritte
(Verzehrmenge) wird im Template ergänzt, wie im Piloten geschehen. Solange der
Schema-Default nicht nachgezogen ist, ist das pro Template zu setzen.

**Muster aus dem Piloten:**

```
Zutaten
Spermidin-reicher WEIZENkeimextrakt, Maltodextrin, Kapselhülle:
Hydroxypropylmethylcellulose, Trennmittel: Siliciumdioxid.
Enthält WEIZEN (Gluten).

Verzehrempfehlung
Täglich 2 Kapseln zu einer Mahlzeit mit ausreichend Flüssigkeit einnehmen.
Für Erwachsene. Nicht geeignet für Schwangere und Stillende.

Die angegebene empfohlene tägliche Verzehrmenge darf nicht überschritten werden.
Nahrungsergänzungsmittel sind kein Ersatz für eine ausgewogene und
abwechslungsreiche Ernährung und eine gesunde Lebensweise. Außerhalb der
Reichweite von kleinen Kindern aufbewahren.
```

Die Hervorhebung läuft über Großbuchstaben, nicht über `<strong>`: das Liquid
escaped `ingredients_text` und lässt kein Markup durch. Großschreibung ist eine
nach Art. 21 anerkannte Form der Hervorhebung und die auf deutschen Etiketten
übliche.

---

## 7. Autorität

Prof. Dr. med. Volker Limmroth, immer mit Vornamen (es gibt eine
Dr. Christina Limmroth). Belegt sind: Chefarzt Neurologie, Chief Scientific
Officer LIFETIME, seit 2006, über 160 PubMed-Einträge, Buch bei Ullstein 2025.
Null Longevity-Publikationen.

„Spiegel Bestseller" ist unbelegt und darf nicht zurückkommen. Belegbar ist
`founder_creds: "20+ Jahre Forschung"`.

---

## 8. Anti-Schablonen-Test (Gate G5)

Nach jeder Welle alle bis dahin fertigen `hero_headline` und `tagline`
nebeneinanderlegen:

- kein Wort eröffnet mehr als zwei Werte
- höchstens vier stehen in derselben Satzform

Stand nach dem Piloten (3 fertige Seiten):

| Seite | `hero_headline` | Eröffnungswort | Satzform |
|---|---|---|---|
| NMN | NMN-Pulver mit Laborbericht | NMN-Pulver | Substantiv + Präposition |
| AGE&DNA | (Copy-Bereinigung offen) | – | – |
| Spermidin | Spermidin aus Weizenkeimextrakt | Spermidin | Substantiv + Präposition |

Zwei von zwei in derselben Satzform. Das ist unter der Grenze von vier, aber die
Reserve ist bereits aufgebraucht: **ab W1 muss variiert werden.** Nicht jede
Headline darf „<Stoff> aus <Rohstoff>" heißen.

---

Siehe `briefing-pdp-refit.md` (Auftrag und Gates),
`_examples/templates/product.supplement-reference.json` (Struktur),
`pdp-supplement-rollout.md` (Hero-Matrix und Gate-Liste),
`conversion-messaging.md` §9 (KI-Tells).
