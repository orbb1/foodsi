'use strict';

APP.services = (function(services) {
    services.HttpService = (function($) {
        var instance;

        function HttpServiceClass() {

            this.performRequest = function(method, url, config) {
                var requestConfig = {
                    method: method,
                    url: url,
                    error: function(xhr, status, error) {
                        console.log(error, status);
                     }
                };

                if (config != undefined && typeof config === 'object') {
                    $.extend(requestConfig, config);
                }

                return $.ajax(requestConfig);
            };
        }

        function getInstance() {
            if (!instance) {
                instance = new HttpServiceClass();
            }
            return instance;
        }

        return {
            getInstance: getInstance,
        };
    })(jQuery);

    return services;
})(APP.services || {});
