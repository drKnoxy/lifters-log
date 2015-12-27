/**
 * records.service.js
 */
(function(angular){
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

})(angular);
