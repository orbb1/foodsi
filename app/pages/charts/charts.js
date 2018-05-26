'use strict';

APP.modules = (function(modules, $) {
    var $sectionContent = $('.section__content'),
        template = '/pages/charts/tmpl-charts.html';

    modules.charts = (function() {
        var init = function() {
            $sectionContent.load(template);
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