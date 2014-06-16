/*jshint strict:false, browser:true */
(function bookmarklet() {

    if (window.runMocha) { // bookmarklet was initialized
        return window.runMocha(); // run the last spec
    }

    var CDN = "//cdnjs.cloudflare.com/ajax/libs/",
        urls = {
            chai:       CDN + "chai/1.9.1/chai.min.js",
            mochaCSS:   CDN + "mocha/1.20.1/mocha.css",
            mochaJS:    CDN + "mocha/1.20.1/mocha.js",
            jquery:     CDN + "jquery/1.11.1/jquery.min.js",
            webconsole: "//eeroan.github.io/WebConsole-reporter/WebConsole.js",
            consolePolyfill: "https://raw.githubusercontent.com/paulmillr/console-polyfill/master/index.js"
        },
        load = {
            el: function (tagName, attrs) {
                var tag = document.createElement(tagName),
                    key;

                for (key in attrs) {
                    tag[key] = attrs[key];
                }

                document.getElementsByTagName('head')[0].appendChild(tag);
            },
            jquery: function () {
                if (!window.$) {
                    load.el("SCRIPT", { src: urls.jquery });
                }
            },
            chai: function (onload) {
                load.el("SCRIPT", { src: urls.chai, onload: function () {
                    onload(window.chai);
                }});
            },
            mocha: function (onload) {
                // load.el("LINK", { href: urls.mochaCSS, rel: "stylesheet" });
                load.el("SCRIPT", { src: urls.mochaJS, onload: function () {
                    onload(window.mocha);
                }});
            },
            webconsole: function (onload) {
                load.el("SCRIPT", { src: urls.webconsole, onload: function () {
                    onload(window.WebConsole);
                }});
            }
        };

    if (!window.console || !console.group) {
        load.el("SCRIPT", { src: urls.consolePolyfill });
    }

    load.chai(function (chai) {
        chai.should();
    });
    
    load.webconsole(function (WebConsole) {
        load.mocha(function (mocha) {
            var url;

            mocha.setup({ ui: 'bdd', reporter: WebConsole });
            mocha.checkLeaks();
            mocha.globals(['jQuery']);

            window.runMocha = function (newUrl, disableCaching) {
                url = newUrl || url;
                if (!url) {
                    return console.error("no spec to run");
                }

                if (disableCaching !== false) {
                    url += "?rnd=" + Math.random();
                }

                var suites = window.mocha.suite.suites;
                suites.splice(0, suites.length);
                
                load.el("SCRIPT", {
                    src: url,
                    onload: function () {
                        mocha.run();
                    },
                    onerror: function () {
                        console.error("could not load: " + url);
                    }
                });
            };

            console.info('mocha bookmarklet is running');
        });
    });
}());
