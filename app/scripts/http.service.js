'use strict';

APP.services = (function(services) {
    services.HttpService = (function($) {
        var instance;

        function HttpServiceClass() {

            var $errorCodeParagraph = $('<p class="error-code"></p>'),
                $errorMessageParagraph = $('<p class="error-message"></p>'),
                $errorContainer = $('<div class="error-container"></div>')
                    .append($errorCodeParagraph)
                    .append($errorMessageParagraph);

            var displayError = function(err) {
                $errorMessageParagraph.text(err.message);
                $errorCodeParagraph.text(err.code);
                setTimeout(function() {
                    $(document.body).prepend($errorContainer);
                }, 1000);
            };

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

                return $.ajax(requestConfig).then(function(res, status, xhr) {

                    // API always returns status = success
                    // if response error occurs, response body will have 'error' prop.
                    if(res.error != undefined) {
                        displayError(res.error);
                    } else {
                        return res;
                    }
                });
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
