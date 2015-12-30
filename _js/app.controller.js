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

    vm.calcWeight = calcWeight;

    // todo: add logic for initial showeditform
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
    function _calcWeight(weight, percentage, cycle, increment) {
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

    function calcWeight(record, percentage) {
        return _calcWeight(record.oneRepMax(), percentage, vm.currentCycle, )
    }

}

})(angular);
