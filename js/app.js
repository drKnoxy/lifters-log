// /Users/awknox/code/lifters-log/_js/app.js
(function(){
"use strict";
angular.module('llApp', ['ngStorage']);

})();
 
// /Users/awknox/code/lifters-log/_js/app.controller.js
(function(){
"use strict";
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
    vm.getPlates = getPlates;

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

    function getPlates(weight) {
        var plates = weightOnBar({weight})
        return plates.map(({plate, count}) => `${count} x ${plate}`);
    }

    /**
     * Returns the weight on each side
     * 
     * @param {{weight: number, bar: number}}
     * @return [{plate: number, count: number}]
     */
    function weightOnBar({ weight, bar = 45 }) {
        var plates = weight - bar;
        var platesPerSide = (plates / 2);
        var out = [];

        [45, 35, 25, 10, 5, 2.5].forEach(p => {
            var count = Math.floor(platesPerSide / p);
            if (count > 0) {
                out.push({ plate: p, count });
                platesPerSide -= count*p;
            }
        })
        
        return out;
    }

}

})();
 
// /Users/awknox/code/lifters-log/_js/round5.filter.js
(function(){
"use strict";
angular.module('llApp')

.filter('round5', round5);

function round5() {
    return function(input) {
        return isNaN(input) ? '-' : Math.round( input / 5 ) * 5;
    }
}
})();
 
// /Users/awknox/code/lifters-log/_js/routine531.service.js
(function(){
"use strict";
angular.module('llApp')

.factory('routine531', routine531);

function routine531() {
    var service = [
        [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '5',  percentage: .60 },
            { reps: '5',  percentage: .65 },
            { reps: '5',  percentage: .75 },
            { reps: '5+', percentage: .85 },
        ],
        [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '3',  percentage: .60 },
            { reps: '3',  percentage: .70 },
            { reps: '3',  percentage: .80 },
            { reps: '3+', percentage: .90 },
        ],
        [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '5',  percentage: .60 },
            { reps: '5',  percentage: .75 },
            { reps: '3',  percentage: .85 },
            { reps: '1+', percentage: .95 },
        ],
        [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '5', percentage: .60 },
            { reps: '5+', percentage: .60 },
        ],
    ];

    return service;
}

})();
 