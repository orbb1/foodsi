'use strict';

var APP = (function($, APP) {

    APP.init = function() {
        APP.log();
    };
    
    APP.log = function() {
        console.log('init');
    };

    APP.modules = [];

    $(document).ready(function() {
        APP.init();
    });

    return APP;
})(jQuery, window.APP || {});

