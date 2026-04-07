# LIFETIME PDP Template Notes

Duplicate `product.nmn.json` for each new product and rename to `product.[productname].json`.

`product.13_3_nmn.json` ist eine **Kopie** desselben LT-PDP-Inhalts (Suffix `13_3_nmn`) — z. B. wenn Produkte im Admin noch dieses Template nutzen. Bei inhaltlichen Änderungen beide Dateien parallel pflegen oder eine aus der anderen erzeugen.

## Per-product fields to update:

- main.settings.tagline
- main.settings.trust_1 / trust_2 / trust_3 / badge_text
- metrics_row blocks — all numbers and descriptions
- feature_grid blocks — all titles and descriptions
- lt_comparison_table blocks — all row values
- timeline blocks — all step content
- social_quotes blocks — all quotes
- knowledge_base.settings — heading, subheading, quote_text, author
- faq_accordion blocks — all questions and answers
- link_cards blocks — all titles, descriptions, urls

## Shared across products (usually no changes needed):

- Section order
- Section types
- padding_top / padding_bottom values
- guarantee_block structure
- logo_garden structure
