'use strict';

var Router = (function() {
    var instance;
    var routes = {};
    var currentPage;

    function RouterClass() {

        window.addEventListener('hashchange', function() {
            navigate(location.hash.substr(1), routes);
        });

        window.addEventListener('DOMContentLoaded', function() {
            navigate('', routes);
        });

        function destroyCurrentModule(mod) {
            if (typeof mod != 'undefined') {
                mod.destroy();
            }
        }

        function navigate(urlhash, definedRoutes) {
            var nextPage = definedRoutes[urlhash] || Object.keys(definedRoutes)
                                                        .map(function(route){ return definedRoutes[route]})
                                                        .filter(function(r) { return r.default})[0];

            if (nextPage != undefined && currentPage !== nextPage) {
                nextPage.init();
                history.pushState({}, nextPage.url, '#' + nextPage.url);
                destroyCurrentModule(currentPage);
                currentPage = nextPage;
            } else {
                return;
            }
        }

        function when(cfg) {
            if (typeof cfg === 'object' && typeof cfg.url === 'string' && typeof cfg.init === 'function') {
                this.routes[cfg.url] = cfg;
            }

            return this;
        }

        function otherwise(url) {
            if (typeof url === 'string' && !this.routes[url].default) {
                this.routes[url].default = true;
            }

            return this;
        }

        return {
            when: when,
            navigate: navigate,
            routes: routes,
            otherwise: otherwise
        };
    }

    function getInstance() {
        if (!instance) {
            instance = new RouterClass();
        }
        return instance;
    }
 
    return {
        getInstance: getInstance,
    };
})();
