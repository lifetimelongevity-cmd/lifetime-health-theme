#!/usr/bin/python3
"""Erzeugt die Shopify-Dateien der Pilotpraxis-Verkaufsseite aus docs/pilotpraxis/.

Quelle (nur hier ändern)            Erzeugt (nie von Hand ändern)
docs/pilotpraxis/orthopaedie.html → templates/page.pilotpraxis-orthopaedie.liquid
docs/pilotpraxis/kardiologie.html → templates/page.pilotpraxis-kardiologie.liquid
docs/pilotpraxis/pilotpraxis.css  → assets/pilotpraxis.css
docs/pilotpraxis/pilotpraxis.js   → assets/pilotpraxis.js
docs/pilotpraxis/img/pilotpraxis-* → assets/pilotpraxis-*

Aufruf aus dem Theme-Ordner oder von überall:
    /usr/bin/python3 docs/pilotpraxis/bauen.py            # erzeugen
    /usr/bin/python3 docs/pilotpraxis/bauen.py --pruefen  # nur prüfen, nichts schreiben

Das Skript bricht ab, wenn eine erzeugte Datei seit dem letzten Lauf von Hand
geändert wurde (Prüfsumme im Kopf), wenn die Quelle Liquid enthält, wenn ein
Bild fehlt oder wenn ein gesperrtes Wort im Seitentext steht.
"""
import hashlib
import os
import re
import shutil
import sys

QUELLE = os.path.dirname(os.path.abspath(__file__))
THEME = os.path.abspath(os.path.join(QUELLE, '..', '..'))
FAECHER = ['orthopaedie', 'kardiologie']
ANFANG = '<!-- PP-RUMPF-ANFANG'
ENDE = '<!-- PP-RUMPF-ENDE -->'

# Leitplanken aus dem Gesamtplan: diese Wörter kommen im Seitentext nicht vor
GESPERRT = [r'\bBefund', r'Selbstkostenpreis', r'Black\s*Week', r'\bDeal\b', r'\bAktion\b',
            r'Rabatt', r'\bSale\b', r'\bNMN\b', r'Lp\(a\)', r'Omega-3', r'\bSalz']
# Sachlich falsch vor Orthopäden: Das MRT zeigt die Rückenmuskulatur. Richtig: „misst kaum jemand“
GESPERRT += [r'Muskel[^.]{0,80}zeig(t|en)[^.]{0,30}nicht', r'zeig(t|en) (es|ihn|sie) (den Muskel )?nicht\b']
# Was der Test liefert (BJ 18.11.2026): Genetik = Anlagen, Epigenetik = Werte aus der DNA-Methylierung.
# Keine akuten Werte, kein Nährstoffstatus, kein Mangel, kein Blutwert.
GESPERRT += [r'Mangel', r'Nährstoff', r'Vitamin', r'Blutwert']
# Sätze, in denen diese Wörter stehen dürfen (Block „Was die Auswertung nicht kann“)
ERLAUBTE_SAETZE = ['Nährstoffstatus, Mangel und Blutwerte misst weiter Ihr Labor.']
# Erlaubte Ausnahmen: Textstücke im Umfeld eines Treffers, die ihn zulassen
AUSNAHMEN = []

PRUEF_RE = re.compile(r'Pruefsumme: ([0-9a-f]{64})')


def sha(text):
    return hashlib.sha256(text.encode('utf-8')).hexdigest()


def fehler(msg):
    print('ABBRUCH: ' + msg, file=sys.stderr)
    sys.exit(1)


def kopf_liquid(quelle_rel, inhalt):
    return ('{%- comment -%}\n'
            '  ERZEUGT von docs/pilotpraxis/bauen.py aus ' + quelle_rel + '. Nicht von Hand ändern:\n'
            '  Text in der Quelle ändern, dann /usr/bin/python3 docs/pilotpraxis/bauen.py\n'
            '  Pruefsumme: ' + sha(inhalt) + '\n'
            '{%- endcomment -%}\n')


def kopf_block(quelle_rel, inhalt):
    return ('/* ERZEUGT von docs/pilotpraxis/bauen.py aus ' + quelle_rel + '. Nicht von Hand ändern.\n'
            '   Pruefsumme: ' + sha(inhalt) + ' */\n')


def handarbeit_pruefen(ziel, kopfzeilen_ende):
    """True, wenn die Zieldatei existiert und ihr Inhalt nicht mehr zur Prüfsumme passt."""
    if not os.path.exists(ziel):
        return False
    alt = open(ziel, encoding='utf-8').read()
    m = PRUEF_RE.search(alt[:600])
    if not m:
        return True
    pos = alt.find(kopfzeilen_ende)
    if pos < 0:
        return True
    rest = alt[pos + len(kopfzeilen_ende):]
    return sha(rest) != m.group(1)


def schreiben(ziel, inhalt, nur_pruefen):
    rel = os.path.relpath(ziel, THEME)
    alt = open(ziel, encoding='utf-8').read() if os.path.exists(ziel) else None
    if alt == inhalt:
        print('  unverändert  ' + rel)
        return
    if nur_pruefen:
        print('  würde ändern ' + rel)
        return
    with open(ziel, 'w', encoding='utf-8') as f:
        f.write(inhalt)
    print('  geschrieben  ' + rel)


