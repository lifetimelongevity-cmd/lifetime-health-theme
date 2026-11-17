---
status: snapshot
last_review: 2026-07-28
canonical_for: neubau-seite-wissenschaft
---

# Briefing: Seite Wissenschaft (Neubau)

**Umgesetzt am 2026-07-28 in `templates/page.science.json`.** Entscheid BJ: die Seite
überschreibt `/pages/science` direkt, kein neuer Slug. Damit bleiben Menü-Karte,
interne Links und Link-Equity unangetastet. Section-Stack und Begründungen stehen in
`docs/live-pages-map.md` § Kanonisches Fundament.

`templates/page.science-hub.json` (via `?view=science-hub`) war die Struktur-Skizze und
ist damit **überholt**. Es rendert weiter mit HTTP 200 und sollte gelöscht werden,
siehe Memory `unused-templates-view-param`.

## Ziel

Eine Beweisseite für den **AGE & DNA-Test**, nicht eine Wissensseite über Longevity.
Der Kunde soll nach dem Scrollen denken: „Die messen etwas Echtes, das kaufe ich."
Vorbild für Aufbau und Ton: die AG1-Seite Forschung & Studien.

## Pflicht: Produktbezug benennen

Heute sagt die Seite nirgends, worum es konkret geht. Innerhalb des ersten Screens
muss stehen, dass es um den AGE & DNA-Test geht, nicht um Longevity im Allgemeinen.
Ohne diesen Anker liest sich alles wie ein Magazinartikel.

## Struktur

1. Hero — Anspruch in einem Satz, Produkt benannt
2. Was du erfährst — drei Ergebnisse des Tests
3. Wie gemessen wird — Blut vs. Genetik vs. Epigenetik
4. Was du bekommst — Reportumfang, Link auf die Reports-Seite. **Die 187 ist am 06.08.2026
   widerlegt und live ersetzt**, zulässig sind 23 Kategorien bzw. über 150 Einzelergebnisse
5. Grundlage und Prüfung — Validierung, Eurofins ISO 17025, Limmroth
6. CTA — Test kaufen, daneben Quiz als weicher Pfad
7. FAQ — die vier häufigsten Einwände
8. Mehr erfahren — Reports, Blog, Blueprint

## Woraus gespeist

| Abschnitt | Quelle |
|---|---|
| Ergebnisse, Messebenen | bestehende Live-Copy `/pages/science` |
| Reportumfang | `/pages/was-ist-enthalten` (dort steht noch die widerlegte 187 in der H1) |
| Grundlage | 20.000 Validierungs-Teilnehmer, 1.500 Studien, Eurofins ISO 17025 |
| Prüfung | Limmroth als Chief Scientific Officer, Rolle nur als Prüfinstanz |
| Weiterführung | Blog (21 Artikel), Blueprint (10 Kapitel), Reports-Seite |

## Copy-Regeln

- **Sublines sind Sublines, kein Fließtext.** Maximal ein kurzer Satz. Wo mehr nötig
  scheint, fehlt eine eigene Textfläche oder der Inhalt gehört auf eine Unterseite.
- **Weniger Text gewinnt.** Pro Abschnitt eine Aussage. Im Zweifel streichen, nicht kürzen.
- Kein Limmroth neben dem Wort Longevity-Forschung (null eigene Publikationen).
- NMN kommt hier nicht vor.

## Bau-Regeln

- Bestehende Sections **wiederverwenden, wo sie inhaltlich passen** (Messebenen).
- **Nicht zweckentfremden.** Ein Bento für Reports oder Link-Cards für Ergebnisse ist
  Recycling, kein Design. Wo die passende Komponente fehlt, wird eine gebaut.
- Schrittweise aufbauen: Abschnitt für Abschnitt sauber, nicht die ganze Seite auf einmal.
- Tokens aus `docs/design-governance.md` §3, Flächenrhythmus hell/warm,
  dunkel `#364f56` maximal zweimal.

## Nicht auf dieser Seite

Hallmarks-Block mit 15 Kacheln (zu lang, gehört in den Blog), Themen-Karten mit Popups,
Blueprint-Inhalte im Volltext (nur verlinken, sonst Doppelcontent).
