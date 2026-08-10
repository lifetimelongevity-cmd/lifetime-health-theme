---
status: living
last_review: 2026-08-10
canonical_for: blog-cluster2-spermidin-artikel
---

# Cluster 2, Artikel 1 — Spermidin: was es ist und was die Forschung zeigt

**Stand: LIVE seit 2026-08-10.** Freigabe BJ am 10.08. für die Fassung wie gebaut, also
D1 in Variante A (Rechtsstatus ja, 6-mg-Höchstmenge nein) und D2 unverändert drin.
Article-ID `1024726499703`, URL `/blogs/longevity-blog/was-ist-spermidin`.

Anlass: Search-Console-Befund aus dem Cluster-2-Plan. Spermidin bringt 484 Impressionen bei
0 Klicks, es gibt bisher keine einzige informative Seite zum Thema auf der Domain, nur die PDP.
Nächster Artikel danach: Resveratrol (446 Impressionen, Position ~22).

---

## Eckdaten

| Feld | Wert |
|---|---|
| Titel (H1 / `article.title`) | Spermidin: was es ist und was die Forschung zeigt |
| Handle / Slug | `was-ist-spermidin` |
| URL | `/blogs/longevity-blog/was-ist-spermidin` |
| Template | `templates/article.was-ist-spermidin.json` (live gepusht 10.08.) |
| Body | `docs/cluster2-blog/01-was-ist-spermidin-body.html` (Arbeitsstand, live über `articleUpdate`) |
| Ziel-Queries | „was ist spermidin", „spermidin wirkung", „spermidin studien", „spermidin lebensmittel" |
| Besitz-Thema (exklusiv) | Definition, Vorkommen in Lebensmitteln, Evidenzlage Spermidin |
| Dominante Form | Studientabelle plus Lebensmitteltabelle |
| Tag (Blog-Taxonomie) | Longevity-Grundlagen |
| Byline | Benedikt Junker · Prof. Dr. med. Volker Limmroth (aus den Section-Settings) |
| Bilder | Cover plus 3 SVGs, alle hochgeladen, URLs stehen im Body (siehe unten) |
| CTA | nach Abschnitt 3, auf `/products/spermidin-kapseln` |

Folgeartikel im selben Cluster verweisen auf diesen hier, statt Definition und Evidenz
erneut zu erklären (Anti-Wiederholungsregel aus `nmn-blog-geo/nmn-blog-playbook.md` §5a).

---

## Was diesen Artikel vom Markt unterscheidet

Alle deutschen Spermidin-Seiten erzählen dieselbe Kette: Autophagie, Nobelpreis Ohsumi,
Bruneck-Studie, 5,7 Jahre. Was keine erzählt:

1. **Die größte und längste Studie am Menschen ist negativ ausgegangen.** SmartAge, Charité,
   100 Teilnehmer, zwölf Monate, primärer Endpunkt verfehlt.
2. **Die Gedächtnisstudien dosierten unter der normalen Ernährung.** 0,9 und 1,2 mg pro Tag,
   während die Mischkost je nach Land 5 bis 15 mg liefert.
3. **Bei 40 mg täglich bewegten sich die Polyaminwerte im Blut kaum.** Hinweis auf eine
   funktionierende körpereigene Regulation, veröffentlicht 2024.
4. **Die beiden 2018er-Veröffentlichungen sind kein Beleg-Doppel.** Sie beschreiben je ein
   dreimonatiges Vorhaben mit 30 Personen derselben Altersgruppe. Wer sie als zwei
   unabhängige Studien zählt, verdoppelt eine dünne Datenlage auf dem Papier.

Das ist dieselbe Logik wie beim NMN-Refit vom 05.08.: die Latte höherlegen statt mitlaufen.
Siehe Memory `project_blog_conversion_refit_2026-08-05`.

---

## Verifikation der Primärquellen (PubMed, 10.08.2026)

Alle Zahlen im Body stammen aus diesen Arbeiten, jede einzeln über PubMed geprüft
(Titel, Journal, Jahr, Band, Seiten, DOI, Abstract-Zahlen).

