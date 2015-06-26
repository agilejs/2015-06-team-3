(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.filter('unknownIfEmpty', function() {
        return function(input) {
            return input === undefined ? 'unknown' : input;
        };
    });
})();
