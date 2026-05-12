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

## 3. E-Mail-Automation einrichten

Damit der User nach Abschluss eine echte E-Mail mit seinem Ergebnis + Rabattcode bekommt.

**Schritte:**

1. Shopify Admin → **Marketing** → **Automationen** → **Automation erstellen**
2. **Trigger:** „Kunde abonniert" oder „Kunde hinzugefügt mit Tag" (je nach verfügbarer Option)
3. **Filter:** Tag enthält `quiz-completed`
4. **Aktion:** E-Mail senden
5. **Vorlage:** Neue E-Mail anlegen, siehe Liquid-Vorschlag unten

### E-Mail-Template (zum Einfügen in Shopify Email Editor)

Betreff: `Deine LIFETIME-Auswertung ist da`

Body (HTML / Liquid):

```liquid
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #26251e;">

  <h1 style="font-size: 28px; font-weight: 400; line-height: 1.2; margin: 0 0 24px;">
    Deine Auswertung ist da.
  </h1>

  <p style="font-size: 16px; line-height: 1.55; color: #26251e; margin: 0 0 24px;">
    Hallo,<br><br>
    danke fürs Mitmachen beim AGE &amp; DNA-Quiz. Aus deinen Antworten haben sich drei Bereiche
    als deine größten Hebel herauskristallisiert.
  </p>

  {%- comment -%} Dynamische Top-3 aus Customer-Tags {%- endcomment -%}
  <p style="font-size: 18px; font-weight: 600; margin: 24px 0 12px;">Deine drei wichtigsten Hebel:</p>
  <ul style="font-size: 16px; line-height: 1.7; padding-left: 20px; margin: 0 0 32px;">
    {%- assign tags = customer.tags -%}
    {%- for tag in tags -%}
      {%- if tag contains 'top1-' or tag contains 'top2-' or tag contains 'top3-' -%}
        {%- assign parts = tag | split: '-' -%}
        {%- assign pos = parts[0] | remove: 'top' -%}
        {%- assign need = parts[1] -%}
        {%- case need -%}
          {%- when 'sleep' -%}        <li><strong>Schlaf</strong> — Endlich durchschlafen</li>
          {%- when 'energy' -%}       <li><strong>Energie</strong> — Energie zurückgewinnen</li>
          {%- when 'stress' -%}       <li><strong>Stress</strong> — Nervensystem unterstützen</li>
          {%- when 'weight' -%}       <li><strong>Stoffwechsel</strong> — Verstehen, wie der Körper Essen verarbeitet</li>
          {%- when 'training' -%}     <li><strong>Training</strong> — Smarter trainieren</li>
          {%- when 'cognition' -%}    <li><strong>Konzentration</strong> — Klarheit und Gedächtnis</li>
          {%- when 'skin' -%}         <li><strong>Haut &amp; Haar</strong> — Haut und Haar von innen</li>
          {%- when 'supplements' -%}  <li><strong>Vitamine &amp; Supplements</strong> — Passende Supplements für deine Genetik</li>
          {%- when 'heart' -%}        <li><strong>Herz &amp; Kreislauf</strong> — Herz aktiv schützen</li>
          {%- when 'bioage' -%}       <li><strong>Biologisches Alter</strong> — Aktiv beeinflussen</li>
        {%- endcase -%}
      {%- endif -%}
    {%- endfor -%}
  </ul>

  <p style="font-size: 16px; line-height: 1.55; margin: 0 0 16px;">
    Mit dem AGE &amp; DNA-Test bekommst du zu jedem dieser Hebel die konkreten genetischen Marker
    und die passenden Empfehlungen.
  </p>

  <div style="background: #f6f4f1; border-radius: 12px; padding: 24px; margin: 32px 0; text-align: center;">
    <p style="font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: #525252; margin: 0 0 8px; font-weight: 600;">
      Dein 10 % Rabatt
    </p>
    <p style="font-family: 'Helvetica Neue', Helvetica, sans-serif; font-size: 32px; letter-spacing: 0.06em; color: #4A8C85; margin: 0 0 12px; font-weight: 400;">
      LIFETIME10
    </p>
    <p style="font-size: 13px; color: #525252; margin: 0;">
      Gültig für den AGE &amp; DNA-Test. Einmal pro Kunde nutzbar.
    </p>
  </div>

  <p style="text-align: center; margin: 32px 0;">
    <a href="https://lifetime-health.de/products/age-dna-test?discount=LIFETIME10"
       style="display: inline-block; background: #4A8C85; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 999px; font-weight: 600; font-size: 15px;">
      Test jetzt bestellen →
    </a>
  </p>

  <p style="font-size: 12px; line-height: 1.5; color: #A3A3A3; margin: 32px 0 0; text-align: center;">
    Eurofins-Laboranalyse · Begleitung durch Prof. Dr. med. Volker Limmroth · Ergebnisse in 4–6 Wochen
  </p>

</div>
```

### Test-Plan

1. Echtes Quiz auf der Live-Seite absolvieren mit Test-Email (z.B. `+test1@lifetime-health.de`)
2. Admin → Kunden → Test-Email sollte mit Tags angelegt sein
3. Marketing → Automationen → die Quiz-Automation sollte „1 Aktion" im Log haben
4. E-Mail-Inbox checken — Mail mit korrekten Top-3 sollte ankommen

## 4. Was passieren würde, wenn die Automation NICHT eingerichtet ist

- Quiz funktioniert weiter normal
- Customer wird trotzdem in Shopify angelegt (mit Tags)
- Success-State zeigt `LIFETIME10` direkt — User kann den Code sofort verwenden
- Aber: kein bestätigendes E-Mail wird verschickt

Das ist akzeptabel als Übergangs-Zustand. Die Automation kannst du jederzeit nachträglich einrichten.