| Aussage im Artikel | Quelle | DOI |
|---|---|---|
| Verlängerte Lebensspanne bei Hefe, Fliegen, Würmern, gekoppelt an Autophagie; Spermidinspiegel sinkt mit dem Alter | Eisenberg et al., Nature Cell Biology 2009;11(11):1305-1314 | 10.1038/ncb1975 |
| Mäuse und Ratten: Lebensspanne, Herzhypertrophie, diastolische Funktion, Effekt entfällt ohne Atg5 | Eisenberg et al., Nature Medicine 2016;22(12):1428-1438 | 10.1038/nm.4222 |
| 30 Personen, 60 bis 80 Jahre, 1,2 mg/Tag, 3 Monate, Sicherheit und Verträglichkeit | Schwarz et al., Aging 2018;10(1):19-33 | 10.18632/aging.101354 |
| 30 Personen, 3 Monate, Gedächtnis, Pilotcharakter, Konfidenzintervall schließt Null ein (−0,01 bis 0,35) | Wirth et al., Cortex 2018;109:181-188 | 10.1016/j.cortex.2018.09.014 |
| Bruneck: 829 Personen, 45 bis 84 Jahre, 1995 bis 2015, HR 0,76 (0,67–0,86), Differenz oberes/unteres Drittel entspricht 5,7 Jahren | Kiechl et al., Am J Clin Nutr 2018;108(2):371-380 | 10.1093/ajcn/nqy102 |
| Weizenkeime 2.437 nmol/g, Sojabohnen 1.425 nmol/g, Käse bis 262, Milch 0,41–5, Fleisch 1–92; Zufuhr EU 87 µmol, Japan 74, USA 54,7, Türkei 33,1 | Muñoz-Esparza et al., Front Nutr 2019;6:108 (Tabellen 2–4) | 10.3389/fnut.2019.00108 |
| SmartAge: 100 Personen, 60 bis 90 Jahre, 0,9 mg/Tag, 12 Monate, Differenz −0,03 (−0,11 bis 0,05), Sekundärendpunkte ohne Unterschied | Schwarz et al., JAMA Netw Open 2022;5(5):e2213875 | 10.1001/jamanetworkopen.2022.13875 |
| 37 Männer, 50 bis 70 Jahre, 40 mg/Tag, 7 und 28 Tage, keine Sicherheitsauffälligkeiten, Polyaminwerte kaum verändert | Keohane et al., Nutr Res 2024;132:1-14 | 10.1016/j.nutres.2024.09.012 |
| 40 Personen über 65, 6 mg/Tag, 13 Wochen, gut vertragen | Alsaleh et al., Aging Cell 2026;25(6):e70545 | 10.1111/acel.70545 |

**Eigene Umrechnung, im Artikel offengelegt:** nmol/g und µmol/Tag sind mit der Molmasse
145,25 g/mol in mg umgerechnet. Beispiel Weizenkeime: 2.437 nmol/g × 145,25 g/mol = 0,354 mg/g,
also rund 35 mg je 100 g. EU-Zufuhr: 87 µmol × 145,25 = 12,6 mg/Tag. Die Quelle selbst
nennt keine mg-Werte, deshalb steht der Umrechnungshinweis im Text und in der SVG-Fußzeile.

**Nicht verifiziert, bewusst nicht im Artikel:** die 6-mg-Höchstmenge der Novel-Food-Zulassung.
EUR-Lex antwortet weiterhin mit HTTP 202 und leerem Body, wie schon am 29.07. Zwei
unabhängige Sekundärquellen nennen 6 mg/Tag für Spermidin-reichen Weizenkeimextrakt
(Änderung durch DVO (EU) 2020/443). Das ist der Grund für Entscheidung D1 unten.

---

## Compliance-Raster (Claim-Ampel, Playbook §4)

Subjekt ist durchgehend die Wissenschaft oder das Molekül, nie das Produkt und nie „du" in
Verbindung mit einer Wirkung.

**Grün, unverändert drin:** chemische Definition, Vorkommen in Lebensmitteln, Zufuhrschätzungen,
Studienberichte mit Teilnehmerzahl, Dosis, Dauer und Ergebnis, Rechtsstatus des Extrakts,
Allergen- und Zielgruppenhinweis.

**Bewusst raus:** jede Übertragung eines Studienergebnisses auf den Leser, jede Aussage zu
Zellerneuerung, Alterung oder Gedächtnis als Produktnutzen, jeder Krankheitsbezug, der Begriff
Anti-Aging, jeder Vergleich mit benannten Wettbewerbern (§ 6 UWG).

**Eine Kleinigkeit vorab:** In der Quellenliste steht der Originaltitel der Cortex-Arbeit von
2018, und der enthält das Wort „dementia". Das ist ein wörtlich zitierter Studientitel im
Literaturverzeichnis, kein Aussagesatz im Fließtext. Falls die Prüfung auch das nicht möchte,
lässt sich der Titel kürzen, ohne dass die Quelle unauffindbar wird.

**Zwei Stellen, die BJ und die rechtliche Prüfung explizit sehen müssen:**

