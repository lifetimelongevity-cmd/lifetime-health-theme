# 2026-05-19 — Quiz-Cleanup

Eingefroren beim Aufräumen alter Quiz-Generationen, weil die aktive Quiz-Page (`/pages/biologischer-alterstest-dna`, intern "Quiz Age") nur eine Section nutzt: `sections/lt-pdp-quiz-v2.liquid`. Die hier liegenden Files waren von keinem aktiven Template mehr referenziert.

## Was hier liegt

### `sections/`
| Datei | Vorher referenziert von | Status |
|---|---|---|
| `lt-bioage-quiz.liquid` | nichts | Vorgänger-Quiz, ersetzt durch `lt-pdp-quiz-v2` |
| `lt-longevity-quiz.liquid` | nichts | Frühere Longevity-Quiz-Variante |
| `lt-routine-quiz.liquid` | nichts | "Meine Routine"-Quiz, ersetzt durch Quiz Age |
| `lt-lp-hero-quiz.liquid` | nichts | LP-Hero-Variante mit Quiz |
| `lt-lp-quiz-result.liquid` | nichts | LP-Quiz-Result-Variante |
| `lt-lp-personalized-answer.liquid` | nichts | LP-Personalized-Answer-Variante |
| `lt-lp-conversion-quiz.liquid` | `page.legacy-age-dna-landing.json` (ebenfalls archiviert) | LP-Conversion-Quiz |

### `snippets/`
| Datei | Status |
|---|---|
| `lt-quiz-matrix.liquid` | Von keinem Section/Snippet mehr verwendet |

### `assets/`
| Datei | Status |
|---|---|
| `lt-longevity-quiz.js` | Paar zu `lt-longevity-quiz.liquid` |
| `section-lt-longevity-quiz.css` | Paar zu `lt-longevity-quiz.liquid` |

### `templates/`
| Datei | Status |
|---|---|
| `page.legacy-age-dna-landing.json` | Im Shopify-Admin nicht mehr Page-assigned (Slug rendert default `page.json`) |
| `page.agedna-ergebnis-dna-1.json` | Im Shopify-Admin nicht mehr Page-assigned. Enthält ausserdem einen toten Lantern-App-Block |

## Was NICHT archiviert wurde (bewusst)

- `templates/page.agedna-ergebnis-age.json` — ist Live unter `/pages/agedna-ergebnis-age` assigned, also Vorsicht.
- `templates/page.meine-routine.json` — assigned an `/pages/biologischer-alterstest-dna` UND `/pages/meine-routine`. Migration-Plan: in einer zweiten Phase nach Re-Assignment im Admin (auf `page.quiz-age.json`) auch in dieses Archiv schieben.
- Alle aktiven Quiz-Snippets (`lt-quiz-question-cards`, `-slider`, `-multi`, `-age`, `lt-quiz-loading`, `lt-quiz-result`) — werden alle von `lt-pdp-quiz-v2` gerendert.

## Live-Lage zum Zeitpunkt des Archivs

- Aktive Quiz-Page: `/pages/biologischer-alterstest-dna` (Menülabel "AGE Quiz")
- Section: `sections/lt-pdp-quiz-v2.liquid`
- Template-Datei (vor Migration): `templates/page.meine-routine.json` → kopiert nach `templates/page.quiz-age.json`
- Result-Page-Markup: `snippets/lt-quiz-result.liquid`

## Nicht editieren

Wie alle `_archive/`-Inhalte: nur zum Nachschauen. Falls etwas davon wieder gebraucht wird, in einer eigenen Operation zurückholen und dokumentieren.
