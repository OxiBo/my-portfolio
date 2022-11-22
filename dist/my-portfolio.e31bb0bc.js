// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./styles/images/textured.jpeg":[["textured.394f2c97.jpeg","styles/images/textured.jpeg"],"styles/images/textured.jpeg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
// https://github.com/parcel-bundler/parcel/issues/505
'use strict';

require("./index.scss");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// const pdfFileName = "/my-portfolio/100q.pdf";
// const pdfFileName = "/OB.Stepanchuk_EN.pdf";
var pdfFileName = '/my-portfolio/OB.Stepanchuk_EN.pdf'; // exclude nav link to pdf file

var navLinksAll = document.querySelectorAll('#navigation li a');
var navLinks = Array.prototype.filter.call(navLinksAll, function (node) {
  // this makes filter work for local server and github
  return node.getAttribute('href') !== pdfFileName && node.getAttribute('href') !== '/OB.Stepanchuk_EN.pdf';
}); // variables

var ulProjectsList = document.getElementById('projects-list');
var elements = {
  menuButton: document.getElementById('toggle-menu'),
  menuBarIcon: document.querySelector('.fa-bars'),
  menuClose: document.querySelector('.fa-window-close'),
  navbar: document.querySelector('.collapsible-nav'),
  navLinks: navLinks,
  // document.querySelectorAll("#navigation li a"), without the link to pdg file
  section: document.querySelectorAll('section'),
  ulLanguages: document.getElementById('languages'),
  ulProjectsList: ulProjectsList,
  liProjectsList: ulProjectsList.children
}; // programing languages icons - https://icon-icons.com/download/67193/PNG/512/

var languagesIcons = {
  HTML5: 'HTML5_icon.png',
  CSS: 'CSS_icon.png',
  SASS: 'scss_icon.png',
  Bootstrap: 'bootstrap_icon.png',
  Javascript: 'javascript-icon.png',
  React: 'react_icon.png',
  Redux: 'redux_icon.png',
  MaterialUI: 'material-ui-logo.png',
  //'material_ui_icon.png',
  Node: 'nodejs-icon.png',
  Mongo: 'mongo_icon.png',
  GraphQL: 'graphql_icon.png',
  Github: 'github_icon.png',
  Webpack: 'webpack_icon.png',
  Prisma: 'prisma_icon.png',
  SQL: 'sql_icon.png',
  Heroku: 'heroku_icon.png'
}; // projects list

