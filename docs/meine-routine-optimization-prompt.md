---
status: archived
last_review: 2026-05-08
canonical_for: nothing — One-off-Prompt für „Meine Routine"-Konzept, durch Live-„Quiz Age" ersetzt
---

# Optimierungs-Prompt: `page.meine-routine.json`
## LIFETIME — Seite "Meine Routine"

**Auftraggeber:** LIFETIME Health  
**Ziel:** Die Seite "Meine Routine" strukturell und textlich optimieren — neue Sektionsreihenfolge, fehlende Hero-Section, Copy-Überarbeitung.  
**Art der Aufgabe:** Ausschließlich `templates/page.meine-routine.json` anpassen und eine neue Liquid-Section bauen. Kein bestehender Liquid-Code wird verändert außer der neuen Datei.

---

## Pflichtlektüre vor Implementierung

Lies diese Dateien vollständig, bevor du arbeitest:

- `/AGENTS.md`
- `/shopify/AGENTS.md`
- `docs/design-governance.md`
- `docs/conversion-messaging.md`
- `templates/index.json` — Referenz für Layout-Pattern
- `sections/crs-hero-typewriter.liquid` — Referenz für Klassen-Systematik
- `sections/lt-hp-science.liquid` — Referenz für Expert-Block
- `docs/science-page-rebuild-prompt.md` — Referenz für den Aufbau der Nachbarseite "Wissenschaft"

---

## Strategischer Kontext

Die Seite "Meine Routine" ist der dritte Menüpunkt im Hauptmenü: **Produkte → Wissenschaft → Meine Routine**.

Sie ist die **Handlungsseite** am Ende der Navigations-Journey. Wer hier landet, hat entweder:
- Produkte angeschaut und fragt sich, womit er anfangen soll
- Die Wissenschaft-Seite gelesen und will jetzt handeln
- Direkt nach einer personalisierten Empfehlung gesucht

Der Kern der Seite ist ein **Longevity-Quiz** (`lt-longevity-quiz`), das basierend auf dem Fokus des Nutzers (Energie / Fokus / Schlaf / Langlebigkeit) eine Produkt-Empfehlung ausspielt.

**Das Problem der aktuellen Seite:** Sie beginnt direkt mit dem Quiz — ohne Orientierung, ohne Begründung, ohne Trust. Der Nutzer wird sofort gefragt, bevor er verstanden hat, warum dieser Quiz vertrauenswürdig ist und was danach passiert.

**Das Ziel:** Den Nutzer erst abholen, dann in den Quiz führen.

---

## Ist-Zustand: Aktuelle Sektionsreihenfolge

```json
"order": [
  "lt_longevity_quiz",
  "trust_ticker",
  "professor_quote",
  "logo_garden",
  "social_proof",
  "cta_close"
]
```

**Probleme:**

1. **Kein Hero** — die Seite beginnt ohne Positionierung direkt mit dem Quiz-Interface.
2. **Trust Ticker kommt nach dem Quiz** — Vertrauen sollte aufgebaut werden, *bevor* jemand Fragen beantwortet.
3. **Limmroth-Quote kommt nach dem Quiz** — das stärkste Glaubwürdigkeitssignal kommt zu spät.
4. **Logo Garden in der Mitte** — Presse-Logos sind frühe Trust-Signale, keine Mid-Page-Elemente.
5. **Quiz hat leere Headline-Felder** — `"label": ""`, `"title": ""`, `"subtitle": ""` bedeutet, dass der Quiz-Block ohne jede Einleitung startet.

---

## Neue Sektionsreihenfolge

```json
"order": [
  "routine_hero",
  "trust_ticker",
  "logo_garden",
  "professor_quote",
  "lt_longevity_quiz",
  "social_proof",
  "cta_close"
]
```

**Logik:**

- Hero → setzt Erwartung und Versprechen
- Trust Ticker → gibt sofort Orientierung (personalisiert, wissenschaftlich, 2 Minuten)
- Logo Garden → institutionelle Glaubwürdigkeit direkt nach Trust-Signalen
- Limmroth-Quote → menschliche Autorität als letzter Primer vor dem Quiz
- Quiz → der Nutzer ist jetzt vorbereitet und vertrauend
- Social Proof → bestätigt die Quiz-Entscheidung
- CTA Close → überleitet zum Test für alle, die tiefer gehen wollen

