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
            .js(options.cj, function () { // chai.js
                chai[options.chai](); // chai.should(); / chai.assert(); / chai.expect();

                load.js(options.mj, function () { // mocha.js
                    load.el("DIV", "BODY", { id: "mocha" });
                    mocha.checkLeaks();
                    mocha.setup(options.mocha); // e.g., mocha.setup('bdd');
                    done();
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
    mc: "//cdnjs.cloudflare.com/ajax/libs/mocha/1.20.1/mocha.css",
    cj: "//cdnjs.cloudflare.com/ajax/libs/chai/1.9.1/chai.min.js",
    mj: "//cdnjs.cloudflare.com/ajax/libs/mocha/1.20.1/mocha.js",
    mocha: 'bdd',
    chai: 'should'
}));
