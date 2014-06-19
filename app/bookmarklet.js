/*jshint evil:true, strict:false, browser:true */
(function bookmarklet() {

    if (window.runMocha) {
        return window.runMocha();
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
                (function () {
                    var style = document.createElement("style");
                    style.appendChild(document.createTextNode(
                        "#mocha,#mocha html,#mocha body,#mocha div,#mocha span,#mocha applet,#mocha object,#mocha iframe,#mocha h1,#mocha h2,#mocha h3,#mocha h4,#mocha h5,#mocha h6,#mocha p,#mocha blockquote,#mocha pre,#mocha a,#mocha abbr,#mocha acronym,#mocha address,#mocha big,#mocha cite,#mocha code,#mocha del,#mocha dfn,#mocha em,#mocha img,#mocha ins,#mocha kbd,#mocha q,#mocha s,#mocha samp,#mocha small,#mocha strike,#mocha strong,#mocha sub,#mocha sup,#mocha tt,#mocha var,#mocha b,#mocha u,#mocha i,#mocha center,#mocha dl,#mocha dt,#mocha dd,#mocha ol,#mocha ul,#mocha li,#mocha fieldset,#mocha form,#mocha label,#mocha legend,#mocha table,#mocha caption,#mocha tbody,#mocha tfoot,#mocha thead,#mocha tr,#mocha th,#mocha td,#mocha article,#mocha aside,#mocha canvas,#mocha details,#mocha embed,#mocha figure,#mocha figcaption,#mocha footer,#mocha header,#mocha hgroup,#mocha menu,#mocha nav,#mocha output,#mocha ruby,#mocha section,#mocha summary,#mocha time,#mocha mark,#mocha audio,#mocha video{text-align:initial;margin:0;padding:0;border:0;font:inherit;font-size:100%;vertical-align:baseline}#mocha html{line-height:1}#mocha ol,#mocha ul{list-style:none}#mocha table{border-collapse:collapse;border-spacing:0}#mocha caption,#mocha th,#mocha td{text-align:left;font-weight:normal;vertical-align:middle}#mocha q,#mocha blockquote{quotes:none}#mocha q:before,#mocha q:after,#mocha blockquote:before,#mocha blockquote:after{content:'';content:none}#mocha a img{border:none}#mocha article,#mocha aside,#mocha details,#mocha figcaption,#mocha figure,#mocha footer,#mocha header,#mocha hgroup,#mocha menu,#mocha nav,#mocha section,#mocha summary{display:block}" +
                        "#mocha { position: fixed; right: 0; top: 0; overflow:scroll; background: #eee; border: solid 1px #000; width: 50%; height: 90%; min-width: 320px; min-height: 320px; margin: 0 !important; }"
                    ));
                    document.getElementsByTagName('head')[0].appendChild(style);
                }());
                load.el("LINK", { href: urls.mochaCSS, rel: "stylesheet" });
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
    
    load.mocha(function (mocha) {
        var md = document.createElement("DIV");
        md.id = "mocha";
        document.body.appendChild(md);

        mocha.checkLeaks();
        mocha.setup('bdd');

        window.runMocha = function () {
            md.innerHTML = '';

            var spec = window.prompt(spec);
            if (spec) {
                mocha.suite.suites = [];
                mocha.suite.tests = [];

                spec = new Function(spec);
                spec.call(window);

                mocha.run();
            }
        };

        window.runMocha();
    });
}());
