---
status: snapshot
last_review: 2026-10-26
canonical_for: ag1-hero-analyse-und-startseiten-regeln
---

# AG1-Hero: Analyse, Regeln, Entwurf für die Startseite

Live angesehen am 26.10.2026 unter https://drinkag1.com/de-eu, Desktop (1024 px) und Mobil (375 px), DOM und berechnete Styles ausgelesen. Der Entwurf, der daraus folgt: `docs/entwurf-startseite-ag1-2026-10-26.html`, Vorschau unter http://localhost:8789/entwurf-startseite-ag1-2026-10-26.html.

## 1. Was AG1 im Hero tut

### Aufbau

| Element | Befund |
|---|---|
| Medium | Vollbild-Video (mp4 1920 × 1080, autoplay, stumm, Schleife, ohne Poster), Desktop 805 px hoch, Mobil 560 px. Kein sichtbarer Farbverlauf: das Material selbst ist unten und links dunkel genug für weißen Text. |
| Folien | Karussell mit zwei Folien, Pfeile links und rechts, zwei Punkte unten. Folie 1: Person (Hugh Jackman am Rudergerät, in der Küche). Folie 2: Produkt-Packshot groß auf dunklem Grün-Verlauf, eine Hand mit Messlöffel. |
| Textspalte | Desktop links, vertikal zentriert, max. 444 px (breit 628 px). Mobil unten links, volle Breite, Innenabstand 24 px. |
| Headline | Serif-Display „Bessere Morgen. Wie bei Hugh.“ 72 px Desktop, 44 px Tablet, 32 px Mobil, Zeilenhöhe 0,95, weiß. Fünf Wörter. |
| Unterzeile | Sans 20/30 px Desktop, 16/24 px Mobil, ein bis zwei Sätze. |
| Knöpfe | Primär „Jetzt AG1 testen →“: leuchtendes Grün `rgb(70,222,70)`, schwarze Schrift, Pille (Radius 32 px), 20 px Schrift, 16/24 px Innenabstand, 62 px hoch. Sekundär „Was ist AG1?“: weißer Rand, transparent. Mobil stehen beide nebeneinander mit gleicher Breite. Folie 2 hat nur den Primärknopf, dort weiß. |
| Sonst nichts | Kein Eyebrow, keine Sterne, kein Preis, keine Faktenzeile, keine Bullets, keine Siegel. |
| Darüber | Ankündigungsleiste mit echtem Angebot in Monospace („GRATIS Vitamin D3+K2, 5 Travel Packs & Welcome Kit, im Wert von 69 €“), Header weiß mit drei Menüpunkten. |

### Copy

- Folie 1 verkauft ein **Ergebnis in Kundensprache** („Bessere Morgen“) und hängt einen **Beweis** daran (Hugh). Die Unterzeile liefert einen **Fakt mit Jahreszahl** („Seit 2021 beginnt Hugh Jackman seinen Tag mit AG1“) plus das Versprechen („bereit für alles, was er bringt“).
- Folie 2 **definiert die Kategorie** („Dein tägliches Nährstoff-Fundament“) und erklärt in einem Satz, was drin ist („Vitamine, Mineralstoffe und Bakterienkulturen in nur einem Shake“).
- Der Knopf trägt ein **Verb mit niedriger Schwelle** („testen“, nicht „kaufen“) und den **Markennamen**.
- Es gibt **keinen Health-Claim im Hero.** Alle Wirkaussagen stehen weiter unten mit Fußnotenzeichen.

### Bildwelt

- Echte Person an einem echten Ort (Heim-Gym, Küche), in Bewegung, warmes Licht, Produkt beiläufig im Bild (Shaker in der Hand).
- Person rechts, Text links. Das Material ist so gefilmt, dass das linke untere Drittel ruhig und dunkel ist.
- Die Produktfolie steht auf Markenfarbe, nicht auf Foto. Das Produkt ist groß und frontal, die Hand gibt Maßstab.
- Die Person ist der Beweis (Celebrity). Die Bildwelt sagt „Routine“, nicht „Labor“.

### Was nach dem Hero kommt (Reihenfolge)