var projects = [{
  name: 'Make Cocktails',
  description: 'Find cocktails recipes, make list of favorites, email recipes',
  image: 'fun-mixie.png',
  url: 'https://github.com/OxiBo/fun-mixie',
  //"https://shop-cook.herokuapp.com/",
  github: 'https://github.com/OxiBo/fun-mixie'
}, {
  name: 'Blog',
  description: 'Working blog with comments, likes, user lists',
  image: 'blog-app.png',
  url: 'https://dev-blog-oxibo.herokuapp.com/',
  github: 'https://github.com/OxiBo/dev-blog-app'
}, {
  name: 'Shop&Cook',
  description: 'Find recipes, make list of favorites, create and email shopping list',
  image: 'shop-cook.png',
  url: 'https://github.com/OxiBo/shop-cook',
  //"https://shop-cook.herokuapp.com/",
  github: 'https://github.com/OxiBo/shop-cook'
}, {
  name: 'Market Place',
  description: 'Sell, buy, review purchases (graphQL backend)',
  image: 'market-app.png',
  url: '',
  github: 'https://github.com/OxiBo/market-app-graphql-prisma'
}, {
  name: 'Online store',
  description: 'Create accounts, buy products, keep track of products reviewing',
  image: 'express-playground.png',
  url: 'https://fullstack-playground.herokuapp.com/',
  github: 'https://github.com/OxiBo/express-react-playground'
}, {
  name: 'Login App',
  description: 'Login using passport strategies functionality',
  image: 'login-app.png',
  url: '',
  github: 'https://github.com/OxiBo/loginApp'
}, {
  name: 'Wikipedia Viewer',
  description: 'Search Wikipedia entries and see the results',
  image: 'wiki-viewer.png',
  url: 'https://codepen.io/OxiBo/full/XZrZjo/',
  github: ''
}, {
  name: 'Random Quote Engine',
  description: 'Find random quote',
  image: 'random-quote.png',
  url: 'https://codepen.io/OxiBo/full/rpPYOq/',
  github: 'https://github.com/OxiBo/random-quote-machine-react'
}, {
  name: 'Local Weather APP',
  description: 'Shows local weather with respective background',
  image: 'local-weather.png',
  url: 'https://codepen.io/OxiBo/full/opVJVe',
  github: 'https://github.com/OxiBo/local-weather-app-react'
}, {
  name: 'Product Landing Page',
  description: 'Example of a product landing home page',
  image: 'product-landing.png',
  url: 'https://codepen.io/OxiBo/full/GBWqBR',
  github: 'https://github.com/OxiBo/Product-Landing-Page'
}, {
  name: 'Technical Docs Page',
  description: 'Example of technical documentation page',
  image: 'tech-page.png',
  url: 'https://codepen.io/OxiBo/full/Zjjzzm',
  github: 'https://github.com/OxiBo/Technical-documentation-page'
}, {
  name: 'Markdown Previewer',
  description: 'Working markdown previewer',
  image: 'markdown-previewer.png',
  url: 'https://codepen.io/OxiBo/full/LXyaeB',
  github: 'https://github.com/OxiBo/markdown-previewer'
}, {
  name: 'Drum Machine',
  description: 'Working drum machine',
  image: 'drum-machine.png',
  url: 'https://codepen.io/OxiBo/full/XOpdpb',
  github: 'https://github.com/OxiBo/drum-machine-refactor'
}, {
  name: 'JS Calculator',
  description: 'JavaScript Calculator',
  image: 'js-calculator.png',
  url: 'https://codepen.io/OxiBo/full/zYOzNmE',
  github: 'https://github.com/OxiBo/javascript-calculator'
}, {
  name: 'Pomodoro Clock',
  description: 'Pomodoro Technique (a time management method) implementation',
  image: 'pomodoro-clock.png',
  url: 'https://codepen.io/OxiBo/full/pooJMJQ',
  github: 'https://github.com/OxiBo/pomodoro-clock'
}, {
  name: 'Twitch TV Streamers',
  description: 'View and lookup Twitch TV streamers',
  image: 'twitch.png',
  url: 'https://oxibo.github.io/twitch-tv-api/',
  github: 'https://github.com/OxiBo/twitch-tv-api'
} // {
//   name: "Online Store",
//   description: "Online store with login and pay via stripe",
//   image: "express-playground.png",
//   url: "https://fullstack-playground.herokuapp.com/",
//   github: "https://github.com/OxiBo/express-react-playground",
// },
];

