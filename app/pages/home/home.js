'use strict';

APP.modules = (function(modules, $) {
    modules.home = (function() {
        var init = function() {
            $('.section__content').load('/pages/home/tmpl-home.html');
            var httpService = APP.services.HttpService.getInstance();
            var api = apiUrls;
            httpService.performRequest('GET', api.API_BASE + api.INTENSITY)
                .done(function(data) {console.log(data)});
        };

        return {init: init};
    })();

    return modules;
})(APP.modules || {}, jQuery);