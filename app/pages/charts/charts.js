'use strict';

APP.modules = (function(modules, $) {
    var $sectionContent = $('.section__content'),
        template = '/pages/charts/tmpl-charts.html';

    modules.charts = (function() {
        var presentData = function(data) {
            console.log(data);
        }

        var getData = function() {
            var httpService = APP.services.HttpService.getInstance();
            httpService.performRequest('GET', apiUrls.API_BASE + apiUrls.INTENSITY_DATE)
                .then(function(res) {
                    presentData(res.data);
                });
        };
        var init = function() {
            $sectionContent.load(template);
            getData();
        };

        var destroy = function() {
            $sectionContent.empty();
        };

        return {
            init: init,
            destroy: destroy
        };
    })();

    return modules;
})(APP.modules || {}, jQuery);