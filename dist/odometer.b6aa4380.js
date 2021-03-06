// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"node_modules/core-js/library/modules/_a-function.js"}],"node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"node_modules/core-js/library/modules/_is-object.js"}],"node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"node_modules/core-js/library/modules/_fails.js"}],"node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"node_modules/core-js/library/modules/_is-object.js","./_global":"node_modules/core-js/library/modules/_global.js"}],"node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"node_modules/core-js/library/modules/_descriptors.js","./_fails":"node_modules/core-js/library/modules/_fails.js","./_dom-create":"node_modules/core-js/library/modules/_dom-create.js"}],"node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"node_modules/core-js/library/modules/_is-object.js"}],"node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js"}],"node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js"}],"node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"node_modules/core-js/library/modules/_global.js","./_core":"node_modules/core-js/library/modules/_core.js","./_ctx":"node_modules/core-js/library/modules/_ctx.js","./_hide":"node_modules/core-js/library/modules/_hide.js","./_has":"node_modules/core-js/library/modules/_has.js"}],"node_modules/core-js/library/modules/es6.object.define-property.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"node_modules/core-js/library/modules/_export.js","./_descriptors":"node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"node_modules/core-js/library/modules/_object-dp.js"}],"node_modules/core-js/library/fn/object/define-property.js":[function(require,module,exports) {
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/es6.object.define-property":"node_modules/core-js/library/modules/es6.object.define-property.js","../../modules/_core":"node_modules/core-js/library/modules/_core.js"}],"node_modules/babel-runtime/core-js/object/define-property.js":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":"node_modules/core-js/library/fn/object/define-property.js"}],"odometer.js":[function(require,module,exports) {
var define;
"use strict";

var _defineProperty = _interopRequireDefault(require("babel-runtime/core-js/object/define-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! odometer 0.4.6 */
(function () {
  var a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G = [].slice;
  q = '<span class="odometer-value"></span>', n = '<span class="odometer-ribbon"><span class="odometer-ribbon-inner">' + q + "</span></span>", d = '<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">' + n + "</span></span>", g = '<span class="odometer-formatting-mark"></span>', c = "(,ddd).dd", h = /^\(?([^)]*)\)?(?:(.)(d+))?$/, i = 30, f = 2e3, a = 20, j = 2, e = .5, k = 1e3 / i, b = 1e3 / a, o = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", y = document.createElement("div").style, p = null != y.transition || null != y.webkitTransition || null != y.mozTransition || null != y.oTransition, w = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, l = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, s = function (a) {
    var b;
    return b = document.createElement("div"), b.innerHTML = a, b.children[0];
  }, v = function (a, b) {
    return a.className = a.className.replace(new RegExp("(^| )" + b.split(" ").join("|") + "( |$)", "gi"), " ");
  }, r = function (a, b) {
    return v(a, b), a.className += " " + b;
  }, z = function (a, b) {
    var c;
    return null != document.createEvent ? (c = document.createEvent("HTMLEvents"), c.initEvent(b, !0, !0), a.dispatchEvent(c)) : void 0;
  }, u = function () {
    var a, b;
    return null != (a = null != (b = window.performance) ? "function" == typeof b.now ? b.now() : void 0 : void 0) ? a : +new Date();
  }, x = function (a, b) {
    return null == b && (b = 0), b ? (a *= Math.pow(10, b), a += .5, a = Math.floor(a), a /= Math.pow(10, b)) : Math.round(a);
  }, A = function (a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a);
  }, t = function (a) {
    return a - x(a);
  }, C = !1, (B = function () {
    var a, b, c, d, e;

    if (!C && null != window.jQuery) {
      for (C = !0, d = ["html", "text"], e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(function (a) {
        var b;
        return b = window.jQuery.fn[a], window.jQuery.fn[a] = function (a) {
          var c;
          return null == a || null == (null != (c = this[0]) ? c.odometer : void 0) ? b.apply(this, arguments) : this[0].odometer.update(a);
        };
      }(a));

      return e;
    }
  })(), setTimeout(B, 0), m = function () {
    function a(b) {
      var c,
          d,
          e,
          g,
          h,
          i,
          l,
          m,
          n,
          o,
          p = this;
      if (this.options = b, this.el = this.options.el, null != this.el.odometer) return this.el.odometer;
      this.el.odometer = this, m = a.options;

      for (d in m) g = m[d], null == this.options[d] && (this.options[d] = g);

      null == (h = this.options).duration && (h.duration = f), this.MAX_VALUES = this.options.duration / k / j | 0, this.resetFormat(), this.value = this.cleanValue(null != (n = this.options.value) ? n : ""), this.renderInside(), this.render();

      try {
        for (o = ["innerHTML", "innerText", "textContent"], i = 0, l = o.length; l > i; i++) e = o[i], null != this.el[e] && !function (a) {
          return (0, _defineProperty.default)(p.el, a, {
            get: function () {
              var b;
              return "innerHTML" === a ? p.inside.outerHTML : null != (b = p.inside.innerText) ? b : p.inside.textContent;
            },
            set: function (a) {
              return p.update(a);
            }
          });
        }(e);
      } catch (q) {
        c = q, this.watchForMutations();
      }
    }

    return a.prototype.renderInside = function () {
      return this.inside = document.createElement("div"), this.inside.className = "odometer-inside", this.el.innerHTML = "", this.el.appendChild(this.inside);
    }, a.prototype.watchForMutations = function () {
      var a,
          b = this;
      if (null != l) try {
        return null == this.observer && (this.observer = new l(function () {
          var a;
          return a = b.el.innerText, b.renderInside(), b.render(b.value), b.update(a);
        })), this.watchMutations = !0, this.startWatchingMutations();
      } catch (c) {
        a = c;
      }
    }, a.prototype.startWatchingMutations = function () {
      return this.watchMutations ? this.observer.observe(this.el, {
        childList: !0
      }) : void 0;
    }, a.prototype.stopWatchingMutations = function () {
      var a;
      return null != (a = this.observer) ? a.disconnect() : void 0;
    }, a.prototype.cleanValue = function (a) {
      var b;
      return "string" == typeof a && (a = a.replace(null != (b = this.format.radix) ? b : ".", "<radix>"), a = a.replace(/[.,]/g, ""), a = a.replace("<radix>", "."), a = parseFloat(a, 10) || 0), x(a, this.format.precision);
    }, a.prototype.bindTransitionEnd = function () {
      var a,
          b,
          c,
          d,
          e,
          f,
          g = this;

      if (!this.transitionEndBound) {
        for (this.transitionEndBound = !0, b = !1, e = o.split(" "), f = [], c = 0, d = e.length; d > c; c++) a = e[c], f.push(this.el.addEventListener(a, function () {
          return b ? !0 : (b = !0, setTimeout(function () {
            return g.render(), b = !1, z(g.el, "odometerdone");
          }, 0), !0);
        }, !1));

        return f;
      }
    }, a.prototype.resetFormat = function () {
      var a, b, d, e, f, g, i, j;
      if (a = null != (i = this.options.format) ? i : c, a || (a = "d"), d = h.exec(a), !d) throw new Error("Odometer: Unparsable digit format");
      return j = d.slice(1, 4), g = j[0], f = j[1], b = j[2], e = (null != b ? b.length : void 0) || 0, this.format = {
        repeating: g,
        radix: f,
        precision: e
      };
    }, a.prototype.render = function (a) {
      var b, c, d, e, f, g, h, i, j, k, l, m;

      for (null == a && (a = this.value), this.stopWatchingMutations(), this.resetFormat(), this.inside.innerHTML = "", g = this.options.theme, b = this.el.className.split(" "), f = [], i = 0, k = b.length; k > i; i++) c = b[i], c.length && ((e = /^odometer-theme-(.+)$/.exec(c)) ? g = e[1] : /^odometer(-|$)/.test(c) || f.push(c));

      for (f.push("odometer"), p || f.push("odometer-no-transitions"), f.push(g ? "odometer-theme-" + g : "odometer-auto-theme"), this.el.className = f.join(" "), this.ribbons = {}, this.digits = [], h = !this.format.precision || !t(a) || !1, m = a.toString().split("").reverse(), j = 0, l = m.length; l > j; j++) d = m[j], "." === d && (h = !0), this.addDigit(d, h);

      return this.startWatchingMutations();
    }, a.prototype.update = function (a) {
      var b,
          c = this;
      return a = this.cleanValue(a), (b = a - this.value) ? (v(this.el, "odometer-animating-up odometer-animating-down odometer-animating"), b > 0 ? r(this.el, "odometer-animating-up") : r(this.el, "odometer-animating-down"), this.stopWatchingMutations(), this.animate(a), this.startWatchingMutations(), setTimeout(function () {
        return c.el.offsetHeight, r(c.el, "odometer-animating");
      }, 0), this.value = a) : void 0;
    }, a.prototype.renderDigit = function () {
      return s(d);
    }, a.prototype.insertDigit = function (a, b) {
      return null != b ? this.inside.insertBefore(a, b) : this.inside.children.length ? this.inside.insertBefore(a, this.inside.children[0]) : this.inside.appendChild(a);
    }, a.prototype.addSpacer = function (a, b, c) {
      var d;
      return d = s(g), d.innerHTML = a, c && r(d, c), this.insertDigit(d, b);
    }, a.prototype.addDigit = function (a, b) {
      var c, d, e, f;
      if (null == b && (b = !0), "-" === a) return this.addSpacer(a, null, "odometer-negation-mark");
      if ("." === a) return this.addSpacer(null != (f = this.format.radix) ? f : ".", null, "odometer-radix-mark");
      if (b) for (e = !1;;) {
        if (!this.format.repeating.length) {
          if (e) throw new Error("Bad odometer format without digits");
          this.resetFormat(), e = !0;
        }

        if (c = this.format.repeating[this.format.repeating.length - 1], this.format.repeating = this.format.repeating.substring(0, this.format.repeating.length - 1), "d" === c) break;
        this.addSpacer(c);
      }
      return d = this.renderDigit(), d.querySelector(".odometer-value").innerHTML = a, this.digits.push(d), this.insertDigit(d);
    }, a.prototype.animate = function (a) {
      return p && "count" !== this.options.animation ? this.animateSlide(a) : this.animateCount(a);
    }, a.prototype.animateCount = function (a) {
      var c,
          d,
          e,
          f,
          g,
          h = this;
      if (d = +a - this.value) return f = e = u(), c = this.value, (g = function () {
        var i, j, k;
        return u() - f > h.options.duration ? (h.value = a, h.render(), void z(h.el, "odometerdone")) : (i = u() - e, i > b && (e = u(), k = i / h.options.duration, j = d * k, c += j, h.render(Math.round(c))), null != w ? w(g) : setTimeout(g, b));
      })();
    }, a.prototype.getDigitCount = function () {
      var a, b, c, d, e, f;

      for (d = 1 <= arguments.length ? G.call(arguments, 0) : [], a = e = 0, f = d.length; f > e; a = ++e) c = d[a], d[a] = Math.abs(c);

      return b = Math.max.apply(Math, d), Math.ceil(Math.log(b + 1) / Math.log(10));
    }, a.prototype.getFractionalDigitCount = function () {
      var a, b, c, d, e, f, g;

      for (e = 1 <= arguments.length ? G.call(arguments, 0) : [], b = /^\-?\d*\.(\d*?)0*$/, a = f = 0, g = e.length; g > f; a = ++f) d = e[a], e[a] = d.toString(), c = b.exec(e[a]), e[a] = null == c ? 0 : c[1].length;

      return Math.max.apply(Math, e);
    }, a.prototype.resetDigits = function () {
      return this.digits = [], this.ribbons = [], this.inside.innerHTML = "", this.resetFormat();
    }, a.prototype.animateSlide = function (a) {
      var b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, s, t, u, v, w, x, y, z, B, C, D, E;

      if (s = this.value, j = this.getFractionalDigitCount(s, a), j && (a *= Math.pow(10, j), s *= Math.pow(10, j)), d = a - s) {
        for (this.bindTransitionEnd(), f = this.getDigitCount(s, a), g = [], b = 0, m = v = 0; f >= 0 ? f > v : v > f; m = f >= 0 ? ++v : --v) {
          if (t = A(s / Math.pow(10, f - m - 1)), i = A(a / Math.pow(10, f - m - 1)), h = i - t, Math.abs(h) > this.MAX_VALUES) {
            for (l = [], n = h / (this.MAX_VALUES + this.MAX_VALUES * b * e), c = t; h > 0 && i > c || 0 > h && c > i;) l.push(Math.round(c)), c += n;

            l[l.length - 1] !== i && l.push(i), b++;
          } else l = function () {
            E = [];

            for (var a = t; i >= t ? i >= a : a >= i; i >= t ? a++ : a--) E.push(a);

            return E;
          }.apply(this);

          for (m = w = 0, y = l.length; y > w; m = ++w) k = l[m], l[m] = Math.abs(k % 10);

          g.push(l);
        }

        for (this.resetDigits(), D = g.reverse(), m = x = 0, z = D.length; z > x; m = ++x) for (l = D[m], this.digits[m] || this.addDigit(" ", m >= j), null == (u = this.ribbons)[m] && (u[m] = this.digits[m].querySelector(".odometer-ribbon-inner")), this.ribbons[m].innerHTML = "", 0 > d && (l = l.reverse()), o = C = 0, B = l.length; B > C; o = ++C) k = l[o], q = document.createElement("div"), q.className = "odometer-value", q.innerHTML = k, this.ribbons[m].appendChild(q), o === l.length - 1 && r(q, "odometer-last-value"), 0 === o && r(q, "odometer-first-value");

        return 0 > t && this.addDigit("-"), p = this.inside.querySelector(".odometer-radix-mark"), null != p && p.parent.removeChild(p), j ? this.addSpacer(this.format.radix, this.digits[j - 1], "odometer-radix-mark") : void 0;
      }
    }, a;
  }(), m.options = null != (E = window.odometerOptions) ? E : {}, setTimeout(function () {
    var a, b, c, d, e;

    if (window.odometerOptions) {
      d = window.odometerOptions, e = [];

      for (a in d) b = d[a], e.push(null != (c = m.options)[a] ? (c = m.options)[a] : c[a] = b);

      return e;
    }
  }, 0), m.init = function () {
    var a, b, c, d, e, f;

    if (null != document.querySelectorAll) {
      for (b = document.querySelectorAll(m.options.selector || ".odometer"), f = [], c = 0, d = b.length; d > c; c++) a = b[c], f.push(a.odometer = new m({
        el: a,
        value: null != (e = a.innerText) ? e : a.textContent
      }));

      return f;
    }
  }, null != (null != (F = document.documentElement) ? F.doScroll : void 0) && null != document.createEventObject ? (D = document.onreadystatechange, document.onreadystatechange = function () {
    return "complete" === document.readyState && m.options.auto !== !1 && m.init(), null != D ? D.apply(this, arguments) : void 0;
  }) : document.addEventListener("DOMContentLoaded", function () {
    return m.options.auto !== !1 ? m.init() : void 0;
  }, !1), "function" == typeof define && define.amd ? define(["jquery"], function () {
    return m;
  }) : typeof exports === !1 ? module.exports = m : window.Odometer = m;
}).call(void 0);
},{"babel-runtime/core-js/object/define-property":"node_modules/babel-runtime/core-js/object/define-property.js"}]},{},["odometer.js"], null)
//# sourceMappingURL=/odometer.b6aa4380.map