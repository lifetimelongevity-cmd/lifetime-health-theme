/* lt-klaviyo-atc.js
   Feuert die Klaviyo-Events "Added to Cart" und "Switched to Subscription".

   Warum das nötig ist: Klaviyos Onsite-Adapter greift nur den klassischen
   Form-Submit auf /cart/add ab. Dieses Theme legt über fetch() in den
   Warenkorb (component-product-form.js, component-quick-buy.js,
   component-cart-upsell.js), deshalb sieht Klaviyo den Vorgang nicht.
   Verifiziert 2026-08-14: Viewed Product feuert, Added to Cart nicht.

   Der Wrapper hängt sich einmal an window.fetch statt an drei Call-Sites,
   damit auch künftige Add-Pfade automatisch mitlaufen.

   Drei Pfade (erweitert 2026-09-29, Conversion-Plan 3.1):
   - POST /cart/add                      → "Added to Cart"
   - POST /cart/update mit updates > 0   → "Added to Cart" für die neue Variante
     (Größen-Tausch im Warenkorb, component-cart-upsell.js; Notiz- und
     Rabatt-Updates tragen kein updates-Objekt und bleiben stumm)
   - POST /cart/change mit selling_plan  → "Switched to Subscription"
     (Einmalkauf aufs Abo umgestellt, component-cart-sub-switch.js)
*/
(function () {
  'use strict';

  if (window.__ltKlaviyoAtc) return;
  window.__ltKlaviyoAtc = true;

  var nativeFetch = window.fetch;
  if (typeof nativeFetch !== 'function') return;

  function requestUrl(input) {
    if (typeof input === 'string') return input;
    if (input && input.url) return input.url;
    return '';
  }

  function isPost(input, init) {
    var method = (init && init.method) || (input && input.method) || 'GET';
    return String(method).toUpperCase() === 'POST';
  }

  // Nur JSON-Bodies lesen: alle Theme-Pfade senden JSON. Alles andere
  // (FormData der Produktformulare) liefert null und betrifft nur /cart/add,
  // das den Body nicht braucht.
  function jsonBody(init) {
    if (!init || typeof init.body !== 'string') return null;
    try { return JSON.parse(init.body); } catch (e) { return null; }
  }

  function classify(input, init) {
    if (!isPost(input, init)) return null;
    var url = requestUrl(input);

    if (url.indexOf('/cart/add') !== -1) return { kind: 'add' };

    if (url.indexOf('/cart/change') !== -1) {
      var change = jsonBody(init);
      if (change && change.selling_plan) {
        return { kind: 'subscribe', key: change.id, plan: String(change.selling_plan) };
      }
      return null;
    }

    if (url.indexOf('/cart/update') !== -1) {
      var update = jsonBody(init);
      var ids = [];
      if (update && update.updates && typeof update.updates === 'object') {
        Object.keys(update.updates).forEach(function (id) {
          if (parseInt(update.updates[id], 10) > 0) ids.push(String(id));
        });
      }
      return ids.length ? { kind: 'update', variantIds: ids } : null;
    }

    return null;
  }

  function absolute(path) {
    return path ? window.location.origin + path : window.location.origin;
  }

  function payload(cart, item) {
    return {
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
          ProductCategories: i.product_type ? [i.product_type] : [],
          SellingPlan: i.selling_plan_allocation ? i.selling_plan_allocation.selling_plan.name : ''
        };
      })
    };
  }

  function push(eventName, props) {
    var learnq = (window._learnq = window._learnq || []);
    learnq.push(['track', eventName, props]);
  }

  function fetchCart() {
    return nativeFetch('/cart.js', { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); });
  }

  function findItem(cart, test) {
    var items = cart.items || [];
    for (var i = 0; i < items.length; i++) {
      if (test(items[i])) return items[i];
    }
    return null;
  }

  function track(action, response) {
    if (action.kind === 'add') {
      return response.clone().json().then(function (added) {
        return fetchCart().then(function (cart) {
          // /cart/add.js liefert bei Einzel-Adds das Item direkt, bei
          // Mehrfach-Adds ein { items: [...] } (z. B. NMN plus Kreatin-Häkchen
          // aus der Buy-Box). Dann ein Event je Artikel, damit Klaviyo beide sieht.
          var list = added && added.items ? added.items : [added];
          list.forEach(function (item) {
            push('Added to Cart', payload(cart, item || (cart.items && cart.items[cart.items.length - 1]) || {}));
          });
        });
      });
    }

    // /cart/change.js und /cart/update.js antworten mit dem ganzen Warenkorb.
    return response.clone().json().then(function (cart) {
      if (!cart || !cart.items) return fetchCart();
      return cart;
    }).then(function (cart) {
      if (action.kind === 'update') {
        var item = findItem(cart, function (i) {
          return action.variantIds.indexOf(String(i.variant_id)) !== -1;
        });
        if (item) push('Added to Cart', payload(cart, item));
        return;
      }

      // Nach dem Wechsel hat die Zeile einen neuen Key, deshalb über den Plan finden.
      var sub = findItem(cart, function (i) {
        return i.selling_plan_allocation && String(i.selling_plan_allocation.selling_plan.id) === action.plan;
      });
      if (!sub) return;
      var props = payload(cart, sub);
      props.SellingPlanID = action.plan;
      props.SellingPlanName = sub.selling_plan_allocation.selling_plan.name;
      push('Switched to Subscription', props);
    });
  }

  window.fetch = function (input, init) {
    var action = classify(input, init);
    var call = nativeFetch.apply(this, arguments);
    if (!action) return call;

    return call.then(function (response) {
      if (!response.ok) return response;
      // Antwort klonen, damit der aufrufende Code seinen Body unangetastet bekommt.
      track(action, response).catch(function () { /* Tracking darf den Kauf nie blockieren */ });
      return response;
    });
  };
})();
