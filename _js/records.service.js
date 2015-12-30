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
        key: 'overheadPress',
        reps: 2,
        weight: 115
    },{
        label: 'Deadlift',
        key: 'deadlift',
        reps: 3,
        weight: 285
    },{
        label: 'Bench Press',
        key: 'benchPress',
        reps: 1,
        weight: 185
    },{
        label: 'Back Squat',
        key: 'backSquat',
        reps: 5,
        weight: 265
    }];

    function Record(options) {
        this.label = options.label || '';
        this.key = options.key;
        this.reps = options.reps || undefined;
        this.weight = options.weight || undefined;
    }

    // Epley Formula
    // https://en.wikipedia.org/wiki/One-repetition_maximum
    Record.prototype.oneRepMax = function() {
        if (!this.weight || !this.reps) {
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
