'use strict';

var APP = (function($, APP) {

    APP.init = function() {
        APP.log();
    };
    
    APP.log = function() {
        console.log('init');
    };

    APP.modules;

    return APP;
})(jQuery, window.APP || {});