def text_pruefen(name, rumpf):
    sichtbar = re.sub(r'<!--.*?-->', ' ', rumpf, flags=re.S)
    sichtbar = re.sub(r'<script.*?</script>', ' ', sichtbar, flags=re.S)
    sichtbar = re.sub(r'<[^>]+>', ' ', sichtbar)
    for satz in ERLAUBTE_SAETZE:
        sichtbar = sichtbar.replace(satz, ' ')
    # „Muskelwert“ nur mit „epigenetisch“ im selben Satz
    for satz in re.split(r'(?<=[.!?])\s+', re.sub(r'\s+', ' ', sichtbar)):
        if 'Muskelwert' in satz and 'epigenetisch' not in satz:
            fehler('%s: „Muskelwert“ ohne „epigenetisch“ im selben Satz: %s' % (name, satz.strip()[:160]))
    for muster in GESPERRT:
        for m in re.finditer(muster, sichtbar):
            umfeld = sichtbar[max(0, m.start() - 50):m.end() + 50].replace('\n', ' ')
            if any(a in umfeld for a in AUSNAHMEN):
                continue
            fehler('%s: gesperrtes Wort „%s“ im Seitentext: …%s…' % (name, m.group(0), umfeld.strip()))
    if '{{' in rumpf or '{%' in rumpf:
        fehler(name + ': Die Quelle enthält Liquid ({{ oder {%). Die Seite ist reines HTML.')
    if '—' in sichtbar:
        print('  Hinweis: ' + name + ' enthält einen Gedankenstrich (—).')


def main():
    nur_pruefen = '--pruefen' in sys.argv
    erzwingen = '--erzwingen' in sys.argv
    print('Pilotpraxis bauen (%s)' % ('nur prüfen' if nur_pruefen else 'schreiben'))
    # Headlines und andere sichtbare Texte im Skript (Zeichenketten in einfachen Anführungszeichen)
    js = open(os.path.join(QUELLE, 'pilotpraxis.js'), encoding='utf-8').read()
    js_texte = ' | '.join(re.findall(r"'((?:[^'\\\n]|\\.)*)'", js))
    text_pruefen('pilotpraxis.js', js_texte)
    bilder_quelle = os.path.join(QUELLE, 'img')
    bilder = sorted(f for f in os.listdir(bilder_quelle) if f.startswith('pilotpraxis-'))

    # 1. Templates
    for fach in FAECHER:
        quelle = os.path.join(QUELLE, fach + '.html')
        if not os.path.exists(quelle):
            print('  (fehlt noch) docs/pilotpraxis/%s.html' % fach)
            continue
        html = open(quelle, encoding='utf-8').read()
        a = html.find(ANFANG)
        e = html.find(ENDE)
        if a < 0 or e < 0 or e < a:
            fehler(fach + '.html: Marken PP-RUMPF-ANFANG / PP-RUMPF-ENDE fehlen.')
        a = html.find('-->', a) + 3
        rumpf = html[a:e].strip('\n') + '\n'
        text_pruefen(fach + '.html', rumpf)

        def bild(m):
            attr, datei = m.group(1), m.group(2)
            if datei not in bilder:
                fehler('%s.html: Bild img/%s fehlt in docs/pilotpraxis/img/' % (fach, datei))
            return '%s="{{ \'%s\' | asset_url }}"' % (attr, datei)
        rumpf_liquid = re.sub(r'\b(src|poster|href)="img/([^"]+)"', bild, rumpf)
        if re.search(r'="img/', rumpf_liquid):
            fehler(fach + '.html: Bildpfad außerhalb von src/poster/href gefunden.')

        ziel = os.path.join(THEME, 'templates', 'page.pilotpraxis-%s.liquid' % fach)
        if handarbeit_pruefen(ziel, '{%- endcomment -%}\n') and not erzwingen:
            fehler('templates/%s wurde von Hand geändert. Änderung in die Quelle übernehmen, dann mit --erzwingen bauen.' % os.path.basename(ziel))
        # Erst die Layout-Anweisung, dann der Erzeugt-Vermerk, dann reines HTML
        kopf = kopf_liquid('docs/pilotpraxis/%s.html' % fach, rumpf_liquid)
        schreiben(ziel, "{% layout 'pilotpraxis' %}\n" + kopf + rumpf_liquid, nur_pruefen)

    # 2. CSS und JS
    for datei in ['pilotpraxis.css', 'pilotpraxis.js']:
        inhalt = open(os.path.join(QUELLE, datei), encoding='utf-8').read()
        if '{{' in inhalt and datei.endswith('.css'):
            fehler(datei + ': enthält {{')
        ziel = os.path.join(THEME, 'assets', datei)
        kopf = kopf_block('docs/pilotpraxis/' + datei, inhalt)
        if handarbeit_pruefen(ziel, ' */\n') and not erzwingen:
            fehler('assets/%s wurde von Hand geändert. Änderung in die Quelle übernehmen, dann mit --erzwingen bauen.' % datei)
        schreiben(ziel, kopf + inhalt, nur_pruefen)

    # 3. Bilder
    for datei in bilder:
        q = os.path.join(bilder_quelle, datei)
        z = os.path.join(THEME, 'assets', datei)
        if os.path.exists(z) and open(q, 'rb').read() == open(z, 'rb').read():
            print('  unverändert  assets/' + datei)
            continue
        if nur_pruefen:
            print('  würde kopieren assets/' + datei)
            continue
        shutil.copyfile(q, z)
        print('  kopiert      assets/' + datei)
    verwaist = [f for f in os.listdir(os.path.join(THEME, 'assets'))
                if f.startswith('pilotpraxis-') and f not in bilder]
    for f in verwaist:
        print('  Hinweis: assets/%s hat keine Quelle mehr in docs/pilotpraxis/img/' % f)
    print('Fertig.')


if __name__ == '__main__':
    main()
