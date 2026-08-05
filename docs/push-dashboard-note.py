#!/usr/bin/env python3
"""
Schreibt die Push-Notiz zum zuletzt erzeugten Commit in docs/push-dashboard-notes.json.

Aufruf (so macht es der Theme Manager direkt nach `git commit`):
    python3 docs/push-dashboard-note.py /tmp/lt-push-note.txt

Der Text kommt bewusst aus einer Datei und nicht als Argument: Er wird im
Theme Manager in ein Textfeld getippt und landet sonst als Shell-Argument in
einem zsh-Skript, wo ein Apostroph oder ein Anführungszeichen den ganzen Push
zerlegen würde.

Ist die Datei leer oder fehlt sie, passiert nichts und der Rückgabewert ist 0.
Der Push darf niemals an einer fehlenden Notiz scheitern.
"""

import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOTES_FILE = os.path.join(ROOT, "docs", "push-dashboard-notes.json")


def kurzhash():
    out = subprocess.run(["git", "rev-parse", "--short", "HEAD"],
                         cwd=ROOT, capture_output=True, text=True, check=True)
    return out.stdout.strip()


def main():
    if len(sys.argv) < 2:
        print("Kein Notiz-Pfad übergeben, überspringe.")
        return 0

    pfad = sys.argv[1]
    if not os.path.exists(pfad):
        return 0

    with open(pfad, encoding="utf-8") as fh:
        text = " ".join(fh.read().split())     # Zeilenumbrüche zu einem Satz glätten
    if not text:
        return 0

    try:
        h = kurzhash()
    except subprocess.CalledProcessError:
        print("Kein Git-HEAD gefunden, Notiz nicht gespeichert.")
        return 0

    daten = {}
    if os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, encoding="utf-8") as fh:
            daten = json.load(fh)

    if daten.get(h) == text:
        print("Notiz für %s steht schon so drin." % h)
        return 0

    daten[h] = text
    # _comment bleibt vorn, danach die Hashes in Einfügereihenfolge
    geordnet = {}
    for key in daten:
        if key.startswith("_"):
            geordnet[key] = daten[key]
    for key in daten:
        if not key.startswith("_"):
            geordnet[key] = daten[key]

    with open(NOTES_FILE, "w", encoding="utf-8") as fh:
        json.dump(geordnet, fh, ensure_ascii=False, indent=2)
        fh.write("\n")

    print("Notiz für %s gespeichert: %s" % (h, text))
    return 0


if __name__ == "__main__":
    sys.exit(main())
