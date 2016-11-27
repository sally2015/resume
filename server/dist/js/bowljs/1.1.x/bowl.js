"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Bowl.js
 * Javascript module loader for browser - v1.1.0 (2016-02-10T11:57:42+0800)
 * http://jraiser.org/ | Released under MIT license
 */
!function (e, t) {
  "use strict";
  function r(e, t) {
    g.logs.push("[" + e + "]" + t);
  }function n(e) {
    for (var t in e) {
      if (e.hasOwnProperty(t)) return !1;
    }return !0;
  }function a(e, t) {
    for (var r in t) {
      t.hasOwnProperty(r) && (e[r] = t[r]);
    }return e;
  }function i(e) {
    return null == e ? "" : String(e).replace(/^\s+/, "").replace(/\s+$/, "");
  }function o(e) {
    return w(e) ? e : [e];
  }function s(e, t) {
    return e = i(e), e && e.charAt(0) != t ? t + e : e;
  }function u(e, t) {
    return e = i(e), e && e.charAt(e.length - 1) !== t ? e + t : e;
  }function c(e) {
    return (/^(?:[a-z]+:)?\/{2,}/i.test(e)
    );
  }function d(e) {
    var t = b.createElement("div");return t.innerHTML = '<a href="' + e + '"></a>', t;
  }function l(e) {
    var t = d(e);return e = t.firstChild.href, t = null, e;
  }function f(e) {
    var t = d(e),
        r = t.firstChild;r.href = r.href;var n = this;n.protocol = r.protocol, n.host = r.host.replace(/:80$/, ""), n.hostname = r.hostname, n.port = r.port, n.pathname = s(r.pathname, "/"), n.search = r.search, n.hash = r.hash, t = r = null;
  }function h(e, t) {
    return (/^\//.test(e) ? (t = m.appPath, e = e.substr(1)) : /^\./.test(e) || (t = m.libPath), l(t + e)
    );
  }function p(e, t) {
    var r = e = i(e),
        n = !/^\./.test(e);if (n && x[r]) return x[r];var a = "";e = e.replace(/(?:\?.*)?(?:#.*)?$/, function (e) {
      return a = e, "";
    }).replace(/([^\\\/]+)@([^\\\/]+)/g, function (e, t, r) {
      return t + "/" + r + "/" + t;
    }).split("/");var o,
        s = e.pop() || "index",
        u = s.lastIndexOf(".");-1 !== u && (o = s.substr(u + 1), s = s.substr(0, u)), o = o || "js";var d = /-debug$/;m.debug && !d.test(s) ? s += "-debug" : !m.debug && d.test(s) && (s = s.replace(d, "")), e.push(s + "." + o);var l = e.join("/") + a;c(l) || (l = h(l, t || ""));var p = m.map;if (p) {
      l = new f(l);for (var v = 0; v < p.length; v++) {
        p[v](l);
      }l = l.toString();
    }return n && (x[r] = l), l;
  }function v(e) {
    var t,
        r = /(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g,
        n = [];for (e = e.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/gm, "").replace(/^\s*\/\/.*$/gm, ""); t = r.exec(e);) {
      t[2] && n.push(t[2]);
    }return n;
  }function y(e, t, n, a) {
    this._factory = t, this._deps = n, this._dirname = a, r("Module(constructor)", e || ""), e ? this.setId(e) : y.anonymous = this;
  }if (!e.bowljs) {
    var g = e.bowljs = { version: "1.1.0", logs: [] },
        m = {},
        b = e.document,
        _ = e.attachEvent && !(null != e.opera && "[object Opera]" === e.opera.toString()),
        w = Array.isArray || function () {
      var e = Object.prototype.toString;return function (t) {
        return "[object Array]" === e.call(t);
      };
    }();f.prototype.toString = function () {
      return u(this.protocol, ":") + "//" + this.host + s(this.pathname, "/") + s(this.search, "?") + s(this.hash, "#");
    };var x = {},
        R = function () {
      var e,
          t,
          n = "onload" in b.createElement("script") ? "onload" : "onreadystatechange",
          a = b.head || b.getElementsByTagName("head")[0],
          i = {},
          o = [];return { getCurrentScript: function getCurrentScript() {
          if (e) return e;if (t && "interactive" === t.readyState) return t;for (var r = 0; r < o.length; r++) {
            if ("interactive" === o[r].readyState) return t = o[r];
          }
        }, load: function load(s, u) {
          var c = i[s];if (r("scriptLoader.load", "src(" + s + "), status(" + c + ")"), c) 2 === c && u && u();else {
            i[s] = 1;var d = b.createElement("script");switch (_typeof(m.charset)) {case "function":
                d.charset = m.charset(s);break;case "string":
                d.charset = m.charset;}d.async = !0, d.src = s, d[n] = d.onerror = function () {
              var e = d.readyState;if (!e || "loaded" === e || "complete" === e) {
                i[s] = 2, r("scriptLoader.load(onload)", s), d[n] = d.onerror = null, a.removeChild(d);for (var c = o.length - 1; c >= 0; c--) {
                  if (o[c] === d) {
                    o.splice(c, 1);break;
                  }
                }d = t = null, u && u();
              }
            }, o.push(d), e = d, a.insertBefore(d, a.firstChild), e = null;
          }
        } };
    }(),
        S = function () {
      var e = {};return { add: function add(t, n) {
          r("dependentChain.add", "moduleId(" + t + "), depId(" + n + ")");var a = e[n] = e[n] || [];a.push(t);
        }, get: function get(t) {
          return e[t];
        }, clear: function clear(t) {
          r("dependentChain.remove", "depId(" + t + ")"), delete e[t];
        } };
    }(),
        P = function () {
      function e() {
        return n++, "#" + n + "#";
      }function r() {
        for (var e; (e = a[0]) && e.isReady();) {
          a.shift(), delete y.all[e.id()], e.execute();
        }
      }var n = 0,
          a = [],
          i = { init: function init() {
          for (var e = this, t = m.preload.slice(), n = 0, a = 0, i = 0; i < t.length; i++) {
            t[i] && (a++, R.load(p(t[i]), function () {
              n++, n >= a && (delete e._scripts, r());
            }));
          }a && (e._scripts = t);
        }, id: function id() {
          return "#preload#";
        }, isReady: function isReady() {
          return this._scripts === t;
        }, execute: function execute() {} };return { add: function add(t) {
          m.preload || (i = null), i && (a.push(i), i.init(), i = null), a.push(t), t.setId(e());
        }, tryExecute: r };
    }(),
        k = e.require = function (e, t) {
      r("globalRequire", e), P.add(new y(null, t, o(e)));
    };k.resolve = function (e) {
      return p(e);
    }, a(y, { require: function require(e) {
        var t = y.all[e];if (t) return t.exports();throw new Error('module "' + e + '" does not exist');
      }, isReady: function isReady(e) {
        var t = y.all[e];return t && t.isReady();
      }, load: function load(e) {
        y.all[e] || (r("Module.load", e), R.load(e, function () {
          if (!y.all[e] && (!_ && y.anonymous && y.anonymous.setId(e), !y.all[e])) throw new Error('module "' + e + '" lost');
        }));
      }, all: {} }), a(y.prototype, { setId: function setId(e) {
        var t = this;if (t._id) throw new Error("module id cannot be changed");if (r("module.setId", e), t._id = e, y.anonymous === t && delete y.anonymous, !y.all[e]) {
          y.all[e] = t, t._dirname = t._dirname || (t.isTask() ? "" : e.substr(0, e.lastIndexOf("/") + 1));var a = t._deps;if (a) {
            for (var i, o = t._readyStates = {}, s = 0; s < a.length; s++) {
              a[s] && (t._deps[s] = i = p(a[s], t._dirname), y.isReady(i) || (S.add(e, i), o[i] = !0, r("module(depNotReady)", "id(" + e + "), dep(" + i + ")"), y.load(i)));
            }n(o) && delete t._readyStates;
          }t._checkReady();
        }
      }, _checkReady: function _checkReady() {
        var e = this.isReady(),
            t = this.id();if (r("module._checkReady", "id(" + t + "), isReady(" + e + ")"), e) if (this.isTask()) P.tryExecute();else {
          var n = S.get(t);if (n) {
            for (var a, i = n.length - 1; i >= 0; i--) {
              a = y.all[n[i]], a && (a.notifyReady(t), r("module(notifyTo)", "from(" + t + "), to(" + n[i] + ")"));
            }S.clear(t);
          }
        }
      }, id: function id() {
        return this._id;
      }, isTask: function isTask() {
        return (/^#\d+#$/.test(this._id)
        );
      }, isReady: function isReady() {
        return this._readyStates === t;
      }, notifyReady: function notifyReady(e) {
        var t = this._readyStates;t && (delete t[e], n(t) && delete this._readyStates), this._checkReady();
      }, execute: function execute() {
        r("module.execute", this.id());for (var e = this._deps, t = [], n = e.length - 1; n >= 0; n--) {
          t[n] = y.all[e[n]].exports();
        }this._factory && this._factory.apply(window, t);
      }, exports: function exports() {
        var e = this,
            t = e._executedModule;if (!t) {
          if (t = { id: e.id() }, r("module.exports", t.id), "function" == typeof e._factory) {
            t.exports = {};var n = function n(t) {
              return y.require(p(t, e._dirname));
            };n.async = function (t, n) {
              r("asyncRequire", "require(" + t + "), moduleId(" + e.id() + ")"), P.add(new y(null, n, o(t), e._dirname));
            }, n.resolve = function (t) {
              return p(t, e._dirname);
            };var a = e._factory.call(window, n, t.exports, t);a && (t.exports = a);
          } else t.exports = e._factory;e._executedModule = t;
        }return t.exports;
      } }), e.define = function () {
      var e,
          t,
          n,
          a = arguments;switch (a.length) {case 1:
          n = a[0], t = v(n.toString());break;case 2:
          t = a[0], n = a[1];break;case 3:
          e = p(a[0]), t = a[1], n = a[2];}if (!e && _) {
        var i = R.getCurrentScript();i && (e = i.src);
      }r("globalDefine", e || ""), new y(e, n, o(t));
    }, e.define.amd = {}, g.config = function (t) {
      var r = function r(e) {
        return c(e) || (e = l(e)), u(e, "/");
      };t.libPath && (m.libPath = r(t.libPath)), t.appPath && (m.appPath = r(t.appPath));var n = e.location.search;/[?|&]debug(&|$)/.test(n) ? m.debug = !0 : /[?|&]nondebug(&|$)/.test(n) ? m.debug = !1 : null != t.debug && (m.debug = !!t.debug), t.map && (m.map = (m.map || []).concat(t.map)), m.charset = t.charset, m.preload = t.preload;
    }, g.config({ libPath: "./", appPath: "./", debug: !1 }), r("bowljs(ready)", "version(" + g.version + ")");
  }
}(window);