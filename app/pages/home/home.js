'use strict';

APP.modules = (function(modules, $) {
    var $sectionContent = $('.section__content');
    var template = '/pages/home/tmpl-home.html';
    var api = apiUrls;
    
    modules.home = (function() {

        var presentData = function(data) {
            console.log(data);
        };

        var loadTemplate = function() {
            $sectionContent.load(template);
        };

        var getData = function() {
            var httpService = APP.services.HttpService.getInstance();
            httpService.performRequest('GET', api.API_BASE + api.INTENSITY)
                .then(function(res, status, xhr) {

                    // API always returns status = success
                    // if response error occurs, response body will have 'error' prop.
                    if(res.error != undefined) {
                        console.log(res);
                    } else {
                        presentData(res.data);
                    }
                });
        };

        var init = function() {
            loadTemplate();
            getData();
        };

        return {
            init: init
        };
    })();

    return modules;
})(APP.modules || {}, jQuery);