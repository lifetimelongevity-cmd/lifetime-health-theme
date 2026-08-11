#!/usr/bin/env python3
"""Kurzaudit der Live-Fassung eines Blogartikels: Struktur, Umfang, Altlasten.

Zweck: entscheiden, was ueberarbeitet werden muss, ohne den ganzen Text zu lesen.
Aufruf: python3 docs/age-dna-geo/tools/altbestand-audit.py <handle> [...]
"""
import re, sys, subprocess

BASE = "https://www.lifetime-health.de/blogs/longevity-blog/"
ALTLAST = [
    (r'\b187\b', '187 Reports'),
    (r'16\s*(DNA-)?Kategorien', '16 Kategorien'),
    (r'22\s*(DNA-)?(Kategorien|Bereiche)', '22 Kategorien/Bereiche'),
    (r'6\s*(bis|-)\s*8\s*Wochen', '6 bis 8 Wochen'),
    (r'ISO\s*9001|ISO\s*13485|GLP-zert', 'ISO-Kette'),
    (r'nur du hast Zugriff|anonymisiert analysiert', 'Datenschutz-Absolutaussage'),
    (r'zur[uü]ckdrehen|kehrt.{0,15}Alterung um', 'roter Claim'),
    (r'hochaufgel[oö]st', 'Methodenaussage'),
    (r'\bMuhdo|MuhdoAge|MAISIE', 'Partnername'),
]

def hole(handle):
    r = subprocess.run(["curl", "-sS", BASE + handle], capture_output=True, text=True)
    return r.stdout

def audit(handle):
    html = hole(handle)
    print(f"\n{'='*70}\n{handle}\n{'='*70}")
    t = re.search(r'<title>(.*?)</title>', html, flags=re.S)
    print("Title-Tag :", (t.group(1).strip() if t else '?')[:95])
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, flags=re.S)
    print("H1        :", re.sub(r'<[^>]+>', '', h1.group(1)).strip() if h1 else '?')

    body = re.search(r'class="lt-article__content rte"(.*?)(?:</article>|<section)', html, flags=re.S)
    scope = body.group(1) if body else html
    heads = [re.sub(r'<[^>]+>', '', h).strip() for h in re.findall(r'<h([23])[^>]*>(.*?)</h\1>', scope, flags=re.S) and
             [m[1] for m in re.findall(r'<h([23])[^>]*>(.*?)</h\1>', scope, flags=re.S)]]
    lvl = [m[0] for m in re.findall(r'<h([23])[^>]*>(.*?)</h\1>', scope, flags=re.S)]
    print(f"Gliederung ({len(heads)} Ueberschriften):")
    for l, h in zip(lvl, heads):
        print(f"   H{l} {h[:80]}")

    txt = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', scope))
    print("Woerter   :", len(txt.split()))
    sie = len(re.findall(r'\bIhre[nmrs]?\b|\bIhnen\b|\bSie\s+(?:können|haben|sind|werden|sollten|müssen)\b', txt))
    print("Sie-Form  :", sie, "Treffer" if sie else "(Du-Form)")
    print("Em-Dashes :", len(re.findall(r'[—–]', txt)))
    print("FAQPage   :", "ja" if '"FAQPage"' in html else "FEHLT")
    dm = set(re.findall(r'"dateModified"\s*:\s*"([^"]+)"', html))
    print("dateModified:", sorted(dm) or 'keins')
    print("Quellen-Links:", len(re.findall(r'href="https?://(?:doi\.org|www\.ncbi|pubmed)', scope)))
    links = sorted(set(re.findall(r'href="(/(?:pages|products|blogs)/[^"#?]+)"', scope)))
    print("interne Links:", len(links))
    for l in links: print("   ", l)
    treffer = [w for p, w in ALTLAST if re.search(p, txt, flags=re.I)]
    print("Altlasten :", ', '.join(treffer) if treffer else 'keine')

for h in sys.argv[1:]:
    audit(h)
