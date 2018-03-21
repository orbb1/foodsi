'use strict';

var Router = (function() {
    var instance;
    var routes = [];
    var currentPage;

    function RouterClass() {

        window.addEventListener('hashchange', function(e) {
            navigate(location.hash.substr(1), routes);
        });

        window.addEventListener('DOMContentLoaded', function() {
            navigate('', routes);
        });

        function navigate(urlhash, definedRoutes) {
            var nextPage = definedRoutes.find(function(route) { return route.url === urlhash; }) 
                        || definedRoutes.find(function(route) { return route.default; });
    
            if (nextPage != undefined && currentPage !== nextPage) {
                nextPage.init();
                currentPage = nextPage;
            }
        }
    
        function when(cfg) {
            if (typeof cfg === 'object' 
                && typeof cfg.url === 'string'
                && typeof cfg.init === 'function') {
                this.routes.push(cfg);
            }

            return this;
        }

        function otherwise(url) {
            if (typeof url === 'string') {
                this.routes.map(function(route) {
                    if(route.url === url && !route.default) {
                        route.default = true;
                    }
                });
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
