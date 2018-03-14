'use strict';

APP.modules = (function(modules, $) {
    modules.home = (function() {
        var init = function() {
            $('main').load('/pages/home/tmpl-home.html');
        };

        return {init: init};
    })();

    return modules;
})(APP.modules || {}, jQuery);