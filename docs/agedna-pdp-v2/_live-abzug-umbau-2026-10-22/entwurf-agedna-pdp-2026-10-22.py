#!/usr/bin/env python3
"""
Baut den Entwurf der AGE&DNA-PDP nach /denkschule (22.10.2026) aus dem Live-Abzug.

Aufruf aus lifetime-health-theme/:
  python3 docs/entwurf-agedna-pdp-2026-10-22.py          # nutzt den Abzug *-quelle.html
  python3 docs/entwurf-agedna-pdp-2026-10-22.py --neu    # zieht die Live-PDP neu

Ergebnis: docs/agedna-pdp-v2/_live-abzug-umbau-2026-10-22/entwurf-live-abzug-umbau.html (Zwischenstand vom 22.10. nachmittags, von BJ als zu nah an live verworfen)
Ansehen:  http://localhost:8789/entwurf-agedna-pdp-2026-10-22.html (?quiz=1 zeigt die Quiz-Zeile)

Grundsatz: Jede Section ist die echte Theme-Section der Live-Seite (gleiche Bausteine wie auf
der NMN-PDP: crs-faq-accordion, crs-customer-reviews, crs-logo-garden, crs-risk-free-close,
lt-pdp-process, lt-pdp-app-switch, lt-pdp-compare). Geändert werden nur Reihenfolge, Copy
und ein paar Settings-Wirkungen, jeweils an benannten Stellen. Jede Ersetzung prüft, ob ihr
Fundstück genau einmal vorkommt; ändert sich die Live-Seite, bricht das Skript mit Meldung ab.
Tracking-, Chat-, Klaviyo-, Loox- und Shopify-Analytics-Scripts fliegen raus, Theme-JS bleibt
(Akkordeon, Umschalter, Galerie, Sticky-Leiste funktionieren).
"""
import pathlib
import re
import ssl
import sys
import urllib.request

ORDNER = pathlib.Path(__file__).resolve().parent
QUELLE = ORDNER / 'entwurf-agedna-pdp-2026-10-22-quelle.html'
ZIEL = ORDNER / 'entwurf-live-abzug-umbau.html'
PDP_URL = 'https://www.lifetime-health.de/products/lifetime-age-dna'

ERGEBNISBILD = '../bilder/hero-sport-alter-quadrat.webp'
KACHEL = 'product-8585364.png?v=1768563330'
KIT = 'Product-gallery_tst.png?v=1777229670'

FRAGEN = [
    ('Stimmt die Zahl?',
     'Dein biologisches Alter ist ein Schätzwert aus deiner Speichelprobe, ausgewertet bei Eurofins nach ISO 17025. Richtig aussagekräftig wird er, wenn du nach sechs Monaten nachmisst.'),
    ('Und dann?',
     'Der AI Health Coach erklärt dir jede Zahl in der App. Dazu bekommst du 15 Minuten Gespräch per Video, wenn du willst. Eine Management Summary gibt es auf Wunsch gratis.'),
    ('Wer sieht meine DNA?',
     'Deine Probe läuft unter einer ID, das Labor kennt deinen Namen nicht. Die Daten liegen auf EU-Servern, Löschung auf Anfrage.'),
    ('Kann ich das Kit zurückgeben?',
     '30 Tage ab Erhalt, solange es versiegelt ist. Ist deine Probe im Labor nicht auswertbar, bekommst du ein neues Kit gratis.'),
    ('Ist das eine medizinische Diagnose?',
     'Nein. Der Test zeigt Anlagen und deinen epigenetischen Stand. Er stellt keine Diagnose und ersetzt keine ärztliche Beratung.'),
    ('Wie nehme ich die Probe?',
     'Kit per QR-Code in der App registrieren, Röhrchen füllen, in den vorfrankierten Umschlag, einwerfen. Unter fünf Minuten.'),
]

# Inline-Scripts, die bleiben (Theme-Logik ohne Netz). Alles andere Inline fliegt raus.
SCRIPT_BEHALTEN = (
    'KrownAssetLoader', 'KROWN = {', 'const debounce', 'window.ltPricing', '__ltReportStrip',
    '__crsMicroDialog', "getElementById('lt-pdp-hero-template", 'lt-app-switch',
    "getElementById('lt-pdp-final-cta", "getElementById('section-template--",
    ".rte a img", "querySelector('.lt-pdp-hero__trust')", 'Shopify.shop = "lifetime-health-de',
    "'ontouchstart' in window", 'new MutationObserver',
)
SRC_VERBOTEN = ('klaviyo', 'instantpage')


