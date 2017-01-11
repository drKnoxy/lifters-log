angular.module('llApp')
.controller('AppCtrl', AppCtrl);

function AppCtrl(routine531, $localStorage) {
    var vm = this;

    vm.program = routine531;
    vm.getSets = function(week) {
        return vm.program[week];
    }
    vm.$storage = $localStorage.$default({
        records: [{
            label: 'Overhead Press',
            increment: 5,
            reps: 2,
            weight: 115
        },{
            label: 'Deadlift',
            increment: 10,
            reps: 3,
            weight: 285
        },{
            label: 'Bench Press',
            increment: 5,
            reps: 1,
            weight: 180
        },{
            label: 'Back Squat',
            increment: 10,
            reps: 5,
            weight: 265
        }],
        currentCycle: 0,
        currentWeek: 0,
    });
    vm.showEditForm = false;
    vm.calcWeight = calcWeight;
    vm.oneRepMax = oneRepMax;

    activate();

    ///////////////////////////

    function activate() {}

    /**
     * [calcWeight description]
     *
     * @param  {int}   weight     [description]
     * @param  {float} percentage [description]
     * @param  {int}   cycle      [description]
     * @param  {int}   increment  [description]
     * @return {int}              [description]
     */
    function calcWeight(weight, percentage, cycle, increment) {
        // Add an extra check for weight, because it is a user input,
        // so it is very possible for it to be falsey
        if (false === !!weight) {
            return '-';
        }

        weight *= .9;                   // start with 90% of the recorded 1rm
        weight += (cycle * increment);  // add to the weight based on cycle
        weight *= percentage;           // modify the weight used based on the program
        weight = round5(weight);        // round it to the nearest 5 lbs

        return weight;

        // Round to the nearest 5
        function round5(num) {
            return Math.round( num / 5 ) * 5;
        }
    }

    /**
     * Epley Formula for One rep max
     * https://en.wikipedia.org/wiki/One-repetition_maximum
     * @param {{weight: number, reps: number}}
     */
    function oneRepMax(r) {
        if (false === !!r.weight || false === !!r.reps) {
            return 0;
        }

        return r.weight * (1 + r.reps / 30);
    }

}
