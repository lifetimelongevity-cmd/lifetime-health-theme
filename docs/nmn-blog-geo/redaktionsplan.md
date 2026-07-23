---
status: living
last_review: 2026-07-06
canonical_for: nmn-blog-redaktionsplan
---

# NMN-Blog — Redaktionsplan (8 aktiv, 3 zurückgestellt)

Umsetzung des Clusters aus `nmn-blog-playbook.md`. Jeder Artikel folgt dem
„Für-KI-geschrieben"-Baukasten (Playbook §6) und der Themen-Besitz-Matrix (§5a).
Grundregel gegen Wiederholung: **jeder Artikel behandelt sein Besitz-Thema exklusiv, alles
andere = max. 1 Satz + interner Link.** Compliance: Claim-Ampel (§4), Subjekt ist immer die
Wissenschaft/das Molekül, nie das Produkt und nie „du".

> **Vor jeder Publikation:** Rechtsfreigabe je Artikel (Health-Claims-VO 1924/2006, HWG, Novel
> Food). Autor/Reviewer mit echten, zustimmenden Personen besetzen (E-E-A-T).

---

## Übersicht

| # | Artikel | Slug | Besitz-Thema | Format | Bestand | Status |
|---|---|---|---|---|---|---|
| 1 | Ist NMN in Deutschland legal? | `ist-nmn-in-deutschland-legal` | Rechtsstatus | Status-Box + Q&A | NEU | **Template gebaut** ✅ |
| 2 | NMN-Qualität erkennen | `nmn-qualitaet-erkennen` | Reinheit / CoA / Qualität | Checkliste | Rewrite `herstellung-und-qualitaet` | **Template gebaut** ✅ || 4 | NMN vs. NR | `nmn-vs-nr` | Vergleich NMN/NR | Vergleichstabelle | NEU | **LIVE** ✅ |
| 5 | Was ist NMN? | `was-ist-nmn` | Definition NMN / NAD⁺ (kanonisch) | Fließtext + Diagramm | Rewrite `was-ist-nmn-nicotinamid` | offen || 7 | NMN in der Forschung | `nmn-studien-wissenschaft` | Studienlage / Sicherheit | Studien-Timeline | Rewrite `nmn-und-science` | offen |
| 9 | Uthever NMN — was dahinter steckt | `uthever-nmn` | Markenrohstoff Uthever / EffePharm | Steckbrief + Q&A | NEU | **LIVE** ✅ |
| 10 | Novel-Food-/EFSA-Prozess | `novel-food-efsa-verfahren` | Zulassungsverfahren (Mechanik) | Prozess-Stufen / Ablauf | NEU | **LIVE** ✅ |
| 11 | NMN in der Welt | `nmn-in-der-welt` | Länder-Status weltweit | Länder-Vergleichstabelle | NEU | **LIVE** ✅ |
Alle Slugs unter `/blogs/longevity-blog/…`. Publikations-Reihenfolge: **1 → 2 → 9 → 10 → 11 → 4 → 5 → 7**
(Kauf-/Zitier-Hebel zuerst; Uthever #9 direkt nach Qualität, dann das Regulatorik-Trio #1/#10/#11.
Dosierung/Einnahme/Pulver-Kapseln erstmal zurückgestellt, siehe unten.)

---

## Cross-Link-Matrix (Hub-and-Spoke, dedup-sicher)

Jeder Artikel verlinkt nur die genannten Ziele; so entsteht kein doppelter Inhalt, nur Verweise.

| Artikel | Verlinkt auf |
|---|---|
| 1 Legal | Hub · #2 Qualität · #10 Verfahren · #11 Welt |
| 2 Qualität | Hub · #1 Legal · #9 Uthever · PDP |
| 4 NMN vs. NR | #5 Was ist NMN · #1 Legal |
| 5 Was ist NMN | #1 Legal · #7 Forschung |
| 7 Forschung | #5 Was ist NMN · #9 Uthever |
| 9 Uthever | #2 Qualität · #1 Legal · #10 Verfahren · #7 Forschung · PDP |
| 10 Verfahren | #1 Legal · #9 Uthever · #11 Welt |
| 11 Welt | #1 Legal · #10 Verfahren |