def hole(neu):
    if neu or not QUELLE.exists():
        anfrage = urllib.request.Request(PDP_URL, headers={'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1'})
        kontext = ssl.create_default_context(cafile='/etc/ssl/cert.pem') if pathlib.Path('/etc/ssl/cert.pem').exists() else None
        with urllib.request.urlopen(anfrage, timeout=60, context=kontext) as antwort:
            QUELLE.write_text(antwort.read().decode('utf-8'), encoding='utf-8')
    return QUELLE.read_text(encoding='utf-8')


def einmal(text, alt, neu, wo, anzahl=1):
    gefunden = text.count(alt)
    if gefunden != anzahl:
        raise SystemExit(f'[{wo}] erwartet {anzahl}x, gefunden {gefunden}x: {alt[:100]!r}')
    return text.replace(alt, neu)


def scripts_filtern(html):
    def entscheide(m):
        attrs, body = m.group(1), m.group(2)
        src = re.search(r'src="([^"]+)"', attrs)
        if src:
            s = src.group(1)
            if '/cdn/shop/t/' in s and not any(v in s for v in SRC_VERBOTEN):
                return m.group(0)
            return ''
        if any(k in body for k in SCRIPT_BEHALTEN):
            return m.group(0)
        return ''
    return re.sub(r'<script\b([^>]*)>(.*?)</script>', entscheide, html, flags=re.S)


def sections(main_html):
    teile = re.split(r'(?=<(?:div|section) id="shopify-section-template--)', main_html)
    secs = {}
    for p in teile[1:]:
        key = re.match(r'<(?:div|section) id="shopify-section-template--[^"]*__([a-z_]+)"', p).group(1)
        secs[key] = p
    return teile[0], secs


def baue_hero(h):
    # Bild 1: Ergebnis statt Marketing-Kachel (Galerie, Vorschaubild, Sticky-Leiste)
    h = re.sub(r'https?://www\.lifetime-health\.de/cdn/shop/files/product-8585364\.png\?[^" ,]*', ERGEBNISBILD, h)
    h = h.replace('alt="Produktgrafik zum AGE &amp; DNA-Test: eine Hand hält ein Smartphone mit der LIFETIME App, daneben App-Store- und Google-Play-Badges und das Eurofins-Logo"',
                  'alt="Läuferin, daneben zwei App-Karten: Alter 49 Jahre, biologisches Alter 42 Jahre"')
    # Beweiszeile unter dem Überschrift-Paar (Kano: echtes Ergebnis, Krug: ein Blick)
    h = einmal(h, '<p class="crs-heading-stack__subtitle">Deine DNA verrät es.</p></div></div>',
               '<p class="crs-heading-stack__subtitle">Deine DNA verrät es.</p></div></div>'
               '<p class="lt-pdp-hero__proof"><q>Ich bin 46, mein biologisches Alter: 38.</q> Markus T., Käufer</p>', 'Beweiszeile')
    # Bullets in Alltagssprache, drittes Bullet nennt das Gespräch (B1, BJ 09.10.)
    h = einmal(h, '<span>Biologisches Alter und wie schnell du alterst.</span>', '<span>Dein biologisches Alter als Zahl. Und wie schnell du alterst.</span>', 'Bullet 1')
    h = einmal(h, '<span>23 Genetik-Kategorien, z. B. ob Kreatin passt.</span>', '<span>Deine Gene in 23 Kategorien, von Schlaf bis Haut.</span>', 'Bullet 2')
    h = einmal(h, '<span>AI Health Coach erklärt deine Ergebnisse.</span>', '<span>15 Minuten Gespräch zum Ergebnis, inklusive.</span>', 'Bullet 3')
    # Quiz-Zeile (nur mit ?quiz=1), Preiszeile sichtbar statt versteckt, Preis-Anker darunter
    h = einmal(h, '<div class="visually-hidden" data-update-block="price-compact-main">',
               '<div class="lt-quiz-zeile" hidden>Aus dem Quiz: <b>dein geschätztes Alter ist nur eine Schätzung.</b> Jetzt messen, mit deinem Quiz-Code 10 % bis Sonntag.</div>'
               '<div data-update-block="price-compact-main">', 'Preiszeile')
    h = einmal(h, '<div class="lt-purchase-block">',
               '<p class="lt-pdp-hero__anchor">Der Alterswert allein kostet in Praxen rund 300 €. Hier kommen deine Gene dazu.</p><div class="lt-purchase-block">', 'Preis-Anker')
    # Knopf: Ergebnis statt Vorgang, ein Name für die Handlung
    h = einmal(h, 'aria-label="In den Warenkorb, 349 €"', 'aria-label="Test bestellen, 349 €"', 'Knopf aria')
    h = einmal(h, '''<span class="button__text" data-js-product-add-to-cart-text aria-live="polite">
                    In den Warenkorb, 349 €
                  </span>''', '''<span class="button__text" data-js-product-add-to-cart-text aria-live="polite">
                    Test bestellen, 349 €
                  </span>''', 'Knopf Text')
    # Garantie mit Namen am Knopf (A2)
    h = einmal(h, '''>
                    30 Tage Rückgaberecht, solange das Kit versiegelt ist
                  </button>''', '''>
                    Neues-Kit-Garantie: neues Kit gratis, 30 Tage Rückgabe solange versiegelt
                  </button>''', 'Garantie')
    # Trust-Zeilen gegen die Kaufstopper (A5, A6)
    h = einmal(h, '<span>Ergebnisse in 6 Wochen</span>', '<span>Heute schon: Face Scan in der App. Laborergebnis in 6 Wochen</span>', 'Trust 2')
    h = einmal(h, '<span>DSGVO-konform, Löschung auf Anfrage</span>', '<span>Deine Probe läuft unter einer ID, nicht unter deinem Namen</span>', 'Trust 4')
    # Limmroth: belegte Angaben statt Chips ohne Beleg (A7, Faktenblatt 09.10.)
    # Ein Name für die Handlung, auch im Hero-Script (pkgCtaBase), in der Sticky-Leiste und in den Theme-Texten
    if h.count('In den Warenkorb') < 2:
        raise SystemExit('[Knopf global] weniger als 2 Fundstellen')
    h = h.replace('In den Warenkorb', 'Test bestellen')
    # Express-Kasse rendert nur mit Shopify-Scripts, ohne sie bleibt ein leeres Skelett
    h = re.sub(r'<shopify-accelerated-checkout\b.*?</shopify-accelerated-checkout>', '', h, count=1, flags=re.S)
    h = einmal(h, '<span class="lt-founder-cred">Spiegel Bestseller</span><span class="lt-founder-cred">20+ Jahre Forschung</span>',
               '<span class="lt-founder-cred">Co-Autor eines SPIEGEL-Bestsellers</span><span class="lt-founder-cred">Über 160 Fachartikel in PubMed</span>', 'Limmroth')
    return h


