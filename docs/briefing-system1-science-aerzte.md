---
status: snapshot
last_review: 2026-07-27
canonical_for: system1-umbau-science-und-expertenseite
---

# /pages/science und /pages/aerzte plakativer machen

Visuelles Gegenstück: `docs/system1-preview-science-aerzte.html` (Vorher/Nachher je Section).
Auftrag BJ, 27.07.2026: „zu viel Text, an IM8 orientieren, mehr System-1".

> **Umgesetzt am 27.07.2026, alle drei Stufen plus Nebenbefunde.** BJ-Freigabe für
> Stufe 3 (neues Layout-Muster) lag vor. Stand nach Umsetzung siehe §8.
> Geändert: `sections/lt-science-hallmarks.liquid`, `sections/lt-science-messebenen.liquid`,
> `sections/lt-hp-science.liquid`, `sections/lt-expert-profile.liquid`,
> `assets/section-lt-expert-profile.css`, `templates/page.science.json`,
> `templates/page.aerztliche-leitung.json`.

## 1. Befund

Gemessen am Live-HTML (27.07.2026, Wörter je Section ohne Header/Footer/Popups-Chrome):

| /pages/science | Wörter | | /pages/aerzte | Wörter |
|---|---:|---|---|---:|
| Hero | 20 | | Profil | 243 |
| Hallmarks | 369 | | Beitragsliste | 235 |
| Messebenen | 208 | | **Summe** | **478** |
| Foundation | 121 | | | |
| Bento | 72 | | | |
| Quellen | 330 | | | |
| CTA | 46 | | | |
| **Summe** | **1.166** | | | |

Mobile Seitenhöhe Science: rund 9.000 px.

Das Problem ist nicht die Menge an Information, sondern dass **alles die gleiche Form hat**:
Fließtext in Absatzgröße. Die Seiten enthalten hervorragendes System-1-Material, das
aktuell wie Fließtext gesetzt ist:

- „über 160 in PubMed gelistete Arbeiten" steht in einer `<dl>` in 16 px Fließtextgröße
- „Über 20.000" und „Über 1.500" stehen korrekt groß, aber an Position 5 von 7, rund
  5.000 px unter dem Fold
- die 21 geprüften Beiträge stehen als Liste da, die Zahl 21 steht nirgends
- die sechs Beleg-Institutionen (Kliniken Köln, DNB, Ärzteblatt, PubMed …) sind als
  generischer Linktext gesetzt, bei dem der Institutionsname mal vorn und mal hinten steht

Dazu ein struktureller Verstärker: der `crs-heading-stack` setzt Titel und Subtitle
**gleich groß**. Ein fünfzeiliger Subtitle ist damit faktisch fünf Zeilen Überschrift,
und er steht in jeder Science-Section vor dem ersten Inhalt. Das ist der größte
Einzeltreiber des Textgefühls.

## 2. Was von IM8 übernommen wird, und was nicht

Recherchiert am 27.07. auf `im8health.com/pages/science`.

**Übernommen:**

| IM8-Muster | Übersetzung für LIFETIME |
|---|---|
| Advisory Board: Foto + Name + **eine** Zeile Credential, Bio hinter „+" | Steckbrief kürzen, Details bleiben, aber gefaltet |
| 2×2-Raster großer Prozentzahlen als dominantes Element | Zahlenreihe, aber mit Herkunfts- statt Wirkungszahlen |
| „checks all the boxes": 6 Häkchen, null Prosa | Prüfumfang-Zeilen auf 2–4 Wörter kürzen |
| Eine Aussage pro Screen, sehr groß gesetzt | Numeral-Auftakt statt Absatz-Auftakt |

