! function(t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof module && "object" == typeof module.exports ? require("jquery") : jQuery)
}(function(t) {
  function e() {
    var e = r.settings;
    if (e.autoDispose && !t.contains(document.documentElement, this)) return t(this).timeago("dispose"), this;
    var o = i(this);
    return isNaN(o.datetime) || (0 === e.cutoff || Math.abs(n(o.datetime)) < e.cutoff ? t(this).text(a(o.datetime)) : t(this).attr("title").length > 0 && t(this).text(t(this).attr("title"))), this
  }
  function i(e) {
    if (e = t(e), !e.data("timeago")) {
      e.data("timeago", {
        datetime: r.datetime(e)
      });
      var i = t.trim(e.text());
      r.settings.localeTitle ? e.attr("title", e.data("timeago").datetime.toLocaleString()) : !(i.length > 0) || r.isTime(e) && e.attr("title") || e.attr("title", i)
    }
    return e.data("timeago")
  }
  function a(t) {
    return r.inWords(n(t))
  }
  function n(t) {
    return (new Date).getTime() - t.getTime()
  }
  t.timeago = function(e) {
    return a(e instanceof Date ? e : "string" == typeof e ? t.timeago.parse(e) : "number" == typeof e ? new Date(e) : t.timeago.datetime(e))
  };
  var r = t.timeago;
  t.extend(t.timeago, {
    settings: {
      refreshMillis: 6e4,
      allowPast: !0,
      allowFuture: !1,
      localeTitle: !1,
      cutoff: 0,
      autoDispose: !0,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: "any moment now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },
    inWords: function(e) {
      function i(i, n) {
        var r = t.isFunction(i) ? i(n, e) : i,
          o = a.numbers && a.numbers[n] || n;
        return r.replace(/%d/i, o)
      }
      if (!this.settings.allowPast && !this.settings.allowFuture) throw "timeago allowPast and allowFuture settings can not both be set to false.";
      var a = this.settings.strings,
        n = a.prefixAgo,
        r = a.suffixAgo;
      if (this.settings.allowFuture && e < 0 && (n = a.prefixFromNow, r = a.suffixFromNow), !this.settings.allowPast && e >= 0) return this.settings.strings.inPast;
      var o = Math.abs(e) / 1e3,
        s = o / 60,
        u = s / 60,
        m = u / 24,
        l = m / 365,
        d = o < 45 && i(a.seconds, Math.round(o)) || o < 90 && i(a.minute, 1) || s < 45 && i(a.minutes, Math.round(s)) || s < 90 && i(a.hour, 1) || u < 24 && i(a.hours, Math.round(u)) || u < 42 && i(a.day, 1) || m < 30 && i(a.days, Math.round(m)) || m < 45 && i(a.month, 1) || m < 365 && i(a.months, Math.round(m / 30)) || l < 1.5 && i(a.year, 1) || i(a.years, Math.round(l)),
        h = a.wordSeparator || "";
      return void 0 === a.wordSeparator && (h = " "), t.trim([n, d, r].join(h))
    },
    parse: function(e) {
      var i = t.trim(e);
      return i = i.replace(/\.\d+/, ""), i = i.replace(/-/, "/").replace(/-/, "/"), i = i.replace(/T/, " ").replace(/Z/, " UTC"), i = i.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"), i = i.replace(/([\+\-]\d\d)$/, " $100"), new Date(i)
    },
    datetime: function(e) {
      var i = r.isTime(e) ? t(e).attr("datetime") : t(e).attr("title");
      return r.parse(i)
    },
    isTime: function(e) {
      return "time" === t(e).get(0).tagName.toLowerCase()
    }
  });
  var o = {
    init: function() {
      o.dispose.call(this);
      var i = t.proxy(e, this);
      i();
      var a = r.settings;
      a.refreshMillis > 0 && (this._timeagoInterval = setInterval(i, a.refreshMillis))
    },
    update: function(i) {
      var a = i instanceof Date ? i : r.parse(i);
      t(this).data("timeago", {
        datetime: a
      }), r.settings.localeTitle && t(this).attr("title", a.toLocaleString()), e.apply(this)
    },
    updateFromDOM: function() {
      t(this).data("timeago", {
        datetime: r.parse(r.isTime(this) ? t(this).attr("datetime") : t(this).attr("title"))
      }), e.apply(this)
    },
    dispose: function() {
      this._timeagoInterval && (window.clearInterval(this._timeagoInterval), this._timeagoInterval = null)
    }
  };
  t.fn.timeago = function(t, e) {
    var i = t ? o[t] : o.init;
    if (!i) throw new Error("Unknown function name '" + t + "' for timeago");
    return this.each(function() {
      i.call(this, e)
    }), this
  }, document.createElement("abbr"), document.createElement("time")
});
//# sourceMappingURL=jquery.timeago.min.js.map
