#!/usr/bin/env python3
"""
Push-Dashboard: baut docs/push-dashboard.html aus der Git-History plus Live-Screenshots.

Jede Karte ist ein Push: Screenshot der betroffenen Live-Seite, ein Satz dazu,
Datum, Kurzhash und die Liste der berührten Seiten.

Aufruf:
    python3 docs/push-dashboard.py                 # 15 Pushes, fehlende Screenshots holen
    python3 docs/push-dashboard.py --limit 25      # mehr Historie
    python3 docs/push-dashboard.py --no-shots      # nur HTML neu bauen, keine Screenshots
    python3 docs/push-dashboard.py --refresh-shots # alle Screenshots neu aufnehmen

Zwei Datendateien liegen daneben:
    docs/push-dashboard-routes.json  Template-Datei -> Live-URL (aus der Shopify Admin API)
    docs/push-dashboard-notes.json   Kurzhash -> Ein-Satz-Zusammenfassung

Fehlt zu einem Commit eine Notiz, schreibt das Dashboard eine mechanische Ersatzzeile
aus den geänderten Dateien und markiert die Karte als "Zusammenfassung fehlt".
"""

import argparse
import datetime as dt
import html
import json
import os
import re
import shutil
import subprocess
import sys
import time
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
SHOTS_DIR = os.path.join(DOCS, "push-shots")
ROUTES_FILE = os.path.join(DOCS, "push-dashboard-routes.json")
NOTES_FILE = os.path.join(DOCS, "push-dashboard-notes.json")
OUT_FILE = os.path.join(DOCS, "push-dashboard.html")

THEME_DIRS = ["sections", "snippets", "templates", "assets", "config", "layout", "locales", "blocks"]
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# Reihenfolge bestimmt, welche Seite eine Karte als Hauptmotiv bekommt.
# Oben stehen die fünf Seiten des kanonischen Fundaments.
PAGE_PRIORITY = [
    "index.json",
    "product.age-dna-test.json",
    "product.nmn-pulver.json",
    "page.science.json",
    "page.quiz-age.json",
]

GLOBAL = "__global__"  # Änderung wirkt theme-weit, Motiv ist dann die Startseite


# --------------------------------------------------------------------------- git

def git(*args):
    return subprocess.run(["git"] + list(args), cwd=ROOT, capture_output=True,
                          text=True, check=True).stdout


def read_commits(limit):
    sep = "\x1f"
    fmt = sep.join(["%H", "%h", "%aI", "%s", "%an"])
    raw = git("log", "-%d" % limit, "--pretty=format:" + fmt, "--", *THEME_DIRS)
    commits = []
    for line in raw.splitlines():
        if not line.strip():
            continue
        full, short, iso, subject, author = line.split(sep)
        files = [f for f in git("show", "--name-only", "--pretty=format:", full,
                                "--", *THEME_DIRS).splitlines() if f.strip()]
        commits.append({
            "full": full, "short": short, "subject": subject, "author": author,
            "date": dt.datetime.fromisoformat(iso), "files": files,
            "weight": diff_weight(full),
        })
    return commits


def diff_weight(full_hash):
    """Datei -> geänderte Zeilen. Entscheidet, welche Seite das Motiv einer Karte wird."""
    weights = {}
    raw = git("show", "--numstat", "--pretty=format:", full_hash, "--", *THEME_DIRS)
    for line in raw.splitlines():
        cols = line.split("\t")
        if len(cols) != 3:
            continue
        added, removed, path = cols
        if added == "-":      # Binärdatei
            weights[path] = weights.get(path, 0) + 1
            continue
        weights[path] = weights.get(path, 0) + int(added) + int(removed)
    return weights


# ------------------------------------------------------------------- theme index

def load_template_json(path):
    """Shopify-Template-JSONs tragen einen /* ... */-Kommentarkopf, den json nicht mag."""
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    return json.loads(text)


