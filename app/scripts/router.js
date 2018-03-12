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
                };
            }
        };
    
        function when(cfg) {
            if (typeof cfg === 'object' 
                && typeof cfg.url === 'string'
                && typeof cfg.init === 'function') {
                routes.push(cfg);
            };

            return this;
        };

        return {
            when: when,
            navigate: navigate,
            routes: routes
        }
    };

    function getInstance() {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    };
 
    return {
        getInstance: getInstance,
    };
})();