---
status: snapshot
last_review: 2026-07-29
canonical_for: geo-002-ga4-ai-referral-report
---

# GEO-002: GA4 AI-Referral- und Umsatzreport

## Ergebnis

In der GA4-Property `LIFETIME_SHOP` (`429510542`) ist die explorative Datenanalyse
`GEO-002 · AI Referral & Umsatz` angelegt.

[Exploration direkt in GA4 öffnen](https://analytics.google.com/analytics/web/?pli=1#/analysis/a304195052p429510542/edit/vHG1CDOKQky4T9f2LaMXYg)

GA4 weist AI-Traffic inzwischen nativ über die Standard-Channelgruppe `AI Assistant` aus.
Die Exploration verwendet deshalb diese rückwirkend anwendbare Session-Klassifizierung statt
einer parallel gepflegten Regex-Channelgruppe.

## Konfiguration

Zeitraum: rollierende letzte 28 Tage.

Gemeinsamer Filter beider Tabs:

- Dimension: `Sitzung – Standard-Channelgruppe`
- Bedingung: `stimmt genau überein`
- Wert: `AI Assistant`

### Tab 1: AI Quellen & Umsatz

- Zeile: `Sitzung – Quelle/Medium (manuell)`
- Messwerte:
  - `Aktive Nutzer`
  - `Sitzungen`
  - `Umsatz aus Käufen`

### Tab 2: AI Landingpages & Funnel

- Zeile: `Landingpage`
- Messwerte:
  - `Aktive Nutzer`
  - `Sitzungen`
  - `In den Einkaufswagen legen`
  - `Checkouts`
  - `E-Commerce-Käufe`
  - `Umsatz aus Käufen`

## Startbaseline

Zeitraum: 01.07.–28.07.2026.

| KPI | Wert |
|---|---:|
| Aktive Nutzer | 16 |
| Sitzungen | 20 |
| Add-to-Carts | 7 |
| Checkouts | 2 |
| E-Commerce-Käufe | 1 |
| Umsatz aus Käufen | 149,50 € |

### Quellen

| Sitzung – Quelle/Medium (manuell) | Aktive Nutzer | Sitzungen | Umsatz |
|---|---:|---:|---:|
| `chatgpt.com / (not set)` | 15 | 18 | 149,50 € |
| `chatgpt.com / ai-assistant` | 1 | 2 | 0,00 € |

### Landingpages

| Landingpage | Aktive Nutzer | Sitzungen | Add-to-Carts | Checkouts | Käufe | Umsatz |
|---|---:|---:|---:|---:|---:|---:|
| `/products/lifetime-nmn` | 11 | 14 | 7 | 2 | 1 | 149,50 € |
| `/products/lifetime-age-dna` | 4 | 4 | 0 | 0 | 0 | 0,00 € |
| `(not set)` | 1 | 1 | 0 | 0 | 0 | 0,00 € |
| `/` | 1 | 1 | 0 | 0 | 0 | 0,00 € |

Die Summe der aktiven Nutzer über einzelne Landingpages kann wegen GA4-Deduplizierung von der
Gesamtsumme abweichen. Spät eintreffende Ereignisse und Attributionsänderungen können historische
Werte nachträglich leicht verändern.

## Monatliche Messung

1. Exploration `GEO-002 · AI Referral & Umsatz` öffnen.
2. Das rollierende 28-Tage-Fenster unverändert lassen.
3. Beide Tabs exportieren oder die Gesamtwerte in die GEO-Scorecard übertragen.
4. Absolute Werte und Veränderung zur vorherigen Vier-Wochen-Periode dokumentieren.
5. Neue AI-Quellen und Landingpages auf Klassifizierungs- oder Trackinglücken prüfen.

## Offene GEO-002-Teile

Die GA4-Abnahme ist erfüllt. Die im Gesamtplan zusätzlich vorgesehenen Prüfungen für generische
Google-Search-Console-Query-Gruppen, Microsoft Clarity AI Citations und Server-/CDN-Logs bleiben
separate offene Arbeitspakete.

## Referenzen

- [Google Analytics: Custom channel groups](https://support.google.com/analytics/answer/13051316)
- [Google Analytics Data API: Dimensions and metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)
