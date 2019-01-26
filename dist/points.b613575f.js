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
})({"points.js":[function(require,module,exports) {
let points = 1;
const pointIncrement = 1;
const bars = [];
const pointsEle = document.getElementById('odometer');

const randInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

const calcPercent = (cur, max) => {
  if (cur >= max) return 100;
  return Math.round(100 * cur / max);
};

const updateProgressBar = (bar, points) => {
  bar.percent = calcPercent(points, bar.maxPoints);
  console.log(bar.percent, points, bar.maxPoints);
  bar.instance.set(bar.percent);
  return bar;
};

const incrementPoints = wait => {
  setTimeout(() => {
    points += pointIncrement;
    pointsEle.innerHTML = points;
    bars.forEach(bar => {
      updateProgressBar(bar, points);
    });
    pointLoop();
  }, wait);
};

const pointLoop = () => {
  const lowestAmount = 1000;
  const highestAmount = 5000;
  incrementPoints(randInt(lowestAmount, highestAmount));
};

const genProgressBar = (id, points, maxPoints) => {
  const toReturn = {
    id,
    maxPoints,
    percent: calcPercent(points, maxPoints),
    instance: new ldBar(id)
  };
  toReturn.instance.set(toReturn.percent);
  return toReturn;
};

const initBars = () => {
  const numBars = 4;

  for (let bar = 0; bar < numBars; ++bar) {
    bars.push(genProgressBar(`#ldBar${bar}`, 0, 10));
  }
};

const init = () => {
  pointLoop();
  initBars();
};

init();
},{}]},{},["points.js"], null)
//# sourceMappingURL=/points.b613575f.map