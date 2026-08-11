---
status: snapshot
last_review: 2026-08-11
canonical_for: agedna-chatgpt-status-2026-08-11
depends_on:
  - docs/geo-prompt-baseline-2026-07-29.md
  - docs/geo-action-plan.md
  - docs/age-dna-geo/age-dna-geo-playbook.md
  - docs/age-dna-product-fact-sheet.md
---

# Warum ChatGPT NMN verkauft und den AGE&DNA-Test nicht

Momentaufnahme vom 11.08.2026. Alle Zahlen selbst erhoben (GA4, Google Search Console,
Live-Abrufe, Shopify Admin API). Externe Recherche adversarisch gegengeprüft; widerlegte
Behauptungen stehen in §7.

## 1. Der Befund in einer Tabelle

GA4-Channel „AI Assistant", 13.07. bis 11.08.2026. Die Quelle ist zu 100 % `chatgpt.com`.

| | NMN | AGE&DNA |
|---|---:|---:|
| Sessions | 25 (+2 auf Blogartikel) | 4 |
| Item Views | 38 | 6 |
| Add-to-Cart | 8 | **0** |
| Käufe | **5** | **0** |
| Umsatz | 195,50 € | 0 € |

Die Conversion auf der Testseite ist **nicht** das Problem. Das Problem ist, dass von
35 ChatGPT-Sessions überhaupt nur 4 auf dem Test landen. ChatGPT empfiehlt den Test nicht.

Das deckt sich exakt mit der Prompt-Baseline vom 29.07.: Im Cluster „AGE&DNA generisch"
lag die Mention Rate über 60 Antworten bei **0,0 %**.

## 2. Die Ursache liegt eine Ebene tiefer: organische Sichtbarkeit

Search Console, `sc-domain:lifetime-health.de`, 26.07. bis 08.08.2026:

| | NMN / NAD | Alterstest / Epigenetik |
|---|---:|---:|
| Queries | 28 | 41 |
| Impressionen | **4.857** | **610** |
| Gewichtete Position | **9,1** | **22,0** |
| Anteil Impressionen auf Seite 1 | **92 %** | **21 %** |

ChatGPT Search zieht seine Belege aus den oberen Websuchtreffern. NMN steht dort, der
Alterstest steht auf Seite 2 bis 3. Das ist die gesamte Erklärung für den Umsatzunterschied.

Die kommerziell wichtigsten Einzelqueries stehen knapp daneben, nicht weit weg:

| Query | Impressionen | Position |
|---|---:|---:|
| biologisches alter test | 192 | 12,5 |
| epigenetik test | 69 | 14,5 |
| alterstest | 30 | 23,6 |
| biologisches alter testen | 19 | 22,8 |
| epigenetischer alterstest | 10 | 30,5 |

## 3. Warum NMN dort steht: der Cluster-Unterschied

| | NMN-Cluster | AGE-Cluster |
|---|---:|---:|
| Artikel | 9 | 11 |
| davon mit FAQPage-Schema | **9 / 9** | **0 / 11** (Stand vor heute) |
| davon 2026 aktualisiert | **9 / 9** | **2 / 11** |
| Hub | `/pages/nmn-deutschland` | `/pages/biologisches-alter-testen` |
| Vergleichsseite live | ja (`nmn-gehalt-marktanalysen`, `nmn-vs-nr`) | **nein** |

Neun AGE-Artikel wurden zuletzt 2023 oder 2024 angefasst. Der NMN-Leitartikel wurde
zuletzt am 10.08.2026 aktualisiert und bringt allein 6.840 Impressionen auf Position 8,7,
mehr als der gesamte AGE-Cluster zusammen.

## 4. Was bereits funktioniert und den Weg beweist

Die zwei am 03./04.08. veröffentlichten AGE-Artikel ranken nach einer Woche auf genau den
frageförmigen Suchanfragen, in die ein LLM eine Nutzerfrage zerlegt:

| Query | Position |
|---|---:|
| welcher epigenetische alterstest ist der zuverlässigste | **1,0** |
| welcher altersdiagnostik-test hat die stärkste wissenschaftliche … | **4,0** |
| kann man das biologische alter wirklich messen … | 6,0 |
| epigenetischer alterstest | 7,5 |
| dunedinpace test deutschland | 8,5 |

Das Rezept wirkt. Es gibt davon nur zwei Stück statt neun.

## 5. Technischer Zustand: unauffällig

Geprüft am 11.08.2026, deshalb bewusst **nicht** auf der Maßnahmenliste:

