mocha-bookmarklet
=================

Bookmarklet that adds Mocha runner to your current page.

```javascript
javascript:(function(c){function o(o){return"undefined"!=typeof mocha?o():void n.css(c.mc).css(c.bc).js(c.cj,function(){chai[c.chai](),n.js(c.mj,function(){n.el("DIV","BODY",{id:"mocha"}),mocha.checkLeaks(),mocha.setup(c.mocha),o()})})}function e(){n=new t;var c=window.prompt("Enter spec URL or paste its code here:").trim();o(function(){var o=c||mocha._lastSpec||"",e=o.match(/^https?:/)?o:"";document.getElementById("mocha").innerHTML="",mocha.suite.suites=[],mocha.suite.tests=[],c&&(mocha._lastSpec=c),e?n.js(e,function(){mocha.run()}):(o&&(o=new Function(o),o.call(window)),mocha.run())})}function t(){this.el=function(c,o,e){var t,n=document.createElement(c);for(t in e)n[t]=e[t];return document.getElementsByTagName(o)[0].appendChild(n),this},this.css=function(c){return this.el("LINK","HEAD",{href:c,rel:"stylesheet"})},this.js=function(c,o){return this.el("SCRIPT","HEAD",{src:c,onload:o})}}var n;e()}({bc:"//noomorph.github.io/mocha-bookmarklet/dist/mocha-bookmarklet.css",mc:"//cdnjs.cloudflare.com/ajax/libs/mocha/1.20.1/mocha.css",cj:"//cdnjs.cloudflare.com/ajax/libs/chai/1.9.1/chai.min.js",mj:"//cdnjs.cloudflare.com/ajax/libs/mocha/1.20.1/mocha.js",mocha:"bdd",chai:"should"}))
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
