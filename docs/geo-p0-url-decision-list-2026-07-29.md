---
status: snapshot
last_review: 2026-07-29
canonical_for: geo-p0-url-decisions
depends_on:
  - docs/geo-action-plan.md
  - docs/geo-p0-technical-audit-2026-07-29.md
  - docs/live-pages-map.md
---

# GEO-P0 URL-Entscheidungsliste

Stand: 29.07.2026. Grundlage sind der erneute Crawl der öffentlichen Shopify-Sitemaps,
die gerenderte HTML-Ausgabe und die interne Linkstruktur. Nach der Admin-Bereinigung
enthält die Page-Sitemap 14 statt ursprünglich 19 URLs.

Search Console konnte in der verfügbaren Browser-Sitzung nicht geprüft werden, weil der
angemeldete Google-Account keinen Zugriff auf die Property `lifetime-health.de` hat. Der
abschließende 81-URL-Crawl und die Theme-Suche fanden für die drei Waisenseiten jedoch keine
eingehenden internen Links. Der Nutzer gab deshalb die unmittelbare Konsolidierung trotz
fehlender GSC-Daten ausdrücklich frei.

## Entscheidungsmatrix

| URL | Live-Befund | Entscheidung | Ziel / Gate |
|---|---|---|---|
| `/pages/testintern` | vorher 200, `noindex,follow`, 65 Wörter, nur Platzhalter | **Erledigt: ausgeblendet** | Liefert 404; bewusst kein Redirect |
| `/pages/agedna-details-genetik` | vorher 200, `noindex,follow`, 65 Wörter, nur Platzhalter | **Erledigt: ausgeblendet + 301** | Eine Weiterleitung auf `/pages/was-ist-enthalten`, Ziel liefert 200 |
| `/pages/agedna-details` | vorher 200, indexierbar, 629 Wörter, umfangreiche Report- und Genliste | **Erledigt: ausgeblendet + 301** | Redirect auf `/pages/was-ist-enthalten`; öffentliche Renderer-Propagation läuft |
| `/pages/agedna-details-epigenetik` | vorher 200, indexierbar, 547 Wörter, ausführliche Epigenetik-Erklärung | **Erledigt: ausgeblendet + 301** | Redirect auf `/pages/science`; öffentliche Renderer-Propagation läuft |
| `/pages/produkte` | vorher 200, indexierbar, 111 Wörter, 0 H1 | **Erledigt: ausgeblendet + 301** | Redirect auf `/collections/all`; öffentliche Renderer-Propagation läuft |
| `/pages/stack-2026-04` | 200, `noindex,follow`, funktionale Weiterleitung zum Warenkorb | **Behalten** | Nicht organisch indexieren; externen Kampagnen-/Tool-Zugriff nicht unterbrechen |
| `/pages/stack-builder` | 200, funktionale Stack-Konfiguration, dünner serverseitiger Text | **Behalten + `noindex,follow`** | Am 29.07.2026 auf Development geprüft und auf MAIN ausgerollt; öffentliche Propagation läuft |
| `/pages/dsgvo-datenschutzanfragen` | 200, `noindex,follow`, funktionale Datenschutzanfrage | **Behalten** | Nicht indexieren; Formularfunktion erhalten |
| `/pages/personal-data-requests` | 200, `noindex,follow`, funktionale Datenschutzanfrage | **Behalten** | Nicht indexieren; Formularfunktion erhalten |

## Freigabe-Tranchen

### Tranche A — sofort und risikoarm

1. `stack-builder` im Theme auf `noindex,follow` setzen. **Erledigt am 29.07.2026.**
2. Live-HTML, Funktion und Sitemap-Status prüfen. **Funktion und Sitemap geprüft; die Seite bleibt
   erwartungsgemäß in der Sitemap, solange sie veröffentlicht ist. Die öffentliche Robots-
   Propagation ist noch nicht auf allen Shopify-Renderern abgeschlossen.**
3. `/pages/testintern` und `/pages/agedna-details-genetik` nach expliziter Admin-Freigabe
   unpublishen. **Erledigt am 29.07.2026; Sitemap, 404 und Redirect-Kette geprüft.**

### Tranche B — nach ausdrücklicher Konsolidierungsfreigabe erledigt

1. Der Crawl aller 81 zu diesem Zeitpunkt veröffentlichten Sitemap-URLs fand keinen internen
   Ankerlink auf `agedna-details`, `agedna-details-epigenetik` oder `produkte`; die Theme-Suche
   fand ebenfalls keine hart codierten oder resource-basierten Links auf diese Seiten.
2. Der Nutzer entschied sich ausdrücklich für die unmittelbare Konsolidierung ohne vorgelagerte
   GSC- und Claim-Prüfung.
3. Alle drei Pages wurden ausgeblendet und mit je einem kanonischen Redirect versehen. Ihre
   Template-Dateien und damit die Inhalte bleiben im Repository und Shopify-Theme erhalten.
4. Die Page-Sitemap ist bereits sauber. Die Redirects propagieren noch über die öffentlichen
   Shopify-Renderer und werden nach vollständiger Konvergenz erneut abgenommen.

## Definition of Done

- Keine Test- oder Utility-Seite ist indexierbar.
- Keine funktionale Datenschutz- oder Stack-Seite wurde versehentlich entfernt.
- Abweichungen vom Traffic- und Claim-Gate sind ausdrücklich freigegeben und mit Ziel-Redirect
  sowie erhaltenem Template dokumentiert.
- Jede entfernte URL hat entweder bewusst keinen Redirect oder genau ein kanonisches 301-Ziel.
- Die Page-Sitemap enthält keine unpublizierten Altseiten mehr.