def baue_prozess(s):
    s = einmal(s, '<h2 class="crs-heading-stack__title">Eine Speichelprobe reicht.</h2></div>',
               '<h2 class="crs-heading-stack__title">Eine Speichelprobe reicht.</h2><p class="crs-heading-stack__subtitle">Fünf Minuten, ohne Arzttermin.</p></div>', 'Ablauf Paar')
    s = einmal(s, '</ol>', '</ol><p class="lt-proc__promise">Du bekommst eine Nachricht, wenn deine Probe im Labor ist und wenn dein Ergebnis da ist.</p>', 'Prozesszusage')
    return s


def baue_vergleich(s):
    return einmal(s, '<span class="lt-cmp__text">AI Health Coach</span>', '<span class="lt-cmp__text">Gespräch und AI Health Coach</span>', 'Vergleich Zeile 3')


def baue_stimmen(s):
    s = re.sub(r'<div class="cr-pills".*?</div>', '', s, count=1, flags=re.S)
    return einmal(s, '<h2 class="crs-heading-stack__title">Was Kunden sagen.</h2>', '<h2 class="crs-heading-stack__title">Was Käufer berichten.</h2>', 'Stimmen Titel')


def baue_fragen(s):
    start = s.find('<div class="faq-right">') + len('<div class="faq-right">')
    ende = s.rfind('</div></div>\n\n    </div>') + len('</div>')
    if start < 30 or ende < start:
        raise SystemExit('[FAQ] Rahmen nicht gefunden')
    items = s[start:ende]
    erster_ende = items.find('<div class="faq-item"', 10)
    vorlage = items[:erster_ende]
    frage_alt = re.search(r'<span class="faq-question-text">(.*?)</span>', vorlage).group(1)
    antwort_alt = re.search(r'<div class="faq-answer">\s*(<p>.*?</p>)\s*</div>', vorlage, flags=re.S).group(1)
    neu = []
    for n, (frage, antwort) in enumerate(FRAGEN, start=1):
        t = vorlage.replace('__faq_accordion-1"', f'__faq_accordion-{n}"')
        t = t.replace(frage_alt, frage).replace(antwort_alt, f'<p>{antwort}</p>')
        neu.append(t)
    return s[:start] + ''.join(neu) + s[ende:]


