---
status: archived
last_review: 2026-05-08
canonical_for: nothing — One-off-Rebuild-Prompt, ausgeführt; live ist Science-Page V2
---

# Claude Code Prompt: `page.science.json` — Rebuild V2
## LIFETIME Wissenschaft-Seite — Neue Sektionsarchitektur

**Auftraggeber:** LIFETIME Health  
**Ziel:** Die Wissenschaft-Seite strategisch neu aufbauen — neue Sektionsreihenfolge, neue Hero-Section, Limmroth als zentralen Anker setzen.  
**Was sich ändert:** Reihenfolge in `templates/page.science.json`, eine neue Liquid-Section `lt-science-hero.liquid`, eine neue Liquid-Section `lt-science-limmroth.liquid`, kleinere Anpassungen an bestehenden Sections.  
**Was sich NICHT ändert:** Design-Tokens, bestehende Liquid-Sections (außer JSON-Settings), Theme-Architektur.

---

## Pflichtlektüre vor Implementierung

Lies diese Dateien vollständig, bevor du eine einzige Zeile schreibst:

- `/AGENTS.md`
- `/shopify/AGENTS.md`
- `docs/design-governance.md`
- `docs/conversion-messaging.md`
- `docs/science-blueprint-v1.1.md`
- `docs/science-copy-v1.1.md`
- `templates/index.json` — Hero-Pattern als Referenz
- `sections/crs-hero-typewriter.liquid` — für Layout-Logik und CSS-Klassen
- `sections/lt-hp-science.liquid` — für Expert-Block-Pattern
- `sections/lt-science-hallmarks.liquid` — Bestandssection
- `sections/lt-science-messebenen.liquid` — Bestandssection

---

## Strategischer Kontext

Die Wissenschaft-Seite ist ein **Vertrauens-Anker**, kein Conversion-Block. Sie sitzt im Hauptmenü zwischen "Produkte" und "Meine Routine". Nutzer, die hierher kommen, fragen: *"Warum sollte ich LIFETIME glauben?"*

Die Seite beantwortet diese Frage mit einem durchgehenden Argument:

> **Prof. Limmroth hat 200+ Studien publiziert. LIFETIME hat daraus ein System gebaut.**

Das ist die Story. Alles auf der Seite folgt dieser Logik:
1. Hier ist, was Altern biologisch ist (Hallmarks)
2. Hier ist, wie man es misst (Messebenen)
3. Hier ist der Mensch, der das alles verantwortet (Limmroth)
4. Hier ist, was du tun kannst (CTA)

**Kein Wellness-Theater. Kein Produktkatalog. Kein Hype.**

---

## Neue Sektionsreihenfolge — `templates/page.science.json`

Die finale `order`-Liste in `page.science.json` muss nach diesem Rebuild so aussehen:

```json
"order": [
  "main",
  "science_hero",
  "science_hallmarks",
  "science_measurements",
  "science_limmroth",
  "science_foundation",
  "science_bento",
  "science_sources",
  "science_cta"
]
```

**Wichtig:** `science_hero` und `science_limmroth` sind neue Sections und noch nicht in der JSON vorhanden. Die anderen Sections existieren bereits — sie werden nur neu sortiert und minimal angepasst.

---

## Section 1 — Hero: NEU BAUEN

**Section-Key:** `science_hero`  
**Liquid-Datei:** `sections/lt-science-hero.liquid` — **neue Datei, komplett neu bauen**  
**Warum neu und nicht `crs-hero-typewriter` anpassen:** Die Homepage nutzt den Typewriter-Effekt und das Dashboard-Visual. Die Wissenschaft-Seite braucht eine ruhigere, redaktionelle Haltung: Text links, echtes Foto rechts, kein animierter Effekt, kein CTA.

### Layout-Anforderungen

- Zweispaltig: Text links (60%), Bild rechts (40%)
- Auf Mobile: Text oben, Bild darunter (stack)
- Bild ist ein echtes Shopify-Image-Metafield — **kein Platzhalter**
- Keine Animation, kein Typewriter, kein Dashboard
- Kein CTA-Button — diese Section setzt eine Haltung, sie verkauft nichts

### CSS-Klassen

Nutze bestehende Theme-Klassen aus `crs-hero-typewriter.liquid` als Referenz:
- Container: `ltw-container`
- Text-Seite: `ltw-content`
- Visual-Seite: `ltw-visual`
- Bild: `ltw-visual__img`

Baue keine neuen CSS-Klassen, wenn eine bestehende den gleichen Job macht.