def build_indexes():
    """type -> Templates, Snippet -> rendernde Dateien, Asset -> Section."""
    section_to_templates = defaultdict(set)
    tpl_dir = os.path.join(ROOT, "templates")
    for name in sorted(os.listdir(tpl_dir)):
        if not name.endswith(".json"):
            continue
        try:
            data = load_template_json(os.path.join(tpl_dir, name))
        except Exception:
            continue
        for block in (data.get("sections") or {}).values():
            if isinstance(block, dict) and block.get("type"):
                section_to_templates[block["type"]].add(name)

    rendered_by = defaultdict(set)  # Snippet-Name -> Dateien, die es rendern
    for folder in ("sections", "snippets", "layout"):
        d = os.path.join(ROOT, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            if not name.endswith(".liquid"):
                continue
            with open(os.path.join(d, name), encoding="utf-8", errors="ignore") as fh:
                body = fh.read()
            for hit in re.findall(r"{%-?\s*(?:render|include)\s+['\"]([^'\"]+)['\"]", body):
                rendered_by[hit].add("%s/%s" % (folder, name))
    return section_to_templates, rendered_by


def templates_for_section(section_type, section_to_templates):
    return set(section_to_templates.get(section_type, ()))


def resolve_file(path, section_to_templates, rendered_by, depth=0):
    """Eine geänderte Datei -> Menge betroffener Template-Dateien (oder GLOBAL)."""
    folder, _, name = path.partition("/")

    if folder == "templates":
        return {name}

    if folder == "sections":
        if name.endswith("-group.json"):      # header-group / footer-group liegen auf allen Seiten
            return {GLOBAL}
        stem = name[:-len(".liquid")] if name.endswith(".liquid") else name
        return templates_for_section(stem, section_to_templates)

    if folder == "snippets":
        stem = name[:-len(".liquid")] if name.endswith(".liquid") else name
        users = rendered_by.get(stem, set())
        if any(u.startswith("layout/") for u in users):
            return {GLOBAL}
        if depth >= 2:                        # Rekursion begrenzen
            return {GLOBAL} if users else set()
        out = set()
        for user in users:
            out |= resolve_file(user, section_to_templates, rendered_by, depth + 1)
        return out

    if folder == "assets":
        m = re.match(r"^section-(.+)\.css$", name)
        if m:
            hits = templates_for_section(m.group(1), section_to_templates)
            if hits:
                return hits
        return {GLOBAL}

    if folder == "blocks":
        return {GLOBAL}

    # layout, config, locales
    return {GLOBAL}


# -------------------------------------------------------------------- screenshots

def slugify(url_path):
    s = url_path.strip("/").replace("/", "_") or "startseite"
    return re.sub(r"[^a-z0-9_.-]+", "-", s.lower())


def existing_shots():
    """slug -> [(datum, dateiname), ...] absteigend."""
    found = defaultdict(list)
    if not os.path.isdir(SHOTS_DIR):
        return found
    for name in os.listdir(SHOTS_DIR):
        m = re.match(r"^(.+)__(\d{4}-\d{2}-\d{2})\.jpg$", name)
        if m:
            found[m.group(1)].append((m.group(2), name))
    for slug in found:
        found[slug].sort(reverse=True)
    return found


def http_status(url):
    try:
        out = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "-L", "--max-time", "20", url],
            capture_output=True, text=True, check=True).stdout.strip()
        return int(out or 0)
    except Exception:
        return 0


