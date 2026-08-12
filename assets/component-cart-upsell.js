/*
  Post-ATC-Angebot im Warenkorb (siehe snippets/cart-upsell.liquid).

  Zwei Modi:
  - "add"  legt eine Variante dazu
  - "swap" tauscht eine Variante gegen eine groessere. /cart/change kann die
    Variante einer Zeile nicht wechseln, deshalb laeuft der Tausch ueber
    /cart/update: alte Variante auf 0, neue in gleicher Menge, ein Request.
    Ein zweistufiger Weg (erst entfernen, dann hinzufuegen) wuerde bei einem
    Fehler im zweiten Schritt den Warenkorb kleiner zuruecklassen als vorher.

  Das Markup liegt in #AjaxCartForm und wird bei jedem Cart-Update komplett neu
  gerendert. Deshalb keine globalen Listener: connectedCallback bindet sich
  selbst, wenn die neue Instanz in den DOM kommt.
*/
if (typeof CartUpsell !== 'function') {
  class CartUpsell extends HTMLElement {
    connectedCallback() {
      if (this._bound) return;
      const action = this.querySelector('[data-js-cart-upsell-action]');
      if (!action) return;
      this._bound = true;
      action.addEventListener('click', this._submit.bind(this));
    }

    _submit(event) {
      event.preventDefault();
      if (this.classList.contains('processing')) return;

      this.classList.add('processing');
      this._setError('');

      const routes = (window.KROWN && KROWN.settings && KROWN.settings.routes) || {};
      const quantity = parseInt(this.dataset.quantity, 10) || 1;
      const variantId = this.dataset.variantId;

      let url;
      let body;

      if (this.dataset.mode === 'swap' && this.dataset.fromVariantId) {
        const updates = {};
        updates[this.dataset.fromVariantId] = 0;
        updates[variantId] = quantity;
        url = routes.cart_update_url || '/cart/update';
        body = { updates: updates };
      } else {
        url = routes.cart_add_url || '/cart/add';
        body = { items: [{ id: variantId, quantity: quantity }] };
      }

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/javascript' },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.status && response.status !== 200) {
            throw new Error(response.description || response.message);
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
      const target = this.querySelector('[data-js-cart-upsell-error]');
      if (target) target.textContent = message;
    }
  }

  if (typeof customElements.get('cart-upsell') == 'undefined') {
    customElements.define('cart-upsell', CartUpsell);
  }
}