**Nicht übernommen:** Countdown-Balken und die `$2.61/DAY`-Sticky-Leiste (falscher Ton für
eine Wissensseite). Und vor allem die plakativste Stelle der IM8-Seite,
„Clinically Proven. More Energy. A Healthier Gut." Die ist für uns **doppelt gesperrt**:
als Wirkversprechen nach Health-Claims-Verordnung, und als rhythmischer Dreiklang nach
der eigenen KI-Tell-Regel in `docs/conversion-messaging.md` §9. Wer sich an IM8
orientiert, landet ohne Vorsatz genau dort.

## 3. Die drei Regeln

1. **Eine Zahl pro Screen.** Jede Section hat genau ein dominantes Element. Hat sie eine
   Zahl, ist die Zahl die Überschrift, nicht ein Satz über die Zahl.
2. **Prosa faltet sich, sie verschwindet nicht.** Erklärtext wandert in das Accordion
   (`lt-science-hallmarks`) und die `<dialog>`-Popups (`crs-link-cards`), die es beide
   schon gibt. Beide rendern serverseitig, der Text bleibt für Google und KI-Crawler im
   HTML. Relevant wegen `project_geo_strategy_2026-07`.
3. **Plakativ über Herkunft, nicht über Wirkung.** Große Typo verstärkt nur, was dasteht.
   Erlaubt sind Anzahl, Jahreszahl, Kohortengröße, Prüfsiegel. Nicht erlaubt sind
   Wirkprozente, Vorher/Nachher, „X % berichteten von …".

## 4. /pages/science, Section für Section

| # | Section | Ist | Vorschlag | Wörter |
|---|---|---|---|---|
| 1 | Hero | 20 Wörter | unverändert | 20 |
| 2 | Hallmarks | Kicker + 5-zeiliger Subtitle + 3 Icon-Kacheln | **„12"** als Numeral-Überschrift, Subtitle auf eine Zeile, Kacheln zeigen `01–05` / `06–08` / `09–12` statt Deko-Icon | 369 → 46 |
| 3 | Messebenen | drei Absätze à 40–50 Wörter | drei Wortkarten **HEUTE / IMMER / JAHRE** mit ✓/– LIFETIME-Marker | 208 → 62 |
| 4 | Foundation + Bento | zwei dunkle Sections, die live zu einem 2.800-px-Block verschmelzen; drei gleich schwere Karten | ein dunkler Block: Gesicht + Zitat dominant, darunter 20.000 / 1.500, CTA auf `/pages/aerzte` | 193 → 90 |
| 5 | Quellen | Titel **und** Beschreibung **und** Popup je Karte | Beschreibungen leeren, Popup-Text unverändert, 6 statt 3 Karten sichtbar | 330 → 38 |
| 6 | CTA | unverändert | Ziel-Fix, siehe §7 | 46 |

Summe sichtbar: **1.166 → rund 330 Wörter**, ohne dass ein einziger Erklärtext gelöscht wird.

**Die beiden Säulen-Karten fallen weg.** „Klare Standards statt Black Box" und
„Evidenz vor Erzählung" sind zusammen 60 Wörter Selbstbeschreibung ohne einen
überprüfbaren Beleg. Das ist der Kartentyp, den die Never-Liste als „generische
UI-Kit-Karte, die jede Health-Brand haben könnte" führt. Ihre Aussage steht schon in der
Quellenzeile der Hallmarks und in der Quellen-Section.

