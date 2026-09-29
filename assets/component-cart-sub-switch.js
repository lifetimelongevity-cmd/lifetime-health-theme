/*
  Einmalkauf auf Abo umstellen, direkt an der Warenkorbzeile
  (snippets/cart-form.liquid, Conversion-Plan 3.1, 29.09.2026).

  /cart/change.js kann den Selling Plan einer Zeile setzen, ohne sie zu
  entfernen und neu anzulegen. Adressiert wird ueber den Zeilen-Key statt der
  Zeilennummer: die Nummer verschiebt sich, sobald parallel eine andere Zeile
  wegfaellt, der Key zeigt immer auf genau diese Position.

  Das Markup liegt in #AjaxCartForm und wird bei jedem Cart-Update komplett
  neu gerendert. Deshalb bindet sich jede Instanz in connectedCallback selbst,
  wie cart-upsell.
*/
if (typeof CartSubSwitch !== 'function') {
  class CartSubSwitch extends HTMLElement {
    connectedCallback() {
      if (this._bound) return;
      const action = this.querySelector('[data-js-cart-sub-switch]');
      if (!action) return;
      this._bound = true;
      action.addEventListener('click', this._submit.bind(this));
    }

    _submit(event) {
      event.preventDefault();
      if (this.classList.contains('processing')) return;

      const key = this.dataset.lineKey;
      const plan = parseInt(this.dataset.sellingPlan, 10);
      const quantity = parseInt(this.dataset.quantity, 10) || 1;
      if (!key || !plan) return;

      this.classList.add('processing');
      this._setError('');

      const routes = (window.KROWN && KROWN.settings && KROWN.settings.routes) || {};
      const url = (routes.cart_change_url || '/cart/change') + '.js';

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity, selling_plan: plan }),
      })
        .then((response) => response.json().then((data) => ({ ok: response.ok, data: data })))
        .then(({ ok, data }) => {
          if (!ok || (data && data.status && data.status !== 200)) {
            throw new Error((data && (data.description || data.message)) || '');
          }
          if (typeof window.refreshCart === 'function') {
            window.refreshCart();
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          this.classList.remove('processing');
          const fallback =
            (window.KROWN && KROWN.settings && KROWN.settings.locales && KROWN.settings.locales.cart_general_error) ||
            '';
          this._setError(error && error.message ? error.message : fallback);
        });
    }

    _setError(message) {
      const target = this.querySelector('[data-js-cart-sub-switch-error]');
      if (target) target.textContent = message;
    }
  }

  if (typeof customElements.get('cart-sub-switch') == 'undefined') {
    customElements.define('cart-sub-switch', CartSubSwitch);
  }
}
