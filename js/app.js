// /Users/adam/code/lifters-log/_js/app.js
(function(){
"use strict";
angular.module('llApp', []);

})();
 
// /Users/adam/code/lifters-log/_js/app.controller.js
(function(){
"use strict";
angular.module('llApp')
.controller('AppCtrl', AppCtrl);

function AppCtrl(routine531, records) {
    var vm = this;

    vm.program = routine531;
    vm.records = records;

    vm.currentCycle = 0;

    vm.calcWeight = calcWeight;

    vm.showEditForm = false;

    activate();

    ///////////////////////////

    function activate() {

    }

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

        weight += (cycle * increment); // add to the weight based on cycle
        weight *= percentage;          // modify the weight used based on the program
        weight = round5(weight);       // round it

        return weight;

        // Round to the nearest 5
        function round5(num) {
            return Math.round( num / 5 ) * 5;
        }
    }

}

})();
 
// /Users/adam/code/lifters-log/_js/records.service.js
(function(){
"use strict";
angular.module('llApp')

.factory('records', records);

function records() {
    var lifts = [{
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
        weight: 185
    },{
        label: 'Back Squat',
        increment: 10,
        reps: 5,
        weight: 265
    }];

    function Record(options) {
        this.label = options.label || '';
        this.increment = options.increment || 5;
        this.reps = options.reps || undefined;
        this.weight = options.weight || undefined;
    }

    // Epley Formula
    // https://en.wikipedia.org/wiki/One-repetition_maximum
    Record.prototype.oneRepMax = function() {
        if (false === !!this.weight || false === !!this.reps) {
            return 0;
        }

        return this.weight * (1 + this.reps / 30);
    }
    function addNewRecord(options) {
        return new Record(options);
    }

    return lifts.map(addNewRecord);
}
})();
 
// /Users/adam/code/lifters-log/_js/round5.filter.js
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
 
// /Users/adam/code/lifters-log/_js/routine531.service.js
(function(){
"use strict";
angular.module('llApp')

.factory('routine531', routine531);

function routine531() {
    var service = {
        week1: [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '3',  percentage: .60 },
            { reps: '5',  percentage: .65 },
            { reps: '5',  percentage: .75 },
            { reps: '5+', percentage: .85 },
        ],
        week2: [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '3',  percentage: .60 },
            { reps: '3',  percentage: .70 },
            { reps: '3',  percentage: .80 },
            { reps: '3+', percentage: .90 },
        ],
        week3: [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '3',  percentage: .60 },
            { reps: '5',  percentage: .75 },
            { reps: '3',  percentage: .85 },
            { reps: '1+', percentage: .95 },
        ],
        week4: [
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '3',  percentage: .60 },
            { reps: '5',  percentage: .40 },
            { reps: '5',  percentage: .50 },
            { reps: '5+', percentage: .60 },
        ],
    };

    return service;
}

})();
 