- OAI-SearchBot, GPTBot, ChatGPT-User, PerplexityBot und Google-Extended erhalten auf der
  PDP alle HTTP 200 mit identischen 342.961 Bytes. Serverseitig gerendert.
  *Einschränkung:* Das prüft nur User-Agent-Blocking auf robots-Ebene, nicht ein
  IP-basiertes Bot-Management einer vorgelagerten Schicht.
- PDP-Schema vollständig: Product, Offer, ProductGroup, Brand, AggregateRating (4,7 / 111),
  FAQPage mit 12 Fragen, BreadcrumbList, Organization.
- Produktkategorie korrekt (`Medizinische Tests`), Titel seit dem Umbau
  „Epigenetischer AGE & DNA-Test für zuhause", Preis 349 € / 429 €, `InStock`.
- Hub ist indexierbar: Canonical sauber, im Sitemap, kein noindex.
- Beide Produkte sind auf denselben vier Vertriebskanälen publiziert. Der Kanal erklärt
  den Unterschied **nicht**.

## 6. Umgesetzt am 11.08.2026

**FAQPage-Schema für beide AGE-Artikel** (`templates/article.genauigkeit-alterstest.json`,
`templates/article.genotyping-epigenetik.json`), live gepusht und verifiziert.

Bewusst **nicht** die 12 generischen Panel-Fragen, die besitzt der Hub bereits. Stattdessen
je sechs vertiefende Folgefragen ohne Überschneidung (höchste Ähnlichkeit zu einer
Hub-Frage: 0,60):

- Genauigkeitsartikel: Anbieter-Abweichungen, Test-Retest-Reliabilität, Uhren-Generationen
  (Horvath / PhenoAge / DunedinPACE), Messstellen-Auswahl nach Sugden 2020, Telomere nach
  Marioni 2016, Deutung eines Werts unter dem Kalenderalter.
- Genotyping-Artikel: Alterswert aus Gentest, Genotyp-Stabilität, warum Speichel keine
  Blutwerte liefert, Gewebespezifität, Deutung genetischer Risikoangaben, ob beide Ebenen
  nötig sind.

Alle Antworten innerhalb der Freigabegrenzen des Fact-Sheets: keine eigene CpG-Zahl, keine
Genauigkeitszahl, keine Diagnose-Claims, keine gesperrten Reportzahlen.

## 7. Maßnahmen, priorisiert

### A — sofort umsetzbar

| # | Maßnahme | Aufwand | Wirkung |
|---:|---|---|---|
| 1 | **Die 9 veralteten AGE-Artikel auf NMN-Niveau ziehen**: FAQ-Block, Quellen, Aktualisierung. Das ist die direkte Kopie dessen, was bei NMN funktioniert hat. Vorher Claim-Review, die Texte sind von 2023/2024. | groß | hoch |
| 2 | **Vergleichsseite bauen** (§B1 zuerst freigeben) und aus Hub und PDP prominent verlinken. | mittel | hoch |
| 3 | **Stale Metafelder bereinigen**: `custom.produktbullet_1` trägt „180+ Reports", `produktbullet_2` trägt „10+ Scores". Beide Zahlen sind laut Fact-Sheet dauerhaft gesperrt. Sie werden auf der AGE-PDP nicht gerendert, stehen aber im Produktdatensatz und damit in jeder API-Antwort. | klein | niedrig |
| 4 | **Alt-Text des Produktbilds** ist leer (`featuredMedia.alt: ""`). | klein | niedrig |

### B — braucht Freigabe

| # | Maßnahme | warum blockiert |
|---:|---|---|
| 1 | **Vergleichsseite `/pages/epigenetischer-alterstest-vergleich` freigeben.** Manuskript liegt fertig in `money-piece-v3-2026-08-11.md`, URL ist 404. Trägt `publication_gate: science-and-legal-review` und eine Vor-Veröffentlichungs-Checkliste. | Science- und Legal-Review, Preise am Bautag neu prüfen |
| 2 | **Anbieternamen auf den Hub.** Der Hub nennt aktuell **null** Wettbewerber. Ein LLM zieht Anbieter-Sets aus Seiten, die Anbieter-Sets enthalten. | wertende Aussagen über Wettbewerber, §6 UWG |
| 3 | **Methoden-Steckbrief.** „CpG" kommt auf der PDP **0-mal** vor. epiAge, Cerascreen und TruDiagnostic liefern je einen zitierbaren Methodensatz mit Zahl. Ohne extrahierbaren Methodenfakt kann ein Modell uns bei Methodenfragen nicht nennen. | eigene CpG-Zahl ist bis zur Methodikfreigabe gesperrt |

### C — braucht Dritte