### Schema-Felder

```liquid
{% schema %}
{
  "name": "Science Hero",
  "tag": "section",
  "class": "lt-science-hero",
  "settings": [
    { "type": "text",     "id": "kicker",       "label": "Kicker",     "default": "Wissenschaft" },
    { "type": "textarea", "id": "headline",     "label": "Headline",   "default": "Altern ist unvermeidlich. Wie wir altern, ist beeinflussbar." },
    { "type": "textarea", "id": "subheading",   "label": "Subheading", "default": "Hier zeigen wir dir die wissenschaftliche Grundlage hinter LIFETIME: die Mechanismen des Alterns, die Rolle von Diagnostik und die Standards, nach denen wir Evidenz bewerten." },
    { "type": "image_picker", "id": "image",    "label": "Bild rechts" },
    { "type": "text",     "id": "image_alt",    "label": "Bild Alt-Text" },
    { "type": "color",    "id": "color_bg",     "label": "Hintergrund", "default": "#f7f7f4" },
    { "type": "color",    "id": "color_text",   "label": "Textfarbe",  "default": "#26251e" },
    { "type": "range",    "id": "padding_top",  "label": "Abstand oben",  "min": 0, "max": 160, "step": 8, "default": 80 },
    { "type": "range",    "id": "padding_bottom","label": "Abstand unten", "min": 0, "max": 160, "step": 8, "default": 80 }
  ],
  "presets": [{ "name": "Science Hero" }]
}
{% endschema %}
```

### JSON-Settings für `page.science.json`

```json
"science_hero": {
  "type": "lt-science-hero",
  "settings": {
    "kicker": "Wissenschaft",
    "headline": "Altern ist unvermeidlich. Wie wir altern, ist beeinflussbar.",
    "subheading": "Langlebigkeit beginnt nicht mit Trends, sondern mit Biologie. Wer versteht, was im Körper mit dem Alter passiert, kann gezielter entscheiden, was wirklich sinnvoll ist — und was nicht.",
    "image": "",
    "image_alt": "Wissenschaftliche Textur — LIFETIME",
    "color_bg": "#f7f7f4",
    "color_text": "#26251e",
    "padding_top": 80,
    "padding_bottom": 80
  }
}
```

*Hinweis: `image` bleibt leer — wird im Theme-Editor befüllt.*

---

## Section 2 — Hallmarks: BESTEHEND, ACCORDION ERGÄNZEN

**Section-Key:** `science_hallmarks`  
**Liquid-Datei:** `sections/lt-science-hallmarks.liquid` — **Liquid anpassen**  
**Status:** Inhalte korrekt, Kicker bereits aktualisiert. Diese Section braucht eine strukturelle Änderung: Die 12 Hallmark-Karten sind standardmäßig ausgeblendet und werden per Toggle sichtbar.

### Warum

12 Karten in Serie unterbrechen den Story-Flow auf Mobile. Der Job der Section ist es, Tiefe zu signalisieren — nicht alle 12 Karten zu erzwingen. Nutzer, die tiefer einsteigen wollen, sollen es können. Alle anderen scrollen weiter.

### Verhalten

**Standardansicht (collapsed):**
- Kicker, Headline, Subheadline wie bisher
- 3 Kategorie-Tiles sichtbar (Primäre / Antagonistische / Integrative), je mit Name, Kurzbeschreibung und Anzahl der Hallmarks
- Toggle-Button darunter: `"Alle 12 Mechanismen ansehen ↓"`
- Die 12 Hallmark-Karten sind mit `display: none` / `max-height: 0` versteckt

**Ausgeklappt:**
- Die 12 Hallmark-Karten erscheinen unterhalb der Kategorie-Tiles mit einer smooth `max-height`-Transition
- Toggle-Button wechselt zu: `"Weniger anzeigen ↑"`
- Kein Seitenwechsel, kein Scroll-Jump

### Implementierung

Das Toggle wird mit minimalem Vanilla-JS umgesetzt — kein externes Framework.

```javascript
// Toggle-Logik — inline im Liquid oder als eigenes Script
document.querySelectorAll('.lt-hallmarks__toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const grid = btn.closest('.lt-hallmarks').querySelector('.lt-hallmarks__grid');
    const expanded = grid.classList.toggle('lt-hallmarks__grid--visible');
    btn.textContent = expanded ? 'Weniger anzeigen ↑' : 'Alle 12 Mechanismen ansehen ↓';
  });
});
```

