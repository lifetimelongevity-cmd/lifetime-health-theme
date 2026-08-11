#!/usr/bin/env python3
"""Prueft eine Artikel-Arbeitsfassung (HTML) gegen die harten Sperren des A1-Auftrags.

Quellen der Sperrliste: docs/age-dna-product-fact-sheet.md § Weiterhin gesperrt,
docs/age-dna-geo/age-dna-geo-playbook.md §4 (Claim-Ampel) und
docs/age-dna-geo/methoden-steckbrief-freigabeliste_2026-08-11.md.

Aufruf:  python3 docs/age-dna-geo/tools/claim-check.py <body.html> [...]
Exit 1, sobald ein Treffer faellt.
"""
import re, sys

SPERRE = [
    (r'\bMuhdo\b',                          'Partnername (nie oeffentlich)'),
    (r'MuhdoAge',                           'Uhrname des Partners'),
    (r'\bMAISIE\b',                         'Name des Coach-Systems'),
    # Nicht die Bandnummer in Zitaten treffen: "Am J Epidemiol 2018;187(6)".
    # Als Falschtreffer im Fact-Sheet dokumentiert (Korrekturumfang im Theme).
    (r'(?<!;)\b187\b',                       'gesperrte Report-Gesamtzahl'),
    (r'16\s*(DNA-)?Kategorien',             'gesperrte Kategorienzahl'),
    (r'22\s*(DNA-)?(Kategorien|Bereiche)',  'gesperrte Kategorien-/Bereichszahl'),
    (r'f[uü]nf\s+Epigenetik-Reports',       'gesperrte Reportzahl'),
    (r'ISO\s*9001',                         'entfernter ISO-Claim'),
    (r'ISO\s*13485',                        'entfernter ISO-Claim'),
    (r'GLP-zertifiziert',                   'entfernter Claim'),
    (r'medizinischer\s+Standard',           'entfernter Claim'),
    (r'klinischen?\s+(Diagnostik|Bedingungen)', 'klinische Gleichsetzung'),
    (r'medizinisch\s+valide',               'entfernter Claim'),
    (r'Deutsches\s+Labor',                  'entfernter Claim'),
    (r'nur\s+du\s+hast\s+Zugriff',          'gesperrte Datenschutzaussage'),
    (r'nur\s+ich\s+Zugriff',                'gesperrte Datenschutzaussage'),
    (r'anonymisiert\s+analysiert',          'gesperrte Datenschutzaussage'),
    (r'jederzeit\s+vollst[aä]ndig\s+l[oö]sch', 'gesperrte Datenschutzaussage'),
    (r'ohne\s+R[uü]ckfragen',               'gesperrte Datenschutzaussage'),
    (r'hochaufgel[oö]ste\s+DNA-Sequenzierung', 'gesperrte Methodenaussage'),
    (r'CpG-Gene',                           'gesperrter Begriff'),
    (r'\d+\s*CpG-(Stellen|Positionen)',     'eigene CpG-Zahl ist gesperrt'),
    (r'MethylationEPIC',                    'Plattformangabe gesperrt'),
    (r'GeneFiX',                            'Zulieferername'),
    (r'kehrt\s+(die\s+)?Alterung\s+um',     'roter Claim'),
    (r'macht\s+dich\s+biologisch\s+j[uü]nger', 'roter Claim'),
    (r'zur[uü]ckdrehen',                    'roter Claim (Alterung umkehren)'),
    (r'beweist\s+die\s+Wirkung',            'roter Claim'),
    (r'zeigt\s+echten\s+Fortschritt',       'gesperrtes Retest-Framing'),
    (r'Lebenserwartung\s+(voraus|vorher)sag', 'roter Claim'),
]

# Die Sie-Form-Regeln muessen GROSS-/kleinschreibungssensitiv laufen: "ihre Identitaet"
# und "was sie taten" sind korrektes Deutsch, nur das grosse Ihr/Sie ist die Anrede.
# Drittes Feld: True = case-sensitiv pruefen.
STIL = [
    (r'[—–]',                                          'Em-Dash oder En-Dash', False),
    (r'!',                                             'Ausrufezeichen', False),
    # Satzanfang ausklammern: "Sie sind gut untersucht" nach einem Punkt meint im
    # Zweifel "diese Verfahren", nicht die Anrede. Mitten im Satz bleibt es ein Treffer.
    (r'(?<![.!?:] )\bIhre[nmrs]?\b',                    'Sie-Form', True),
    (r'(?<![.!?:] )\bIhnen\b',                          'Sie-Form', True),
    (r'(?<![.!?:] )\bSie\s+(k[oö]nnen|haben|sind|werden|sollten|m[uü]ssen|erhalten|bekommen|finden)\b', 'Sie-Form', True),
    (r'\brevolution[aä]r\b|\bgame-?chang|\bganzheitlich\b|\bradikal\b', 'pauschaler Verstaerker', False),
]

def text_of(html):
    t = re.sub(r'<[^>]+>', ' ', html)
    return re.sub(r'\s+', ' ', t)

def pruefe(pfad):
    roh = open(pfad, encoding='utf-8').read()
    txt = text_of(roh)
    treffer = 0
    print(f"== {pfad} ==")
    for gruppe, regeln in (('SPERRE', SPERRE), ('STIL', STIL)):
        for regel in regeln:
            pat, warum = regel[0], regel[1]
            streng = regel[2] if len(regel) > 2 else False
            for m in re.finditer(pat, txt, flags=0 if streng else re.I):
                a = max(0, m.start() - 60)
                print(f"  [{gruppe}] {warum}: ...{txt[a:m.end()+60]}...")
                treffer += 1
    woerter = len(txt.split())
    h2 = len(re.findall(r'<h2', roh))
    intern = sorted(set(re.findall(r'href="(/[^"]*)"', roh)))
    extern = re.findall(r'href="(https?://[^"]*)"', roh)
    print(f"  Woerter: {woerter} | H2: {h2} | interne Links: {len(intern)} | externe: {len(extern)}")
    print(f"  interne Ziele: {intern}")
    print("  OK, keine Treffer" if not treffer else f"  {treffer} TREFFER")
    return treffer

if __name__ == '__main__':
    gesamt = sum(pruefe(p) for p in sys.argv[1:])
    sys.exit(1 if gesamt else 0)
