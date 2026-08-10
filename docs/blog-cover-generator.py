#!/usr/bin/env python3
"""LIFETIME Blog-Cover-Serie, 1200x800, markenkonform.

Tokens: paper #f7f7f4, ink #26251e, ink-muted #6b6b63, teal-dark #4A8C85.
Bewusst rein typografisch + einfache Geometrie: keine Menschen, keine
Wirkbilder, keine Produktfotos (Compliance, siehe Memory blog-images-required).
"""
import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 800
PAPER = (247, 247, 244)
INK = (38, 37, 30)
MUTED = (107, 107, 99)
ACCENT = (74, 140, 133)
LINE = (223, 222, 216)
M = 88  # linker/rechter Rand

FONT_DIR = "/System/Library/Fonts/Supplemental"


def font(name, size):
    for path in (
        f"{FONT_DIR}/{name}.ttf",
        f"{FONT_DIR}/Arial{'' if name == 'Arial' else ' Bold'}.ttf",
    ):
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


F_HEAD = lambda s: font("Helvetica Neue Medium", s) if os.path.exists(
    f"{FONT_DIR}/Helvetica Neue Medium.ttf") else font("Arial Bold", s)
F_BOLD = lambda s: font("Arial Bold", s)
F_REG = lambda s: font("Arial", s)


def tracked(d, xy, text, f, fill, track=3):
    """Text mit Buchstabenabstand (Pillow kennt kein letter-spacing)."""
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=f, fill=fill)
        x += d.textlength(ch, font=f) + track
    return x


def base(kicker, headline_lines):
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    tracked(d, (M, 96), kicker.upper(), F_BOLD(21), MUTED, track=4)
    d.line([(M, 148), (W - M, 148)], fill=LINE, width=1)
    y = 196
    for ln in headline_lines:
        d.text((M, y), ln, font=F_HEAD(78), fill=INK)
        y += 96
    # Wortmarke unten links, bewusst zurückhaltend
    tracked(d, (M, H - 78), "LIFETIME", F_BOLD(18), MUTED, track=5)
    d.line([(M, H - 112), (W - M, H - 112)], fill=LINE, width=1)
    return img, d


def steps(d, y, labels, filled):
    """Prozess-Track: Knoten auf einer Linie, vordere Stufen gefüllt."""
    n = len(labels)
    span = W - 2 * M
    gap = span / (n - 1)
    d.line([(M, y), (W - M, y)], fill=LINE, width=3)
    for i, label in enumerate(labels):
        cx = M + i * gap
        r = 15
        done = i < filled
        d.ellipse([cx - r, y - r, cx + r, y + r],
                  fill=ACCENT if done else PAPER,
                  outline=ACCENT if done else LINE, width=3)
        f = F_BOLD(20) if done else F_REG(20)
        w = d.textlength(label, font=f)
        d.text((cx - w / 2, y + 34), label, font=f, fill=INK if done else MUTED)


def checks(d, y, items):
    for i, item in enumerate(items):
        yy = y + i * 52
        d.line([(M + 4, yy + 12), (M + 14, yy + 22)], fill=ACCENT, width=4)
        d.line([(M + 14, yy + 22), (M + 32, yy - 2)], fill=ACCENT, width=4)
        d.text((M + 56, yy - 4), item, font=F_REG(30), fill=INK)


def bar(d, y, pct, label):
    h, span = 26, W - 2 * M
    d.rounded_rectangle([M, y, M + span, y + h], radius=13, fill=(233, 232, 227))
    d.rounded_rectangle([M, y, M + span * pct, y + h], radius=13, fill=ACCENT)
    d.text((M, y + 54), label, font=F_BOLD(32), fill=INK)


def chips(d, y, entries):
    """entries: (code, land, erlaubt)"""
    x = M
    for code, land, ok in entries:
        w = 146
        d.rounded_rectangle([x, y, x + w, y + 74], radius=10,
                            fill=ACCENT if ok else PAPER,
                            outline=ACCENT if ok else LINE, width=2)
        f = F_BOLD(30)
        tw = d.textlength(code, font=f)
        d.text((x + (w - tw) / 2, y + 20), code, font=f,
               fill=PAPER if ok else MUTED)
        f2 = F_REG(19)
        tw2 = d.textlength(land, font=f2)
        d.text((x + (w - tw2) / 2, y + 88), land, font=f2, fill=MUTED)
        x += w + 20


def flow(d, y, left, right, via):
    """Zwei Knoten mit beschriftetem Pfeil dazwischen. left/right: (Titel, Zeile2)."""
    bw = 380
    x2 = W - M - bw
    for x, (title, sub), accent in ((M, left, False), (x2, right, True)):
        d.rounded_rectangle([x, y, x + bw, y + 132], radius=14,
                            fill=PAPER, outline=ACCENT if accent else LINE, width=2)
        d.text((x + 28, y + 26), title, font=F_HEAD(46), fill=INK)
        d.text((x + 28, y + 88), sub, font=F_REG(22), fill=MUTED)
    ax1, ax2, cy = M + bw + 40, x2 - 40, y + 66
    d.line([(ax1, cy), (ax2 - 14, cy)], fill=ACCENT, width=4)
    d.polygon([(ax2 - 18, cy - 11), (ax2, cy), (ax2 - 18, cy + 11)], fill=ACCENT)
    f = F_BOLD(22)
    tw = d.textlength(via, font=f)
    d.text(((ax1 + ax2) / 2 - tw / 2, cy - 48), via, font=f, fill=INK)


