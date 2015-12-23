(function(angular){
"use strict";

angular.module('llApp')
.controller('AppCtrl', AppCtrl);

function AppCtrl(routine531) {
    var vm = this;

    vm.program = routine531;

    // TODO: move to service
    vm.records = {
        overheadPress: {
            label: 'Overhead Press',
        },
        deadlift: {
            label: 'Deadlift',
        },
        benchPress: {
            label: 'Bench Press',
        },
        backSquat: {
            label: 'Back Squat',
        },
    };
    vm.updateRecords = function() {
        //TODO:
        console.log('update 1rms')
    }

    vm.oneRM = function(reps, weight) {
        reps = parseInt(reps, 10);
        weight = parseInt(weight, 10);
        return weight * (1 + reps/30);
    }

    vm.currentCycle = 0;
}

})(angular);