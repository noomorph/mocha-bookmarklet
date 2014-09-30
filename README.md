mocha-bookmarklet
=================

Bookmarklet that adds Mocha runner to your current page.

```javascript
javascript:(function(o){function t(t){return"undefined"!=typeof mocha?t():void n.css(o.mc).css(o.bc).js(o.cj,function(){"should"===o.chai?chai.should():"expect"===o.chai?window.expect=chai.expect:"assert"===o.chai&&(window.assert=chai.assert),n.js(o.mj,function(){n.el("DIV","BODY",{id:"mocha"}),mocha.checkLeaks(),mocha.setup(o.mocha),t()})})}function c(){n=new e;var o=window.prompt("Enter spec URL or paste its code here:").trim();t(function(){var t=o||mocha._lastSpec||"",c=t.match(/^https?:/)?t:"";document.getElementById("mocha").innerHTML="",mocha.suite.suites=[],mocha.suite.tests=[],o&&(mocha._lastSpec=o),c?n.js(c,function(){mocha.run()}):(t&&(t=new Function(t),t.call(window)),mocha.run())})}function e(){this.el=function(o,t,c){var e,n=document.createElement(o);for(e in c)n[e]=c[e];return document.getElementsByTagName(t)[0].appendChild(n),this},this.css=function(o){return this.el("LINK","HEAD",{href:o,rel:"stylesheet"})},this.js=function(o,t){return this.el("SCRIPT","HEAD",{src:o,onload:t})}}var n;c()})({bc:"//noomorph.github.io/mocha-bookmarklet/dist/mocha-bookmarklet.css",mc:"//noomorph.github.io/mocha-bookmarklet/dist/mocha.css",cj:"//noomorph.github.io/mocha-bookmarklet/dist/chai.js",mj:"//noomorph.github.io/mocha-bookmarklet/dist/mocha.js",mocha:"bdd",chai:"expect"});
```

# Description

Add this to your bookmarks.

When you click it — it prompts you to enter either:

* absolute URL to your spec file (should start from *http://* or *https://*)
* your raw spec code (usually starts from ```describe("my suite", ... );```)
* nothing or cancel — to run your last spec (or a free-run of Mocha if there is no last spec) 

Then it creates fixed gray container in the upper-right window corner, where Mocha runner reports the test results.
On each run, specs in the container are wiped.

# Compatibility

Supports:

* Chrome
* Safari
* Firefox (has prompt max length restriction)

Not tested:

* Opera
* IE9+
* Mobile Safari
* Android stock browser
* Windows Phone 7.8, 8.0

# Configuring

Also, you can tweak a bit the loaded urls and such Mocha and Chai options:

```javascript
mocha.setup('bdd'); // param — options.mocha === 'bdd'
chai.should();      // param — options.chai  === 'should'
chai.expect();      // param — options.chai  === 'expect'
chai.assert();      // param — options.chai  === 'assert'
```

So, for example you can click on bookmarklet and pass the following smoke spec:

```javascript
describe("number 42", function () {
    it("should % mod 2 = 0", function () {
        (42 % 2).should.eq(0);
    });
});
```

...and get the results right on the screen.

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
