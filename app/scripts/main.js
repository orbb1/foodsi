'use strict';

var APP = (function($, APP) {
    var content = $('<h2></h2>').text('Initialized!');
    
    APP.init = function() {
        APP.log();
    };
    APP.log = function() {
        $('body').append(content);
    };

    return APP;
})(jQuery, window.APP || {});