def baue_schluss(s):
    s = re.sub(r'product-8585364\.png\?v=1768563330', KIT, s)
    s = einmal(s, '<h2 class="crs-heading-stack__title">Dein biologisches Alter, von zu Hause.</h2><p class="crs-heading-stack__subtitle">Einmal zahlen, alles behalten.</p>',
               '<h2 class="crs-heading-stack__title">Miss, bevor du etwas änderst.</h2><p class="crs-heading-stack__subtitle">Sonst weißt du nie, ob es gewirkt hat.</p>', 'Schluss Paar')
    s = einmal(s, '<p class="rfc-price" data-rfc-price>349,00 € · einmalig</p>', '<p class="rfc-price" data-rfc-price>349,00 € statt 449,00 € · einmalig</p>', 'Schluss Preis')
    s = einmal(s, '''<button type="button" class="rfc-cta" data-rfc-scroll>
                  Jetzt Test starten →
                </button>''', '''<button type="button" class="rfc-cta" data-rfc-scroll>
                  Test bestellen, 349 €
                </button>''', 'Schluss Knopf')
    return s


STIL = '''
<style>
  /* Entwurf 22.10.2026: neue Zeilen im Kaufbereich, Paketwahl aus, Quiz-Zeile per ?quiz=1 */
  .lt-pdp-hero__proof { margin: 12px 0 0; font-size: 15px; line-height: 1.45; color: rgba(38, 37, 30, .72); }
  .lt-pdp-hero__proof q { quotes: "\\201E" "\\201C"; color: #26251e; }
  .lt-pdp-hero__anchor { margin: 4px 0 0; font-size: 14px; line-height: 1.45; color: rgba(38, 37, 30, .72); }
  .lt-pdp-hero [data-update-block="price-compact-main"] { margin-top: 20px; }
  .lt-pkg { display: none !important; }
  .lt-quiz-zeile { margin: 20px 0 0; padding: 12px 16px; background: #fff; border: 1px solid rgba(38, 37, 30, .08); border-radius: 12px; font-size: 14px; line-height: 1.45; }
  .lt-quiz-zeile b { font-weight: 700; }
  .lt-proc__promise { margin: 32px 0 0; font-size: 16px; line-height: 1.45; color: rgba(38, 37, 30, .72); }
  .lt-entwurf-hinweis { padding: 16px 20px; font-size: 12px; color: rgba(38, 37, 30, .5); text-align: center; }
  .lt-entwurf-hinweis a { color: #26251e; }
  /* ?diff=1: Änderungen markieren */
  body.diff-an [data-entwurf] { outline: 2px dashed #b9432e; outline-offset: 6px; position: relative; }
  body.diff-an [data-entwurf]::before { content: attr(data-entwurf); position: absolute; left: 0; top: -22px; z-index: 5; padding: 2px 8px; background: #b9432e; color: #fff; font: 600 11px/1.4 Lato, sans-serif; letter-spacing: .02em; border-radius: 4px; white-space: nowrap; }
  body.diff-an .lt-entwurf-weg { display: block !important; margin: 0 auto; padding: 16px 20px; max-width: 640px; list-style: none; font-size: 14px; color: #26251e; }
  body.diff-an .lt-entwurf-weg li { padding: 4px 0; border-top: 1px solid rgba(38, 37, 30, .12); }
  body.diff-an .lt-entwurf-weg li:first-child { border: 0; font-weight: 700; }
  body.diff-an .lt-entwurf-weg li + li::before { content: "– "; color: #b9432e; }
</style>
<script>
  if (new URLSearchParams(location.search).get('diff') === '1') document.documentElement.addEventListener('DOMContentLoaded', function () {}), document.addEventListener('DOMContentLoaded', function () { document.body.classList.add('diff-an'); });
  if (new URLSearchParams(location.search).get('quiz') === '1') {
    document.addEventListener('DOMContentLoaded', function () {
      var z = document.querySelector('.lt-quiz-zeile'); if (z) z.hidden = false;
    });
  }
</script>
</head>'''