(function () {
  var menuButton = elements.menuButton,
      menuBarIcon = elements.menuBarIcon,
      menuClose = elements.menuClose,
      navbar = elements.navbar,
      ulLanguages = elements.ulLanguages,
      ulProjectsList = elements.ulProjectsList,
      navLinks = elements.navLinks,
      offsetTop = elements.offsetTop,
      section = elements.section,
      liProjectsList = elements.liProjectsList; // open collapsible menu

  menuButton.addEventListener('click', function () {
    navbar.classList.toggle('open');
    menuBarIcon.classList.toggle('open');
    menuClose.classList.toggle('closeMenu');
  }); //https://stackoverflow.com/questions/54605406/closing-a-menu-on-an-outside-click-pure-javascript
  // When the user clicks anywhere outside of the menu window, close menu

  window.addEventListener('click', function (event) {
    // console.log(navbar.className.includes('open'))
    if (event.target.closest('button#toggle-menu') !== menuButton && navbar.className.includes('open')) {
      navbar.classList.remove('open');
      menuBarIcon.classList.toggle('open');
      menuClose.classList.toggle('closeMenu');
    }
  }); // smooth scroll - https://webdesign.tutsplus.com/tutorials/smooth-scrolling-vanilla-javascript--cms-35165
  // const navFiltered = Array.prototype.filter.call(navLinks, function (node) {
  //   return node.attributes.download ? null : node;
  // });
  // console.log(navFiltered);

  var _iterator = _createForOfIteratorHelper(navLinks),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var link = _step.value;
      // console.log(link);
      link.addEventListener('click', clickHandler);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  function clickHandler(e) {
    e.preventDefault();
    var href = this.getAttribute('href'); // console.log(href);

    var offsetTop = document.querySelector(href).offsetTop;
    console.log(offsetTop);
    scroll({
      top: offsetTop - 40,
      behavior: 'smooth'
    });
  } // scrollspy - https://codepen.io/zchee/pen/ogzvZZ
  // TODO - Intersection Observer API https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API


  var sections = {};
  var i = 0; // iterate over sections (it is not an array but array-like that is why need to use Array.prototype and call()) to get sections ids and offset (position)

  Array.prototype.forEach.call(section, function (e) {
    console.log(e.offsetTop);
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        // document.querySelector(".active").setAttribute("class", " ");
        document.querySelector('.active').classList.remove('active');
        document.querySelector('a[href*=' + i + ']').closest('li').classList.add('active');
      }
    }
  }; // render skills(languages) icons

  /*    --- parcel-bundler does not load images from js file automatically. This work around makes it possible to use images. with this import - import langIcons from "./styles/images/skillsIcons/*.*"; // https://github.com/parcel-bundler/parcel/issues/1668 ;
   I copied images manually into dist folder because I wanted to map over the images in a certain order, which did not work if the images were copied to dist with this approach
   Object.keys(langIcons).map((key) => {
    // console.log(langIcons[key].png);
    languages.push(`<li><img src="${langIcons[key].png}"
                                    alt="${key}"/></li>`);
  });
  */


  var languages = [];
  Object.keys(languagesIcons).map(function (key) {
    languages.push("<li><img src=\"".concat(languagesIcons[key], "\" alt=\"").concat(key, "\"/><p>").concat(key, "</p></li>"));
  });
  languages = languages.join().replace(/,/gi, '');
  ulLanguages.insertAdjacentHTML('afterbegin', languages); // render projects

  var projectsList = projects.map(function (_ref) {
    var name = _ref.name,
        description = _ref.description,
        image = _ref.image,
        url = _ref.url,
        github = _ref.github;
    return "<li><figure><img src=".concat(image, " alt=").concat(name, "/><p>").concat(name, "</p><a href=").concat(url || github, " target=\"_blank\">").concat(name, "</a></figure>\n        <hr />\n        <figcaption><p>").concat(description, "</p><a href=").concat(url || github, " target=\"_blank\">View Project</a></figcaption>\n        </li>");
  }).join().replace(/,(?=<li>)/gi, '');
  /*
    const projectsList = projects
    .map(
      ({ name, description, image, url, github }) =>
        `<li><figure><img src=${image} alt=${name}/><p>${name}</p></figure>
        <figcaption><p>${description}</p><a href=${
          url || github
        } target="_blank">View Project</a></figcaption>
        </li>`
    )
    .join()
    .replace(/(?<=<\/li>),/gi, "");*/
  // console.log(projectsList);

  ulProjectsList.insertAdjacentHTML('afterbegin', projectsList); // highlight hoovered project and dim all siblings

  /*
  Array.prototype.forEach.call(liProjectsList, (li) => {
    li.addEventListener("mouseenter", (e) => {
      Array.prototype.forEach.call(liProjectsList, (li) => {
        li.classList.remove("highlighted");
        li.classList.remove("dimmed");
      });
      li.classList.add("highlighted");
      const lisToDim = ulProjectsList.querySelectorAll("li:not(.highlighted)");
      Array.prototype.forEach.call(lisToDim, (li) => {
        li.classList.add("dimmed");
      });
    });
  });
  Array.prototype.forEach.call(liProjectsList, (li) => {
    li.addEventListener("mouseleave", (e) => {
      Array.prototype.forEach.call(liProjectsList, (li) => {
        li.classList.remove("dimmed");
        li.classList.remove("highlighted");
      });
    });
  }); 
  */
})(); // (function() {
//   window.onresize = displayWindowSize;
//   window.onload = displayWindowSize;
//   function displayWindowSize() {
//     let myWidth = window.innerWidth;
//     let myHeight = window.innerHeight;
//     // your size calculation code here
//     console.log(myWidth)
//     // document.getElementById("screen").innerHTML = myWidth + "x" + myHeight;
//   };
// })();
},{"./index.scss":"index.scss"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54848" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/my-portfolio.e31bb0bc.js.map