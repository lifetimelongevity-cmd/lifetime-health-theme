---
status: snapshot
last_review: 2026-08-11
canonical_for: gsc-baseline-age-altbestand-vor-upgrade
---

# Search-Console-Ausgangsstand der neun AGE-Altartikel

Aufgenommen am 11.08.2026, **vor** dem Upgrade. Zweck: Ohne diesen Stand lässt sich nach
der Überarbeitung nicht mehr belegen, ob sie gewirkt hat. Zeitraum 90 Tage,
13.05. bis 08.08.2026 (GSC hängt zwei bis drei Tage nach).

> **Vier Handles haben sich am 11.08. geändert. Vor der Nachmessung lesen.**
> Die Tabelle unten führt die Artikel unter ihrem **alten** Handle. Wer dieselbe
> Abfrage in 30 Tagen wiederholt und stur nach diesen Pfaden filtert, findet vier
> Artikel nicht wieder und liest das fälschlich als Absturz. Die Search Console
> zählt nach der Umstellung auf den neuen Pfad, der alte läuft per 301 weiter.
>
> | alter Pfad | neuer Pfad | Grund |
> |---|---|---|
> | `biomarker-als-schlussel-zur-langlebigkeit-was-dein-blut-und-speichel-uber-dein-biologisches-alter-verraten` | `biomarker-biologisches-alter` | 104 Zeichen, im A1-Auftrag freigegeben |
> | `kann-ihr-lebensstil-ihr-biologisches-alter-zuruckdrehen` | `lebensstil-biologisches-alter` | „zurückdrehen“ ist rote Claim-Kategorie, im A1-Auftrag freigegeben |
> | `epigenetische-uhren-konnen-wir-das-altern-umkehren` | `epigenetische-uhren` | „das Altern umkehren“ in der URL, **nicht vorab freigegeben** |
> | `dna-tests-ein-tiefer-einblick-in-ihre-genetik` | `dna-test-arten` | Sie-Form in der URL, **nicht vorab freigegeben** |
>
> Die beiden unteren Änderungen folgen derselben Begründung, die BJ für die
> ersten beiden akzeptiert hat (0 Impressionen in 90 Tagen, es ist nichts zu
> verlieren), sind aber eine eigenmächtige Ausweitung. Wenn sie nicht gewollt
> sind, lassen sie sich per `articleUpdate` mit `redirectNewHandle: true`
> zurückdrehen; die 301 zeigt dann in die Gegenrichtung.
>
> **Für den Vorher-Nachher-Vergleich zählt ohnehin die Summe über alle neun
> Artikel**, nicht die Einzelzeile. Die Summe bleibt vergleichbar.

| Artikel | Queries | Impr | Klicks | gew. Position | beste Einzelposition |
|---|---:|---:|---:|---:|---:|
| `biologisches-alter-messen` | 0 | 0 | 0 | - | - |
| `biologisches-alter-verraet` | 25 | 137 | 0 | 59.6 | 8.5 |
| `epigenetik-erklaerung` | 19 | 35 | 0 | 30.8 | 11.0 |
| `dna-tests-einblick` | 0 | 0 | 0 | - | - |
| `epigenetische-uhren` | 0 | 0 | 0 | - | - |
| `gene-biologisches-alter` | 13 | 115 | 0 | 74.2 | 12.5 |
| `biomarker-langlebigkeit` | 4 | 5 | 0 | 43.6 | 31.0 |
| `lebensstil-biologisches-alter` | 1 | 1 | 0 | 9.0 | 9.0 |
| `biologie-des-alterns` | 0 | 0 | 0 | - | - |
| **Summe** | | **293** | **0** | | |

Zum Vergleich: Der NMN-Leitartikel allein bringt 6.840 Impressionen in 14 Tagen.

## Zielqueries je Artikel

**`biologisches-alter-messen`**

Keine Impressionen im Zeitraum.

**`biologisches-alter-verraet`**

| Query | Impr | Position |
|---|---:|---:|
| biologisches alter | 56 | 71.7 |
| kalendarisches alter | 22 | 8.5 |
| biologisches alter messen | 7 | 92.9 |
| biologisches alter definition | 6 | 76.8 |
| biologisches alter tabelle | 6 | 76.7 |

**`epigenetik-erklaerung`**

| Query | Impr | Position |
|---|---:|---:|
| epigenetik | 5 | 38.0 |
| epigenetik bedeutung | 4 | 27.5 |
| epigenetik definition | 3 | 27.0 |
| epigenetik einfach erklärt | 3 | 39.0 |
| epigenetische faktoren | 2 | 19.0 |

**`dna-tests-einblick`**

Keine Impressionen im Zeitraum.

**`epigenetische-uhren`**

Keine Impressionen im Zeitraum.

**`gene-biologisches-alter`**

| Query | Impr | Position |
|---|---:|---:|
| epigenetischer test | 47 | 86.9 |
| epigenetik test | 32 | 90.6 |
| epigenetischer alterstest | 8 | 42.8 |
| epigenetisches alter test | 8 | 59.4 |
| epigenetisches alter | 6 | 46.7 |

**`biomarker-langlebigkeit`**

| Query | Impr | Position |
|---|---:|---:|
| biomarker bluttest | 2 | 56.5 |
| biomarker test | 1 | 42.0 |
| hautalterung biomarker | 1 | 32.0 |
| welche biomarker gibt es | 1 | 31.0 |

**`lebensstil-biologisches-alter`**

| Query | Impr | Position |
|---|---:|---:|
| kann lebensstil gene verändern | 1 | 9.0 |

**`biologie-des-alterns`**

Keine Impressionen im Zeitraum.

## Nachmessung

Dieselbe Abfrage 30 Tage nach dem Upgrade wiederholen, gleicher 90-Tage-Zuschnitt.
Erfolgskriterium ist nicht der Klick, sondern die gewichtete Position und die Zahl der
Queries je Artikel. Klicks folgen erst, wenn die Position unter 10 liegt.