### D1 — Novel-Food-Höchstmenge, Konflikt mit der eigenen PDP

Der Artikel nennt den Rechtsstatus (Extrakt zugelassen, Reinstoff nicht) und **nennt die
Höchstmenge von 6 mg pro Tag nicht**. Grund: Die LIFETIME-PDP führt 10 mg je Tagesportion,
das ist der bewusste BJ-Entscheid vom 29.07. Ein eigener Artikel, der die 6-mg-Bedingung
prominent erklärt, würde die eigene PDP im selben Atemzug widerlegen und Wettbewerbern eine
fertige Vorlage liefern.

Drei mögliche Wege, Entscheidung liegt bei BJ:

- **A (im Draft umgesetzt):** Rechtsstatus ja, Höchstmenge nein. Der Artikel bleibt ein
  Wissenschaftsartikel, die Regulatorik ist ein Nebensatz.
- **B:** Höchstmenge nennen und die eigene Abweichung offen erklären. Maximale Glaubwürdigkeit,
  erfordert aber vorher eine belastbare Position zur eigenen Dosierung.
- **C:** Regulatorik-Abschnitt ganz streichen. Nicht empfohlen, weil die Frage „ist das legal"
  bei Spermidin genauso gesucht wird wie bei NMN und wir sie dann jemand anderem überlassen.

Solange D1 nicht entschieden ist, bleibt „Spermidin und Novel Food" **kein** eigener Artikel
im Cluster.

### D2 — Sterblichkeitszahl aus der Bruneck-Studie

Der Abschnitt zu den Beobachtungsstudien nennt HR 0,76 und den Vergleich mit einer um
5,7 Jahre jüngeren Person, jeweils mit dem Vorbehalt „Zusammenhang, keine Ursache" im selben
und im folgenden Absatz. Das ist Studienberichterstattung, keine Produktaussage, und die Zahl
steht so in jedem Konkurrenztext, dort allerdings ohne Vorbehalt.

Falls die rechtliche Prüfung den Mortalitätsbezug im Umfeld eines Shops nicht tragen will:
Absatz ersatzlos streichen und den H2 durch den bereits vorhandenen Satz aus dem
Nichtbelegt-Abschnitt abdecken. Der Artikel bleibt ohne diesen Abschnitt vollständig.

---

## Bildassets (fertig, am CDN, im Body verdrahtet)

Drei eigene SVGs, jedes für diesen Artikel gezeichnet, nach dem Muster der NMN-Serie
(Karten-Trio, Prozessgrafik, Fußzeile mit Quelle plus Einordnungssatz). Quellen liegen in
`svg-src/`, hochgeladen als GenericFile mit Alt-Text.

| Datei | Rolle | Inhalt | CDN |
|---|---|---|---|
| `spermidin-molekuel.svg` | Hero | Kette mit drei Stickstoffgruppen, Summenformel, Molmasse, Vorkommen | `.../files/spermidin-molekuel.svg?v=1786374760` |
| `spermidin-in-lebensmitteln.svg` | Abschnitt Lebensmittel | drei Gehaltsklassen je 100 g, Analogie zu `nmn-in-lebensmitteln.svg` | `.../files/spermidin-in-lebensmitteln.svg?v=1786374760` |
| `spermidin-studien-dosis.svg` | Abschnitt Humanstudien | Balken der vier Studiendosen gegen das Band der Ernährungszufuhr 5 bis 15 mg | `.../files/spermidin-studien-dosis.svg?v=1786374760` |
| `cover-was-ist-spermidin.png` | Artikelcover | Serie aus `docs/blog-cover-generator.py`, Eintrag ergänzt | `.../files/cover-was-ist-spermidin.png?v=1786374761` |

Basis-URL jeweils `https://cdn.shopify.com/s/files/1/0621/2173/8340/`. Alle vier liefern
HTTP 200 mit korrektem Content-Type. Die Dateien liegen in Shopify Files und sind erst
sichtbar, wenn der Artikel veröffentlicht wird.

Die dritte Grafik trägt den eigentlichen Befund des Artikels: 0,9 und 1,2 mg der
Gedächtnisstudien sind neben dem Ernährungsband optisch kaum sichtbar, 40 mg der
Sicherheitsstudie laufen weit darüber hinaus. Der Wert der eigenen PDP taucht bewusst
nicht auf, siehe D1.

Ein früher Entwurf hatte eine vierte Grafik zu den Evidenzebenen. Gestrichen, weil sie eine
Kopie von `nmn-evidenz-ebenen.svg` gewesen wäre und die Dosisgrafik denselben Platz besser nutzt.

---

## Aufbau (Baukasten, Playbook §6)

