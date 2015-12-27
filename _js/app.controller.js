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

    vm.calcWeight = function(weight, percentage) {
        return isNaN(input) ? '-' : Math.round( input / 5 ) * 5;
    }
}

})(angular);