```css
.lt-hallmarks__grid {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.lt-hallmarks__grid--visible {
  max-height: 2000px; /* großzügig — passt sich dem Inhalt an */
}
.lt-hallmarks__toggle {
  /* nutzt bestehenden Ghost-Button-Style: ltw-btn ltw-btn--ghost */
  margin-top: 24px;
}
```

### Kategorie-Tiles (neue Elemente, immer sichtbar)

Die 3 Tiles sind neu im Liquid — sie fassen die bestehenden `category_header`-Blöcke visuell zusammen:

| Tile | Name | Beschreibung | Anzahl |
|---|---|---|---|
| 1 | Primäre Hallmarks | Ursachen. Hier entstehen die Schäden. | 5 Mechanismen |
| 2 | Antagonistische Hallmarks | Reaktionen. Der Körper antwortet auf die Schäden. | 3 Mechanismen |
| 3 | Integrative Hallmarks | Konsequenzen. Das Gewebe und der Organismus versagen. | 4 Mechanismen |

Die Tile-Daten sind **hardcoded** aus den bestehenden `category_header`-Block-Settings — kein neues Schema nötig.

### Schema-Ergänzung

Ein neues Boolean-Feld im Section-Schema:

```json
{ "type": "checkbox", "id": "show_expanded_default", "label": "Standardmäßig ausgeklappt", "default": false }
```

Damit kann der Redakteur die Section im Theme-Editor bei Bedarf ausgeklappt lassen (z. B. für Desktop-Preview).

### JSON-Setting ergänzen

```json
"show_expanded_default": false
```

---

## Section 3 — Messebenen: BESTEHEND, NUR VERSCHIEBEN

**Section-Key:** `science_measurements`  
**Liquid-Datei:** `sections/lt-science-messebenen.liquid` — unverändert  
**Status:** In der JSON vorhanden, korrekte Inhalte — nur neue Position nach Hallmarks.

**Keine Änderungen an Settings.**

---

## Section 4 — Limmroth: NEU BAUEN

**Section-Key:** `science_limmroth`  
**Liquid-Datei:** `sections/lt-science-limmroth.liquid` — **neue Datei, komplett neu bauen**

Das ist die wichtigste neue Section. Prof. Dr. Limmroth ist der Grund, warum LIFETIME glaubwürdiger ist als jede andere Longevity-Marke im deutschsprachigen Raum. Er erscheint hier als vollständige Person — kein Zitat-Block, keine Testimonial-Card.

### Visuelles Konzept

Zweispaltig, **Bild links** (40%), Text rechts (60%).  
Dunkler Hintergrund (`#364f56`, `color_text: #f7f7f4`) — visueller Kontrast nach den hellen Hallmarks.  
Das Bild zeigt Prof. Limmroth — kein Placeholder.

### Inhaltselemente (von oben nach unten, rechte Spalte)

1. **Eyebrow** — `"Chief Scientific Officer · LIFETIME"`
2. **Name** — `"Prof. Dr. med. Volker Limmroth"` — in Heading-Größe
3. **Credentials-Zeile** — einzelne Zeile, opak gedimmt: `"Chefarzt für Neurologie · Harvard Medical School · 200+ Publikationen auf PubMed"`
4. **Body-Text** — 2–3 Sätze: die medizinische und wissenschaftliche Einordnung, für die er verantwortlich ist
5. **Buch-Block** — horizontal: Cover-Bild klein (40×60px), daneben Buchtitel + Verlagszeile + optionaler Link. Das ist der wichtigste unabhängige Trust-Anker.
6. **PubMed-Link** — Text-Link, öffnet in neuem Tab. Formulierung: `"Publikationen auf PubMed ansehen →"`

### Buch-Block-Detail

```
Cover-Bild: image_picker (Buchcover „Der Longevity-Kompass")
Titel:      "Der Longevity-Kompass"
Untertitel: "Bestseller · Heyne Verlag"
Link-Label: "Auf Amazon ansehen →"
Link-URL:   (leer lassen — wird im Editor befüllt)
```

### Schema-Felder