1. „Starte deinen Tag mit einer Routine, die wirkt“: ein Satz, dann sechs Foto-Karten je Nutzenbereich (Energie, Immun, Verdauung …), horizontal scrollbar.
2. „15 Jahre Forschung in jedem Scoop“: vier Studienaussagen, nummeriert, je mit Link.
3. Expertenzitate (fünf, mit Titel).
4. Angebotsblock: Monatspackung, Preis pro Portion, Erstkauf-Stack mit Einzelwerten, Summe 87 € gegen 156 €, Knopf, drei Vertrauenszeilen (Versand, Abo, Garantie).
5. Prominenten- und Kundenstimmen.

Die Seite hat damit genau eine Verkaufslogik: Hero zieht, Erklärung zeigt die Bereiche, Forschung beweist, Angebot schließt. Preis und Stack tauchen erst im Angebotsblock auf.

## 2. Regeln, die daraus für LIFETIME folgen

1. **Ein Bild, ein Satz, ein Knopf.** Der Hero trägt Headline, Unterzeile, Primärknopf und Ghost-Knopf. Sterne, Preis, Faktenzeile und Quiz-Link wandern in die Sections darunter. (Live steht heute all das im Hero, BJ-Entscheid 22.10. Das ist die eine Stelle, an der der Entwurf von der Freigabe abweicht.)
2. **Headline höchstens sechs Wörter, in der Theme-Headline-Schrift.** Ergebnis in Kundensprache, kein Produktname, kein Claim. Helvetica Neue 400 mit Laufweite −0,02 em wie jede H1 und H2 live, Desktop 64 px, Mobil 36 px, Zeilenhöhe 1,02 bis 1,08. AG1s Serif wird nicht übernommen (BJ 26.10.): Instrument Serif bleibt der Schluss-Leiste vorbehalten, wie live seit 09.10. Keine neue Schriftfamilie.
3. **Die Unterzeile sagt, was es ist.** Ein bis zwei Sätze, darin das Wort Speichel. Der Story-Check vom 09.10. hatte ergeben, dass Besucher erst auf dem fünften Handy-Bildschirm vom Speicheltest erfuhren.
4. **Vollbild-Medium, Person in Bewegung, warmes Licht, Produkt nur beiläufig.** Mobil 560 px, Desktop 80 vh (max. 805 px). Text links unten (mobil) bzw. links mittig (Desktop) auf einem Verlauf, weil unsere Fotos nicht so dunkel gefilmt sind wie AG1s Video. Bildwelt nach `lifetime-mockups/BILDWELT-briefing.md`: Mitzieher, Bewegungsunschärfe, Anfang bis Mitte 50.
5. **Zwei Folien, nicht mehr.** Folie 1 Person und Ergebnis, Folie 2 das Kit auf Teal `#364f56` mit Kategorie-Definition. Pfeile nur auf dem Desktop, Punkte überall, kein Autoplay.
6. **Der Primärknopf leuchtet.** AG1 nimmt sein Signalgrün nur für diesen Knopf. Bei uns ist das Mint `#65c0b6` mit Tinte `#26251e` als Schrift (Kontrast rund 7:1), Pille, 18 px, 56 px hoch. Mint erscheint auf der Seite sonst nirgends als Fläche. Alle weiteren Knöpfe bleiben Teal.
7. **Verb mit niedriger Schwelle.** „Test bestellen →“ bleibt, weil „testen“ bei einem Test doppeldeutig wäre. Ghost-Knopf „Was ist der Test?“ springt zur Erklärung.
8. **Kein Eyebrow, kein Kicker** (gilt ohnehin, Memory `feedback_kicker_sparsam`).
9. **Beweis direkt nach dem Hero, nicht darin.** Logo-Wand „Bekannt aus“ als erste Section, Sterne und Bewertungszahl im Stimmen-Block.
10. **Sechs Bereiche als Foto-Karten.** AG1s Nutzen-Karten übersetzt: je Karte ein Bereich aus dem Test (Biologisches Alter, Entzündung, Immunscore, Schlaf, Vitamine, Herz), ein Satz, der beschreibt, was gemessen wird, keine Wirkaussage. Bilder aus `docs/startseite-v2/bilder/bereich-*.webp`.
11. **Angebotsblock als eigene Section.** Was im Kit steckt, ein Preis, drei Vertrauenszeilen. Kein Wert-Stack mit Streichpreisen (Memory `project_compare_at_bereinigung`), keine erfundene Knappheit.
12. **Ankündigungsleiste bleibt die Bewertung.** AG1 nutzt sie für ein Angebot. Wir haben keins, das täglich wahr ist, deshalb bleibt „4,8/5 · 431 Bewertungen“.

