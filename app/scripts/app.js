'use strict';

var APP = (function(APP) {
    var content = document.createElement('h2');
    content.innerText = 'Initialized!';

    APP.init = function() {
        APP.log();
    };

    APP.log = function() {
        document.body.appendChild(content);
    };

    return APP;
})(window.APP || {});