```liquid
{% schema %}
{
  "name": "Science Limmroth",
  "tag": "section",
  "class": "lt-science-limmroth",
  "settings": [
    { "type": "text",         "id": "kicker",           "label": "Kicker",          "default": "Chief Scientific Officer · LIFETIME" },
    { "type": "text",         "id": "expert_name",      "label": "Name",             "default": "Prof. Dr. med. Volker Limmroth" },
    { "type": "text",         "id": "expert_credentials","label": "Credentials",     "default": "Chefarzt für Neurologie · Harvard Medical School · Autor von 200+ peer-reviewed Publikationen" },
    { "type": "textarea",     "id": "expert_body",      "label": "Fließtext",        "default": "Als Chefarzt und Forscher bringt er das mit, was kein Marketingteam ersetzen kann: jahrzehntelange klinische Praxis und 200+ publizierte Studien. Er stellt sicher, dass LIFETIME nie mehr behauptet als die Wissenschaft trägt." },
    { "type": "image_picker", "id": "expert_image",     "label": "Foto" },
    { "type": "image_picker", "id": "book_cover",       "label": "Buchcover" },
    { "type": "text",         "id": "book_title",       "label": "Buchtitel",        "default": "Der Longevity-Kompass" },
    { "type": "text",         "id": "book_subtitle",    "label": "Buch-Untertitel",  "default": "Bestseller · Heyne Verlag" },
    { "type": "url",          "id": "book_url",         "label": "Buch-Link (optional)" },
    { "type": "text",         "id": "book_link_label",  "label": "Buch-Link-Label",  "default": "Auf Amazon ansehen →" },
    { "type": "url",          "id": "pubmed_url",       "label": "PubMed-Link" },
    { "type": "text",         "id": "pubmed_label",     "label": "PubMed-Label",     "default": "Publikationen auf PubMed ansehen →" },
    { "type": "color",        "id": "color_bg",         "label": "Hintergrund",      "default": "#364f56" },
    { "type": "color",        "id": "color_text",       "label": "Textfarbe",        "default": "#f7f7f4" },
    { "type": "range",        "id": "padding_top",      "label": "Abstand oben",     "min": 0, "max": 160, "step": 8, "default": 80 },
    { "type": "range",        "id": "padding_bottom",   "label": "Abstand unten",    "min": 0, "max": 160, "step": 8, "default": 80 }
  ],
  "presets": [{ "name": "Science Limmroth" }]
}
{% endschema %}
```

### JSON-Settings für `page.science.json`

```json
"science_limmroth": {
  "type": "lt-science-limmroth",
  "settings": {
    "kicker": "Chief Scientific Officer · LIFETIME",
    "expert_name": "Prof. Dr. med. Volker Limmroth",
    "expert_credentials": "Chefarzt für Neurologie · Harvard Medical School · Autor von 200+ peer-reviewed Publikationen",
    "expert_body": "Als Chefarzt und Forscher bringt er das mit, was kein Marketingteam ersetzen kann: jahrzehntelange klinische Praxis und 200+ publizierte Studien. Er stellt sicher, dass LIFETIME nie mehr behauptet als die Wissenschaft trägt.",
    "expert_image": "",
    "book_cover": "",
    "book_title": "Der Longevity-Kompass",
    "book_subtitle": "Bestseller · Heyne Verlag",
    "book_url": "",
    "book_link_label": "Auf Amazon ansehen →",
    "pubmed_url": "",
    "pubmed_label": "Publikationen auf PubMed ansehen →",
    "color_bg": "#364f56",
    "color_text": "#f7f7f4",
    "padding_top": 80,
    "padding_bottom": 80
  }
}
```

---

## Section 5 — Foundation: BESTEHEND, KICKER ANPASSEN

**Section-Key:** `science_foundation`  
**Liquid-Datei:** `sections/lt-hp-science.liquid` — unverändert  

Da Limmroth jetzt als eigene Section prominent aufgeführt wird, ändert sich die Rolle der Foundation-Section: sie ist jetzt der **Methodik-Block**, nicht der Expertenblock. Der Expert-Subblock bleibt drin — aber die Sektion fokussiert auf Labor und Forschungsstandards.

**Änderungen an den Settings:**

```json
"kicker": "Wissenschaftliche Methodik",
"headline": "Kein Wellness-Theater.",
"subheadline": "Alle LIFETIME Produkte und Analysen basieren auf peer-reviewed Forschung, klar benannter Datenbasis und transparenten Qualitätsstandards."
```

Der `cta_label` und `cta_url` werden auf die Quellenübersicht verlinkt, nicht auf PubMed direkt:

```json
"cta_label": "Quellen und Studien ansehen",
"cta_url": "#science_sources"
```

Alle anderen Settings unverändert.

---

## Section 6 — Bento (Stats): BESTEHEND, FACT 1 AKTIVIEREN

