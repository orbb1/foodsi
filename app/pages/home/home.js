'use strict';

APP.modules = (function(modules) {
    modules.home = (function() {
        var init = function() {
            console.log('home init!');
        };

        return {init: init};
    })();

    return modules;
})(APP.modules || {});