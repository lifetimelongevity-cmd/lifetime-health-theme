---
status: living
last_review: 2026-05-12
canonical_for: quiz-v2-shopify-admin-setup
applies_to: lifetime-health-de Shopify Admin (production store)
---

# Quiz v2 — Shopify Admin Setup

Was die Theme-Implementierung **nicht** abdeckt und manuell in Shopify Admin eingerichtet werden muss, damit das Quiz end-to-end funktioniert.

## 1. Discount-Code `LIFETIME10` anlegen

Wird im Quiz-Result-Success-State direkt angezeigt und in der E-Mail mitgeschickt.

**Schritte:**

1. Shopify Admin → **Rabatte** → **Rabatt erstellen** → **Rabattcode**
2. **Methode:** Rabattcode
3. **Code:** `LIFETIME10`
4. **Typ:** Prozentual
5. **Wert:** `10 %`
6. **Anwenden auf:** Bestimmte Produkte → `LIFETIME AGE & DNA-Test` auswählen (oder alle Produkte, je nach Kampagnen-Wunsch)
7. **Mindestkaufanforderung:** Keine
8. **Berechtigung:** Alle Kunden
9. **Nutzungslimits:** Eine Nutzung pro Kunde (empfohlen — verhindert Mehrfachverwendung)
10. **Aktive Termine:** Sofort starten, kein Enddatum
11. **Speichern**

Wenn der Code anders heißen soll, in `snippets/lt-quiz-result.liquid` den `__success-code`-Block anpassen.

## 2. Customer-Signup über das Quiz

Die JS-Submission im Quiz nutzt den Standard-Shopify-`/contact`-Endpoint mit `form_type=customer` (gleiche Mechanik wie der Newsletter-Footer). Das passiert automatisch beim Submit — **keine Admin-Konfiguration nötig.**

Was Shopify dadurch automatisch macht:

- Customer-Record wird angelegt (falls Email noch nicht existiert)
- Tags werden gesetzt: `quiz-completed`, `top1-{need}`, `top2-{need}`, `top3-{need}`, `age-{group}`, `gender-{value}`
- `accepts_marketing` wird auf `true` gesetzt
- Customer erscheint sofort in **Kunden** mit den Tags

Verifizieren: Test-Quiz absolvieren, dann Admin → **Kunden** → nach `quiz-completed` filtern. Die Test-E-Mail sollte mit allen Tags auftauchen.

## 3. Longevity-101-Guide als PDF hochladen

Die Result-Page-CTA verspricht "Longevity 101 als PDF". Das PDF muss in Shopify hochgeladen werden, damit es per Email-Automation versendbar ist.

**Schritte:**

1. PDF erstellen (Content-Arbeit — kein technischer Schritt)
2. Shopify Admin → **Content** → **Files** → **Datei hochladen**
3. PDF hochladen (z.B. `lifetime-longevity-101.pdf`)
4. URL kopieren — sieht aus wie `https://cdn.shopify.com/s/files/1/.../lifetime-longevity-101.pdf`
5. URL für die Email-Automation merken (siehe nächster Schritt)

## 4. E-Mail-Automation einrichten

Damit der User nach Submission eine Mail mit Longevity-Guide-Link + Rabattcode bekommt.

**Schritte:**

1. Shopify Admin → **Marketing** → **Automationen** → **Automation erstellen**
2. **Trigger:** „Kunde abonniert" oder „Kunde hinzugefügt mit Tag"
3. **Filter:** Tag enthält `quiz-completed`
4. **Aktion:** E-Mail senden
5. **Vorlage:** Neue E-Mail anlegen, siehe Liquid unten

### E-Mail-Template (zum Einfügen in Shopify Email Editor)

Betreff: `Dein Longevity-Guide und 10 % Rabatt`

Body (HTML/Liquid). `{{ PDF_URL }}` ersetzen durch die URL aus Schritt 3:

