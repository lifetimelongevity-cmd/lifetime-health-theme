#!/usr/bin/env python3
"""Rekonstruiert die Arbeitsfassung eines Blogartikel-Bodys aus der Live-Seite.

Zweck: Wenn ein Body direkt in die Shopify-Mutation geschrieben wurde und lokal
keine Arbeitsfassung liegt, holt dieses Skript sie zurueck.

`sections/lt-article.liquid` rendert `article.content` nicht unveraendert. Es
injiziert beim Rendern zwei Dinge, die im gespeicherten Body nicht stehen:

  1. Anker-IDs in jede H2 (`<h2 id="abschnitt-N">`), Zeile 223
  2. den Inline-CTA `<aside class="lt-article__cta">` vor Abschnitt N+1, Zeile 220

Beide werden hier wieder entfernt. Verifiziert am 12.08.2026 gegen
`artikel-genauigkeit-alterstest-body.html`: nach dem Strippen ist der Extrakt
zeichengleich mit der lokalen Arbeitsfassung.

Bekannte Grenze: Ein manuelles H2 "Inhaltsverzeichnis" wird vom Template beim
Rendern uebersprungen (Zeile 218) und laesst sich aus der Live-Seite nicht
zurueckholen. Betrifft nur Altartikel mit handgebautem Inhaltsverzeichnis.

Aufruf: python3 docs/age-dna-geo/tools/body-aus-live.py <handle> <outfile>
"""
import re
import subprocess
import sys

BASE = "https://www.lifetime-health.de/blogs/longevity-blog/"
START = '<div class="lt-article__content rte">'


def inneres_html(html, start_tag):
    """Inhalt des mit start_tag beginnenden div, ueber div-Bilanz abgegrenzt."""
    i = html.find(start_tag)
    if i < 0:
        raise SystemExit(f"Wrapper nicht gefunden: {start_tag}")
    pos = i + len(start_tag)
    tiefe = 1
    for m in re.finditer(r"<(/?)div\b[^>]*>", html[pos:]):
        tiefe += -1 if m.group(1) else 1
        if tiefe == 0:
            return html[pos:pos + m.start()]
    raise SystemExit("Kein schliessendes </div> gefunden")


def injektionen_entfernen(body):
    body, n_cta = re.subn(
        r'\s*<aside class="lt-article__cta".*?</aside>\s*', "\n", body, flags=re.S
    )
    body, n_id = re.subn(r'<h2 id="abschnitt-\d+"', "<h2", body)
    return body, n_cta, n_id


def main():
    if len(sys.argv) != 3:
        raise SystemExit(__doc__.strip().splitlines()[-1])
    handle, out = sys.argv[1], sys.argv[2]
    html = subprocess.run(
        ["curl", "-sS", "--fail", BASE + handle],
        capture_output=True, text=True, check=True,
    ).stdout
    body, n_cta, n_id = injektionen_entfernen(inneres_html(html, START))
    with open(out, "w", encoding="utf-8") as f:
        f.write(body.strip() + "\n")
    print(f"{handle}: {len(body)} Zeichen, {n_id} Anker-IDs und {n_cta} CTA entfernt -> {out}")


if __name__ == "__main__":
    main()
