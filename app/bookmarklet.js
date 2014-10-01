/*jshint evil:true, strict:false, browser:true */
/*global chai, mocha*/
(function bookmarklet(options) {
    var load; // Loader

    function setup(done) {
        if (typeof mocha !== "undefined") {
            return done();
        }

        load.css(options.mc) // mocha.css
            .css(options.bc) // bookmarklet.css
            .js(options.sj, function () { // sinon.js
                load.js(options.cj, function () { // chai.js
                    if (options.chai === 'should') {
                        chai.should();
                    } else if (options.chai === 'expect') {
                        window.expect = chai.expect;
                    } else if (options.chai === 'assert') {
                        window.assert = chai.assert;
                    }

                    load.js(options.mj, function () { // mocha.js
                        load.el("DIV", "BODY", { id: "mocha" });
                        mocha.checkLeaks();
                        mocha.setup(options.mocha); // e.g., mocha.setup('bdd');
                        done();
                    });
                });
            });
    }

    function run() {
        load = new Loader();

        var prompted = window.prompt("Enter spec URL or paste its code here:").trim();

        setup(function () {
            var code = prompted || mocha._lastSpec || '',
                url = code.match(/^https?:/) ? code : '';

            document.getElementById("mocha").innerHTML = '';
            mocha.suite.suites = [];
            mocha.suite.tests = [];

            if (prompted) {
                mocha._lastSpec = prompted;
            }

            if (url) {
                load.js(url, function () {
                    mocha.run();
                });
            } else {
                if (code) {
                    code = new Function(code);
                    code.call(window);
                }
                mocha.run();
            }
        });
    }

    function Loader() {
        this.el = function (tagName, containerTag, attrs) {
            var tag = document.createElement(tagName),
                key;

            for (key in attrs) {
                tag[key] = attrs[key];
            }

            document.getElementsByTagName(containerTag)[0].appendChild(tag);
            return this;
        };

        this.css =  function (href) {
            return this.el("LINK", "HEAD", { href: href, rel: "stylesheet" });
        };

        this.js = function (src, onload) {
            return this.el("SCRIPT", "HEAD", { src: src, onload: onload });
        };
    }

    run();
}({
    bc: "//noomorph.github.io/mocha-bookmarklet/dist/mocha-bookmarklet.css",
    mc: "//noomorph.github.io/mocha-bookmarklet/dist/mocha.css",
    cj: "//noomorph.github.io/mocha-bookmarklet/dist/chai.js",
    mj: "//noomorph.github.io/mocha-bookmarklet/dist/mocha.js",
    sj: "//noomorph.github.io/mocha-bookmarklet/dist/sinon.js",
    mocha: 'bdd',
    chai: 'expect'
}));
