# LIFETIME Icon System
**Version 1.0 · Stand April 2026**

---

## 1 · Set & Quelle

**Primäres Set: Phosphor — thin weight**

Quelle: Iconify · Prefix `ph:*-thin`

Alle Icons verwenden ausschließlich den `thin` Weight. Kein Mixing mit `regular`, `bold` oder `fill` — weder innerhalb einer Komponente noch seitenübergreifend.

Es gibt kein erlaubtes Sekundär-Set. Auf einer Seite, in einer Sektion, in einer Komponente: immer nur `ph:*-thin`.

**Fallback bei Lücken:** Wenn Phosphor thin den benötigten Icon nicht hat → Custom SVG im gleichen Stil beauftragen. Kein anderes Set als Notlösung.

---

## 2 · Größen nach Kontext

| Kontext | Größe | Mit Label? |
|---|---|---|
| USP-Leiste — mit Label | `28px` | Ja · unter dem Icon |
| USP-Leiste — icon only | `24px` | Nein · nur wenn Kontext eindeutig klar |
| PDP Feature-Icons | `32–40px` | Ja · immer mit Label |
| Science / Studien-Section | `40px` | Ja · immer mit Headline |
| Inline / Fließtext | `16px` | — |

---

## 3 · Farbe & Stroke

**Farbe: monochrom · immer `currentColor`**

Icons erben die Textfarbe ihrer Umgebung. Keine eigenen Farbwerte im SVG-Code. Kein Teal, kein Akzent-Coloring, keine bunten Icons.

Begründung: Bunte Icons (Teal, Brand-Farbe etc.) signalisieren Health-App und Fitness-Tracker — das ist der Look jedes zweiten Supplement-DTC-Brands. Monochrom wirkt teurer, reduzierter und zwingt das Icon dazu, durch Form zu überzeugen statt durch Farbe.

**Stroke-Width: immer `stroke-width="1"`**

Immer 1px, unabhängig von der Rendergröße. Nicht auf 1.5 erhöhen — das zerstört den thin-Charakter.

**Einzige erlaubte Farbausnahme:**

Ein einzelnes Icon darf in `--color-primary` gesetzt werden, wenn es als Hero-Element allein in einer Section steht (z.B. großes DNA-Icon in der Science-Section). Nie in der USP-Leiste, nie in einer Gruppe von Icons.

**Opacity auf Subelementen (nur Custom SVGs):**

Einzelne Pfade innerhalb eines Custom SVG dürfen `opacity: 0.3–0.5` bekommen um Tiefe zu erzeugen. Nie bei Standard `ph:*` Icons.

---

## 4 · Einsatzregeln

### Erlaubt

- USP-Leiste mit 4–6 Icons, gleichmäßiger Abstand
- PDP Feature-Grid mit Icon + kurzem Label
- Science-Section mit großem Icon als visueller Anker
- Inline-Icon als visueller Hinweis neben Kurztext
- Icon only wenn der Kontext eindeutig ist (Warenkorb, Suche)
- Label unter Icon oder neben Icon je nach Layout-Kontext

### Verboten

- Verschiedene Weights mischen (`thin` + `regular`)
- Zwei verschiedene Icon-Sets auf einer Seite
- Icons ohne semantischen Nutzen (rein dekorativ)
- Icons mit farbigem Fill oder Duotone-Effekt
- Icon ohne Label bei unklarem Kontext
- Mehr als 6 Icons in einer USP-Leiste
- Icon-only Buttons ohne Tooltip oder Label (Accessibility)

---

## 5 · Custom SVG bei Lücken

### Prozess

1. Phosphor thin prüfen ob Icon vorhanden
2. Icon nicht vorhanden → Custom SVG beauftragen
3. Custom SVG muss folgende Specs einhalten
4. Abnahme: visueller Vergleich neben `ph:microscope-thin`

### Custom SVG Specs

```
Viewbox:    0 0 24 24
Stroke:     1px
Linecap:    round
Linejoin:   round
Fill:       none · nur Stroke-Paths
Stil:       geometrisch-präzise, keine organischen Kurven
```

### Bekannte Lücken (Custom SVGs ausstehend)

- NMN-Molekülstruktur
- NAD+ Zyklus-Symbol
- Mitochondrium
- Epigenetik / Methylierung
- Telomer

---

## 6 · Implementierung (Shopify / Liquid)

Icons als inline SVG einbinden, nicht als `<img>` oder Icon-Font. So erben sie `currentColor` korrekt und sind via CSS steuerbar.

```liquid
{% comment %} Beispiel: ph:shield-check-thin {% endcomment %}
<svg width="28" height="28" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="1"
  stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true">
  <path d="M12 3l7 3.5v5C19 16 16 20 12 21 8 20 5 16 5 11.5V6.5L12 3z"/>
  <path d="M9 12l2 2 4-4"/>
</svg>
```

Icon-only Elemente brauchen ein `aria-label` oder begleitendes `<span class="visually-hidden">` für Accessibility.

---

*LIFETIME Longevity & Health · Icon System v1.0*