---

## Section 1 — Hero: NEU BAUEN

**Section-Key:** `routine_hero`  
**Liquid-Datei:** `sections/lt-routine-hero.liquid` — neue Datei  
**Referenz-Pattern:** `sections/lt-science-hero.liquid` (analog zur Wissenschaft-Seite)

### Layout

Zweispaltig: Text links (60%), Bild rechts (40%).  
Auf Mobile: Text oben, Bild darunter.  
Heller Hintergrund (`#f7f7f4`).  
Kein CTA-Button — die Section positioniert, der Quiz-Block unterhalb konvertiert.

### Schema-Felder

```liquid
{% schema %}
{
  "name": "Routine Hero",
  "tag": "section",
  "class": "lt-routine-hero",
  "settings": [
    { "type": "text",         "id": "kicker",        "label": "Kicker",        "default": "Meine Routine" },
    { "type": "textarea",     "id": "headline",      "label": "Headline",      "default": "Deine Routine ist so individuell wie deine Biologie." },
    { "type": "textarea",     "id": "subheading",    "label": "Subheading",    "default": "Pauschale Empfehlungen ignorieren, was deinen Körper wirklich ausmacht. Finde in zwei Minuten heraus, womit du anfangen solltest." },
    { "type": "image_picker", "id": "image",         "label": "Bild rechts" },
    { "type": "text",         "id": "image_alt",     "label": "Bild Alt-Text" },
    { "type": "color",        "id": "color_bg",      "label": "Hintergrund",   "default": "#f7f7f4" },
    { "type": "color",        "id": "color_text",    "label": "Textfarbe",     "default": "#26251e" },
    { "type": "range",        "id": "padding_top",   "label": "Abstand oben",  "min": 0, "max": 160, "step": 8, "default": 80 },
    { "type": "range",        "id": "padding_bottom","label": "Abstand unten", "min": 0, "max": 160, "step": 8, "default": 40 }
  ],
  "presets": [{ "name": "Routine Hero" }]
}
{% endschema %}
```

### JSON-Settings für `page.meine-routine.json`

```json
"routine_hero": {
  "type": "lt-routine-hero",
  "settings": {
    "kicker": "Meine Routine",
    "headline": "Deine Routine ist so individuell wie deine Biologie.",
    "subheading": "Pauschale Empfehlungen ignorieren, was deinen Körper wirklich ausmacht. Finde in zwei Minuten heraus, womit du anfangen solltest.",
    "image": "",
    "image_alt": "Personalisierte Longevity-Routine — LIFETIME",
    "color_bg": "#f7f7f4",
    "color_text": "#26251e",
    "padding_top": 80,
    "padding_bottom": 40
  }
}
```

---

## Section 2 — Trust Ticker: COPY OPTIMIEREN

**Section-Key:** `trust_ticker`  
**Liquid-Datei:** unverändert  

Zwei Ticker-Items haben generische Copy. Ersetzen:

```json
"item_1": {
  "type": "ticker_item",
  "settings": {
    "item_text": "Personalisiert auf deinen Fokus — nicht auf alle",
    "item_icon": ""
  }
},
"item_2": {
  "type": "ticker_item",
  "settings": {
    "item_text": "Basierend auf peer-reviewed Longevity-Forschung",
    "item_icon": ""
  }
},
"item_3": {
  "type": "ticker_item",
  "settings": {
    "item_text": "In 2 Minuten zu deiner ersten Empfehlung",
    "item_icon": ""
  }
},
"item_4": {
  "type": "ticker_item",
  "settings": {
    "item_text": "Von Prof. Dr. Limmroth wissenschaftlich eingeordnet",
    "item_icon": ""
  }
}
```

---

## Section 3 — Logo Garden: NUR VERSCHIEBEN

**Section-Key:** `logo_garden`  
Keine Änderungen an Settings. Nur neue Position nach Trust Ticker.

---

## Section 4 — Professor Quote: COPY SCHÄRFEN

**Section-Key:** `professor_quote`  
**Liquid-Datei:** unverändert  

Die Headline ist aktuell identisch mit dem Expert-Quote — das ist redundant. Außerdem ist "Jeder Körper ist anders" zu generisch als Headline für eine Seite, die genau das lösen will.

**Änderungen:**

