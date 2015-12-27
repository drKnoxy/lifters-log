/**
 * round5.filter.js
 */
(function(angular){
"use strict";

angular.module('llApp')

.filter('round5', round5);

function round5() {
    return function(input) {
        return isNaN(input) ? '-' : Math.round( input / 5 ) * 5;
    }
}

})(angular);
