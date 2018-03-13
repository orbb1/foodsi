'use strict';

var Router = (function() {
    var instance;
    var routes = [];

    function createInstance() {
 
        function navigate(urlhash, routes) {
            var routeTo = routes.find(function(route) {
                return route.url === urlhash;
            });
    
            if (routeTo != undefined) {
                routeTo.init();
            } else {
                var defaultRoute = routes.find(function(route) {
                    return route.default;
                });
                if (defaultRoute != undefined) { 
                    defaultRoute.init(); 
                }
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
            instance = createInstance();
        }
        return instance;
    }
 
    return {
        getInstance: getInstance,
    };
})();