#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""LIFETIME Blog-Infografiken (SVG), markenkonform.

Tokens: paper #f7f4ee, card #ffffff, ink #26251e, muted #6b6b63,
teal #4a8c85, hairline #e7e3db.

Canvas bewusst 900 breit statt 1200: die Artikelspalte ist 768 px, mobil
rund 343 px. Bei viewBox 900 liegt die kleinste Schrift (21) bei 2,3 % der
Breite und damit auf der dokumentierten Untergrenze (Memory
reference_svg_canvas_zielmass). Die aelteren Blog-SVGs auf 1200 mit
Schrift 15 bis 17 liegen bei 1,3 % und sind mobil zu klein.

Compliance: keine Menschen-, Lifestyle- oder Wirkbilder, nur Fakten-
Visuals. Studienzahlen exakt wie im Artikelfliesstext.

Aufruf: python3 docs/blog-svg-generator.py   ->   docs/blog-svg/*.svg
"""
import os
import re

W = 900
M = 64                      # linker/rechter Innenrand
PAPER = "#f7f4ee"
CARD = "#ffffff"
TILE = "#f5f4f0"
TILE_ACCENT = "#f2f8f6"
INK = "#26251e"
MUTED = "#6b6b63"
TEAL = "#4a8c85"
LINE = "#e7e3db"
LINE_ACCENT = "#d6e7e2"
HAIR = "#eceae3"

FONT = "'Helvetica Neue',Arial,sans-serif"
WARN = []
MINH = []


def esc(s):
    """XML-Escaping plus numerische Entities fuer alles ausserhalb ASCII."""
    s = s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return "".join(c if ord(c) < 128 else "&#%d;" % ord(c) for c in s)


def tw(s, size):
    """grobe Textbreite, Helvetica-Mittelwert."""
    return len(s) * size * 0.53


def txt(x, y, s, size, fill=INK, weight=400, anchor="start", box=None):
    if box and tw(s, size) > box:
        WARN.append("  %d>%d @%d  %s" % (tw(s, size), box, size, s))
    a = ' text-anchor="%s"' % anchor if anchor != "start" else ""
    return ('<text x="%s" y="%s" fill="%s" font-size="%s" font-weight="%s"%s>%s</text>'
            % (x, y, fill, size, weight, a, esc(s)))


def rect(x, y, w, h, fill, stroke=None, r=12):
    st = ' stroke="%s"' % stroke if stroke else ""
    return ('<rect x="%s" y="%s" width="%s" height="%s" rx="%s" fill="%s"%s/>'
            % (x, y, w, h, r, fill, st))


def line(x1, y1, x2, y2, stroke=HAIR, width=1):
    return ('<line x1="%s" y1="%s" x2="%s" y2="%s" stroke="%s" stroke-width="%s"/>'
            % (x1, y1, x2, y2, stroke, width))


def arrow_right(x, y, length=34, color=TEAL):
    return (line(x, y, x + length, y, color, 3)
            + '<path d="M%s %s l14 8 -14 8 z" fill="%s"/>' % (x + length, y - 8, color))


def arrow_down(x, y, length=26, color=TEAL):
    return (line(x, y, x, y + length, color, 3)
            + '<path d="M%s %s l8 14 8 -14 z" fill="%s"/>' % (x - 8, y + length, color))


def wrap(s, size, maxw):
    out, cur = [], ""
    for word in s.split():
        cand = (cur + " " + word).strip()
        if cur and tw(cand, size) > maxw:
            out.append(cur)
            cur = word
        else:
            cur = cand
    if cur:
        out.append(cur)
    return out


# ---------------------------------------------------------------- Grundgeruest

def frame(title, sub=None, h=None):
    """Kopfzeile. Die Canvas-Hoehe berechnet finish() aus dem Inhalt,
    das Argument h wird nur noch als Mindesthoehe gelesen."""
    p = ["__HEADER__", "__CARD__"]
    MINH.append(h or 0)
    y = 104
    p.append(txt(M, y, title, 38, INK, 400, box=W - 2 * M))
    y += 38
    if sub:
        for ln in wrap(sub, 24, W - 2 * M):
            p.append(txt(M, y, ln, 24, MUTED))
            y += 30
        y -= 4
    y += 4
    p.append(line(M, y, W - M, y, HAIR))
    return p, y + 42


def _content_max_y(parts):
    """Unterkante des bisherigen Inhalts."""
    worst = 0
    for el in parts:
        m = re.match(r'<text x="[-\d.]+" y="([-\d.]+)"', el)
        if m:
            worst = max(worst, float(m.group(1)))
            continue
        m = re.match(r'<rect x="[-\d.]+" y="([-\d.]+)" width="[-\d.]+" height="([-\d.]+)"', el)
        if m:
            worst = max(worst, float(m.group(1)) + float(m.group(2)))
            continue
        m = re.match(r'<line x1="[-\d.]+" y1="([-\d.]+)" x2="[-\d.]+" y2="([-\d.]+)"', el)
        if m:
            worst = max(worst, float(m.group(1)), float(m.group(2)))
            continue
        m = re.match(r'<circle cx="[-\d.]+" cy="([-\d.]+)" r="([-\d.]+)"', el)
        if m:
            worst = max(worst, float(m.group(1)) + float(m.group(2)))
            continue
        m = re.match(r'<path d="M[-\d.]+ ([-\d.]+)', el)
        if m:
            worst = max(worst, float(m.group(1)) + 16)
    return worst


def finish(p, h=None, note=None, disclaimer=None):
    """Fussblock unten buendig, Canvas-Hoehe aus dem Inhalt."""
    lines = []
    if note:
        lines += [(t, 23, INK) for t in wrap(note, 23, W - 2 * M)]
    if disclaimer:
        lines += [(t, 21, MUTED) for t in wrap(disclaimer, 21, W - 2 * M)]
    fy = _content_max_y(p) + 36
    height = fy + 78 + 30 * (max(len(lines), 1) - 1)
    height = int((height + 9) // 10 * 10)
    minh = MINH.pop() if MINH else 0
    if minh > height:
        fy += (minh - height)
        height = minh
    p[0] = ('<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d"'
            ' viewBox="0 0 %d %d" font-family="%s" role="img">'
            % (W, height, W, height, FONT)) + rect(0, 0, W, height, PAPER, r=0)
    p[1] = rect(28, 28, W - 56, height - 56, CARD, LINE, 14)
    p.append(line(M, fy, W - M, fy, HAIR))
    yy = fy + 34
    for t, size, fill in lines:
        p.append(txt(M, yy, t, size, fill, 400))
        yy += 30
    p.append("</svg>")
    return "\n".join(p)


# ------------------------------------------------------------------- Bausteine

def cards(p, y, items, height=210, gap=20):
    """items: (Titel, [Zeilen], accent). Zeile mit * wird zur Akzentzeile."""
    n = len(items)
    w = (W - 2 * M - gap * (n - 1)) / n
    ts = 30 if n <= 2 else (27 if n == 3 else 23)
    ls = 24 if n <= 2 else (20 if n == 3 else 19)
    pad = 22 if n <= 3 else 16
    for i, (title, lines, accent) in enumerate(items):
        x = M + i * (w + gap)
        p.append(rect(x, y, w, height, TILE_ACCENT if accent else TILE,
                      LINE_ACCENT if accent else LINE, 12))
        p.append(txt(x + pad, y + 46, title, ts, INK, 500, box=w - 2 * pad))
        yy = y + 86
        for ln in lines:
            acc = ln.startswith("*")
            p.append(txt(x + pad, yy, ln.lstrip("*"), ls,
                         TEAL if acc else MUTED, 500 if acc else 400,
                         box=w - 2 * pad))
            yy += ls + 8
    return y + height + 30


def bars(p, y, items, maxval, height=44, gap=22, label_w=270):
    """items: (Label, Wert, Wertlabel, accent)"""
    val_w = 202
    track_x = M + label_w
    track_w = W - M - track_x - val_w
    for lab, val, vlab, accent in items:
        if tw(vlab, 24) > val_w - 22:
            WARN.append("  Wertlabel zu breit: %s" % vlab)
        p.append(txt(M, y + height / 2 + 9, lab, 23, INK, 400, box=label_w - 14))
        p.append(rect(track_x, y, track_w, height, TILE, LINE, height / 2))
        fw = max(8, track_w * (val / float(maxval)))
        p.append(rect(track_x, y, fw, height, TEAL if accent else "#c6cbc7",
                      None, height / 2))
        p.append(txt(W - M, y + height / 2 + 9, vlab, 24, INK, 500, anchor="end"))
        y += height + gap
    return y + 10


def table(p, y, headers, rows_, col1=210, rowh=54):
    n = len(headers)
    cw = (W - 2 * M - col1) / n
    for i, hd in enumerate(headers):
        p.append(txt(M + col1 + i * cw + cw / 2, y, hd, 23, INK, 500,
                     anchor="middle", box=cw - 8))
    y += 16
    p.append(line(M, y, W - M, y, LINE))
    for j, (lab, vals) in enumerate(rows_):
        y += rowh
        p.append(txt(M, y - 16, lab, 22, MUTED, 400, box=col1 - 12))
        for i, v in enumerate(vals):
            hl = v.startswith("*")
            p.append(txt(M + col1 + i * cw + cw / 2, y - 16, v.lstrip("*"), 23,
                         TEAL if hl else INK, 500 if hl else 400,
                         anchor="middle", box=cw - 8))
        if j < len(rows_) - 1:
            p.append(line(M, y + 10, W - M, y + 10, HAIR))
    return y + 40


def qa_rows(p, y, items, rowh=76):
    for i, (q, a) in enumerate(items):
        p.append(txt(M, y, q, 26, INK, 500, box=430))
        p.append(txt(W - M, y, a, 26, TEAL, 500, anchor="end"))
        if i < len(items) - 1:
            p.append(line(M, y + 26, W - M, y + 26, HAIR))
        y += rowh
    return y


def steps(p, y, items):
    for i, (t, s) in enumerate(items):
        cy = y + 4
        p.append('<circle cx="%d" cy="%d" r="22" fill="%s"/>' % (M + 22, cy - 8, TEAL))
        p.append(txt(M + 22, cy + 1, str(i + 1), 24, PAPER, 500, anchor="middle"))
        p.append(txt(M + 68, cy - 2, t, 28, INK, 500, box=W - M - 90))
        p.append(txt(M + 68, cy + 30, s, 22, MUTED, 400, box=W - M - 90))
        if i < len(items) - 1:
            p.append(line(M + 22, cy + 20, M + 22, cy + 58, LINE, 2))
        y += 98
    return y


def flow3(p, y, nodes, h=160):
    """nodes: (Titel, Unterzeile)"""
    bw, gap = 232, 42
    for i, (t, s) in enumerate(nodes):
        x = M + i * (bw + gap)
        acc = i == len(nodes) - 1
        p.append(rect(x, y, bw, h, TILE_ACCENT if acc else TILE,
                      LINE_ACCENT if acc else LINE, 12))
        p.append(txt(x + 20, y + 52, t, 27, INK, 500, box=bw - 40))
        yy = y + 90
        for ln in wrap(s, 21, bw - 40):
            p.append(txt(x + 20, yy, ln, 21, MUTED))
            yy += 26
        if i < len(nodes) - 1:
            p.append(arrow_right(x + bw + 4, y + h / 2))
    return y + h + 34


OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "blog-svg")
made = {}


def add(name, svg):
    made[name] = svg


# ============================================================ lohnt-sich-ein-alterstest
p, y = frame("Messrauschen und erwartbarer Effekt",
             "Beide liegen in derselben Größenordnung", 560)
y = bars(p, y, [
    ("Streuung, dieselbe Probe", 9, "bis 9 Jahre", False),
    ("dieselbe Probe, PC-Uhren", 1.5, "rund 1,5 Jahre", False),
    ("Acht-Wochen-Programm", 3.23, "3,23 Jahre", True),
], maxval=9, label_w=300)
add("alterstest-rauschen-effekt", finish(
    p, 560,
    "Higgins-Chen, Nature Aging 2022 (Streuung), Fitzgerald, Aging 2021 (Effekt).",
    "Darstellung der Messunsicherheit, keine Aussage über einen Nutzen im Einzelfall."))

p, y = frame("Die Frage vor dem Kauf",
             "Der Nutzen entsteht aus der Wiederholung, nicht aus dem ersten Wert", 580)
p.append(rect(M, y, W - 2 * M, 88, TILE, LINE, 12))
p.append(txt(M + 26, y + 54, "Misst du in zwei bis drei Jahren erneut?", 29, INK, 500))
y += 122
y = cards(p, y, [
    ("Nein", ["Ein Einzelwert bleibt eine", "Momentaufnahme mit",
              "mehreren Jahren", "Unsicherheit."], False),
    ("Ja", ["Mehrere Punkte unter", "gleichen Bedingungen", "ergeben eine",
            "Verlaufslinie."], True),
], height=196)
add("alterstest-entscheidungsfrage", finish(
    p, 580, "Zwei Punkte ergeben eine Differenz, drei Punkte ergeben eine Richtung.",
    "Entscheidungshilfe, keine medizinische Beratung."))

# ============================================================ whoop-age-oura-garmin
p, y = frame("Zwei Ebenen, zwei Fragen",
             "Wearable und epigenetische Uhr messen nicht dasselbe", 600)
y = cards(p, y, [
    ("Wearable", ["misst, wie dein Körper", "gerade arbeitet",
                  "*GRUNDLAGE", "Puls, Schlaf, Bewegung,", "geschätzte VO2max"], False),
    ("Epigenetische Uhr", ["misst, wie dein Erbgut", "markiert ist",
                           "*GRUNDLAGE", "chemische Markierungen", "an der DNA"], True),
], height=250)
add("wearable-vs-uhr-ebenen", finish(
    p, 600, "Die beiden Werte lassen sich nicht ineinander umrechnen.",
    "Kein Qualitätsunterschied, sondern ein Ebenenunterschied."))

p, y = frame("Was die drei Geräte ausrechnen",
             "Nach der Dokumentation der Hersteller", 600)
y = cards(p, y, [
    ("WHOOP Age", ["neun Einzelbeiträge", "aus Verhalten und", "Kreislauf",
                   "*Näherungswert für", "*das physiologische", "*Alter"], False),
    ("Oura", ["Arteriensteifigkeit", "aus dem Pulssignal", "am Finger",
              "*Schätzung in", "*drei Stufen"], False),
    ("Garmin", ["Interpretation der", "geschätzten", "VO2max",
                "*Fitnessvergleich,", "*in Jahren"], False),
], height=250)
add("wearables-was-sie-rechnen", finish(
    p, 600, "Keiner der drei Hersteller beansprucht, ein biologisches Alter zu messen.",
    "Herstellerdokumentation, geprüft am 11. August 2026."))

# ============================================================ dna-probe-datenschutz
p, y = frame("Der Weg deiner Probe",
             "Mindestens drei Stellen arbeiten daran, bevor du ein Ergebnis siehst", 580)
y = flow3(p, y, [("Labor", "extrahiert die DNA und misst sie"),
                 ("Auswertung", "rechnet aus den Messwerten Ergebnisse"),
                 ("Anwendung", "zeigt das Ergebnis und speichert es")], h=170)
p.append(rect(M, y, W - 2 * M, 86, TILE_ACCENT, LINE_ACCENT, 12))
p.append(txt(M + 24, y + 40, "Pseudonymisiert unter einer individuellen ID.", 25, INK, 500))
p.append(txt(M + 24, y + 70, "Das Labor bekommt keinen Namen.", 21, MUTED))
add("dna-probe-weg", finish(
    p, 580, "Ein Anbieter kann zusagen, dass der Kreis klein bleibt. Nicht, dass er leer ist.",
    "Allgemeine Einordnung des Verfahrens, keine Rechtsberatung."))

p, y = frame("Pseudonymisiert oder anonym",
             "Der Unterschied entscheidet, ob du noch Rechte an den Daten hast", 600)
y = cards(p, y, [
    ("Pseudonymisiert", ["Die Probe trägt eine ID", "statt deines Namens.",
                         "Die Verbindung liegt", "getrennt, existiert aber.",
                         "*DSGVO gilt, du hast Rechte"], True),
    ("Anonymisiert", ["Die Verbindung ist nicht", "mehr herstellbar.",
                      "Niemand weiß, wem ein", "Ergebnis gehört.",
                      "*DSGVO gilt nicht mehr"], False),
], height=250)
add("pseudonym-vs-anonym", finish(
    p, 600, "Ein Test, der dir dein persönliches Ergebnis zurückgibt, kann nicht anonym arbeiten.",
    "Artikel 4 Nummer 5 der Datenschutz-Grundverordnung."))

# ============================================================ alterstest-ergebnis-verstehen
p, y = frame("Zwei Ebenen in einem Ergebnis",
             "Sie haben verschiedene Halbwertszeiten", 600)
y = cards(p, y, [
    ("Epigenetisch", ["sechs Bereiche mit", "zwölf Einzelwerten",
                      "*BEWEGLICH", "verschiebt sich, deshalb", "wiederholt messen"], True),
    ("Genetisch", ["23 Kategorien mit über", "150 Einzelergebnissen",
                   "*FEST", "ändert sich nie, deshalb", "einmal lesen"], False),
], height=250)
add("ergebnis-zwei-ebenen", finish(
    p, 600, "Beim LIFETIME AGE & DNA-Test aus derselben Speichelprobe.",
    "Eine Standortbestimmung, kein Befund und keine Diagnose."))

p, y = frame("Drei Schritte nach dem Ergebnis", None, 560)
y = steps(p, y, [
    ("Ausgangspunkt festhalten",
     "Probendatum, Verfahren, Anbieter und deine Verfassung dieser Woche"),
    ("Aus Werten Fragen machen",
     "Nicht was kaufe ich, sondern welche Belastung war dauerhaft"),
    ("Zweite Messung planen",
     "Gleiches Verfahren, gleiches Labor, genug Abstand"),
])
add("ergebnis-drei-schritte", finish(
    p, 560, "Der Gewinn liegt in der dritten und vierten Messung, nicht in der zweiten.",
    "Bei Beschwerden gehört die Abklärung in ärztliche Hand."))

# ============================================================ epigenetischer-alterstest-vergleich
p, y = frame("Vier Tests im Preisvergleich",
             "Stand 11. August 2026, Angaben der Anbieter", 560)
y = bars(p, y, [
    ("epiAge Einzeltest", 199.95, "199,95 Euro", False),
    ("neotes bioAge Basic", 299, "299 Euro", False),
    ("LIFETIME AGE & DNA", 349, "349 Euro", True),
    ("TruDiagnostic TruAge", 499, "499 US-Dollar", False),
], maxval=499)
add("alterstests-preisvergleich", finish(
    p, 560, "Bei TruDiagnostic kommen je nach Zieladresse Versand- und Checkout-Kosten hinzu.",
    "Deshalb keine Umrechnung in Euro und keine Bewertung der Gesamtkosten."))

p, y = frame("Probe, Wartezeit, Umfang",
             "Was die vier Anbieter selbst angeben", 560)
y = table(p, y, ["LIFETIME", "epiAge", "neotes", "TruDiag."], [
    ("Probe", ["Speichel", "Speichel", "Blut", "Blut"]),
    ("Ergebniszeit", ["6 Wochen", "unbestimmt", "3-4 Wochen", "3-4 Wochen"]),
    ("Sprache", ["Deutsch", "Deutsch", "Deutsch", "Englisch"]),
    ("Genetik dabei", ["*ja", "n. b.", "nein", "n. b."]),
], col1=190)
add("alterstests-matrix", finish(
    p, 560, "n. b. = auf den geprüften Produktseiten nicht beschrieben.",
    "Bei der Wartezeit liegt LIFETIME hinten, die anderen nennen kürzere Zeiten."))

# ============================================================ epigenetische-uhren
p, y = frame("Wie eine epigenetische Uhr rechnet", None, 560)
y = flow3(p, y, [("Methylierung", "chemische Markierungen an der DNA"),
                 ("Modell", "353 Messstellen, an rund 8.000 Proben entwickelt"),
                 ("Schätzwert", "eine Alterszahl in Jahren")], h=180)
p.append(txt(M, y + 24, "Verschiedene Uhren liefern für dieselbe Person verschiedene", 24, INK))
p.append(txt(M, y + 56, "Werte, ohne sich zu widersprechen.", 24, INK))
add("epigenetische-uhr-prinzip", finish(
    p, 560, "Erste Uhr: Horvath, Genome Biology 2013, Proben aus 51 Geweben.",
    "Eine Uhr misst. Sie verändert das Altern nicht."))

p, y = frame("Was die Abweichung in Gruppen bedeutet",
             "Vier Längsschnittkohorten, je fünf Jahre höhere Abweichung", 560)
y = bars(p, y, [
    ("ohne weitere Korrektur", 21, "+21 %", True),
    ("nach Korrektur", 16, "+16 %", False),
], maxval=25, label_w=290)
p.append(txt(M, y + 20, "Höheres Sterberisiko im Beobachtungszeitraum. Korrigiert wurde", 24, INK))
p.append(txt(M, y + 52, "um Bildung, soziale Lage, Bluthochdruck, Diabetes und weitere", 24, INK))
p.append(txt(M, y + 84, "Faktoren.", 24, INK))
add("epigenetische-uhr-gruppenbefund", finish(
    p, 560, "Marioni et al., Genome Biology 2015.",
    "Statistischer Zusammenhang in großen Gruppen, für eine Person keine Prognose."))

# ============================================================ biomarker-biologisches-alter
p, y = frame("Sechs Verfahrensfamilien",
             "Die Landkarte des Feldes", 620)
fam = [("Telomerlänge", "Enden der Chromosomen"),
       ("Epigenetische Uhren", "Markierungen an der DNA"),
       ("Transkriptomik", "welche Gene abgelesen werden"),
       ("Proteomik", "Eiweißmuster, meist im Blut"),
       ("Metabolomik", "Stoffwechselprodukte"),
       ("Klinische Marker", "Blutwerte, Blutdruck, Lunge")]
cw, ch, gx, gy = 372, 92, 28, 20
for i, (t, s) in enumerate(fam):
    x = M + (i % 2) * (cw + gx)
    yy = y + (i // 2) * (ch + gy)
    acc = i == 1
    p.append(rect(x, yy, cw, ch, TILE_ACCENT if acc else TILE,
                  LINE_ACCENT if acc else LINE, 12))
    p.append(txt(x + 22, yy + 40, t, 26, INK, 500, box=cw - 44))
    p.append(txt(x + 22, yy + 71, s, 21, MUTED, 400, box=cw - 44))
add("biomarker-sechs-familien", finish(
    p, 620, "Jylhävä et al., EBioMedicine 2017.",
    "Die Übersichtsarbeit hält die epigenetischen Uhren für den vielversprechendsten Ansatz."))

p, y = frame("Uhr und Telomerlänge im Vergleich",
             "Zwei schottische Kohorten", 580)
y = bars(p, y, [
    ("Uhr, erklärte Unterschiede", 28.5, "28,5 %", True),
    ("Telomere, erklärt", 2.8, "2,8 %", False),
    ("Uhr, Sterberisiko", 22, "+22 %", True),
    ("Telomere, Sterberisiko", 11, "+11 %", False),
], maxval=30, label_w=330)
add("biomarker-uhr-vs-telomere", finish(
    p, 580, "Der Telomer-Wert von 11 Prozent verfehlte die statistische Signifikanz.",
    "Marioni et al., International Journal of Epidemiology 2016."))

# ============================================================ wie-deine-gene...
p, y = frame("Erblichkeit der Lebensspanne",
             "Was die Korrektur von 2018 verändert hat", 560)
y = bars(p, y, [
    ("bisherige Schätzungen", 30, "15 bis 30 %", False),
    ("nach Korrektur", 10, "unter 10 %", True),
], maxval=30)
p.append(txt(M, y + 26, "Der größte Teil der Ähnlichkeit zeigte sich auch zwischen", 24, INK))
p.append(txt(M, y + 58, "angeheirateten Personen, die keine Gene teilen.", 24, INK))
add("erblichkeit-lebensspanne", finish(
    p, 560, "Ruby et al., Genetics 2018, Stammbaumdaten hunderter Millionen Personen.",
    "Betrifft die Lebensspanne, nicht ein gemessenes biologisches Alter."))

p, y = frame("Warum die alte Zahl zu hoch war", None, 580)
p.append(rect(M, y, 358, 128, TILE, LINE, 12))
p.append(txt(M + 22, y + 50, "Blutsverwandte", 27, INK, 500))
p.append(txt(M + 22, y + 86, "teilen Gene und Umstände", 21, MUTED))
p.append(rect(W - M - 358, y, 358, 128, TILE, LINE, 12))
p.append(txt(W - M - 336, y + 50, "Angeheiratete", 27, INK, 500))
p.append(txt(W - M - 336, y + 86, "teilen nur die Umstände", 21, MUTED))
p.append(arrow_down(W / 2, y + 144))
y += 196
p.append(rect(M, y, W - 2 * M, 112, TILE_ACCENT, LINE_ACCENT, 12))
p.append(txt(M + 26, y + 46, "Beide Gruppen ähneln sich ähnlich stark.", 27, INK, 500))
p.append(txt(M + 26, y + 82, "Dann erklärt nicht Vererbung die Ähnlichkeit, sondern die Partnerwahl.",
             21, MUTED))
add("assortative-paarung", finish(
    p, 580, "Menschen suchen sich Partner, die ihnen in Herkunft, Bildung und Gewohnheiten ähneln.",
    "Ruby et al., Genetics 2018."))

# ============================================================ was-dein-biologisches-alter...
p, y = frame("Zählung und Schätzung",
             "Zwei Altersbegriffe, die methodisch nichts miteinander zu tun haben", 600)
y = cards(p, y, [
    ("Kalendarisch", ["zählt Jahre seit der", "Geburt",
                      "*EXAKT", "für alle Menschen gleich", "definiert"], False),
    ("Biologisch", ["schätzt aus einem", "Rechenmodell",
                    "*UNSCHARF", "verschiedene Modelle,", "verschiedene Zahlen"], True),
], height=250)
add("kalendarisch-vs-biologisch", finish(
    p, 600, "Interessant ist der Abstand zwischen beiden und wie er sich über Jahre entwickelt.",
    "Keine Aussage über die Lebenserwartung."))

p, y = frame("Wann ein Abstand etwas bedeutet",
             "Gemessen an der Streuung des Verfahrens", 560)
bw2, bh = W - 2 * M, 72
p.append(rect(M, y, bw2, bh, TILE, LINE, 10))
noise_w = bw2 * (3.0 / 18)
p.append(rect(M + bw2 / 2 - noise_w / 2, y, noise_w, bh, "#dbe8e4", None, 10))
p.append(line(M + bw2 / 2, y - 14, M + bw2 / 2, y + bh + 14, TEAL, 3))
p.append(txt(M + bw2 / 2, y - 26, "rund 1,5 Jahre", 21, TEAL, 500, anchor="middle"))
p.append(txt(M, y + bh + 46, "− 9 Jahre", 22, MUTED))
p.append(txt(M + bw2 / 2, y + bh + 46, "0", 22, MUTED, anchor="middle"))
p.append(txt(W - M, y + bh + 46, "+ 9 Jahre", 22, MUTED, anchor="end"))
y += bh + 100
p.append(txt(M, y, "Bis zu neun Jahre Abweichung allein durch technisches Rauschen,", 24, INK))
p.append(txt(M, y + 32, "im günstigen Fall rund anderthalb Jahre. Ein Abstand von zwei", 24, INK))
p.append(txt(M, y + 64, "Jahren liegt damit oft noch in der Streuung des Verfahrens.", 24, INK))
add("abstand-und-streuung", finish(
    p, 560, "Higgins-Chen et al., Nature Aging 2022, Wiederholungsmessungen derselben Probe.",
    "Aussagekräftig wird es bei größeren Abständen und vor allem im Verlauf."))

# ============================================================ lebensstil-biologisches-alter
p, y = frame("Was die Beobachtungsdaten zeigen",
             "4.173 Frauen der Women's Health Initiative und 402 einer italienischen Kohorte",
             620)
fac = ["Ernährung", "moderater Alkohol", "Bildungsstand", "Body-Mass-Index",
       "Carotinoide im Blut", "Fischverzehr"]
cw, ch, gx, gy = 372, 72, 28, 18
for i, f in enumerate(fac):
    x = M + (i % 2) * (cw + gx)
    yy = y + (i // 2) * (ch + gy)
    p.append(rect(x, yy, cw, ch, TILE, LINE, 12))
    p.append(txt(x + 22, yy + 45, f, 25, INK, 400, box=cw - 44))
y += 3 * (ch + gy) + 4
p.append(txt(M, y + 16, "Querschnittlich erhoben: Zusammenhänge in großen Gruppen,", 23, TEAL, 500))
p.append(txt(M, y + 46, "keine Ursachen bei einer einzelnen Person.", 23, TEAL, 500))
add("lebensstil-zusammenhaenge", finish(
    p, 620, "Quach et al., Aging 2017.",
    "Auch der Bildungsstand hing zusammen. Er steht für ein Bündel an Lebensumständen."))

p, y = frame("Die meistzitierte Interventionsstudie",
             "43 gesunde Männer zwischen 50 und 72, acht Wochen", 580)
y = bars(p, y, [
    ("gegenüber Kontrollgruppe", 3.23, "3,23 Jahre", True),
    ("gegenüber Ausgangswert", 1.96, "1,96 Jahre", False),
], maxval=3.6, label_w=300)
p.append(txt(M, y + 14, "Der zweite Wert verfehlte die statistische Signifikanz.", 21, MUTED))
y += 56
p.append(rect(M, y, W - 2 * M, 92, TILE, LINE, 12))
p.append(txt(M + 26, y + 40, "Fünf Dinge wurden gleichzeitig verändert.", 26, INK, 500))
p.append(txt(M + 26, y + 72, "Ernährung, Schlaf, Bewegung, Entspannung, Nahrungsergänzung.", 21, MUTED))
add("interventionsstudie-fitzgerald", finish(
    p, 580, "Fitzgerald et al., Aging 2021.",
    "Welcher Faktor den Ausschlag gab, lässt sich aus dieser Studie nicht ablesen."))

# ============================================================ biologisches-alter-messen-optimieren
p, y = frame("Drei Prüffragen an jedes Protokoll", None, 580)
y = table(p, y, ["Selbstversuch", "Kontrollierte Studie"], [
    ("Vergleichsgruppe", ["nein", "*ja"]),
    ("nur eine Sache verändert", ["nein", "nein"]),
    ("Effekt größer als Streuung", ["offen", "offen"]),
    ("Reichweite", ["eine Person", "43 Männer"]),
], col1=300, rowh=62)
add("protokolle-pruefraster", finish(
    p, 580, "Aufwand und Belegkraft sind unabhängig voneinander.",
    "Ein Protokoll wird nicht dadurch besser belegt, dass es teuer oder umfangreich ist."))

p, y = frame("Was übrig bleibt",
             "Die deutlichsten Zusammenhänge in Bevölkerungsdaten", 560)
items = ["Schlaf", "Bewegung", "Rauchverzicht", "moderater Alkohol", "stabiles Gewicht"]
ch2, gy2 = 58, 14
for i, it in enumerate(items):
    yy = y + i * (ch2 + gy2)
    p.append(rect(M, yy, W - 2 * M, ch2, TILE, LINE, 10))
    p.append('<path d="M%d %d l10 10 20 -22" stroke="%s" stroke-width="4"'
             ' fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
             % (M + 26, yy + 30, TEAL))
    p.append(txt(M + 78, yy + 38, it, 25, INK, 400))
add("belegbare-faktoren", finish(
    p, 560, "Kosten nichts und sind besser untersucht als jedes Präparat.",
    "Zusammenhänge in Bevölkerungsdaten, keine Zusage einer Wirkung im Einzelfall."))

# ============================================================ epigenetik-erklaerung
p, y = frame("Zwei Mechanismen",
             "Beide ändern den Text der Gene nicht, sondern das Ablesen", 620)
y = cards(p, y, [
    ("DNA-Methylierung", ["Eine Methylgruppe setzt", "sich an die DNA, bevorzugt",
                          "wo ein C vor einem G steht",
                          "*In der Steuerregion eines", "*Gens: schwächer abgelesen"], True),
    ("Histon-Verpackung", ["Chemische Änderungen an", "den Proteinen, um die der",
                           "DNA-Faden gewickelt ist.",
                           "*Fest verpackt: schlechter", "*zugänglich zum Ablesen"], False),
], height=256)
p.append(txt(M, y + 18, "Beide Mechanismen sind umkehrbar.", 25, INK, 500))
add("epigenetik-mechanismen", finish(
    p, 620, "Genau das unterscheidet sie von der DNA-Sequenz.",
    "epi heißt auf Griechisch über. Epigenetik ist die Ebene über der Genetik."))

p, y = frame("Drei Aussagen, die zu weit gehen",
             "Alle drei begegnen einem ständig und gehen über die Datenlage hinaus",
             620)
claims = [("Erfahrungen vererben sich epigenetisch",
           "Markierungen werden zwischen den Generationen im Wesentlichen gelöscht"),
          ("Mit der richtigen Ernährung Gene an- und ausschalten",
           "Nahrung beeinflusst Muster, gezielte Steuerung ist nicht belegt"),
          ("Epigenetik erklärt unterschiedliches Altern",
           "Sie erklärt einen Teil und liefert vor allem ein Messinstrument")]
for i, (c, r) in enumerate(claims):
    yy = y + i * 118
    p.append(rect(M, yy, W - 2 * M, 100, TILE, LINE, 12))
    p.append(txt(M + 26, yy + 42, c, 25, INK, 500, box=W - 2 * M - 52))
    p.append(txt(M + 26, yy + 74, r, 20, MUTED, 400, box=W - 2 * M - 52))
add("epigenetik-ueberzogene-aussagen", finish(
    p, 600, "Diese Einschränkungen machen das Feld nicht kleiner.",
    "Zur Vererbung: Tuscher und Day, Neurobiology of Disease 2019."))

# ============================================================ dna-test-arten
p, y = frame("Vier Arten von DNA-Tests",
             "Alle lesen dieselbe Substanz und beantworten verschiedene Fragen", 600)
arten = [("Abstammung", "liest die Sequenz", "einmal"),
         ("Veranlagung", "liest die Sequenz", "einmal"),
         ("Epigenetisch", "liest die Markierungen", "wiederholt"),
         ("Medizinische Diagnostik", "liest die Sequenz", "ärztlich")]
for i, (t, liest, wie) in enumerate(arten):
    yy = y + i * 80
    acc = i == 2
    p.append(rect(M, yy, W - 2 * M, 64, TILE_ACCENT if acc else TILE,
                  LINE_ACCENT if acc else LINE, 10))
    p.append(txt(M + 24, yy + 41, t, 25, INK, 500, box=310))
    p.append(txt(M + 360, yy + 41, liest, 21, MUTED, 400, box=250))
    p.append(txt(W - M - 24, yy + 41, wie, 22, TEAL if acc else MUTED, 500,
                 anchor="end"))
add("dna-testarten-uebersicht", finish(
    p, 600, "Nur beim epigenetischen Typ ist eine Wiederholungsmessung überhaupt sinnvoll.",
    "Medizinische Diagnostik läuft in Deutschland über ärztliche Einrichtungen."))

p, y = frame("Welche Frage passt zu welchem Typ", None, 560)
y = qa_rows(p, y, [
    ("Woher komme ich?", "Abstammungstest"),
    ("Wie ticke ich, dauerhaft?", "Veranlagungstest"),
    ("Wo stehe ich gerade?", "Epigenetischer Test"),
    ("Habe ich ein Problem?", "Ärztliche Abklärung"),
])
add("dna-testarten-fragen", finish(
    p, 560, "Der häufigste Fehlkauf ist ein Test für eine Frage, die er nicht beantwortet.",
    "Zuerst die Frage klären, danach den Typ."))

# ============================================================ die-biologie-des-alterns
p, y = frame("Die Kennzeichen des Alterns",
             "Der Rahmen des Feldes seit 2013", 560)
p.append(rect(M, y, 358, 148, TILE, LINE, 12))
p.append(txt(M + 179, y + 78, "9", 60, INK, 400, anchor="middle"))
p.append(txt(M + 179, y + 118, "Kennzeichen 2013", 21, MUTED, anchor="middle"))
p.append(arrow_right(M + 372, y + 74, 26))
p.append(rect(W - M - 358, y, 358, 148, TILE_ACCENT, LINE_ACCENT, 12))
p.append(txt(W - M - 179, y + 78, "12", 60, INK, 400, anchor="middle"))
p.append(txt(W - M - 179, y + 118, "Kennzeichen 2023", 21, MUTED, anchor="middle"))
y += 196
p.append(txt(M, y + 10, "Epigenetische Veränderungen sind eines dieser Kennzeichen.", 25, INK))
p.append(txt(M, y + 44, "Ein epigenetischer Alterswert deckt eines von zwölf ab.", 21, MUTED))
add("hallmarks-9-auf-12", finish(
    p, 560, "López-Otín et al., Cell 2013 und Cell 2023.",
    "Die Kennzeichen greifen ineinander. Ein einzelner Hebel steht nicht in der Liste."))

p, y = frame("Belegt und nicht belegt",
             "Zwei Aussagen, die regelmäßig vermischt werden", 580)
y = cards(p, y, [
    ("Belegt", ["Einzelne Messwerte lassen", "sich verschieben.",
                "*Ein Methylierungsmuster", "*wird dem einer jüngeren",
                "*Vergleichsgruppe ähnlicher"], True),
    ("Nicht belegt", ["Dass damit ein", "biologischer Prozess", "zurückgesetzt wird.",
                      "*Gewebe oder Organe werden", "*dadurch nicht jünger."], False),
], height=246)
add("belegt-nicht-belegt", finish(
    p, 580, "Aufhalten lässt sich der Prozess nach heutigem Stand nicht.",
    "Verlangsamen ist die offene Frage, und die Belegslage beim Menschen ist dünn."))

# ============================================================ brain-health
p, y = frame("Das Gehirn in zwei Zahlen", None, 500)
p.append(rect(M, y, 358, 172, TILE, LINE, 12))
p.append(txt(M + 179, y + 92, "86 Mrd.", 50, INK, 400, anchor="middle"))
p.append(txt(M + 179, y + 132, "Nervenzellen", 22, MUTED, anchor="middle"))
p.append(rect(W - M - 358, y, 358, 172, TILE_ACCENT, LINE_ACCENT, 12))
p.append(txt(W - M - 179, y + 92, "rund 20 %", 50, INK, 400, anchor="middle"))
p.append(txt(W - M - 179, y + 132, "des täglichen Energiebedarfs", 20, MUTED, anchor="middle"))
add("gehirn-zwei-zahlen", finish(
    p, 500, "Die Anpassungsfähigkeit des Gehirns verändert sich mit dem Alter.",
    "Allgemeine Information, keine medizinische Beratung."))

p, y = frame("Was die Forschung in Verbindung bringt",
             "Beobachtete Zusammenhänge, keine Ursache und Wirkung", 600)
y = cards(p, y, [
    ("mit Belastung", ["ungünstige Ernährung", "Alkohol und Nikotin",
                       "Schlafmangel"], False),
    ("mit kognitiver Fitness", ["Ernährung", "regelmäßige Bewegung",
                                "kognitives Training", "lebenslanges Lernen"], True),
], height=250)
add("brain-health-faktoren", finish(
    p, 600, "Beobachtungsdaten beschreiben Zusammenhänge und keine Ursache-Wirkung.",
    "Keine medizinische Beratung und keine Aussage zur Vorbeugung von Erkrankungen."))

# ---------------------------------------------------------------------- output
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, svg in made.items():
        with open(os.path.join(OUT, name + ".svg"), "w") as f:
            f.write(svg)
    print("%d SVGs -> %s" % (len(made), OUT))
    if WARN:
        print("\nWARNUNGEN Textbreite (Ist>Soll @Groesse):")
        for w in sorted(set(WARN)):
            print(w)
    else:
        print("keine Textueberlaeufe")