Hub = `/pages/nmn-deutschland` · PDP = `/products/lifetime-nmn`.

---

## Artikel 1 — Ist NMN in Deutschland legal? ✅

Fertig gebaut. Spec: `01-ist-nmn-in-deutschland-legal.md` · Template:
`templates/article.ist-nmn-in-deutschland-legal.json`. Hier nur als Anker gelistet.

---

## Artikel 2 — NMN-Qualität erkennen ✅

> **Template gebaut (2026-07-07).** Spec: `02-nmn-qualitaet-erkennen.md` · Template:
> `templates/article.nmn-qualitaet-erkennen.json` (self-contained, wie Artikel 1). Noch nicht live.
> Gegroundet an den echten LIFETIME-NMN-Specs (>99,9 %, Uthever®, Charge unabhängig laborgeprüft,
> Prüfbericht öffentlich, GMP). Spec unten bleibt die Plan-Referenz.

- **Title-Tag:** `NMN-Qualität erkennen: Reinheit, CoA & Labortests im Check`
- **Ziel-Query:** „beste nmn worauf achten", „nmn reinheit erkennen", „nmn coa"
- **Besitz (exklusiv):** alle Qualitätskriterien — Reinheit % / HPLC, CoA je Charge,
  Schwermetalle & mikrobiologische Grenzwerte, akkreditiertes Labor (ISO 17025), Rohstoff
  (z. B. Uthever), Verpackung/Lagerung, Herkunft. **Nur verlinkt:** Rechtsstatus → #1, Dosierung → #3.
- **Format:** Checkliste.
- **H2-Fragen:**
  1. Woran erkenne ich hochwertiges NMN?
  2. Was bedeutet Reinheit ≥ 99 % und wie wird sie gemessen?
  3. Was ist ein Analysezertifikat (CoA) und warum ist es wichtig?
  4. Welche Verunreinigungen sollte ein Labortest ausschließen?
  5. Was sagt ein Marken-Rohstoff wie Uthever aus?
  6. Woran erkenne ich Marketing-Behauptungen ohne Beleg?
- **FAQ:** Was bedeutet HPLC bei NMN? · Sollte NMN ein CoA je Charge haben? · Was ist Uthever-NMN? ·
  Woran erkenne ich minderwertiges NMN? · Wie sollte NMN verpackt und gelagert sein?
- **🟢 Grün-Leitplanke:** Qualitätskriterien sind reine Produkteigenschaften = erlaubt.
  „Reinheit ≥ 99 % per HPLC ist ein Qualitätsmerkmal" ✓ · „hochwertiges NMN wirkt bei dir besser" ✗.
  Kein Gesundheits- oder Wirkbezug — dieser Artikel ist der sicherste im Cluster.

---

## Artikel 9 — Uthever NMN: was dahinter steckt ✅ LIVE