def capture(url, slug, today):
    """Screenshot in docs/push-shots/<slug>__<datum>.jpg. Gibt (Dateiname, Grund) zurück."""
    os.makedirs(SHOTS_DIR, exist_ok=True)
    png = os.path.join(SHOTS_DIR, "_tmp_%s.png" % slug[:40])
    jpg_name = "%s__%s.jpg" % (slug, today)
    jpg = os.path.join(SHOTS_DIR, jpg_name)
    cmd = [CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
           "--user-data-dir=/tmp/lt-push-dashboard-profile",
           "--window-size=1280,900", "--virtual-time-budget=9000",
           "--screenshot=" + png, url]
    # Headless-Chrome schreibt den Screenshot zuverlässig, beendet sich danach aber
    # oft nicht. Deshalb nicht auf das Prozessende warten, sondern auf die Datei:
    # sobald ihre Größe zwischen zwei Messungen gleich bleibt, ist sie vollständig.
    # Ein hartes Zeitlimit auf den Prozess würde lange Artikelseiten fälschlich als
    # Fehlschlag werten und ließe die Instanz trotzdem laufen.
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    deadline = time.time() + 150
    letzte_groesse = -1
    while time.time() < deadline:
        if proc.poll() is not None:
            break
        if os.path.exists(png):
            groesse = os.path.getsize(png)
            if groesse > 0 and groesse == letzte_groesse:
                break
            letzte_groesse = groesse
        time.sleep(1.5)
    if proc.poll() is None:
        proc.kill()
        proc.wait(timeout=10)
    if not os.path.exists(png):
        return None, "Chrome hat kein Bild geschrieben"
    try:
        subprocess.run(["sips", "-Z", "760", "-s", "format", "jpeg",
                        "-s", "formatOptions", "72", png, "--out", jpg],
                       capture_output=True, check=True)
    finally:
        if os.path.exists(png):
            os.remove(png)
    if os.path.exists(jpg):
        return jpg_name, "ok"
    return None, "sips konnte nicht umwandeln"


# ------------------------------------------------------------------------- HTML

CSS = """
:root{
  --bg:#f7f7f4; --card:#fff; --ink:#26251e; --muted:rgba(38,37,30,.66);
  --line:rgba(38,37,30,.12); --dark:#364f56; --warn:#8a6d1f; --warn-bg:rgba(214,178,66,.16);
  --radius:14px; --shadow:0 1px 2px rgba(38,37,30,.05),0 8px 24px rgba(38,37,30,.06);
}
@media (prefers-color-scheme:dark){
  :root{--bg:#1c1b17; --card:#26251e; --ink:#f3f2ec; --muted:rgba(243,242,236,.62);
        --line:rgba(243,242,236,.14); --dark:#8fb3bd; --warn:#e0c268; --warn-bg:rgba(214,178,66,.14);
        --shadow:0 1px 2px rgba(0,0,0,.3),0 8px 24px rgba(0,0,0,.3);}
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
  font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing:antialiased}
.wrap{max-width:1180px;margin:0 auto;padding:48px 24px 80px}
header.top{display:flex;flex-wrap:wrap;gap:16px 32px;align-items:baseline;
  justify-content:space-between;margin-bottom:8px}
h1{font-size:30px;font-weight:600;letter-spacing:-.01em;margin:0}
.sub{color:var(--muted);font-size:14px;margin:6px 0 0}
.meta-bar{display:flex;gap:24px;flex-wrap:wrap;color:var(--muted);font-size:13px;
  border-top:1px solid var(--line);margin-top:24px;padding-top:16px}
.meta-bar b{color:var(--ink);font-weight:600}
.grid{display:grid;gap:28px;margin-top:32px;
  grid-template-columns:repeat(auto-fill,minmax(400px,1fr))}
@media (max-width:520px){.grid{grid-template-columns:1fr;gap:20px}.wrap{padding:32px 16px 56px}}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);
  overflow:hidden;display:flex;flex-direction:column;box-shadow:var(--shadow)}
.shot{display:block;position:relative;background:var(--bg);aspect-ratio:16/11;overflow:hidden;
  border-bottom:1px solid var(--line)}
.shot img{width:100%;height:100%;object-fit:cover;object-position:top center;display:block}
.shot .empty{display:flex;height:100%;align-items:center;justify-content:center;
  color:var(--muted);font-size:13px;text-align:center;padding:24px}
.shot .stamp{position:absolute;left:10px;bottom:10px;background:rgba(38,37,30,.72);color:#fff;
  font-size:11px;padding:3px 8px;border-radius:99px;letter-spacing:.02em}
.body{padding:18px 20px 20px;display:flex;flex-direction:column;gap:12px;flex:1}
.when{display:flex;gap:10px;align-items:center;font-size:12px;color:var(--muted);
  letter-spacing:.04em;text-transform:uppercase}
.when .hash{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:none;
  letter-spacing:0;background:var(--bg);border:1px solid var(--line);border-radius:5px;padding:1px 6px}
.summary{margin:0;font-size:16px;line-height:1.45}
.summary.missing{color:var(--muted);font-style:italic}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:4px}
.chip{font-size:12px;border:1px solid var(--line);border-radius:99px;padding:3px 10px;
  color:var(--muted);text-decoration:none}
a.chip:hover{color:var(--ink);border-color:var(--ink)}
.chip.count{background:var(--bg)}
.chip.flag{background:var(--warn-bg);border-color:transparent;color:var(--warn)}
.daymark{grid-column:1/-1;display:flex;align-items:center;gap:14px;margin:12px 0 -8px;
  color:var(--muted);font-size:13px;letter-spacing:.06em;text-transform:uppercase}
.daymark::after{content:"";flex:1;height:1px;background:var(--line)}
footer.note{margin-top:56px;padding-top:20px;border-top:1px solid var(--line);
  color:var(--muted);font-size:13px;line-height:1.6}
footer.note code{background:var(--card);border:1px solid var(--line);border-radius:5px;
  padding:1px 6px;font-size:12px}
"""