**Section-Key:** `science_bento`  
**Liquid-Datei:** `sections/lt-science-bento.liquid` — unverändert  

`bento_fact_1` (Hallmarks: 12) ist aktuell `"disabled": true`. Aktivieren.

```json
"bento_fact_1": {
  "type": "fact",
  "settings": {
    "fact_label": "Hallmarks of Aging",
    "fact_value": "12",
    "fact_desc": "Biologische Mechanismen, die wissenschaftlich mit Altern verbunden sind."
  }
}
```

`"disabled": true` entfernen.

Alle anderen Settings unverändert.

---

## Section 7 — Sources: BESTEHEND, HEADLINE ANPASSEN

**Section-Key:** `science_sources`  
**Liquid-Datei:** `sections/crs-link-cards.liquid` — unverändert  

Einzige Änderung: Headline anpassen gemäß Copy V1.1.

```json
"heading": "Grundlagen statt bloßer Behauptungen.",
"subheading": "Diese Themen bilden das wissenschaftliche Fundament der Seite. Jede Karte ordnet kurz ein, worum es geht und warum es für gesunde Langlebigkeit relevant ist."
```

Die 6 Quellenkarten (`source_1` bis `source_6`) bleiben unverändert.

---

## Section 8 — CTA: BESTEHEND, SETTINGS AKTUALISIEREN

**Section-Key:** `science_cta`  
**Liquid-Datei:** `sections/lt-science-bento.liquid` — unverändert  

Settings aktualisieren:

```json
"layout_variant": "split",
"statement_kicker": "Der nächste Schritt",
"statement_text": "Du weißt jetzt, wie Altern wissenschaftlich verstanden wird.",
"statement_sub": "Der nächste Schritt ist keine weitere Theorie, sondern eine Routine, die zu deinem Alltag und deiner Ausgangslage passt.",
"primary_button_label": "Meine Routine entdecken",
"primary_button_link": "/pages/meine-routine",
"primary_button_style": "solid",
"secondary_button_label": "Mit dem AGE & DNA Test starten",
"secondary_button_link": "/products/lifetime-age-dna",
"secondary_button_style": "outline"
```

---

## Vollständige finale `page.science.json`

Nach dem Rebuild muss die `order` in der JSON exakt so lauten:

```json
"order": [
  "main",
  "science_hero",
  "science_hallmarks",
  "science_measurements",
  "science_limmroth",
  "science_foundation",
  "science_bento",
  "science_sources",
  "science_cta"
]
```

---

## Zusammenfassung: Was zu bauen ist

| Aufgabe | Datei | Art |
|---|---|---|
| Neue Hero-Section | `sections/lt-science-hero.liquid` | Neu bauen |
| Neue Limmroth-Section | `sections/lt-science-limmroth.liquid` | Neu bauen |
| Sektionsreihenfolge | `templates/page.science.json` | Anpassen |
| `science_hero` aktivieren | `templates/page.science.json` | Settings setzen |
| `science_limmroth` einfügen | `templates/page.science.json` | Block hinzufügen |
| Hallmarks Accordion | `sections/lt-science-hallmarks.liquid` | Liquid + CSS + JS anpassen |
| `show_expanded_default` Setting | `templates/page.science.json` | Setting hinzufügen |
| `science_foundation` Settings | `templates/page.science.json` | Settings ändern |
| `science_bento` Fact 1 | `templates/page.science.json` | `disabled` entfernen |
| `science_sources` Headline | `templates/page.science.json` | Setting ändern |
| `science_cta` Settings | `templates/page.science.json` | Settings aktualisieren |

---

## Was nicht geändert wird

- Kein bestehender Liquid-Code außer den zwei neuen Dateien
- Keine Design-Tokens (Farben, Typography, Spacing)
- Keine Theme-Architektur
- Keine anderen Templates oder Sektionen außer den oben genannten
- Keine Liquid-Logik in `lt-science-hallmarks.liquid` oder `lt-science-messebenen.liquid`

---

## Guardrails

- Alle Texte in Du-Form, Deutsch
- Kein Produkt-Push in den ersten 3 Sektionen
- Limmroth-Block: keine Diagnose-Sprache, keine Heilversprechen
- Buch- und PubMed-Links öffnen in `target="_blank" rel="noopener"`
- Jede neue Section: Responsive Mobile-First (Text-Bild stackt vertikal ab ~768px)
- Design-Referenz für neue Sections: `crs-hero-typewriter.liquid` für Klassen-Systematik, `lt-hp-science.liquid` für Expert-Block-Pattern