MARKEN = [
    ('<div class="lt-pdp-hero__gallery-wrap', 'Bild 1: Ergebnis statt Kachel'),
    ('<p class="lt-pdp-hero__proof"', 'neu: Beweiszeile'),
    ('<div class="lt-pdp-hero__bullets', 'Bullets neu, 3. nennt das Gespräch'),
    ('<div data-update-block="price-compact-main"', 'Preis offen, Paketwahl 349/449 weg'),
    ('<p class="lt-pdp-hero__anchor"', 'neu: Preis-Anker'),
    ('<button\n                  id="lt-hero-atc"', 'Knopf: Test bestellen'),
    ('<div class="lt-pdp-hero__guarantee"', 'Garantie mit Namen'),
    ('<div class="lt-pdp-hero__trust lt-trust"', 'Trust-Zeilen 2 und 4 neu'),
    ('<div class="lt-founder-credentials"', 'Limmroth: belegte Angaben'),
    ('<p class="lt-proc__promise"', 'neu: Prozesszusage'),
    ('<span class="lt-cmp__text">Gespräch und AI Health Coach</span>', 'Vergleich: Gespräch'),
    ('<div class="cr-head', 'Titel neu, Pills weg'),
    ('<div class="faq-right"', 'FAQ 12 auf 6, Kaufstopper zuerst'),
    ('<div class="rfc-copy', 'Schluss neu, Kit-Bild'),
]


def markiere(h):
    """?diff=1: jede geänderte Stelle bekommt data-entwurf mit Beschriftung."""
    for tag, text in MARKEN:
        if h.count(tag) != 1:
            raise SystemExit(f'[Marke] erwartet 1x, gefunden {h.count(tag)}x: {tag[:60]!r}')
        kopf = tag.split(' ')[0] if tag.startswith('<button') else tag.split(' ', 1)[0]
        rest = tag[len(kopf):]
        h = h.replace(tag, f'{kopf} data-entwurf="{text}"{rest}')
    return h


def main():
    html = hole('--neu' in sys.argv)
    html = html.replace('//www.lifetime-health.de/cdn/', 'https://www.lifetime-health.de/cdn/')
    html = html.replace('"//images.loox.io', '"https://images.loox.io')
    html = scripts_filtern(html)
    a, b = html.find('<main id="main"'), html.find('</main>')
    kopf, main_html, rest = html[:a], html[a:b], html[b:]
    vor, secs = sections(main_html)

    secs['main'] = baue_hero(secs['main'])
    secs['process_steps'] = baue_prozess(secs['process_steps'])
    secs['comparison_table'] = baue_vergleich(secs['comparison_table'])
    secs['customer_reviews_test'] = baue_stimmen(secs['customer_reviews_test'])
    secs['faq_accordion'] = baue_fragen(secs['faq_accordion'])
    secs['risk_free_close'] = baue_schluss(secs['risk_free_close'])

    # Reihenfolge: Band und Regal raus (Rams), Rest wie live
    reihenfolge = ['main', 'logo_garden', 'process_steps', 'app_switch', 'comparison_table',
                   'customer_reviews_test', 'loox_reviews', 'ideal_candidate', 'faq_accordion', 'risk_free_close']
    fehlt = [k for k in reihenfolge if k not in secs]
    if fehlt:
        raise SystemExit(f'Sections fehlen im Abzug: {fehlt}')
    neu_main = markiere(vor + ''.join(secs[k] for k in reihenfolge))
    neu_main += ('<ul class="lt-entwurf-weg" hidden><li>Nicht mehr auf der Seite:</li><li>Paketwahl „Test + Ergebnisgespräch 449 €“</li>'
                 '<li>CTA-Band „Finde heraus, wo du heute stehst“</li><li>Wirkstoff-Regal „Was zu dir passt“</li>'
                 '<li>fünf Themen-Pills über den Bewertungen</li><li>sechs der zwölf Fragen</li><li>Marketing-Kachel als Bild 1</li></ul>')
    neu_main += '<p class="lt-entwurf-hinweis">Entwurf 22.10.2026 nach /denkschule, gebaut aus dem Live-Abzug. Keine Live-Seite. <a href="?quiz=1">?quiz=1</a> zeigt die Zeile für Quiz-Absolventen, <a href="?diff=1">?diff=1</a> markiert jede Änderung gegenüber live.</p>'

    # Vorlade-Link der alten Kachel im Kopf ebenfalls auf das Ergebnisbild
    kopf = re.sub(r'https?://www\.lifetime-health\.de/cdn/shop/files/product-8585364\.png\?[^" ,]*', ERGEBNISBILD, kopf)
    kopf = einmal(kopf, '</head>', STIL, 'Stil im Kopf')
    kopf = kopf.replace('<title>', '<title>Entwurf 22.10. · ', 1)
    ZIEL.write_text(kopf + neu_main + rest, encoding='utf-8')
    print(f'geschrieben: {ZIEL.relative_to(ORDNER.parent)} ({ZIEL.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main()