def rel_time(when, now):
    delta = now - when
    mins = int(delta.total_seconds() // 60)
    if mins < 60:
        return "vor %d Min." % max(mins, 1)
    if mins < 60 * 24:
        return "vor %d Std." % (mins // 60)
    days = mins // (60 * 24)
    if days == 1:
        return "gestern"
    if days < 14:
        return "vor %d Tagen" % days
    return "vor %d Wochen" % (days // 7)


WEEKDAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]


def render(cards, site, now, stats):
    e = html.escape
    parts = ["<!doctype html><html lang=de><head><meta charset=utf-8>",
             "<meta name=viewport content='width=device-width,initial-scale=1'>",
             "<title>LIFETIME Push-Dashboard</title><style>%s</style></head><body><div class=wrap>" % CSS]

    parts.append("<header class=top><div><h1>Was zuletzt live ging</h1>"
                 "<p class=sub>Jeder Push ins Theme, neueste zuerst. Screenshot zeigt die betroffene "
                 "Seite so, wie sie zum Aufnahmedatum live war.</p></div></header>")

    parts.append("<div class=meta-bar>"
                 "<span><b>%d</b> Pushes</span>"
                 "<span>letzter <b>%s</b></span>"
                 "<span><b>%d</b> Seiten bebildert</span>"
                 "<span>Stand <b>%s</b></span>"
                 "</div>" % (stats["pushes"], e(stats["latest"]), stats["shots"],
                             now.strftime("%d.%m.%Y, %H:%M")))

    parts.append("<div class=grid>")
    last_day = None
    for c in cards:
        day = c["date"].date()
        if day != last_day:
            label = "%s, %s" % (WEEKDAYS[c["date"].weekday()], c["date"].strftime("%d.%m.%Y"))
            parts.append("<div class=daymark>%s</div>" % e(label))
            last_day = day

        parts.append("<article class=card>")

        if c["shot"]:
            href = site + c["primary_url"] if c["primary_url"] else "#"
            parts.append("<a class=shot href='%s' target=_blank rel=noopener>"
                         "<img loading=lazy src='push-shots/%s' alt='%s'>"
                         "<span class=stamp>%s</span></a>"
                         % (e(href), e(c["shot"]), e(c["primary_label"]), e(c["shot_stamp"])))
        else:
            parts.append("<div class=shot><span class=empty>%s</span></div>"
                         % e(c["shot_missing"]))

        parts.append("<div class=body>")
        parts.append("<div class=when><span>%s</span><span>%s Uhr</span><span class=hash>%s</span></div>"
                     % (e(c["rel"]), c["date"].strftime("%H:%M"), e(c["short"])))
        parts.append("<p class='summary%s'>%s</p>"
                     % ("" if c["has_note"] else " missing", e(c["summary"])))

        parts.append("<div class=chips>")
        for label, url in c["pages"]:
            if url:
                parts.append("<a class=chip href='%s' target=_blank rel=noopener>%s</a>"
                             % (e(site + url), e(label)))
            else:
                parts.append("<span class=chip>%s</span>" % e(label))
        if c["extra_pages"]:
            parts.append("<span class=chip>+%d weitere</span>" % c["extra_pages"])
        parts.append("<span class='chip count'>%s</span>" % e(c["filecount"]))
        if not c["has_note"]:
            parts.append("<span class='chip flag'>Zusammenfassung fehlt</span>")
        parts.append("</div></div></article>")
    parts.append("</div>")

    parts.append(
        "<footer class=note>Neu bauen mit <code>python3 docs/push-dashboard.py</code>. "
        "Zusammenfassungen stehen in <code>docs/push-dashboard-notes.json</code>, "
        "die Seiten-Zuordnung in <code>docs/push-dashboard-routes.json</code>. "
        "Screenshots werden pro Tag abgelegt, das Archiv wächst also mit jedem Lauf.</footer>")
    parts.append("</div></body></html>")
    return "".join(parts)


# ------------------------------------------------------------------------- main

def describe_files(files):
    buckets = defaultdict(int)
    for f in files:
        buckets[f.split("/")[0]] += 1
    names = {"sections": "Section", "snippets": "Snippet", "templates": "Template",
             "assets": "Asset", "config": "Config", "layout": "Layout",
             "locales": "Übersetzung", "blocks": "Block"}
    order = ["templates", "sections", "snippets", "assets", "layout", "config", "locales", "blocks"]
    bits = []
    for key in order:
        n = buckets.get(key)
        if n:
            label = names[key]
            bits.append("%d %s" % (n, label if n == 1 else label + "s"))
    return ", ".join(bits) or "keine Theme-Dateien"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=15)
    ap.add_argument("--no-shots", action="store_true")
    ap.add_argument("--refresh-shots", action="store_true")
    args = ap.parse_args()

    with open(ROUTES_FILE, encoding="utf-8") as fh:
        routes = json.load(fh)
    site = routes.get("_site", "https://www.lifetime-health.de")
    route_map = routes["routes"]

    notes = {}
    if os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, encoding="utf-8") as fh:
            notes = {k: v for k, v in json.load(fh).items() if not k.startswith("_")}

    section_to_templates, rendered_by = build_indexes()
    commits = read_commits(args.limit)
    now = dt.datetime.now(dt.timezone.utc).astimezone()
    today = now.strftime("%Y-%m-%d")

    # 1. Commits auf Seiten abbilden
    cards = []
    wanted = {}  # slug -> url
    for c in commits:
        tpls = set()
        for f in c["files"]:
            tpls |= resolve_file(f, section_to_templates, rendered_by)

        direct = {os.path.basename(f) for f in c["files"] if f.startswith("templates/")}
        is_global = GLOBAL in tpls
        tpls.discard(GLOBAL)

        # Motiv ist die Seite mit dem größten Änderungsumfang in diesem Push, nicht
        # die wichtigste Seite überhaupt. Sonst zeigt eine Karte die PDP, während der
        # Satz daneben von der Seite handelt, die tatsächlich umgebaut wurde.
        def rank(tpl):
            pri = PAGE_PRIORITY.index(tpl) if tpl in PAGE_PRIORITY else len(PAGE_PRIORITY)
            lines = c["weight"].get("templates/" + tpl, 0)
            return (0 if tpl in direct else 1, -lines, pri, tpl)

        ordered = sorted(tpls, key=rank)
        if not ordered and is_global:
            ordered = ["index.json"]

        pages = []
        for tpl in ordered:
            info = route_map.get(tpl)
            if info:
                pages.append((info["label"], info["url"]))
            else:
                pages.append((tpl.replace(".json", ""), None))

        primary_url, primary_label = None, "Theme"
        for label, url in pages:
            if url:
                primary_url, primary_label = url, label
                break

        if primary_url:
            wanted[slugify(primary_url)] = primary_url

        note = notes.get(c["short"])
        summary = note or c["subject"]
        # Auto-Commits des Theme Managers tragen keinen Inhalt im Betreff
        auto = re.match(r"^theme: push \d{4}-\d{2}-\d{2}", c["subject"] or "")
        if not note and auto:
            summary = "Ohne Notiz. Geändert: %s." % describe_files(c["files"])

        shown = pages[:4]
        if is_global and not any(p[1] == "/" for p in shown):
            shown = [("Theme-weit", None)] + shown[:3]

        cards.append({
            "short": c["short"], "date": c["date"], "summary": summary,
            "has_note": bool(note) or not auto,
            "rel": rel_time(c["date"], now),
            "pages": shown, "extra_pages": max(0, len(pages) - len(shown)),
            "filecount": describe_files(c["files"]),
            "primary_url": primary_url, "primary_label": primary_label,
            "primary_slug": slugify(primary_url) if primary_url else None,
        })

    # 2. Screenshots holen
    have = existing_shots()
    if not args.no_shots:
        if shutil.which(CHROME) is None and not os.path.exists(CHROME):
            print("Chrome nicht gefunden unter %s, überspringe Screenshots." % CHROME)
        else:
            # Kein künstlicher Probelauf: die ersten echten Aufnahmen sind der Test.
            # Hängen zwei hintereinander im Timeout, blockiert Chrome insgesamt
            # (meist eine übrig gebliebene Headless-Instanz am selben Profil).
            # Dann abbrechen, statt für jede weitere Seite drei Minuten zu warten.
            timeouts_in_folge = 0
            for slug, url in sorted(wanted.items()):
                fresh = [n for d, n in have.get(slug, []) if d == today]
                if fresh and not args.refresh_shots:
                    continue
                full = site + url
                code = http_status(full)
                if code != 200:
                    print("  %-42s HTTP %s, kein Screenshot" % (url, code))
                    continue
                name, reason = capture(full, slug, today)
                print("  %-42s %s" % (url, name or reason))
                if name:
                    timeouts_in_folge = 0
                    have[slug].insert(0, (today, name))
                    have[slug].sort(reverse=True)
                else:
                    timeouts_in_folge += 1
                    if timeouts_in_folge >= 2:
                        print("\nZwei Seiten hintereinander ohne Bild, Chrome rendert nicht. "
                              "Meist hängen alte Instanzen:\n  pkill -f 'headless=new'\n"
                              "Danach erneut starten. Die restlichen Seiten werden "
                              "übersprungen, vorhandene Screenshots bleiben in Benutzung.")
                        break

    # 3. Passenden Screenshot je Karte wählen: den ältesten, der nach dem Push entstand,
    #    sonst den neuesten vorhandenen.
    for card in cards:
        card["shot"] = None
        card["shot_stamp"] = ""
        card["shot_missing"] = "Kein Screenshot"
        slug = card["primary_slug"]
        if not slug:
            card["shot_missing"] = "Theme-weite Änderung ohne eigene Seite"
            continue
        shots = have.get(slug) or []
        if not shots:
            card["shot_missing"] = "Screenshot fehlt für %s" % card["primary_label"]
            continue
        push_day = card["date"].strftime("%Y-%m-%d")
        after = [(d, n) for d, n in shots if d >= push_day]
        chosen = min(after, key=lambda x: x[0]) if after else shots[0]
        card["shot"] = chosen[1]
        card["shot_stamp"] = "%s · Stand %s" % (
            card["primary_label"], dt.datetime.strptime(chosen[0], "%Y-%m-%d").strftime("%d.%m."))

    stats = {
        "pushes": len(cards),
        "latest": rel_time(cards[0]["date"], now) if cards else "keine",
        "shots": len({c["shot"] for c in cards if c["shot"]}),
    }

    with open(OUT_FILE, "w", encoding="utf-8") as fh:
        fh.write(render(cards, site, now, stats))

    missing = [c["short"] for c in cards if not c["has_note"]]
    print("\ngeschrieben: %s" % OUT_FILE)
    print("Karten: %d, mit Screenshot: %d" % (len(cards), sum(1 for c in cards if c["shot"])))
    if missing:
        print("ohne Zusammenfassung in notes.json: %s" % ", ".join(missing))


if __name__ == "__main__":
    sys.exit(main())
