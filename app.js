angular.module('llApp', []);
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
(function(angular){
"use strict";

angular.module('llApp')

.factory('routine531', routine531);

function routine531() {
    var service = {
        week1: [
            { reps: 5, percentage: .40 },
            { reps: 5, percentage: .50 },
            { reps: 3, percentage: .60 },
            { reps: 5, percentage: .65 },
            { reps: 5, percentage: .75 },
            { reps: 5, percentage: .85 },
        ],
        week2: [
            { reps: 5, percentage: .40 },
            { reps: 5, percentage: .50 },
            { reps: 3, percentage: .60 },
            { reps: 3, percentage: .70 },
            { reps: 3, percentage: .80 },
            { reps: 3, percentage: .90 },
        ],
        week3: [
            { reps: 5, percentage: .40 },
            { reps: 5, percentage: .50 },
            { reps: 3, percentage: .60 },
            { reps: 5, percentage: .75 },
            { reps: 3, percentage: .85 },
            { reps: 1, percentage: .95 },
        ],
        week4: [
            { reps: 5, percentage: .40 },
            { reps: 5, percentage: .50 },
            { reps: 3, percentage: .60 },
            { reps: 5, percentage: .40 },
            { reps: 5, percentage: .50 },
            { reps: 5, percentage: .60 },
        ],
    };

    return service;

}

})(angular)