(function(angular){
"use strict";

angular.module('llApp')
.controller('AppCtrl', AppCtrl);

function AppCtrl(routine531) {
    var vm = this;

    vm.program = routine531;

    vm.records = {
        overheadPress: {
            label: 'Overhead Press',
            calculatedOneRM: 0,
        },
        deadlift: {
            label: 'Deadlift',
            calculatedOneRM: 0,
        },
        benchPress: {
            label: 'Bench Press',
            calculatedOneRM: 0,
        },
        backSquat: {
            label: 'Back Squat',
            calculatedOneRM: 0,
        },
    };

    vm.currentCycle = 0;
}

})(angular);