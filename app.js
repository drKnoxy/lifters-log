angular.module('llApp', []);
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