> **✅ LIVE seit 2026-07-07** unter `/blogs/longevity-blog/uthever-nmn` (Article-ID `1024420446583`,
> Rechtsfreigabe BJ, Theme gepusht, veröffentlicht & gerendert verifiziert). Spec: `09-uthever-nmn.md` ·
> Template: `templates/article.uthever-nmn.json` (lt-article + crs-faq-accordion, wie #1/#2), Body inkl.
> 2 markenkonformer SVGs. Studienzitat **PubMed-verifiziert**: Huang 2022, Frontiers in Aging 3:851698,
> DOI 10.3389/fragi.2022.851698 (66 TN, 300 mg/Tag, Tag 30 +11,3 %, Tag 60 +38 % vs. 14,3 %, EffePharm =
> herstellerfinanziert). **Reziprok-Link in #2 → #9 gesetzt.**

- **Title-Tag:** `Uthever NMN: Was hinter dem Markenrohstoff steckt`
- **Ziel-Query:** „uthever nmn", „was ist uthever", „uthever nmn erfahrungen", „uthever studie"
- **Besitz (exklusiv):** Uthever® als Markenrohstoff — Hersteller EffePharm, Reinheit > 99 %
  (Zusammensetzung inkl. Rest-NR/Nicotinamid), die klinische Uthever-Studie (66 TN, *Frontiers in
  Aging*), Zertifizierungen, und die Brücke EffePharm ↔ EU-Novel-Food-Antrag. **Nur verlinkt:**
  Qualität → #2, Rechtsstatus → #1, Forschung → #7.
- **Format:** Steckbrief / Fakten-Box + Q&A (bewusst anders als die Checkliste in #2).
- **H2-Fragen:**
  1. Was ist Uthever NMN?
  2. Wer steckt hinter Uthever? *(EffePharm)*
  3. Wie rein ist Uthever und woraus besteht der Rest?
  4. Was zeigt die klinische Uthever-Studie?
  5. Welche Rolle spielt EffePharm im EU-Zulassungsverfahren? *(→ #1)*
  6. Woran erkenne ich echtes Uthever in einem Produkt?
- **FAQ:** Was ist Uthever NMN? · Wer stellt Uthever her? · Wie rein ist Uthever? ·
  Gibt es eine Studie zu Uthever? · Ist Uthever besser als anonymes NMN?
- **Belegte Fakten (2026-07-07, PubMed-verifiziert):** Uthever® = Markenrohstoff von EffePharm Ltd.;
  Reinheit > 99 % (Rest ~1 % NR + Nicotinamid); klinische Studie mit **66** Teilnehmern (40–65 J.,
  300 mg/Tag), Huang 2022, *Frontiers in Aging* 3:851698 (DOI 10.3389/fragi.2022.851698, herstellerfinanziert),
  NAD/NADH +11,3 % (Tag 30) / +38 % (Tag 60) vs. Placebo +14,3 %; EffePharm ist zugleich
  EFSA-Novel-Food-Antragsteller (Brücke zu #1). (NICHT die Yi-2022-GeroScience-Studie, 80 TN — andere RCT.)
- **🟢 Grün-Leitplanke:** Rohstoff-, Hersteller-, Reinheits- und Studienfakten sind erlaubt, aber
  **Studienergebnis nur als Studienbericht** (Reporting-Sprache), nie als Nutzerversprechen.
  „In einer Studie mit Uthever stieg der NAD⁺/NADH-Spiegel um 38 %" ✓ · „Uthever gibt dir 38 %
  mehr Energie" ✗. Der NAD⁺-Anstieg ist ein Biomarker, **kein** zugelassener Gesundheits-Claim, nicht
  auf Wohlbefinden übertragen. Die Studie ist **herstellerfinanziert** → transparent kennzeichnen (E-E-A-T).
- **Beim Live-Gang von #9:** die Uthever-Erwähnung in Artikel 2 (Qualität) auf diesen Artikel
  verlinken („erklär einmal, verlinke sonst"). Erst setzen, wenn #9 live ist (sonst toter Link).

---

## Artikel 10 — Novel-Food-/EFSA-Prozess

- **Title-Tag:** `Novel Food & EFSA: Wie das EU-Zulassungsverfahren für NMN läuft`
- **Ziel-Query:** „novel food verfahren", „efsa zulassung nmn", „wie wird nmn zugelassen",
  „novel food unionsliste", „wann wird nmn zugelassen"
- **Besitz (exklusiv):** die *Mechanik* des Verfahrens — Novel-Food-VO (EU) 2015/2283,
  Verfahrensstufen (Antrag → EFSA-Risikobewertung → Durchführungsrechtsakt der EU-Kommission →
  Unionsliste), Rollenverteilung EFSA ↔ Kommission, Konsultationsverfahren zum Novel-Food-Status,
  Transparenz (Open EFSA), Stand der NMN-Anträge (mehrere Antragsteller inkl. EffePharm).
  **Nur verlinkt:** „ist es legal" → #1, Uthever/EffePharm → #9, Weltstatus → #11.
- **Format:** Prozess-Stufen / Ablauf-Darstellung (bewusst anders als Status-Box in #1).
- **H2-Fragen:**
  1. Was ist das Novel-Food-Verfahren?
  2. Welche Stufen durchläuft ein Antrag? *(Ablauf)*
  3. Was macht die EFSA — und was die EU-Kommission?
  4. Was ist die Unionsliste zugelassener neuartiger Lebensmittel?
  5. Wo steht NMN aktuell im Verfahren?
  6. Was passiert als Nächstes und wie lange dauert es?
- **FAQ:** Wer entscheidet über die Novel-Food-Zulassung? · Wie lange dauert ein Novel-Food-Verfahren? ·
  Was ist der Unterschied zwischen EFSA-Bewertung und Zulassung? · Was ist die Unionsliste? ·
  Haben mehrere Firmen NMN-Anträge gestellt?
- **Belegte Fakten (2026-07-07 verifiziert):** VO (EU) 2015/2283; EFSA positive Opinion 2026
  (EffePharm-Antrag); Kommissions-Rechtsakt / Unionslisten-Eintrag ausstehend; mehrere NMN-Anträge
  in der Pipeline (Open-EFSA-Updates Q1 2026).
- **🟢 Grün-Leitplanke:** reines Verfahrens-/Rechtswissen = erlaubt, kein Gesundheitsbezug.
  Neutral bleiben, **keine** „bald zugelassen, jetzt kaufen"-Suggestion.
- **Beim Live-Gang:** in Artikel 1 die Passagen zu Novel Food / EFSA auf diesen Artikel verlinken
  (erst wenn #10 live ist).

---

## Artikel 11 — NMN in der Welt ✅ LIVE

> **✅ LIVE seit 2026-07-07** unter `/blogs/longevity-blog/nmn-in-der-welt` (Article-ID `1024422936951`).
> Spec: `11-nmn-in-der-welt.md`. Länderfakten web-verifiziert; **Korrekturen ggü. Plan unten:** USA-Kehrtwende
> ist 09+12/2025 (nicht „Feb 2026"); Australien ist als **Arzneimittel** zugelassen (TGA 10.12.2025, 500 mg/Tag),
> nicht als freies Supplement. Reziprok-Links #1 → #11 und #10 → #11 gesetzt. Belegte Fakten unten teils überholt → Spec ist maßgeblich.

- **Title-Tag:** `NMN weltweit: Wo NMN zugelassen und am beliebtesten ist`
- **Ziel-Query:** „nmn usa erlaubt", „nmn japan", „wo ist nmn zugelassen", „nmn legal länder", „nmn weltweit"
- **Besitz (exklusiv):** Länder-Status-Vergleich — USA, Japan, Kanada, Australien/NZ, China, EU/DE;
  wo NMN als NEM zugelassen ist, wo am beliebtesten, wo produziert. **Nur verlinkt:**
  EU-/DE-Detail → #1, Verfahren → #10.
- **Format:** Länder-Vergleichstabelle (Land · Status als NEM · Besonderheit).
- **H2-Fragen:**
  1. In welchen Ländern ist NMN als Nahrungsergänzung erlaubt?
  2. NMN-Status weltweit im Überblick *(Tabelle)*
  3. Wie ist der Status in den USA?
  4. Warum ist NMN in Japan so verbreitet?
  5. Was gilt in Australien, Kanada und China?
  6. Und in der EU bzw. Deutschland? *(→ #1)*
- **FAQ:** Ist NMN in den USA legal? · Ist NMN in Japan zugelassen? · In welchem Land ist NMN am
  beliebtesten? · Ist NMN in China erlaubt? · Warum ist NMN in der EU nicht zugelassen?
- **Belegte Fakten (2026-07-07 verifiziert):**
  - **USA:** rechtmäßig als Supplement; FDA hat die 2022er-Ausgrenzung rückgängig gemacht (Sept 2025,
    bestätigt Dez 2025, gilt Feb 2026).
  - **Japan / Kanada / Australien / NZ:** rechtmäßig als Supplement bzw. Listed Medicine. Australien:
    TGA-Zulassung (SyncoZymes) 10.12.2025, max. 500 mg/Tag, nur Erwachsene, 2 Jahre Exklusivität.
  - **China:** als Kosmetik-Zutat erlaubt, in Lebensmitteln/Supplements **verboten** (NHC) — obwohl
    China größter NMN-Produzent ist.
  - **EU / DE:** Novel Food, noch nicht zugelassen.
  - **Am beliebtesten:** Japan und USA.
- **🟢 Grün-Leitplanke:** Länder-Rechtsstatus + Marktfakten = erlaubt, kein Health Claim.
  „Am beliebtesten" als Marktaussage, nicht als Wirkversprechen. Ländergesetze ändern sich schnell →
  klarer „Stand"-Hinweis + Aktualisierungsdatum, vor jedem Update neu verifizieren.
- **Beim Live-Gang:** in Artikel 1 den USA-/UK-Abschnitt auf diesen Artikel verlinken (erst wenn #11 live ist).

---

## Artikel 3 — NMN-Dosierung in Studien ⏸ ZURÜCKGESTELLT

> Erstmal weglassen (BJ, 2026-07-07). Nicht im aktiven Plan; Spec bleibt unten als Referenz.

- **Title-Tag:** `NMN-Dosierung: Welche Mengen in Studien untersucht wurden`
- **Ziel-Query:** „nmn dosierung", „wie viel nmn pro tag"
- **Besitz (exklusiv):** in Studien verwendete Mengen, EFSA-Referenzmenge (300 mg/Tag),
  Studiendauer, Dosis-Bandbreiten. **Nur verlinkt:** Rechtsstatus → #1, Was ist NMN → #5, Einnahme → #6.
- **Format:** Studien-Tabelle (Studie · Teilnehmer · Dosis · Dauer).
- **H2-Fragen:**
  1. Welche NMN-Dosierungen wurden in Studien untersucht?
  2. Was nennt die EFSA als sichere Menge?
  3. Wie unterscheiden sich die Dosierungen in den Studien? *(Tabelle)*
  4. Warum ist eine höhere Menge nicht automatisch sinnvoller?
  5. Wovon hängt eine Menge grundsätzlich ab?
- **FAQ:** Wie viel NMN wurde in Humanstudien verwendet? · Was ist die von der EFSA genannte sichere
  Menge? · Gibt es eine offizielle Tagesdosis für NMN? · Macht eine höhere Dosis mehr Sinn? ·
  In welchem Zeitraum wurde NMN in Studien gegeben?
- **🟢 Grün-Leitplanke:** Nur **Studienfakten**, keine Einnahmeempfehlung. „Studien nutzten
  typischerweise 250–500 mg/Tag" ✓ · „Die EFSA nennt 300 mg/Tag als sicher" ✓ ·
  „Nimm 500 mg täglich für mehr Energie" ✗. Titel bewusst „in Studien untersucht", nicht „so viel solltest du nehmen".

---

## Artikel 4 — NMN vs. NR ✅ LIVE

> **✅ LIVE seit 2026-07-08** unter `/blogs/longevity-blog/nmn-vs-nr` (Article-ID `1024423985527`,
> Theme gepusht, veröffentlicht 05:20 UTC & gerendert verifiziert: HTTP 200, lt-article, beide SVGs,
> FAQPage, Byline). Spec: `04-nmn-vs-nr.md`. **Faktencheck belegt:** NR ist in der EU als Novel Food
> zugelassen (DVO (EU) 2020/16, Antragsteller ChromaDex, max. 300 mg/Tag, Unionsliste; erweitert durch
> (EU) 2022/1160), NMN nicht (EFSA-Positivbewertung 2026, Kommissions-Zulassung ausstehend). Studienlage
> bewusst ohne „Sieger" (Palmer 2021 DOI 10.1002/agm2.12170, Zhang 2025 DOI 10.1038/s43587-025-00947-6);
> Aufnahme via Slc12a8 nur Tiermodell (Grozio 2019 DOI 10.1038/s42255-018-0009-4). Cross-Links im Body:
> → #1 (live) und → bestehender „Was ist NMN"-Artikel (`was-ist-nmn-nicotinamid-mononukleotid`, statt
> des nicht-live #5-Rewrite-Slugs). **Reziprok-Link → #4 kommt beim #5-Neubau** (Matrix: #1 verlinkt #4 nicht).

- **Title-Tag:** `NMN vs. NR: Zwei NAD⁺-Vorstufen im Vergleich`
- **Ziel-Query:** „nmn oder nr", „nmn vs nr unterschied", „nmn nr besser"
- **Besitz (exklusiv):** Vergleich NMN ↔ NR — Chemie/Molekülgröße, jeweiliger Rechtsstatus in der
  EU, Stand der Studienlage je Stoff, Aufnahme-Wege. **Nur verlinkt:** Was ist NMN → #5, Rechtsstatus → #1.
- **Format:** Vergleichstabelle.
- **H2-Fragen:**
  1. Was unterscheidet NMN und NR?
  2. NMN und NR im direkten Vergleich *(Tabelle)*
  3. Wie ist der rechtliche Status von NMN und NR in der EU?
  4. Was ist über die Aufnahme im Körper bekannt?
  5. Für welchen Kontext wird welche Vorstufe diskutiert?
- **FAQ:** Ist NMN oder NR besser? · Sind NMN und NR dasselbe? · Ist NR in der EU zugelassen? ·
  Kann man NMN und NR kombinieren? · Welche Vorstufe wird häufiger erforscht?
- **🟢 Grün-Leitplanke:** Chemie + Rechtsstatus = erlaubt; Vergleich strikt neutral, kein
  „X macht dich gesünder". **Verifizieren vor Publikation:** NR-Rechtsstatus in der EU separat
  (weicht ggf. von NMN ab). „Ist NMN oder NR besser?" ehrlich beantworten: Studienlage begrenzt, kein Sieger.

---

## Artikel 5 — Was ist NMN?

> **Interim-Entschärfung des Bestandsartikels (2026-07-07).** Der noch nicht neu gebaute
> Quell-Artikel (Live-Handle `was-ist-nmn-nicotinamid-mononukleotid`, Article-ID 559262793828)
> war seit 2023 mit Health-Claims (u. a. „essenzieller Brennstoff", ganze Studien-Wand
> Cholesterin/Herz-Kreislauf/Insulin/Schlaf/Gebrechlichkeit), Krankheitsbezug und direktem
> Produktlink live. Body per `articleUpdate` neutralisiert: Molekül/Wissenschaft als Subjekt,
> Reporting-Sprache, Novel-Food-Status-Hinweis, Produktlink raus, Link/Bild auf relativ, Byline
> gesetzt. **Kein Ersatz für den vollen #5-Neubau** — nur Risiko runter bis dahin. Studien-Detail
> gehört in #7 (Forschung). Beim #5-Neubau Cross-Links zu #1 (Legal) und #7 setzen, sobald live,
> und Slug-Drift prüfen (Plan nennt `was-ist-nmn`, live ist `…-mononukleotid`).

- **Title-Tag:** `Was ist NMN? Nicotinamid-Mononukleotid und NAD⁺ einfach erklärt`
- **Ziel-Query:** „was ist nmn", „nmn nad+", „nmn wirkung" (informational)
- **Besitz (exklusiv, KANONISCH):** Definition NMN + NAD⁺-Biologie. **Alle anderen Artikel
  verlinken für die Definition hierher.** Nur verlinkt: Rechtsstatus → #1, Forschung → #7.
- **Format:** Fließtext + Diagramm (Weg NMN → NAD⁺).
- **H2-Fragen:**
  1. Was ist NMN?
  2. Was ist NAD⁺ und welche Rolle spielt es in der Zelle?
  3. Wie hängen NMN und NAD⁺ zusammen?
  4. Kommt NMN natürlich vor?
  5. Was ist über NMN beim Menschen bekannt und was nicht?
- **FAQ:** Ist NMN ein Vitamin? · Wofür steht die Abkürzung NMN? · Was macht NAD⁺ im Körper? ·
  In welchen Lebensmitteln kommt NMN vor? · Ist NMN dasselbe wie Vitamin B3?
- **🟢 Grün-Leitplanke:** Biologie als Subjekt, Reporting-Sprache bei jeder Wirkung.
  „NAD⁺ ist ein Coenzym im Energiestoffwechsel der Zelle" ✓ · „NMN verjüngt deine Zellen" ✗.
  Zugelassene Niacin-/B3-Claims nur nennen, wenn an B3 geknüpft (Playbook §4 🟢).

---

## Artikel 6 — NMN-Einnahme ⏸ ZURÜCKGESTELLT

> Erstmal weglassen (BJ, 2026-07-07). Nicht im aktiven Plan; Spec bleibt unten als Referenz.
> (Ohnehin ⚠️ höchste Compliance-Sensibilität, weil Verzehr impliziert.)

- **Title-Tag:** `NMN-Einnahme: Was zu Timing und Form bekannt ist`
- **Ziel-Query:** „nmn einnahme", „nmn wann einnehmen", „nmn nüchtern"
- **Besitz (exklusiv):** Einnahme/Timing als **Studien-/Anwendungsinfo**. Nur verlinkt: Dosierung → #3, Pulver/Kapseln → #8.
- **Format:** Schritt-für-Schritt, aber als „so wurde in Studien angewendet".
- **⚠️ Sonderstatus:** Ein „so nimmst du NMN ein"-Artikel impliziert Verzehr eines nicht als NEM
  zugelassenen Stoffs (Forschungsreagenz-Positionierung, siehe `01…md` §Notizen). **Höchste
  Rechtsfreigabe-Priorität; ggf. bis zur Klärung der Verkaufs-Positionierung zurückstellen.**
  Framing durchgehend als Studien-Anwendung, nicht als Handlungsanweisung an den Leser.
- **H2-Fragen:**
  1. Wie wurde NMN in Studien eingenommen?
  2. Spielt der Zeitpunkt (morgens / nüchtern) eine Rolle?
  3. Beeinflusst die Form (Pulver oder Kapsel) die Anwendung? *(→ #8)*
  4. Was ist zur Kombination mit Mahlzeiten bekannt?
  5. Worauf ist bei der Lagerung zu achten?
- **FAQ:** Wann wurde NMN in Studien eingenommen? · Muss NMN nüchtern eingenommen werden? ·
  Kann man NMN-Pulver in Wasser auflösen? · Wie lagert man NMN? · Sind Wechselwirkungen bekannt?
  *(→ bei Gesundheitsfragen an Arzt/Ärztin verweisen)*
- **🟢 Grün-Leitplanke:** Studien-Anwendung berichten, **keine** Dosier-Anweisung, **kein**
  Wirkversprechen. „In Studien wurde NMN morgens eingenommen" ✓ · „Nimm NMN morgens für den Energieschub" ✗.

---

## Artikel 7 — NMN in der Forschung

- **Title-Tag:** `NMN in der Forschung: Was Studien zeigen und was offen ist`
- **Ziel-Query:** „nmn studien", „nmn forschung", „nmn wirkung studienlage"
- **Besitz (exklusiv):** Studienlage + Sicherheit — was in Humanstudien vs. Tier-/Zellmodellen
  gezeigt wurde, was offen ist. Nur verlinkt: Was ist NMN → #5, Dosierung → #3.
- **Format:** Studien-Timeline.
- **H2-Fragen:**
  1. Was ist über NMN beim Menschen erforscht?
  2. Welche Erkenntnisse stammen aus Tier- und Zellstudien?
  3. Was ist zur Sicherheit von NMN bekannt?
  4. Wo liegen die Grenzen der aktuellen Studienlage?
  5. Woran wird derzeit geforscht?
- **FAQ:** Gibt es Humanstudien zu NMN? · Ist NMN sicher? · Verlängert NMN das Leben? ·
  Was sind häufige Studien-Endpunkte? · Sind die Studien unabhängig finanziert?
- **🟢 Grün-Leitplanke:** Strikte Reporting-Sprache; Human- vs. Tier-/Zellstudien immer trennen,
  nie auf Leser/Produkt übertragen. „Verlängert NMN das Leben?" → klar relativieren: beim Menschen
  nicht belegt. „NMN kehrt die Alterung um" ✗ (aktiv widerlegen statt behaupten).

---

## Artikel 8 — NMN Pulver oder Kapseln? ⏸ ZURÜCKGESTELLT

> Erstmal weglassen (BJ, 2026-07-07). Nicht im aktiven Plan; Spec bleibt unten als Referenz.

- **Title-Tag:** `NMN Pulver oder Kapseln? Die Unterschiede im Überblick`
- **Ziel-Query:** „nmn pulver vs kapseln", „nmn pulver oder kapsel"
- **Besitz (exklusiv):** Format-Vergleich Pulver ↔ Kapsel — Dosier-Flexibilität, Handhabung,
  Geschmack, Haltbarkeit, Preis pro Portion. Nur verlinkt: Qualität → #2, Einnahme → #6, PDP.
- **Format:** Entscheidungstabelle.
- **H2-Fragen:**
  1. Was ist der Unterschied zwischen NMN-Pulver und -Kapseln?
  2. Pulver und Kapsel im Überblick *(Tabelle)*
  3. Welche Form lässt sich flexibler dosieren?
  4. Wie unterscheidet sich die Haltbarkeit?
  5. Für wen eignet sich welche Form?
- **FAQ:** Ist Pulver oder Kapsel besser? · Schmeckt NMN-Pulver? · Kann man NMN-Pulver genau
  dosieren? · Sind Kapseln teurer pro Portion? · Wie lagere ich beide Formen?
- **🟢 Grün-Leitplanke:** Format-/Handhabungs-Fakten = erlaubt, keine Wirkaussage.
  „Pulver lässt sich flexibler dosieren" ✓ (Handhabung) · „Pulver wirkt besser" ✗.
  LIFETIME-Vorteil (Pulver = kanonische Form) sachlich darstellen, nicht als Wirkbehauptung.

---

## Redaktions-Workflow je Artikel

1. Copy nach Baukasten (Playbook §6) + artikelspezifische Grün-Leitplanke hier.
2. Interne Links nur laut Cross-Link-Matrix.
3. Bestehende Rewrites: Alt-Link `/pages/nmn` → `/products/lifetime-nmn` korrigieren.
4. **Artikel bauen (Muster #1/#2):** Template `article.<slug>.json` = `lt-article` (main) + `crs-faq-accordion` (faq); Inhalt in `article.content` (TL;DR + H2-Abschnitte, Tabellen erlaubt), Byline via lt-article-Section-Settings. **NICHT** self-contained Rich-Text — scheitert an `max_blocks:9` + Tabellen-Verbot (siehe `.cursor/rules/shopify-rules.mdc` §6).
5. **Bilder (Pflicht, min. 2):** 1 Hero oben + 1–2 im Verlauf, als markenkonforme SVG-Infografiken (`<img>` in `article.content`, mit Alt-Text). **Notfalls erst Platzhalter, nie ganz ohne Bild.** Compliance: nur Fakten-Visuals (Molekül, Prozess, Status, Checkliste, Produkt/CoA), keine Menschen-/Wirkbilder. Siehe Memory `blog-images-required`.
6. Rechtsfreigabe. Autor/Reviewer echt besetzen (Konvention: Benedikt Junker · Prof. Dr. Limmroth).
7. Admin: Artikel anlegen (`articleCreate`), Template zuweisen, Autor + Meta setzen, `article.content` füllen. Theme-Push — **danach verifizieren, dass das Template auf dem MAIN-Theme liegt und die Live-URL rendert** (Theme Manager übergeht neue Template-Dateien teils; CLI-Fallback in §6).
8. Rich-Results-Test (FAQPage) + Crawler-Log-Check.

## Kadenz
1–2 Artikel/Woche in der Reihenfolge oben. Nach jedem Push: GA4-AI-Referral + Prompt-Panel
(Playbook §8) beobachten, welche Artikel zitiert werden.
