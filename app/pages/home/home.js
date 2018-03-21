'use strict';

APP.modules = (function(modules, $) {
    modules.home = (function() {
        var init = function() {
            $('.section__content').load('/pages/home/tmpl-home.html');
        };

        return {init: init};
    })();

    return modules;
})(APP.modules || {}, jQuery);