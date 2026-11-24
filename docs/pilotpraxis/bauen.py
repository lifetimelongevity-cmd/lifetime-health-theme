#!/usr/bin/python3
"""Erzeugt die Shopify-Dateien der Pilotpraxis-Verkaufsseite aus docs/pilotpraxis/.

Quelle (nur hier ändern)            Erzeugt (nie von Hand ändern)
docs/pilotpraxis/orthopaedie.html    → templates/page.pilotpraxis-orthopaedie.liquid
docs/pilotpraxis/kardiologie-v2.html → templates/page.pilotpraxis-kardiologie.liquid
docs/pilotpraxis/pilotpraxis.css     → assets/pilotpraxis.css      (Fassung 1, nur noch Orthopädie)
docs/pilotpraxis/pilotpraxis.js      → assets/pilotpraxis.js
docs/pilotpraxis/pilotpraxis-v2.css  → assets/pilotpraxis-v2.css   (Fassung 2, Kardiologie)
docs/pilotpraxis/pilotpraxis-v2.js   → assets/pilotpraxis-v2.js
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
# Fassung je Fach: Kardiologie läuft seit 24.11.2026 auf Fassung 2 (VSL-Aufbau) mit eigener Quelle, eigenem CSS und JS.
# Orthopädie bleibt auf Fassung 1, bis sie nachgezogen oder gestrichen wird. layout/pilotpraxis.liquid wählt die Dateien genauso.
FASSUNG = {'orthopaedie': '', 'kardiologie': '-v2'}
ANFANG = '<!-- PP-RUMPF-ANFANG'
ENDE = '<!-- PP-RUMPF-ENDE -->'

# Leitplanken aus dem Gesamtplan: diese Wörter kommen im Seitentext nicht vor
# „Selbstkostenpreis“ ist seit 24.11.2026 wieder erlaubt (BJ: „auf jeden Fall noch dazu schreiben“), davor laut Gesamtplan gesperrt
GESPERRT = [r'\bBefund', r'Black\s*Week', r'\bDeal\b', r'\bAktion\b',
            r'Rabatt', r'\bSale\b', r'\bNMN\b', r'Lp\(a\)', r'Omega-3', r'\bSalz']
# Sachlich falsch vor Orthopäden: Das MRT zeigt die Rückenmuskulatur. Richtig: „misst kaum jemand“
GESPERRT += [r'Muskel[^.]{0,80}zeig(t|en)[^.]{0,30}nicht', r'zeig(t|en) (es|ihn|sie) (den Muskel )?nicht\b']
# Nachmessung immer „nach 6 bis 12 Monaten“ (BJ 19.11.2026). Das Kundenzitat „In 6 Monaten mache ich den Retest“ bleibt erlaubt
GESPERRT += [r'(Nachmessung|nachmessen|Nachmessen)[^.<]{0,40}(sechs|6) Monat', r'nach (etwa |rund )?(sechs|6) Monaten']
# Kein konstruierter Anlass (BJ 18.11.2026): nichts, was voraussetzt, dass Patienten nach dem Test fragen
GESPERRT += [r'Patient(en|in)? (fragen|fragt) nach', r'danach fragt', r'bevor der erste Patient', r'(mitbringen|mitbringt) würde',
             r'Gentests aus dem Internet', r'zum ersten Mal']
# Was der Test liefert (BJ 18.11.2026, präzisiert): Genetik = Anlagen als Wahrscheinlichkeit,
# Epigenetik = Werte aus der DNA-Methylierung. Gesperrt ist nur die Behauptung eines akuten Status.
GESPERRT += [r'zeigt (Ihnen )?Ihren (Mangel|Nährstoffstatus|Vitaminstatus)', r'Mangel (wird |werden )?(festgestellt|nachgewiesen|erkannt|diagnostiziert)',
             r'ersetzt (das|Ihr|Ihre) Labor', r'(misst|messen|bestimmt|bestimmen) (Ihren|Ihre|den|die) (Nährstoff|Vitamin|Blutwert)']
ERLAUBTE_SAETZE = []
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
    fassungen = sorted(set(FASSUNG[f] for f in FAECHER))
    for fassung in fassungen:
        js = open(os.path.join(QUELLE, 'pilotpraxis%s.js' % fassung), encoding='utf-8').read()
        js_texte = ' | '.join(re.findall(r"'((?:[^'\\\n]|\\.)*)'", js))
        text_pruefen('pilotpraxis%s.js' % fassung, js_texte)
    bilder_quelle = os.path.join(QUELLE, 'img')
    bilder = sorted(f for f in os.listdir(bilder_quelle) if f.startswith('pilotpraxis-'))

    # 1. Templates
    for fach in FAECHER:
        quelle_name = fach + FASSUNG[fach] + '.html'
        quelle = os.path.join(QUELLE, quelle_name)
        if not os.path.exists(quelle):
            print('  (fehlt noch) docs/pilotpraxis/' + quelle_name)
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
        kopf = kopf_liquid('docs/pilotpraxis/' + quelle_name, rumpf_liquid)
        schreiben(ziel, "{% layout 'pilotpraxis' %}\n" + kopf + rumpf_liquid, nur_pruefen)

    # 2. CSS und JS
    for datei in ['pilotpraxis%s.%s' % (fa, endung) for fa in fassungen for endung in ('css', 'js')]:
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
                if f.startswith('pilotpraxis-') and f not in bilder and not f.endswith(('.css', '.js'))]
    for f in verwaist:
        print('  Hinweis: assets/%s hat keine Quelle mehr in docs/pilotpraxis/img/' % f)
    print('Fertig.')


if __name__ == '__main__':
    main()