**Der Abschlusssatz der Messebenen entfällt** („Blutmarker zeigen den Tag. Genetik zeigt
den Bauplan. Epigenetik zeigt, was du in der Zeit dazwischen aus beidem gemacht hast.").
Er ist der beste Satz der Seite, aber HEUTE / IMMER / JAHRE ist derselbe Gedanke ohne
Lesevorgang. Beides nebeneinander wäre dieselbe Aussage zweimal.

## 5. /pages/aerzte

| # | Bereich | Ist | Vorschlag |
|---|---|---|---|
| 1 | Kopf | Foto, Name, Rolle, dann zwei Absätze | dazwischen drei Zahlen: **2006** · **160+** · **21** |
| 2 | Bio | zwei Absätze, 75 Wörter | Absatz 1 entfällt (dupliziert den Steckbrief), Absatz 2 bleibt gekürzt |
| 3 | Kernsatz | „Was sie nicht trägt, geht nicht online" als letzter Halbsatz | große eigene Zeile |
| 4 | Steckbrief | 4 Zeilen | 2 Zeilen, Klinik und Publikationen stehen jetzt oben als Zahl |
| 5 | Nachprüfbar über | 6 unterstrichene Textzeilen | Pill-Reihe mit Institutionsnamen (Muster: PDP-Trust-Strip) |
| 6 | Prüfumfang | 8 Zeilen à 8–10 Wörter, mobil je 2 Zeilen | 8 Zeilen à 2–4 Wörter, „Keine" gestrichen |
| 7 | Fußnote | | **wortgleich unverändert** |
| 8 | Beitragsliste | 21 Links, bewusst leise | unverändert |

**Korrektur zur ersten Fassung dieses Briefings:** dort stand „478 → 250 Wörter". Das war
zu optimistisch. Die 478 enthalten die 235 Wörter der Beitragsliste, und die bleibt
absichtlich unangetastet. Richtig ist: **Profil 243 → 147 Wörter (−40 %)**, Seite gesamt
**478 → rund 382 (−20 %)**. Der wahrgenommene Unterschied ist größer als die Wortzahl,
weil der erste Screen jetzt mit drei Zahlen öffnet statt mit zwei Absätzen.

**Zu den drei Zahlen.** Alle drei sind absolut und veralten nicht, anders als die früher
korrigierten rollenden Angaben („seit 17 Jahren"). Quellen laut
`docs/limmroth-faktenblatt.md` §1: 2006 aus der Ärzteblatt-Personalie, 160+ aus PubMed
mit Stand-Datum, 21 zählt `lt-expert-articles` ohnehin schon selbst aus dem Blog.

**Das Fachgebiet muss im Label stehen: „Fachartikel in PubMed, Neurologie".** Das
Faktenblatt dokumentiert dieselbe Falle bereits einmal: „20+ Jahre Forschung" neben der
NMN-Buybox liest sich als 20 Jahre NMN-Forschung. Ein großes „160+" auf einer
Autoritätsseite für Longevity-Inhalte hat exakt dasselbe Risiko. Die Seite korrigiert
sich zwar selbst, weil „Eigene Forschung zu NMN oder NAD⁺" unten ausdrücklich als *nicht*
geprüft markiert ist, aber das Label muss trotzdem qualifizieren.

**Der Kernsatz bleibt ohne Anführungszeichen und ohne Zuschreibung.** Er ist heute
LIFETIME-Text *über* ihn, kein Zitat *von* ihm. Als Pull-Quote gesetzt würden ihm Worte
zugeschrieben, und seine Wortlaut-Freigabe ist laut Faktenblatt §7 der noch offene
Blocker der ganzen Seite.

**Das „Keine" fällt in allen vier Ausschluss-Zeilen weg.** Der Minus-Marker und die
Überschrift „Das ist nicht Teil der Prüfung" sagen die Verneinung schon zweimal. Erst
ohne das dritte Mal werden die beiden Spalten optisch symmetrisch, und Symmetrie ist das,
was ein Ja/Nein-Muster auf einen Blick lesbar macht.

**Die Beitragsliste bleibt leise.** Sie wurde am 27.07. bewusst auf Fließtextgröße ohne
Fettung gestellt, weil sie sonst optisch der Held der Seite ist statt der Person
(`docs/live-pages-map.md`). Die Zahl 21 oben macht das Volumen sichtbar, ohne diese
Entscheidung zurückzudrehen.

## 6. Umsetzung in drei Stufen

**Stufe 1, nur Template-Settings, kein Code** — ca. −55 % sichtbarer Text:

- `crs-link-cards`: alle sechs `description` leeren, `popup_body` unverändert lassen
- alle Science-Subheadings auf eine Zeile kürzen
- `lt-hp-science`: die zwei `science_pillar`-Blocks aus `block_order` entfernen
- `lt-expert-profile`: Bio-Absatz 1 raus, `fact_2` und `fact_4` raus
- acht Scope-Zeilen kürzen, „Keine" streichen
- sechs Em-Dashes ersetzen (siehe §7)
- CTA- und Verlinkungs-Fixes (§7)

**Stufe 2, kleine Eingriffe in bestehende Sections:**

- `lt-science-hallmarks`: `hero_number`-Setting + CSS für den Numeral-Auftakt; die
  Toggle-Labels sind aktuell im Liquid hardcodiert und sollten bei der Gelegenheit
  Settings werden
- `lt-science-hallmarks`: Kategorie-Kacheln zeigen Nummernbereich statt Icon
- `lt-expert-profile`: Stat-Reihe über der Bio, Links als Pill-Reihe
- `lt-science-bento`: Fact-Kacheln in den `lt-hp-science`-Block ziehen

**Stufe 3, neues Layout-Muster — braucht deine Freigabe:**

Die Messebenen als HEUTE / IMMER / JAHRE. `lt-science-messebenen` kann das nicht, und
`_examples/` hat kein Vergleichs-Muster. Entweder als card-info-Variante bauen (nächstes
approved Muster: `_examples/sections/benefits.liquid`) oder erstmal nur die drei Absätze
auf je zwei Sätze kürzen. Die billige Variante bringt 208 → 110 ohne Code.

## 7. Nebenbefunde, unabhängig vom Umbau

1. **Sechs Em-Dashes in der Live-Copy der Science-Seite**, entgegen der Regel in
   `CLAUDE.md` § Keine KI-Tells. Alle in Settings von `lt-science-messebenen`,
   `lt-science-bento` und `lt-hp-science`: „bewusst — und lassen", „verändert sich nicht — sie
   erklärt", „Spur aus Jahren — und sie lässt", „biologisch alterst — und welche Rolle",
   „schweigen wir — bis sie es tut", „das sich verschiebt — über Jahre".
2. **Der Sekundär-CTA der Science-Seite zeigt auf `/pages/meine-routine`.** Das ist laut
   `docs/live-pages-map.md` ein toter Duplikat-Slug, der gelöscht werden sollte; live
   301-redirectet er auf `/pages/quiz-age`. Ein vermeidbarer Redirect-Hop, direkt auf
   `/pages/quiz-age` setzen.
3. **Von `/pages/science` führt kein Link auf `/pages/aerzte`.** Die Expertenseite ist
   seit dem 27.07. live und im Footer nur über das `legal`-Menü erreichbar. Die
   Science-Seite ist der natürlichste Absender, der CTA im dunklen Block schließt die
   Lücke.
4. Geprüft und **kein** Befund: das Bento-Moodbild lädt korrekt (507 × 611, HTTP 200), es
   erschien nur in einem frühen Screenshot leer.
5. **Beim Umsetzen zusätzlich aufgefallen:** der Alt-Text des Science-Hero-Bildes lautete
   „Wissenschaftliche Textur — LIFETIME", das Bild ist aber `volker-podcast.png`, also das
   Porträt von Prof. Limmroth. Falscher Alt-Text, gleich mitkorrigiert.
6. **`/pages/longevity-guide-101` ist eine leere Seite.** Die gelöschte Pillar-Karte
   „Evidenz vor Erzählung" trug den einzigen Live-Link dorthin. Ich habe daraufhin erst
   eine Ersatz-Karte in der Quellen-Section gebaut, um keine Waise zu erzeugen — **das war
   falsch**, denn ich hatte nur den HTTP-Status geprüft, nicht den Inhalt. BJ hat es
   gemeldet. Die Seite liefert 200 und rendert Header und Footer, der `main`-Bereich ist
   leer: 0 Wörter Inhalt, dazu ein **leerer `<title>`**. Genau das Muster, das im
   Nav-Cleanup 2026-07-02 schon einmal zu fünf Retirements geführt hat.
   Die Ersatz-Karte ist wieder raus, die Quellen-Section hat wieder sechs Karten.
   **Merke: bei Link-Zielen `curl` + Wortzahl im `<main>`, nicht nur der Statuscode.**
   Die Seite steht trotzdem **in der Sitemap**, ohne `noindex`, mit Self-Canonical.
   Offene Entscheidung siehe §9.

   Nebeneffekt der Runde, unabhängig davon nützlich: `crs-link-cards` verpasste **jedem**
   Link `target="_blank"` und ein ↗, auch einem internen, und sogar die Popup-Trigger
   trugen das ↗, obwohl sich nur ein Dialog auf derselben Seite öffnet. Beides hängt
   jetzt an einem echten Fremdziel (`request.host`-Abgleich).

## 9. `/pages/longevity-guide-101` retired, 27.07.2026

**BJ-Entscheid: unpublishen und 301 auf `/pages/science`.** Ausgeführt und live geprüft.

| Was | Ergebnis |
|---|---|
| Page 98739486820 (`longevity-guide-101`) | `isPublished: false`, `publishedAt: null` |
| Neuer Redirect 1707507614071 | `/pages/longevity-guide-101` → `/pages/science` |
| Bestehender Redirect 1507661382007 | `/pages/longevity-guide` → **umgehängt** von `…-101` auf `/pages/science` |

**Die Chain-Sperre war hier real, nicht theoretisch.** Auf die leere Seite zeigte bereits
ein zweiter Redirect (`/pages/longevity-guide`). Hätte man nur den neuen angelegt, wäre
`/pages/longevity-guide` → `/pages/longevity-guide-101` → `/pages/science` eine Kette
geworden, die Shopify nicht zulässt. Deshalb zeigen jetzt **beide** Quellen direkt auf das
Endziel. `/pages/science` ist selbst keine Redirect-Quelle, vorher geprüft.

Live verifiziert: beide Pfade liefern 301 auf `https://www.lifetime-health.de/pages/science`,
das Ziel liefert 200 ohne weiteren Hop. Mit dem Unpublish fällt die Seite auch aus der
Sitemap.

**Noch offen, Kleinkram:** in der Redirect-Tabelle steht ein kaputter Eintrag
`/https://www.lifetime-health.de/pages/longevity-guide-101` → `/` (Redirect-ID
1655116005751). Der Pfad ist eine ganze URL und kann auf keine echte Anfrage matchen,
also wirkungslos, aber es ist Müll aus der Zeit vor der Redirect-Hygiene. Löschen, wenn
du die Tabelle das nächste Mal anfasst.

Zwei weitere Referenzen auf die Seite, beide nicht live:
`templates/page.legacy-agedna-landing-termin.json` (verwaistes Legacy-Template, das laut
Memory `reference_unused_templates_view_param` per `?view=` trotzdem ausgeliefert würde)
und ein Beispiel-URL im Schema-Hilfetext von `lt-science-bento`, den ich auf
`/pages/science` umgestellt habe.

## 8. Stand nach der Umsetzung, 27.07.2026

Gemessen an den Template-Settings, Prosa hinter Accordion und Popup nicht mitgezählt:

| | vorher live | jetzt | |
|---|---:|---:|---|
| /pages/science, sichtbar | 1.166 | **325** | −72 % |
| /pages/aerzte, Profil-Section | 243 | **147** | −40 % |
| /pages/aerzte, Beitragsliste | 235 | 235 | bewusst unverändert |

`shopify theme check` läuft über die geänderten Dateien ohne Error. Die 459 Errors im
Theme sind sämtlich vorbestehend (Locales, `ss-*`-Legacy-Sections, `_archive/`), keiner
in den hier angefassten Dateien.

**Neue Settings, die es vorher nicht gab:**

| Section | Setting | Zweck |
|---|---|---|
| `lt-science-hallmarks` | `show_count_numeral` | zählt die Hallmark-Blöcke selbst und setzt die Zahl groß über die Überschrift |
| `lt-science-hallmarks` | `toggle_label_more` / `_less` | die Labels waren im Script hardcodiert („Alle 12 …") und wären bei jeder Blockänderung still falsch geworden; `{count}` wird ersetzt |
| `lt-science-messebenen` | `layout_variant` | `panels` (alt) oder `cards` (neu) |
| `lt-science-messebenen` | `tag_yes_label` / `tag_no_label` | Beschriftung der Ja/Nein-Marker |
| `lt-science-messebenen`, Block | `keyword` | das Schlagwort der Wortkarte |
| `lt-expert-profile`, Block | `stat_1..3_value` / `_label` | die Zahlenreihe |
| `lt-expert-profile`, Block | `statement` | der große Kernsatz |
| `lt-expert-profile` | `links_style` | `list` (alt) oder `pills` (neu) |

Die Nummernbereiche der Kategorie-Kacheln (01–05 / 06–08 / 09–12) sind **kein Setting**,
sie werden aus den Blockzählungen berechnet. Ein 13. Hallmark verschiebt Bereiche,
Numeral und Toggle-Label automatisch mit.

### In der visuellen Abnahme gefunden und behoben

Gerendert geprüft über `shopify theme dev` (Dev-Theme 193257111927), Viewport 375 px.
Fünf Dinge sah man erst am gerenderten Bild:

| Fund | Behoben durch |
|---|---|
| Die dritte Zahl trug „Stand Juli 2026" im Label und brach mobil auf vier Zeilen, das Raster kippte auf 3/3/4 | Labels gekürzt, Hedge steckt in der Schreibweise (`160+`) |
| Der Numeral fiel per `clamp()` auf Mobil auf 36 px zurück, obwohl zwei Ziffern bei 48 px problemlos passen | fest `--text-display` |
| In der Expert-Karte stand „Chief Scientific Officer" zweimal, als Titel und in den Credentials | Credentials tragen jetzt die externe Position (Chefarzt Köln-Merheim) |
| Die Popup-Trigger der Quellen-Karten trugen ein ↗, obwohl sich nur ein Dialog auf derselben Seite öffnet | ↗ bleibt echten Fremdlinks vorbehalten |
| „NAD+" statt „NAD⁺" in drei Feldern, abweichend vom Rest der Seiten | vereinheitlicht |

**Zwei Punkte für die nächste Pflege:**

1. Die **21** in der Zahlenreihe ist hart im Template eingetragen, während
   `lt-expert-articles` die Liste darunter selbst aus dem Blog zählt. Bei jedem neuen
   geprüften Beitrag mitziehen, oder das Feld später gegen eine Zählung tauschen.
   Ein Datums-Zusatz im Label („Stand Juli 2026", wie es das Faktenblatt für die
   PubMed-Zahl verlangt) stand kurz drin und ist wieder raus: er brach mobil auf vier
   Zeilen und kippte das dreispaltige Raster. Die Hedge trägt stattdessen die Schreibweise
   selbst. **160+** und **21** können durch Drift nur falsch werden, indem sie
   untertreiben, und das ist weder ein Compliance- noch ein Vertrauensrisiko.
2. Hero-Bild der Science-Seite und Porträt im dunklen Block sind **dasselbe Bild**
   (`volker-podcast.png`). Seit der dunkle Block das Gesicht als dominantes Element
   trägt, sieht man ihn zweimal auf einer Seite. Ein zweites Motiv für den Hero wäre
   besser, dafür brauche ich eins, das es im Shop schon gibt.
