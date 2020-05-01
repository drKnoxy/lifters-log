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
