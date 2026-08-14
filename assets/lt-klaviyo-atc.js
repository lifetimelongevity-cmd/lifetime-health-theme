/* lt-klaviyo-atc.js
   Feuert das Klaviyo-Event "Added to Cart".

   Warum das nötig ist: Klaviyos Onsite-Adapter greift nur den klassischen
   Form-Submit auf /cart/add ab. Dieses Theme legt über fetch() in den
   Warenkorb (component-product-form.js, component-quick-buy.js,
   component-cart-upsell.js), deshalb sieht Klaviyo den Vorgang nicht.
   Verifiziert 2026-08-14: Viewed Product feuert, Added to Cart nicht.

   Der Wrapper hängt sich einmal an window.fetch statt an drei Call-Sites,
   damit auch künftige Add-Pfade automatisch mitlaufen.
*/
(function () {
  'use strict';

  if (window.__ltKlaviyoAtc) return;
  window.__ltKlaviyoAtc = true;

  var nativeFetch = window.fetch;
  if (typeof nativeFetch !== 'function') return;

  function isCartAdd(input, init) {
    var url = '';
    if (typeof input === 'string') url = input;
    else if (input && input.url) url = input.url;
    if (url.indexOf('/cart/add') === -1) return false;

    var method = (init && init.method) || (input && input.method) || 'GET';
    return String(method).toUpperCase() === 'POST';
  }

  function absolute(path) {
    return path ? window.location.origin + path : window.location.origin;
  }

  function track(cart, added) {
    var learnq = (window._learnq = window._learnq || []);
    var item = added || (cart.items && cart.items[cart.items.length - 1]) || {};

    learnq.push(['track', 'Added to Cart', {
      $value: cart.total_price / 100,
      AddedItemProductName: item.product_title || item.title || '',
      AddedItemProductID: item.product_id || '',
      AddedItemVariantID: item.variant_id || '',
      AddedItemSKU: item.sku || '',
      AddedItemCategories: item.product_type ? [item.product_type] : [],
      AddedItemImageURL: item.image || '',
      AddedItemURL: absolute(item.url),
      AddedItemPrice: (item.final_price || item.price || 0) / 100,
      AddedItemQuantity: item.quantity || 1,
      ItemNames: (cart.items || []).map(function (i) { return i.product_title || i.title; }),
      CheckoutURL: absolute('/checkout'),
      Items: (cart.items || []).map(function (i) {
        return {
          ProductID: i.product_id,
          VariantID: i.variant_id,
          SKU: i.sku,
          ProductName: i.product_title || i.title,
          Quantity: i.quantity,
          ItemPrice: (i.final_price || i.price || 0) / 100,
          RowTotal: (i.final_line_price || i.line_price || 0) / 100,
          ProductURL: absolute(i.url),
          ImageURL: i.image,
          ProductCategories: i.product_type ? [i.product_type] : []
        };
      })
    }]);
  }

  window.fetch = function (input, init) {
    var watch = isCartAdd(input, init);
    var call = nativeFetch.apply(this, arguments);
    if (!watch) return call;

    return call.then(function (response) {
      if (!response.ok) return response;

      // Antwort klonen, damit der aufrufende Code seinen Body unangetastet bekommt.
      response.clone().json().then(function (added) {
        return nativeFetch('/cart.js', { headers: { Accept: 'application/json' } })
          .then(function (r) { return r.json(); })
          .then(function (cart) {
            // /cart/add.js liefert bei Einzel-Adds das Item direkt,
            // bei Mehrfach-Adds ein { items: [...] }.
            var item = added && added.items ? added.items[added.items.length - 1] : added;
            track(cart, item);
          });
      }).catch(function () { /* Tracking darf den Kauf nie blockieren */ });

      return response;
    });
  };
})();
