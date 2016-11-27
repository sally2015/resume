"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * vuex v2.0.0
 * (c) 2016 Evan You
 * @license MIT
 */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Vuex = e();
}(undefined, function () {
  "use strict";
  function t(t) {
    b && (t._devtoolHook = b, b.emit("vuex:init", t), b.on("vuex:travel-to-state", function (e) {
      t.replaceState(e);
    }), t.subscribe(function (t, e) {
      b.emit("vuex:mutation", t, e);
    }));
  }function e(t) {
    function e() {
      var t = this.$options;t.store ? this.$store = t.store : t.parent && t.parent.$store && (this.$store = t.parent.$store);
    }var n = Number(t.version.split(".")[0]);if (n >= 2) {
      var o = t.config._lifecycleHooks.indexOf("init") > -1;t.mixin(o ? { init: e } : { beforeCreate: e });
    } else {
      var i = t.prototype._init;t.prototype._init = function (t) {
        void 0 === t && (t = {}), t.init = t.init ? [e].concat(t.init) : e, i.call(this, t);
      };
    }
  }function n(t) {
    var e = {};return s(t).forEach(function (t) {
      var n = t.key,
          o = t.val;e[n] = function () {
        return "function" == typeof o ? o.call(this, this.$store.state, this.$store.getters) : this.$store.state[o];
      };
    }), e;
  }function o(t) {
    var e = {};return s(t).forEach(function (t) {
      var n = t.key,
          o = t.val;e[n] = function () {
        for (var t = [], e = arguments.length; e--;) {
          t[e] = arguments[e];
        }return this.$store.commit.apply(this.$store, [o].concat(t));
      };
    }), e;
  }function i(t) {
    var e = {};return s(t).forEach(function (t) {
      var n = t.key,
          o = t.val;e[n] = function () {
        return o in this.$store.getters || console.error("[vuex] unknown getter: " + o), this.$store.getters[o];
      };
    }), e;
  }function r(t) {
    var e = {};return s(t).forEach(function (t) {
      var n = t.key,
          o = t.val;e[n] = function () {
        for (var t = [], e = arguments.length; e--;) {
          t[e] = arguments[e];
        }return this.$store.dispatch.apply(this.$store, [o].concat(t));
      };
    }), e;
  }function s(t) {
    return Array.isArray(t) ? t.map(function (t) {
      return { key: t, val: t };
    }) : Object.keys(t).map(function (e) {
      return { key: e, val: t[e] };
    });
  }function u(t) {
    return null !== t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t));
  }function a(t) {
    return t && "function" == typeof t.then;
  }function c(t, e) {
    if (!t) throw new Error("[vuex] " + e);
  }function f(t, e) {
    if (e.actions && (t.actions = e.actions), e.mutations && (t.mutations = e.mutations), e.getters && (t.getters = e.getters), e.modules) for (var n in e.modules) {
      if (!t.modules || !t.modules[n]) return void console.warn("[vuex] trying to add a new module '" + n + "' on hot reloading, manual reload is needed");f(t.modules[n], e.modules[n]);
    }
  }function l(t) {
    t._actions = Object.create(null), t._mutations = Object.create(null), t._wrappedGetters = Object.create(null);var e = t.state;p(t, e, [], t._options, !0), Object.keys(t._runtimeModules).forEach(function (n) {
      p(t, e, n.split("."), t._runtimeModules[n], !0);
    }), h(t, e);
  }function h(t, e) {
    var n = t._vm;t.getters = {};var o = t._wrappedGetters,
        i = {};Object.keys(o).forEach(function (e) {
      var n = o[e];i[e] = function () {
        return n(t);
      }, Object.defineProperty(t.getters, e, { get: function get() {
          return t._vm[e];
        } });
    });var r = w.config.silent;w.config.silent = !0, t._vm = new w({ data: { state: e }, computed: i }), w.config.silent = r, t.strict && y(t), n && (t._withCommit(function () {
      n.state = null;
    }), w.nextTick(function () {
      return n.$destroy();
    }));
  }function p(t, e, n, o, i) {
    var r = !n.length,
        s = o.state,
        u = o.actions,
        a = o.mutations,
        c = o.getters,
        f = o.modules;if (!r && !i) {
      var l = _(e, n.slice(0, -1)),
          h = n[n.length - 1];t._withCommit(function () {
        w.set(l, h, s || {});
      });
    }a && Object.keys(a).forEach(function (e) {
      d(t, e, a[e], n);
    }), u && Object.keys(u).forEach(function (e) {
      m(t, e, u[e], n);
    }), c && v(t, c, n), f && Object.keys(f).forEach(function (o) {
      p(t, e, n.concat(o), f[o], i);
    });
  }function d(t, e, n, o) {
    void 0 === o && (o = []);var i = t._mutations[e] || (t._mutations[e] = []);i.push(function (e) {
      n(_(t.state, o), e);
    });
  }function m(t, e, n, o) {
    void 0 === o && (o = []);var i = t._actions[e] || (t._actions[e] = []),
        r = t.dispatch,
        s = t.commit;i.push(function (e, i) {
      var u = n({ dispatch: r, commit: s, getters: t.getters, state: _(t.state, o), rootState: t.state }, e, i);return a(u) || (u = Promise.resolve(u)), t._devtoolHook ? u.catch(function (e) {
        throw t._devtoolHook.emit("vuex:error", e), e;
      }) : u;
    });
  }function v(t, e, n) {
    Object.keys(e).forEach(function (o) {
      var i = e[o];return t._wrappedGetters[o] ? void console.error("[vuex] duplicate getter key: " + o) : void (t._wrappedGetters[o] = function (t) {
        return i(_(t.state, n), t.getters, t.state);
      });
    });
  }function y(t) {
    t._vm.$watch("state", function () {
      c(t._committing, "Do not mutate vuex store state outside mutation handlers.");
    }, { deep: !0, sync: !0 });
  }function _(t, e) {
    return e.length ? e.reduce(function (t, e) {
      return t[e];
    }, t) : t;
  }function g(t) {
    return w ? void console.error("[vuex] already installed. Vue.use(Vuex) should be called only once.") : (w = t, void e(w));
  }var w,
      b = "undefined" != typeof window && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
      x = function x(e) {
    var n = this;void 0 === e && (e = {}), c(w, "must call Vue.use(Vuex) before creating a store instance."), c("undefined" != typeof Promise, "vuex requires a Promise polyfill in this browser.");var o = e.state;void 0 === o && (o = {});var i = e.plugins;void 0 === i && (i = []);var r = e.strict;void 0 === r && (r = !1), this._options = e, this._committing = !1, this._actions = Object.create(null), this._mutations = Object.create(null), this._wrappedGetters = Object.create(null), this._runtimeModules = Object.create(null), this._subscribers = [], this._watcherVM = new w();var s = this,
        u = this,
        a = u.dispatch,
        f = u.commit;this.dispatch = function (t, e) {
      return a.call(s, t, e);
    }, this.commit = function (t, e, n) {
      return f.call(s, t, e, n);
    }, this.strict = r, p(this, o, [], e), h(this, o), i.concat(t).forEach(function (t) {
      return t(n);
    });
  },
      O = { state: {} };O.state.get = function () {
    return this._vm.state;
  }, O.state.set = function (t) {
    c(!1, "Use store.replaceState() to explicit replace store state.");
  }, x.prototype.commit = function (t, e, n) {
    var o = this;u(t) && t.type && (n = e, e = t, t = t.type);var i = { type: t, payload: e },
        r = this._mutations[t];return r ? (this._withCommit(function () {
      r.forEach(function (t) {
        t(e);
      });
    }), void (n && n.silent || this._subscribers.forEach(function (t) {
      return t(i, o.state);
    }))) : void console.error("[vuex] unknown mutation type: " + t);
  }, x.prototype.dispatch = function (t, e) {
    u(t) && t.type && (e = t, t = t.type);var n = this._actions[t];return n ? n.length > 1 ? Promise.all(n.map(function (t) {
      return t(e);
    })) : n[0](e) : void console.error("[vuex] unknown action type: " + t);
  }, x.prototype.subscribe = function (t) {
    var e = this._subscribers;return e.indexOf(t) < 0 && e.push(t), function () {
      var n = e.indexOf(t);n > -1 && e.splice(n, 1);
    };
  }, x.prototype.watch = function (t, e, n) {
    var o = this;return c("function" == typeof t, "store.watch only accepts a function."), this._watcherVM.$watch(function () {
      return t(o.state);
    }, e, n);
  }, x.prototype.replaceState = function (t) {
    var e = this;this._withCommit(function () {
      e._vm.state = t;
    });
  }, x.prototype.registerModule = function (t, e) {
    "string" == typeof t && (t = [t]), c(Array.isArray(t), "module path must be a string or an Array."), this._runtimeModules[t.join(".")] = e, p(this, this.state, t, e), h(this, this.state);
  }, x.prototype.unregisterModule = function (t) {
    var e = this;"string" == typeof t && (t = [t]), c(Array.isArray(t), "module path must be a string or an Array."), delete this._runtimeModules[t.join(".")], this._withCommit(function () {
      var n = _(e.state, t.slice(0, -1));w.delete(n, t[t.length - 1]);
    }), l(this);
  }, x.prototype.hotUpdate = function (t) {
    f(this._options, t), l(this);
  }, x.prototype._withCommit = function (t) {
    var e = this._committing;this._committing = !0, t(), this._committing = e;
  }, Object.defineProperties(x.prototype, O), "undefined" != typeof window && window.Vue && g(window.Vue);var k = { Store: x, install: g, mapState: n, mapMutations: o, mapGetters: i, mapActions: r };return k;
});