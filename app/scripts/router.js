'use strict';

var Router = (function() {
    var instance;
    var routes;

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
        }

        return {
            navigate: navigate
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