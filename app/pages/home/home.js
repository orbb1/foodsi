'use strict';

APP.modules = (function(modules, $) {
    var $sectionContent = $('.section__content'),
        template = '/pages/home/tmpl-home.html',
        api = apiUrls,
        noDataMessage = 'No data ';

    modules.home = (function() {

        var presentData = function(data) {
            var $spinner = $('.spinner__wrapper'),
            $contentWrapper = $('.content__wrapper'),
            forecastData = data[0],
            forecast = forecastData.intensity.forecast || noDataMessage,
            actual = forecastData.intensity.actual || noDataMessage,
            index = forecastData.intensity.index.toLowerCase() || noDataMessage;

            $spinner.addClass('u-hidden');
            $contentWrapper.removeClass('u-hidden');
            $contentWrapper.find('.carbon-index__container').addClass(index);
            $contentWrapper.find('#forecast').text(forecast);
            $contentWrapper.find('#actual').text(actual);
            $contentWrapper.find('#index').text(index);
        };

        var getData = function() {
            var httpService = APP.services.HttpService.getInstance();
            httpService.performRequest('GET', api.API_BASE + api.INTENSITY)
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