| # | Maßnahme | Ansatz |
|---:|---|---|
| 1 | **slowrecovery.de** setzt den Satz „Drei Anbieter dominieren den DACH-Markt: cerascreen, epiAge und neotes" und bewertet methodisch. Genau diese Marktdefinition übernimmt ein Modell. Testkit plus Methodendoku anbieten, ohne Bewertungsvorgabe. Erst nach B3 sinnvoll. | Redaktionskontakt |
| 2 | **medizinische-tests.de/test/longevity-test** listet aktuell genau *einen* Anbieter bei offengelegter Bewertungsmethodik. Günstigster erreichbarer Listungsplatz im DE-Korpus. | Aufnahmeantrag |
| 3 | **vitatopia.de** ist die einzige gefundene deutsche Vergleichstabelle, die LIFETIME führt, verlinkt aber auf die `.com` (301) und nennt „6 bis 8 Wochen" statt 6. | Korrekturbitte |

## 8. Adversarisch widerlegt, nicht umsetzen

Diese Punkte kamen aus der Recherche und haben die Gegenprobe **nicht** überstanden:

- **„23 Kategorien auf der PDP widerspricht 187 Reports in 16 Kategorien im Blog."**
  Falsch. Live nachgezählt: „187" und „16 Kategorien" kommen im sichtbaren Text **keiner**
  Seite vor. Das wurde am 06.08. bereits bereinigt. Der Widerspruch existiert nur noch in
  den Metafeldern (§7 A3).
- **„llms.txt ausbauen."** Cargo-Kult. Google ignoriert die Datei erklärtermaßen, OpenAI
  wertet sie nur in Agenten-Kontexten aus, nicht in ChatGPT-Antworten. Unsere Datei ist
  reiner Shopify-Boilerplate ohne Markeninhalt, das ist aber kein Sichtbarkeitsproblem.
- **„Bing Webmaster Tools ist der wichtigste Hebel, weil ChatGPT zu 87 % Bing spiegelt."**
  Die 87 % stammen aus einer einzigen Studie mit 100 Queries am SearchGPT-Prototyp, vom
  Autor selbst als „directional" bezeichnet.
- **„Trustpilot-Profil und Wikidata-Eintrag sind nötig."** Entkräftet: TruDiagnostic ist
  der zweitmeistzitierte Anbieter im Feld und hat 2,6 Sterne aus 4 Bewertungen.
- **„Schema-Multiplikatoren (3,2x Zitationen, FAQPage +30 %)."** Aus Agenturblogs ohne
  Methodik. Die einzige kontrollierte Untersuchung findet für JSON-LD allein nur
  „modest improvements". Das FAQ-Schema aus §6 ist trotzdem richtig, aber wegen der
  Query-Abdeckung, nicht wegen eines Schema-Multiplikators.
- **„Eigenen OpenAI-Produktfeed beantragen."** Für Shopify-Shops gegenstandslos, der
  Katalog ist bereits integriert. Das Merchant-Feed-Programm ist faktisch US-beschränkt.
- **„Affiliate-Programm mit 10 bis 12 % aufsetzen, weil Portale nur listen wer zahlt."**
  Die Gegenprobe kippt die Mechanik: Bei kommerziellem Intent wurden Shop-Seiten abgerufen,
  die Affiliate-Blogs tauchten dort gar nicht auf.

## 9. Messplan

**Nicht an GA4-Sessions messen.** Nur etwa 18 % der ChatGPT-Konversationen lösen überhaupt
eine Websuche aus. 35 Sessions in 30 Tagen sind für diese Mechanik kein Ausreißer.

Primäre Kennzahl bleibt die **Mention Rate im Cluster „AGE&DNA generisch"**, heute 0,0 %.

1. **Tag 0:** Prompt-Panel v2 im Ist-Zustand fahren, die 40 Prompts unverändert plus
   Methoden- und Vergleichsprompts. Neu und zwingend: **pro Antwort die zitierten URLs
   mitschreiben**. Ohne das lässt sich später nicht unterscheiden, ob eine Nennung aus
   unseren Seiten oder aus dem Modellgedächtnis kommt.
2. **Tag 30:** Panel identisch wiederholen. Schwelle generisch: von 0,0 % auf mindestens
   10 % Mention. Zusätzlich Search-Console-Position der AGE-Queries gegen die Baseline in
   §2 halten (gewichtete Position 22,0, Seite-1-Anteil 21 %).
3. **Entscheidungsweiche:** Steigt die Mention Rate und werden eigene URLs zitiert, ist der
   Onsite-Hebel bestätigt, dann weiter in eigene Vergleichs- und Methodenseiten. Bleibt sie
   bei 0 % trotz gestiegener Rankings, verschiebt sich das Budget auf §7 C.
