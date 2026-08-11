#!/usr/bin/env python3
"""Setzt einen crs-faq-accordion-Block in ein bestehendes Artikel-Template.

Der Altbestand hat bereits main/grundlagen/related. Statt die Templates neu zu
schreiben, wird die FAQ-Section hinter "main" eingehaengt und in "order"
einsortiert. Alles andere bleibt unveraendert.

Aufruf:
    python3 docs/age-dna-geo/tools/faq-einsetzen.py <template.json> <fragen.json> "<Ueberschrift>" [cta_after_section]

fragen.json: [{"key": "q-xyz", "question": "...", "answer": "..."}, ...]
"""
import json, re, sys, collections

def load(pfad):
    s = open(pfad, encoding='utf-8').read()
    return json.loads(re.sub(r'/\*.*?\*/', '', s, flags=re.S))

def main():
    tpl_pfad, fragen_pfad, ueberschrift = sys.argv[1], sys.argv[2], sys.argv[3]
    cta = sys.argv[4] if len(sys.argv) > 4 else None

    tpl = load(tpl_pfad)
    fragen = json.load(open(fragen_pfad, encoding='utf-8'))
    if not 4 <= len(fragen) <= 8:
        print(f"WARNUNG: {len(fragen)} Fragen, erwartet werden 5 bis 6")

    tpl['sections']['faq'] = {
        "type": "crs-faq-accordion",
        "blocks": {f["key"]: {"type": "item",
                              "settings": {"question": f["question"], "answer": f["answer"]}}
                   for f in fragen},
        "block_order": [f["key"] for f in fragen],
        "settings": {
            "color_bg": "#f2f1ed", "color_text": "#26251e",
            "padding_top": 80, "padding_bottom": 80,
            "content_align": "left", "heading_size": "section",
            "kicker": "__none__", "heading": ueberschrift, "subheading": "__none__",
        },
    }

    order = [s for s in tpl['order'] if s != 'faq']
    order.insert(order.index('main') + 1 if 'main' in order else 0, 'faq')
    tpl['order'] = order

    if cta and 'main' in tpl['sections']:
        tpl['sections']['main'].setdefault('settings', {})['cta_after_section'] = int(cta)

    # sections in der Reihenfolge von order ablegen, damit die Datei lesbar bleibt
    tpl['sections'] = collections.OrderedDict(
        (k, tpl['sections'][k]) for k in order if k in tpl['sections'])

    with open(tpl_pfad, 'w', encoding='utf-8') as f:
        json.dump(tpl, f, ensure_ascii=False, indent=2)
        f.write('\n')
    print(f"{tpl_pfad}: FAQ mit {len(fragen)} Fragen eingesetzt, order = {order}")

if __name__ == '__main__':
    main()