## 3. Konflikte, die BJ entscheiden muss

- **`DESIGN.md` verbietet Foto-Hintergründe im Hero** („Don't build the lifestyle-landing pattern: no photographic hero backgrounds“). Das ist der Nordstern „Klinisches Dossier“ vom August. Der AG1-Entwurf bricht ihn absichtlich. Entweder `DESIGN.md` nachziehen oder den Entwurf verwerfen, nicht beides stehen lassen.
- **Hero-Freigabe vom 22.10.** (Sterne, Faktenzeile, Quiz-Link im Hero) steht gegen Regel 1.
- **Video:** AG1 fährt Video ohne Poster. Wir haben kein Hero-Video; der Entwurf nimmt Fotos. Ein 10-Sekunden-Mitzieher (Läuferin, Paar) wäre der nächste Schritt, wenn das Muster bleibt.
- **NMN** kommt im Entwurf nicht vor, wie live seit 09.10. (Bereiche-Umschalter deaktiviert). AG1 ist ein Ein-Produkt-Shop; wenn NMN auf die Startseite soll, gehört es als Karte unter den Angebotsblock, außerhalb jedes Heading-Paars (VSW-Vergleich).

## 4. Was der Entwurf zeigt

`docs/entwurf-startseite-ag1-2026-10-26.html`, Reihenfolge:

| # | Section | Herkunft | Gebaut als (Dev-Theme 193836777847, 26.10.) |
|---|---|---|---|
| 1 | Hero, zwei Folien (Paar beim Laufen; Kit auf Teal) | neu nach AG1 | `sections/lt-hp-hero-vollbild.liquid`, Key `hero_vollbild` |
| 2 | Bekannt aus | live `lt-hp-bekannt` | unverändert, Key `bekannt` |
| 3 | Was ist der Test? Sechs Foto-Karten, App-Zeile, Quiz-Link | neu nach AG1, Begriffe aus `lt-hp-test` | `sections/lt-hp-bereiche-karten.liquid`, Key `bereiche_karten`, Anker `#test` |
| 4 | Forschung: Limmroth-Video, drei Methoden-Zeilen | live `lt-hp-video-vsl`, Zeilen neu | `lt-hp-video-vsl` mit Blocks `methode`, Key `video_vsl` |
| 5 | Was ihr Test gezeigt hat (drei Karten, Sterne) | live `lt-hp-stimmen` | `lt-hp-stimmen` mit `layout: raster`, Key `stimmen` |
| 6 | Angebot: Kit, Inhalt, 349 €, Ablauf in vier Schritten, drei Vertrauenszeilen | neu nach AG1, Fakten aus `lt-hp-test`, `lt-hp-fragen`, `lt-hp-ablauf` | `sections/lt-hp-angebot.liquid`, Key `angebot`, Anker `#bestellen` |
| 7 | Bevor du bestellst (vier Fragen) | live `lt-hp-fragen`, gekürzt | `lt-hp-fragen` mit `link_intro`, Key `fragen` |
| 8 | Schluss-Leiste | live `lt-leiste` | unverändert, Key `schluss` |

Stand und Abweichungen des Baus: `docs/startseite-v2/README.md` § AG1-Umbau 26.10. Alte Keys `hero`, `test`, `normbereich`, `ablauf`, `bereiche` bleiben deaktiviert im Template.

Bilder im Entwurf: `entwurf-ag1-hero-paar.jpg` (aus `lifetime-mockups/lifestyle/sport-laufen-paar`), `entwurf-ag1-hero-laeuferin.jpg` (`ki-bewegung-b2`, Live-Motiv ohne Karten) als Alternative, alles Weitere aus `docs/startseite-v2/bilder/`. Für den Bau im Theme: Hero als neue Section (`lt-hp-hero-vollbild`), nicht als Umbau von `crs-hero-typewriter`, damit der Rückweg bleibt. Schriften wie live: Headlines Helvetica Neue 400, Fließtext und Knöpfe Lato, Instrument Serif nur in der Schluss-Leiste. **BJ-Freigabe 26.10.2026: „genau so“, mit der Schriftkorrektur.**
