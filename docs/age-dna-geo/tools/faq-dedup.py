#!/usr/bin/env python3
"""Prueft neue FAQ-Fragen gegen alle bestehenden im Theme.

Umsetzung der Dedup-Regel aus dem A1-Auftrag: difflib.SequenceMatcher-Aehnlichkeit
ueber 0,72 gilt als Duplikat. Der Bestand wird direkt aus templates/*.json gelesen,
nicht aus einer gepflegten Liste, damit er nie veraltet.

Aufruf aus dem Theme-Root:
    python3 docs/age-dna-geo/tools/faq-dedup.py <datei-mit-neuen-fragen.txt> [zu-ueberspringende-template.json ...]

Die Skip-Liste braucht man beim Ueberarbeiten eines bestehenden Artikels: dessen
eigene Fragen sollen nicht gegen sich selbst geprueft werden.
"""
import json, re, glob, os, sys, difflib

SCHWELLE = 0.72

def load(path):
    s = open(path, encoding='utf-8').read()
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S)   # Shopify-JSON darf Kommentare tragen
    return json.loads(s)

def bestand(skip=()):
    out = []
    for f in sorted(glob.glob('templates/*.json')):
        if os.path.basename(f) in skip:
            continue
        try:
            d = load(f)
        except Exception:
            continue
        for sv in (d.get('sections') or {}).values():
            if sv.get('type') == 'crs-faq-accordion':
                for bv in (sv.get('blocks') or {}).values():
                    q = (bv.get('settings') or {}).get('question')
                    if q:
                        out.append((os.path.basename(f), q))
    return out

def norm(s):
    return re.sub(r'\s+', ' ', s.lower().strip())

def main():
    if len(sys.argv) < 2:
        print(__doc__); return 2
    skip = tuple(sys.argv[2:])
    neu = [l.strip() for l in open(sys.argv[1], encoding='utf-8') if l.strip()]
    ex = bestand(skip)
    print(f"Bestand: {len(ex)} Fragen" + (f", uebersprungen: {', '.join(skip)}" if skip else ""))
    print()
    schlimmster, fail = 0.0, False
    for q in neu:
        treffer = max(ex, key=lambda e: difflib.SequenceMatcher(None, norm(q), norm(e[1])).ratio())
        r = difflib.SequenceMatcher(None, norm(q), norm(treffer[1])).ratio()
        schlimmster = max(schlimmster, r)
        if r > SCHWELLE:
            fail = True
        print(f"[{'FAIL' if r > SCHWELLE else ' ok '}] {r:.2f}  {q}")
        print(f"         naechste: {treffer[1]}  ({treffer[0]})")
    print()
    print(f"Hoechste Aehnlichkeit: {schlimmster:.2f} -> "
          + ("DUPLIKAT, ueberarbeiten" if fail else f"alle unter {SCHWELLE}"))
    return 1 if fail else 0

if __name__ == '__main__':
    sys.exit(main())