```json
"kicker": "Warum Pauschal-Routinen scheitern",
"headline": "Wer nicht weiß, wo er steht, optimiert ins Leere.",
"subheadline": "Empfehlungen, die nicht auf deine Biologie abgestimmt sind, sind Vermutungen. Prof. Dr. Limmroth hat LIFETIME genau dafür entwickelt.",
"expert_quote": "Jeder Körper ist anders. Nachhaltige Longevity entsteht dann, wenn Empfehlungen wirklich auf den individuellen Status abgestimmt sind."
```

---

## Section 5 — Quiz: FEHLENDE COPY ERGÄNZEN

**Section-Key:** `lt_longevity_quiz`  
**Liquid-Datei:** unverändert  

Die Felder `label`, `title` und `subtitle` sind leer. Prüfen, ob diese Felder im Liquid gerendert werden. Falls ja, befüllen:

```json
"label": "Dein Einstieg",
"title": "Was ist dein größter Fokus gerade?",
"subtitle": "Deine Antwort bestimmt, womit du sinnvoll anfangen kannst."
```

Falls das Quiz-Interface diese Felder als Einleitung über dem Quiz-UI rendert: eintragen.  
Falls das Liquid-Schema diese Felder nicht unterstützt oder sie nicht gerendert werden: keine Änderung.

Alle anderen Quiz-Settings (Produktzuordnungen, Limmroth-Credentials) bleiben unverändert.

---

## Section 6 — Social Proof: KICKER UND AGGREGATE STATS PRÜFEN

**Section-Key:** `social_proof`  
**Liquid-Datei:** unverändert  

**Kicker-Korrektur** — grammatikalisch und stilistisch:

```json
"kicker": "Menschen, die wir länger begleiten"
```

Aktuell: `"Kund*innen die wir länger begleiten"` — fehlendes Komma, klingt abgehackt.

**Alle anderen Settings unverändert** — Testimonials, Aggregate Stats und Press Logos sind korrekt und bleiben.

---

## Section 7 — CTA Close: BADGE TEXT SCHÄRFEN

**Section-Key:** `cta_close`  
**Liquid-Datei:** unverändert  

Der `badge_text` ist aktuell zu lang und zu erklärend:

```
Aktuell: "Noch tiefere Einblicke statt reiner Produktempfehlung"
Neu:     "Präziser als jede Pauschal-Empfehlung"
```

Alle anderen CTA-Settings bleiben unverändert.

---

## Zusammenfassung: Was zu tun ist

| Aufgabe | Datei | Art |
|---|---|---|
| Neue Hero-Section bauen | `sections/lt-routine-hero.liquid` | Neu bauen |
| Hero in JSON einfügen | `templates/page.meine-routine.json` | Block hinzufügen |
| Sektionsreihenfolge anpassen | `templates/page.meine-routine.json` | `order` neu setzen |
| Trust Ticker Copy | `templates/page.meine-routine.json` | 2 Items aktualisieren |
| Professor Quote Copy | `templates/page.meine-routine.json` | 3 Settings ändern |
| Quiz Headline-Felder | `templates/page.meine-routine.json` | Prüfen + befüllen |
| Social Proof Kicker | `templates/page.meine-routine.json` | 1 Setting ändern |
| CTA Badge Text | `templates/page.meine-routine.json` | 1 Setting ändern |

---

## Was nicht geändert wird

- Kein bestehender Liquid-Code außer der neuen `lt-routine-hero.liquid`
- Keine Quiz-Produktzuordnungen (`product_energie_primary` etc.)
- Keine Testimonial-Inhalte
- Keine Aggregate Stats
- Keine Design-Tokens, Farbpalette oder Theme-Architektur
- Keine anderen Templates oder Sektionen

---

## Guardrails

- Alle Texte Du-Form, Deutsch
- Keine Produktnamen direkt im Hero — der Quiz löst die Empfehlung aus, nicht die Headline
- Limmroth: keine Diagnose-Sprache, keine Heilversprechen
- Hero-Bild: `image` bleibt leer — wird im Theme-Editor befüllt
- Neue Section folgt exakt dem Pattern aus `lt-science-hero.liquid`: `ltw-container`, `ltw-content`, `ltw-visual`, `ltw-visual__img`
- Responsive: Text-Bild stackt vertikal ab ~768px
