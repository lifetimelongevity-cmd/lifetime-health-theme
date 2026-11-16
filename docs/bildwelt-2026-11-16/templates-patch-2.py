#!/usr/bin/env python3
"""Bildwelt Teil 2: Auftakt und „Mehr erfahren“ auf /pages/science (16.11.2026).

Setzt die Template-Änderung auf einen Theme-Ordner: python3 templates-patch-2.py <theme-root>
Der Hero wird vom Kasten mit Limmroth-Foto (lt-science-proof-hero) zum Bildband (lt-science-hero,
Layout bildband) mit dem Labor-Motiv, die vier Link-Karten bekommen Fotos. Mehrfach ausführbar.
Achtung: schreibt das JSON neu formatiert. Fürs Repo dieselben Stellen von Hand ändern.
"""
import json, re, sys
from pathlib import Path

ROOT = Path(sys.argv[1])
IMG = "shopify://shop_images/"
p = ROOT / "templates" / "page.science.json"
raw = p.read_text()
m = re.match(r"\s*/\*.*?\*/\s*", raw, flags=re.S)
kopf = m.group(0) if m else ""
d = json.loads(raw[len(kopf):])

d["sections"]["hero"] = {
    "type": "lt-science-hero",
    "settings": {
        "kicker": "",
        "headline": "Wie schnell alterst du wirklich?",
        "subheading": "Wir messen es im Labor, direkt an deiner DNA.",
        "layout": "bildband",
        "image": IMG + "lt-sci-hero-labor.webp",
        "image_alt": "Hand im Laborhandschuh setzt ein Probenröhrchen ins Rack",
        "band_bg": "#364f56",
        "band_verlauf": "stark",
        "position_desktop": "100% 48%",
        "position_mobile": "85% 50%",
        "cta_label": "Warum das zählt",
        "cta_url": "#warum",
        "cta_2_label": "Zum Test",  # kurz, damit zwei Knöpfe bei 375 px nebeneinander passen
        "cta_2_url": "/products/lifetime-age-dna",
        "color_bg": "#f7f7f4",
        "color_text": "#26251e",
        "padding_top": 0,
        "padding_bottom": 0,
    },
}
fotos = {
    "m1": "lt-hp-bereich-lesen-handy.webp",
    "m2": "lt-hp-bereich-markt-gemuese.webp",
    "m3": "lt-hp-bereich-ki-bewegung-c.webp",
    "m4": "lt-sci-probe.webp",
}
for key, bild in fotos.items():
    d["sections"]["mehr"]["blocks"][key]["settings"]["image"] = IMG + bild

p.write_text(kopf + json.dumps(d, indent=2, ensure_ascii=False) + "\n")
print("ok:", ROOT)
