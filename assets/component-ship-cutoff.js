/*
  Versandfrist (Conversion-Plan 2.3, 2026-09-29): Restzeit bis zum echten
  Versand-Cutoff des Lagers, danach der naechste Versandtag.

  Rechnet bewusst im Browser und nicht in Liquid: Shopify cached die Seiten,
  eine serverseitig gerechnete Restzeit waere beim naechsten Aufruf falsch.
  Die Uhrzeit gilt in deutscher Zeit, egal wo der Besucher sitzt. Versandtage
  sind Montag bis Freitag ohne die Feiertage aus den Theme-Einstellungen.

  Ohne gueltige Uhrzeit bleibt das Element versteckt. Die Frist ist nur dann
  zulaessig, wenn das Lager sie wirklich einhaelt (Anhang zu § 3 Abs. 3 UWG
  Nr. 7), deshalb gibt es keinen Default. Cutoff 12:00 nach BJ (29.09.): bis
  12/13 Uhr bestellt geht meist am selben Tag raus, spaetestens am Tag danach.
  Deshalb "Meist ...". Sagt Hive den Versand am selben Tag fest zu, "Meist"
  streichen.

  Markup: snippets/lt-ship-cutoff.liquid
*/
if (typeof customElements.get('lt-ship-cutoff') == 'undefined') {
  const LT_DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  const berlinNow = () => {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Berlin',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(new Date());
    const part = (type) => Number(parts.find((p) => p.type === type).value);
    return { y: part('year'), m: part('month'), d: part('day'), h: part('hour'), min: part('minute') };
  };

  // Kalendertage als UTC-Datum, damit die Sommerzeit-Umstellung nicht mitrechnet
  const isoDay = (date) => date.toISOString().slice(0, 10);

  class LtShipCutoff extends HTMLElement {
    connectedCallback() {
      this.render();
      this._timer = setInterval(() => this.render(), 30000);
    }

    disconnectedCallback() {
      clearInterval(this._timer);
    }

    render() {
      const match = /^(\d{1,2}):(\d{2})$/.exec((this.dataset.cutoff || '').trim());
      const target = this.querySelector('[data-lt-ship-cutoff-text]');
      if (!match || !target) {
        this.hidden = true;
        return;
      }

      const cutoff = Number(match[1]) * 60 + Number(match[2]);
      const holidays = new Set(
        (this.dataset.holidays || '')
          .split(',')
          .map((day) => day.trim())
          .filter(Boolean)
      );
      const isShippingDay = (date) => {
        const weekday = date.getUTCDay();
        return weekday >= 1 && weekday <= 5 && !holidays.has(isoDay(date));
      };

      const now = berlinNow();
      const today = new Date(Date.UTC(now.y, now.m - 1, now.d));
      const nowMinutes = now.h * 60 + now.min;

      if (isShippingDay(today) && nowMinutes < cutoff) {
        const left = cutoff - nowMinutes;
        const hours = Math.floor(left / 60);
        const minutes = left % 60;
        let duration = `${minutes} Min.`;
        if (hours > 0) duration = minutes > 0 ? `${hours} Std. ${minutes} Min.` : `${hours} Std.`;
        target.textContent = `Meist heute verschickt, wenn du in ${duration} bestellst`;
      } else {
        const next = new Date(today);
        let steps = 0;
        do {
          next.setUTCDate(next.getUTCDate() + 1);
          steps += 1;
        } while (!isShippingDay(next) && steps < 21);
        target.textContent = steps === 1 ? 'Meist morgen verschickt' : `Meist am ${LT_DAYS[next.getUTCDay()]} verschickt`;
      }

      this.hidden = false;
    }
  }

  customElements.define('lt-ship-cutoff', LtShipCutoff);
}
