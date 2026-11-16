#!/usr/bin/env python3
"""Bildwelt der Startseite auf Katalog, Wissenschaft und NMN-PDP (16.11.2026).

Setzt die Template-Änderungen auf einen Theme-Ordner: python3 templates-patch.py <theme-root>
Läuft auf dem Repo und auf einem frisch gezogenen Live-Stand (Kommentarkopf bleibt erhalten).
Mehrfach ausführbar. Motive mit PLATZHALTER sind vorhandene Startseiten-Bilder, bis die
neuen Motive erzeugt sind (Prompts in README.md).
"""
import json, re, sys
from pathlib import Path

ROOT = Path(sys.argv[1])
IMG = "shopify://shop_images/"


def load(name):
    raw = (ROOT / "templates" / name).read_text()
    m = re.match(r"\s*/\*.*?\*/\s*", raw, flags=re.S)
    kopf = m.group(0) if m else ""
    return kopf, json.loads(raw[len(kopf):])


def save(name, kopf, data):
    (ROOT / "templates" / name).write_text(kopf + json.dumps(data, indent=2, ensure_ascii=False) + "\n")


# --- Katalog /collections/all ---
kopf, d = load("collection.katalog.json")
hero = d["sections"]["collection_hero"]["settings"]
hero.update({
    "layout": "bildband",
    "image": IMG + "lt-hp-hero-kollektion-desktop.webp",
    "image_mobile": IMG + "lt-hp-hero-kollektion-mobil.webp",
    "band_bg": "#274e57",
    "image_alt": "LIFETIME Kollektion: AGE & DNA-Test, NMN, Kreatin, Fisetin, Spermidin und TMG",
    "padding_top": 0,
})
gruppen = {  # PLATZHALTER-Motive
    "grp_zellfunktion": ("lt-hp-bereich-ki-bewegung-c.webp", "Die Stoffe, an denen die Alternsforschung arbeitet.", "50% 26%"),
    "grp_basis": ("lt-hp-bereich-markt-gemuese.webp", "Die Grundlage, bevor du feiner einstellst.", "70% 30%"),
    "grp_alltag": ("lt-hp-bereich-schlafen.webp", "Für das, was du jeden Tag merkst.", "40% 46%"),
}
for key, (bild, satz, pos) in gruppen.items():
    d["sections"]["naehrstoffe"]["blocks"][key]["settings"].update({"image": IMG + bild, "text": satz, "position": pos})
d["sections"]["katalog_index"]["settings"].update({"image": IMG + "lt-hp-stimme-anja.webp", "footer_nahtlos": True})
save("collection.katalog.json", kopf, d)

# --- Wissenschaft /pages/science ---
kopf, d = load("page.science.json")
d["sections"]["validierung"]["settings"].update({
    "mood_image": "https://cdn.shopify.com/s/files/1/0621/2173/8340/files/lt-hp-hero-laufen-paar.webp?v=1793005201",
    "mood_image_alt": "Zwei Menschen laufen in der Abendsonne einen Hang entlang",
})
d["sections"]["schluss"] = {
    "type": "lt-leiste",
    "settings": {
        "heading": "Wie alt bist du wirklich?",
        "subheading": "Eine Speichelprobe, Ergebnis nach sechs Wochen in der App.",
        "button_label": "Test bestellen →",
        "button_url": "/products/lifetime-age-dna",
        "small": "395 € einmalig · versandkostenfrei · kein Abo",
        "image": IMG + "lt-hp-leiste-schluss.webp",
        "footer_nahtlos": True,
    },
}
if "schluss" not in d["order"]:
    d["order"].append("schluss")
save("page.science.json", kopf, d)

# --- NMN-PDP /products/lifetime-nmn (ohne Menschen) ---
kopf, d = load("product.nmn-pulver.json")
d["sections"]["schluss"] = {
    "type": "lt-leiste",
    "settings": {
        "heading": "Du siehst, was drin ist.",
        "subheading": "Jede Charge im Labor gemessen, Prüfbericht zum Nachlesen.",
        "button_label": "Größe wählen →",
        "button_url": "#main",
        "small": "Versand in 1–2 Werktagen · 90 Tage Geld zurück",
        "image": IMG + "nad-liposom.jpg",  # PLATZHALTER, bis das NMN-Stillleben da ist
        "footer_nahtlos": True,
        "kompakt_mobil": True,
        "fakt_1_zahl": "100,1 %",
        "fakt_1_text": "NMN-Gehalt, Charge 20250917",
        "fakt_2_zahl": "{note} von 5",
        "fakt_2_text": "{bewertungen} Bewertungen",
        "fakt_3_zahl": "90 Tage",
        "fakt_3_text": "Geld zurück",
    },
}
order = d["order"]
if "schluss" not in order:
    order.insert(order.index("main_product_hidden") if "main_product_hidden" in order else len(order), "schluss")
save("product.nmn-pulver.json", kopf, d)
print("ok:", ROOT)
