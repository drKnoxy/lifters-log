/**
 * app.controller.js
 */
(function(angular){
"use strict";

angular.module('llApp')
.controller('AppCtrl', AppCtrl);

function AppCtrl(routine531, records) {
    var vm = this;

    vm.program = routine531;
    vm.records = records;

    vm.currentCycle = 0;

    vm.calcWeight = function(weight, percentage, cycle, increment) {
        if (false === !!weight) {
            return '-';
        }

        weight += (cycle * increment);
        weight = weight * percentage;
        weight = round5(weight);

        return weight;

        function round5(num) {
            return isNaN(num) ? '-' : Math.round( num / 5 ) * 5;
        }
    }
}

})(angular);