def columns(d, y, left, right):
    span = (W - 2 * M - 40) / 2
    for i, (title, rows, accent) in enumerate([left, right]):
        x = M + i * (span + 40)
        d.rounded_rectangle([x, y, x + span, y + 210], radius=14,
                            fill=PAPER, outline=ACCENT if accent else LINE, width=2)
        d.text((x + 28, y + 24), title, font=F_HEAD(44), fill=INK)
        for j, r in enumerate(rows):
            d.text((x + 28, y + 96 + j * 40), r, font=F_REG(25), fill=MUTED)


OUT = os.path.dirname(os.path.abspath(__file__))
made = []

# 1 — Rechtsstatus
img, d = base("Rechtsstatus · EU", ["Novel Food:", "der Stand für NMN"])
steps(d, 520, ["Antrag", "EFSA-Bewertung", "Rechtsakt", "Unionsliste"], 2)
made.append(("ist-nmn-in-deutschland-legal", img))

# 2 — Qualität
img, d = base("Qualität", ["Woran man gutes", "NMN erkennt"])
checks(d, 470, ["Reinheit ab 99 %", "Analysezertifikat je Charge",
                "Schadstofftest", "Benannter Rohstoff"])
made.append(("nmn-qualitaet-erkennen", img))

# 3 — Uthever
img, d = base("Rohstoff", ["Uthever®", "im Steckbrief"])
bar(d, 520, 0.99, "über 99 % Reinheit · Hersteller EffePharm")
made.append(("uthever-nmn", img))

# 4 — Verfahren
img, d = base("Verfahren", ["Vom Antrag bis", "zur Unionsliste"])
steps(d, 520, ["Antrag", "EFSA", "Kommission", "Unionsliste"], 2)
made.append(("novel-food-efsa-verfahren", img))

# 5 — Weltweit
img, d = base("Weltweit", ["Wo NMN als Supplement", "verkehrsfähig ist"])
chips(d, 480, [("USA", "erlaubt", True), ("JP", "erlaubt", True),
               ("CA", "erlaubt", True), ("AU", "Arzneimittel", False),
               ("CN", "verboten", False), ("EU", "Novel Food", False)])
made.append(("nmn-in-der-welt", img))

# 6 — Vergleich
img, d = base("Vergleich", ["NMN und NR", "nebeneinander"])
columns(d, 470,
        ("NMN", ["Novel Food", "nicht zugelassen"], False),
        ("NR", ["Novel Food", "zugelassen (EU)"], True))
made.append(("nmn-vs-nr", img))

# 7 — Was ist NMN (Artikel 5, Definition/Entität)
img, d = base("Grundlagen", ["Was ist NMN?", "Das Molekül erklärt"])
flow(d, 500,
     ("NMN", "Nicotinamid-Mononukleotid"),
     ("NAD+", "Coenzym in fast jeder Zelle"),
     "Enzym NMNAT")
made.append(("was-ist-nmn", img))

# 7b — NMN in der Forschung (Artikel 7, Studienlage/Sicherheit)
img, d = base("Forschung", ["NMN in der", "Forschung"])
steps(d, 520, ["Zellmodell", "Tiermodell", "Humanstudien", "Langzeitdaten"], 3)
made.append(("nmn-studien-wissenschaft", img))

# 8 — Hallmarks of Aging (Longevity-Blog, nicht NMN-Cluster)
img, d = base("Grundlagen", ["Die Hallmarks", "of Aging"])
steps(d, 520, ["Primär 01–05", "Antagonistisch 06–08", "Integrativ 09–12"], 3)
made.append(("hallmarks-of-aging", img))

# 9 - Genetisch vs. epigenetisch (AGE-Cluster, Artikel A)
img, d = base("Grundlagen", ["Was dein DNA-Test", "wirklich misst"])
columns(d, 470,
        ("Genetisch", ["Varianten im Erbgut", "bleibt konstant"], False),
        ("Epigenetisch", ["Markierungen auf der DNA", "verändert sich"], True))
made.append(("genetischer-epigenetischer-test", img))

# 10 - Spermidin (Cluster 2, Artikel 1)
img, d = base("Grundlagen", ["Was Spermidin ist,", "was Studien zeigen"])
steps(d, 520, ["Zellmodell", "Tiermodell", "Beobachtung", "Humanstudien"], 3)
made.append(("was-ist-spermidin", img))

# 11 - Resveratrol (Cluster 2, Artikel 2)
img, d = base("Grundlagen", ["Was Resveratrol ist,", "was Studien zeigen"])
steps(d, 520, ["Zellmodell", "Tiermodell", "Humanstudien", "Nutzen belegt"], 3)
made.append(("was-ist-resveratrol", img))

for name, im in made:
    p = os.path.join(OUT, f"cover-{name}.png")
    im.save(p, "PNG", optimize=True)
    print(p, os.path.getsize(p) // 1024, "KB")
