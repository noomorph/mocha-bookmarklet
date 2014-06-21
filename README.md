mocha-bookmarklet
=================

Bookmarklet that adds Mocha runner to your current page.

Supports Chrome only — I promise to fix this in a few days.

Add this to your bookmarks:

```javascript
javascript:!function(){if(window.runMocha)return window.runMocha();var o="//cdnjs.cloudflare.com/ajax/libs/",a={chai:o+"chai/1.9.1/chai.min.js",mochaCSS:o+"mocha/1.20.1/mocha.css",mochaJS:o+"mocha/1.20.1/mocha.js",jquery:o+"jquery/1.11.1/jquery.min.js",webconsole:"//eeroan.github.io/WebConsole-reporter/WebConsole.js",consolePolyfill:"https://raw.githubusercontent.com/paulmillr/console-polyfill/master/index.js"},c={el:function(o,a){var c,e=document.createElement(o);for(c in a)e[c]=a[c];document.getElementsByTagName("head")[0].appendChild(e)},jquery:function(){window.$||c.el("SCRIPT",{src:a.jquery})},chai:function(o){c.el("SCRIPT",{src:a.chai,onload:function(){o(window.chai)}})},mocha:function(o){!function(){var o=document.createElement("style");o.appendChild(document.createTextNode("#mocha,#mocha html,#mocha body,#mocha div,#mocha span,#mocha applet,#mocha object,#mocha iframe,#mocha h1,#mocha h2,#mocha h3,#mocha h4,#mocha h5,#mocha h6,#mocha p,#mocha blockquote,#mocha pre,#mocha a,#mocha abbr,#mocha acronym,#mocha address,#mocha big,#mocha cite,#mocha code,#mocha del,#mocha dfn,#mocha em,#mocha img,#mocha ins,#mocha kbd,#mocha q,#mocha s,#mocha samp,#mocha small,#mocha strike,#mocha strong,#mocha sub,#mocha sup,#mocha tt,#mocha var,#mocha b,#mocha u,#mocha i,#mocha center,#mocha dl,#mocha dt,#mocha dd,#mocha ol,#mocha ul,#mocha li,#mocha fieldset,#mocha form,#mocha label,#mocha legend,#mocha table,#mocha caption,#mocha tbody,#mocha tfoot,#mocha thead,#mocha tr,#mocha th,#mocha td,#mocha article,#mocha aside,#mocha canvas,#mocha details,#mocha embed,#mocha figure,#mocha figcaption,#mocha footer,#mocha header,#mocha hgroup,#mocha menu,#mocha nav,#mocha output,#mocha ruby,#mocha section,#mocha summary,#mocha time,#mocha mark,#mocha audio,#mocha video{text-align:initial;margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}#mocha html{line-height:1}#mocha ol,#mocha ul{list-style:none}#mocha table{border-collapse:collapse;border-spacing:0}#mocha caption,#mocha th,#mocha td{text-align:left;font-weight:normal;vertical-align:middle}#mocha q,#mocha blockquote{quotes:none}#mocha q:before,#mocha q:after,#mocha blockquote:before,#mocha blockquote:after{content:'';content:none}#mocha a img{border:none}#mocha article,#mocha aside,#mocha details,#mocha figcaption,#mocha figure,#mocha footer,#mocha header,#mocha hgroup,#mocha menu,#mocha nav,#mocha section,#mocha summary{display:block}#mocha { position: fixed; right: 0; top: 0; overflow:scroll; background: #eee; border: solid 1px #000; width: 50%; height: 90%; min-width: 320px; min-height: 320px; margin: 0 !important; }")),document.getElementsByTagName("head")[0].appendChild(o)}(),c.el("LINK",{href:a.mochaCSS,rel:"stylesheet"}),c.el("SCRIPT",{src:a.mochaJS,onload:function(){o(window.mocha)}})},webconsole:function(o){c.el("SCRIPT",{src:a.webconsole,onload:function(){o(window.WebConsole)}})}};window.console&&console.group||c.el("SCRIPT",{src:a.consolePolyfill}),c.chai(function(o){o.should()}),c.mocha(function(o){var a=document.createElement("DIV");a.id="mocha",document.body.appendChild(a),o.checkLeaks(),o.setup("bdd"),window.runMocha=function(){a.innerHTML="";var c=window.prompt(c);c&&(o.suite.suites=[],o.suite.tests=[],c=new Function(c),c.call(window),o.run())},window.runMocha(),console.info("mocha bookmarklet is running")})}();
```

# Description

When you click it for the first time, it initializes Mocha in *bdd* style and creates a fixed container for output.

Then you it prompts you to enter some specs:

```javascript
describe("number 42", function () {
    it("should % mod 2 = 0", function () {
        (42 % 2).should.eq(0);
    });
});
```

...and get the results right on the screen.

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

* shrink to <=1024 due to length restriction in Firefox, Safari, IE
* get CDN url for the console polyfill
