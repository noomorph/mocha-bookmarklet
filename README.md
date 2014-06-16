mocha-bookmarklet
=================

Bookmarklet that adds Mocha runner to your current page.

Add this to your bookmarks:

```javascript
javascript:!function(){if(window.runMocha)return window.runMocha();var o="//cdnjs.cloudflare.com/ajax/libs/",n={chai:o+"chai/1.9.1/chai.min.js",mochaCSS:o+"mocha/1.20.1/mocha.css",mochaJS:o+"mocha/1.20.1/mocha.js",jquery:o+"jquery/1.11.1/jquery.min.js",webconsole:"//eeroan.github.io/WebConsole-reporter/WebConsole.js"},c={el:function(o,n){var c,e=document.createElement(o);for(c in n)e[c]=n[c];document.head.appendChild(e)},jquery:function(){window.$||c.el("SCRIPT",{src:n.jquery})},chai:function(o){c.el("SCRIPT",{src:n.chai,onload:function(){o(window.chai)}})},mocha:function(o){c.el("SCRIPT",{src:n.mochaJS,onload:function(){o(window.mocha)}})},webconsole:function(o){c.el("SCRIPT",{src:n.webconsole,onload:function(){o(window.WebConsole)}})}};c.chai(function(o){o.should()}),c.webconsole(function(o){c.mocha(function(n){var e;n.setup({ui:"bdd",reporter:o}),n.checkLeaks(),n.globals(["jQuery"]),window.runMocha=function(o,i){if(e=o||e,!e)return console.error("no spec to run");i!==!1&&(e+="?rnd="+Math.random());var a=window.mocha.suite.suites;a.splice(0,a.length),c.el("SCRIPT",{src:e,onload:function(){n.run()}})},window.console&&console.info&&console.info("mocha bookmarklet is running")})})}();
```

# Description

When you click it for the first time, it initializes Mocha in *bdd* style with [WebConsole reporter](https://github.com/eeroan/WebConsole-reporter).

Then you can evaluate:

```javascript
runMocha("http://example.com/path/to/my/specs/spec.js");
```

...and get the results straight into your web console.

If you click it for the second time, it will run your last spec if such is found.

# Building from scratch

The bookmarklet is based on [yeoman generator](https://github.com/passy/generator-bookmarklet), which uses [Gulp](http://gulpjs.com/) for the builds.

Run from the project folder:
```shell
npm install
gulp
```

The resulting file will be here: ```dist/bookmarklet.js```.

**NOTE:** If **Gulp** is not installed globally, please run with admin rights:

```shell
npm -g install gulp
```

# TODO

* get CDN url for the console polyfill