```liquid
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #26251e;">

  <h1 style="font-size: 28px; font-weight: 400; line-height: 1.2; margin: 0 0 24px;">
    Dein Longevity-Guide ist da.
  </h1>

  <p style="font-size: 16px; line-height: 1.55; color: #26251e; margin: 0 0 24px;">
    Hallo,<br><br>
    danke fürs Mitmachen beim AGE &amp; DNA-Quiz. Hier ist dein Longevity-101-Guide
    als PDF — plus dein persönlicher 10 %-Rabattcode für den Test.
  </p>

  <p style="text-align: center; margin: 32px 0;">
    <a href="{{ PDF_URL }}"
       style="display: inline-block; background: #364f56; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 999px; font-weight: 600; font-size: 15px;">
      Longevity-101-Guide herunterladen (PDF)
    </a>
  </p>

  <div style="background: #f6f4f1; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
    <p style="font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #525252; margin: 0 0 8px; font-weight: 600;">
      Dein 10 % Quiz-Rabatt
    </p>
    <p style="font-family: 'Helvetica Neue', Helvetica, sans-serif; font-size: 32px; letter-spacing: 0.06em; color: #4A8C85; margin: 0 0 12px; font-weight: 400;">
      LIFETIME10
    </p>
    <p style="font-size: 13px; color: #525252; margin: 0;">
      Gültig für den AGE &amp; DNA-Test. Einmal pro Kunde nutzbar.
    </p>
  </div>

  <p style="text-align: center; margin: 32px 0;">
    <a href="https://lifetime-health.de/products/lifetime-age-dna?discount=LIFETIME10"
       style="display: inline-block; background: #4A8C85; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-weight: 600; font-size: 15px;">
      Jetzt Test bestellen →
    </a>
  </p>

  <p style="font-size: 12px; line-height: 1.5; color: #A3A3A3; margin: 32px 0 0; text-align: center;">
    Eurofins-Laboranalyse · Begleitung durch Prof. Dr. med. Volker Limmroth · Ergebnisse in 4–6 Wochen
  </p>

</div>
```

Alternative — wenn du das PDF direkt als Attachment senden willst statt Link: das geht in Shopify Email nur eingeschränkt (per Anhang ≤ 2 MB). Link-Variante ist robuster und trackbar.

### Test-Plan

1. Echtes Quiz auf der Live-Seite absolvieren mit Test-Email (z.B. `+test1@lifetime-health.de`)
2. Admin → Kunden → Test-Email sollte mit Tags `quiz-completed`, `top1-...`, `gender-...` angelegt sein
3. Marketing → Automationen → die Quiz-Automation sollte „1 Aktion" im Log haben
4. E-Mail-Inbox checken — Mail mit PDF-Link + Rabattcode-Block sollte ankommen
5. PDF-Link klicken → öffnet das hochgeladene Dokument
6. Rabattcode `LIFETIME10` an der Kasse testen

## 5. Was passieren würde, wenn die Automation NICHT eingerichtet ist

- Quiz funktioniert weiter normal
- Customer wird trotzdem in Shopify angelegt (mit Tags)
- Success-State zeigt `LIFETIME10` direkt — User kann den Code sofort verwenden
- Aber: kein PDF-Link wird verschickt, kein bestätigendes E-Mail

Das ist akzeptabel als Übergangs-Zustand. Die Automation kannst du jederzeit nachträglich einrichten — alle Customer-Tags sind bereits gesetzt, du startest die Automation einfach und sie greift ab dem Moment für alle neuen Submissions.

## 6. Optional: Customer-Tags für Segment-Marketing

Die gesetzten Tags lassen sich später für gezielte Kampagnen nutzen:

| Tag-Muster | Bedeutung | Beispiel-Kampagne |
|---|---|---|
| `quiz-completed` | Hat Quiz abgeschlossen + Email gegeben | Re-Engagement nach 7 Tagen wenn nicht bestellt |
| `top1-sleep` | Top-1-Hebel ist Schlaf | Schlaf-fokussierter Content (Newsletter) |
| `top1-stress` | Top-1-Hebel ist Stress | Stress-Resilienz-Content |
| `gender-female` | weiblich | Gender-spezifische Newsletter |
| `gender-male` | männlich | Gender-spezifische Newsletter |
| `age-35-44` / `age-45-54` etc. | Altersgruppe | Altersgruppen-spezifischer Content |

Über Shopify Customer Segments (Admin → Customers → Segments) sind alle Kombinationen filterbar (z.B. „Frauen 35–44 mit Top-1 Schlaf").
