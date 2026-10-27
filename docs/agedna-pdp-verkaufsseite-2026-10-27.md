---
status: snapshot
last_review: 2026-10-27
canonical_for: agedna-pdp-verkaufsseite-umbau-2026-10
---

# AGE&DNA-PDP als Verkaufsseite (27.10.2026)

Umbau von `templates/product.age-dna-test.json` nach `lifetime-ads/briefings/gruene-wiese/02-funnel-landingpage-email.md` (§ 2 Copy, § 3 Reihenfolge, § 5 Ereignisse, § 7 Prüfliste) und `01-angebot.md` (§ 2 Buy-Box, § 3 Garantie, § 4 Bonus-Stack). Lokal committet, **nicht gepusht**. Vorschau: `docs/entwurf-agedna-verkaufsseite-2026-10-27.html` (http://localhost:8789/entwurf-agedna-verkaufsseite-2026-10-27.html).

## Geänderte Stellen

| Datei | Was |
|---|---|
| `templates/product.age-dna-test.json` | 14 Sections in der Reihenfolge aus 02 § 3, alle Texte als Settings und Blöcke. Tabelle in `docs/pdp-system.md` |
| `sections/lt-pdp-hero.liquid` | Ergebnisbild als erste Galerie-Folie (`hero_image`, `hero_image_alt`), Überschrift-Varianten A/B/C (`headline_variant`, `hero_headline_b/c`, `tagline_b/c`), Kundenstimme unter der Überschrift (`hero_quote`, `hero_quote_name`), Karten ohne Streichpreis (`pkg_hide_compare`), Kartennotiz nur an der gewählten Karte (`pkg_note_selected_only`), Stufe 3 vorbereitet (`pkg_tier3_enable`, `pkg_label_3`, `pkg_note_3`, `pkg_tier3_anchor_cents`, Chip aus der Differenz zu den Einzelpreisen), Garantie als eigene Zeile am Knopf (`compact_guarantee_first`), Ergebnistermin (`result_line_enable`, `result_line_prefix`, `result_line_days`), Ereignisse (`events_enable`). Alle neuen Schalter stehen per Default aus, andere PDPs bleiben unverändert |
| `snippets/lt-pdp-ereignisse.liquid` | neu: `lt_seen`, `lt_choice`, `lt_intent`, `lt_read` als dataLayer-Pushes |
| `sections/lt-pdp-zusage.liquid` | neu: Textblock mit optionaler Karte (weiß oder Mint mit Vollrahmen) und Kaufknopf. Trägt Warum jetzt, Bonus-Stack und Garantie |
| `sections/lt-pdp-belege.liquid` | Beweiszeile über den Karten (`beweis_zeile`), `labor_text` mit mehreren Absätzen, Überschrift auf Kartenbreite, Sterne 0 erlaubt (= keine Sterne) |
| `sections/lt-dna-lp-objections.liquid` | Hintergrund wählbar, Marker für `lt_read` |
| `sections/lt-dna-lp-steps.liquid` | Hintergrund wählbar, Desktop-Spalten folgen der Schrittzahl (5 statt fest 4) |
| `snippets/product-media.liquid` | Parameter `image_override` und `alt_override` für das Ergebnisbild |

## Bewusst ausgeschaltet, ein Klick im Editor

| Was | Wo | Wartet auf |
|---|---|---|
| Garantie Stufe 2b „Klappt es auch beim zweiten Mal nicht, bekommst du den vollen Kaufpreis zurück.“ | `garantie`, Block `z_3` | BJ-Entscheid 2 |
| Nachmess-Gutschein 100 € bis 31.01.2027 | `bonus_stack`, Block `z_5` | BJ-Entscheid 3 und ein Klaviyo-Code mit echtem Ablauf |
| Stufe 3 „Vorher und Nachher“ 649 € | `main`, `pkg_tier3_enable` | BJ-Entscheid 1, dann Variante am Produkt anlegen |
| Überschrift B oder C | `main`, `headline_variant` | Testplan 02 § 7 (nacheinander, je zwei Wochen) |

## Weggelassen statt erfunden (`[offen: …]` aus 02)

| 02 | Zeile | Umgang |
|---|---|---|
| § 2.1 | Sterne-Zeile Loox-Schnitt und Zahl | erledigt: live aus Loox (4,7 bei 122, geprüft 27.10.) |
| § 2.5 | Bild „Frau beim Frühstück mit Gedächtnisalter-Karte“ | Abschnitt ohne Bild |
| § 2.5 | Wechseljahre-Satz mit Levine/PNAS 2016 | Satz raus |
| § 2.6 | Namen für Stimmen 2 und 3 | erledigt: Petra N. und Sophie K., wortgleich in Loox. Bei Petra N. fehlen Sterne und Monat (nicht im Loox-Feed), Karte deshalb ohne Sterne |
| § 2.7 | Praxis-Preis „rund 300 €“ ohne Quelle | Satz raus, ersetzt durch den echten Anker „Folgetest 299 €“ aus 01 § 2 |
| § 2.7 | Mindestalter laut AGB | nicht genannt |
| § 2.9 | Limmroth-Zitat mit Namen | Zitat raus, Name und Rolle bleiben |
| § 2.9 | „an mehr als 2.600 Menschen validiert“ | raus (keine Quelle, 06), auch aus FAQ und der alten Belege-Karte |
| § 2.10 | Nachricht bei Probeneingang | nicht versprochen |
| § 2.12 | FAQ „Reicht Speichel?“ (Methodensatz ohne Freigabe) | Frage raus |
| § 2.12 | FAQ Arbeitgeber/Versicherung (§ 21 GenDG) | Frage raus |
| § 2.12 | Geschenkkarte im Paket | nicht erwähnt, Antwort ohne |
| § 2.13 | Capture „Muster per Mail“ | nicht gebaut, es gibt kein Klaviyo-Formular dafür; `lt_note` entfällt bis dahin |
| § 2.2 | Dezember-Zeile mit DHL-Stichtag | nicht gebaut |

Ebenfalls raus aus der Kaufzone: die Zeile „Management Summary auf Anfrage“ (`trust_1`, 02 § 2.2 listet die Kaufzone abschließend). Wiederherstellen: Text aus dem Git-Verlauf zurück in `trust_1`.

## Prüfliste 02 § 7

| Punkt | Ergebnis |
|---|---|
| Ergebnistermin über Monatsgrenzen | bestanden, mit `node` gerechnet: 27.10. → 8. Dezember, 31.01. → 14. März, 25.12. → 5. Februar, 20.01.2028 → 2. März (Schaltjahr) |
| Alle `[offen]` beantwortet oder entfernt | bestanden, Liste oben |
| Ereignisse mit und ohne Consent | im Code: das Theme schreibt nur in den dataLayer und sendet nichts an Meta. Ob GTM ohne Consent etwas weitergibt, entscheidet GTM-TMTRXHLQ (Meta-Tag dort seit 13.08. pausiert). Live mit Tag Assistant zu prüfen, sobald GA4-Trigger für `lt_*` angelegt sind |
| Sticky-Knopf nicht verdeckt | Seite bringt kein neues schwebendes Element. Gegen Consentmo-Banner und Loox nur live prüfbar |
| LCP unter 2,5 s mobil | nicht messbar vor dem Push. Ergebnisbild ist WebP und wird mit `fetchpriority=high` vorgeladen |
| Fact-Sheet-Sperren | kein „anonym“, kein „MAISIE“, keine Reportzahl, kein Anbietername in sichtbarem Text. Grenzfall: das Datenschutz-Popup sagt seit 22.10. „nur in deiner App sichtbar“, Live-Text unverändert übernommen |

Dazu geprüft: alle Template-Settings gegen die Section-Schemas (Typen, Optionen, Bereiche, Blocklimits), `shopify theme check` ohne neue Befunde, Vorschau bei 375 px ohne horizontales Scrollen, rund 11 Bildschirme lang.

## Nach dem Push prüfen

1. Neue Dateien `sections/lt-pdp-zusage.liquid` und `snippets/lt-pdp-ereignisse.liquid` sind im MAIN-Theme (AGENTS.md: neue Dateien können beim Theme-Manager-Push fehlen).
2. Live-Seite mobil: Ergebnisbild als erste Folie, Kaufknopf trägt „Test bestellen, 395 €“, nach Klick auf die zweite Karte 449 €, Ergebnistermin-Zeile sichtbar.
3. `dataLayer` in der Konsole: `lt_seen` beim Laden, `lt_choice` beim Kartenwechsel, `lt_intent` beim Kaufknopf, `lt_read` bei den Einwänden.
4. Ein Warenkorb-Permalink-Knopf (Warum jetzt, Garantie, Leiste) landet in der Kasse mit 395 €.

## Nicht im Theme

`lt_step` und `lt_done` entstehen im Checkout und gehören in ein Shopify Custom Pixel, ebenso die Weiterleitung an Meta mit Consent (02 § 5). Die Streichpreise 449/549 € stehen weiter an den Varianten; die Seite zeigt sie nicht mehr, Produkt-Feed und Merchant Center schon (BJ-Entscheid 4).