1. TL;DR-Absatz, 56 Wörter, beantwortet die Titelfrage
2. Statushinweis kursiv (Extrakt zugelassen, keine Health Claims, keine Verzehrempfehlung)
3. Hero-SVG `spermidin-molekuel.svg`
4. H2 Was ist Spermidin?
5. H2 In welchen Lebensmitteln steckt Spermidin? (Tabelle, Zufuhrschätzungen, SVG `spermidin-in-lebensmitteln.svg`)
6. H2 Was wurde beim Menschen untersucht? (Studientabelle, 5 Zeilen, SVG `spermidin-studien-dosis.svg`) — **CTA folgt hier**
7. H2 Was zeigen Zell- und Tierversuche?
8. H2 Was sagen Beobachtungsstudien zur Ernährung? (D2)
9. H2 Was ist bisher nicht belegt?
10. H2 Wie ist Spermidin in der EU geregelt? (D1)
11. H2 Das Wichtigste in Kürze (Handlungsebene, nicht die TL;DR paraphrasiert)
12. Quellenliste mit DOI, Disclaimer

`custom.takeaways` (Metafeld, Kurzbox oben) wird bewusst antwortorientiert getextet und
unterscheidet sich damit vom H2 „Das Wichtigste in Kürze" am Ende, das eine Checkliste ist.
Entwurf für das Metafeld:

```
Spermidin ist ein Polyamin, das in jeder Körperzelle vorkommt und über Weizenkeime, Sojabohnen und gereiften Käse aufgenommen wird.
Die Mischkost liefert je nach Land 5 bis 15 mg pro Tag, eine offizielle Zufuhrempfehlung gibt es nicht.
Kontrollierte Studien am Menschen sind klein und kurz. Die längste über zwölf Monate fand keinen Unterschied zu Placebo.
Zugelassen ist in der EU der Extrakt aus Weizenkeimen, nicht isoliertes Spermidin. Gesundheitsbezogene Angaben gibt es für Spermidin keine.
```

---

## Interne Verlinkung

| Von | Nach | Zweck |
|---|---|---|
| Dieser Artikel (CTA) | `/products/spermidin-kapseln` | Conversion |
| `/products/spermidin-kapseln` | dieser Artikel | Entwaisung, ein Satz im Beschreibungsteil |
| `/pages/science` | dieser Artikel | Autoritätsfluss |
| Cluster-2-Artikel 2 (Resveratrol) | dieser Artikel | Nachbarschaft, sobald gebaut |

Vor dem Setzen jedes Ziels die Live-Seite auf tatsächlichen Inhalt prüfen, nicht nur auf
HTTP 200 (Memory `feedback_linkziele_pruefen`).

---

## Live-Gang, am 2026-08-10 abgearbeitet

1. ✅ D1 (Variante A) und D2 (bleibt) von BJ freigegeben, Body unverändert übernommen.
2. ✅ Bilder: drei SVGs und das Cover liegen in Shopify Files, CDN-URLs fest im Body.
3. ✅ Template zuerst gepusht (`--allow-live`, Theme 192529400183), dann der Artikel angelegt,
   damit `templateSuffix` nicht ins Leere zeigt.
4. ✅ `articleCreate` in Blog `gid://shopify/Blog/84651049060`: Titel, Handle, Body, Autor
   Benedikt Junker, Cover mit Alt-Text, Tag `Longevity-Grundlagen`, Summary,
   `custom.takeaways` und `custom.reviewed_date`. `custom.author_name` und
   `custom.reviewer_name` bewusst leer gelassen.
5. ✅ Live verifiziert: HTTP 200, Kicker, Byline mit Limmroth, 9 Min. Lesezeit,
   Takeaways-Box, Auto-TOC, alle drei Grafiken, beide Tabellen, CTA auf
   `/products/spermidin-kapseln`, FAQ-Accordion mit 6 Fragen, BlogPosting- und
   FAQPage-Schema, `reviewedBy` per `@id` auf `/pages/aerzte#limmroth`.
6. ✅ `docs/live-pages-map.md` nachgezogen.

## Danach offen

- **Entwaisung:** Ein Satz plus Link von `/products/spermidin-kapseln` auf den Artikel fehlt
  noch. Das ist ein Eingriff in die Live-PDP-Beschreibung und braucht eine eigene Runde.
- Link von `/pages/science` auf den Artikel.
- Cluster 2, Artikel 2: Resveratrol (446 Impressionen, Position ~22).
- Der Artikel ist der kanonische Ort für Definition und Evidenzlage. Folgeartikel verweisen
  darauf, statt beides erneut zu erklären.
