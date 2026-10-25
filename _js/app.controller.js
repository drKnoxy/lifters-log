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
    vm.startDate = parseDate(vm.$storage.startDate);
    vm.setStartDate = setStartDate;
    vm.scheduleOffset = scheduleOffset;
    vm.goToSchedule = goToSchedule;

    activate();

    ///////////////////////////

    function activate() {
        vm.schedule = getSchedule();
    }

    /**
     * Saves the picked start date as 'yyyy-mm-dd', since localStorage
     * can't hold a Date object
     */
    function setStartDate() {
        if (vm.startDate) {
            vm.$storage.startDate = formatDate(vm.startDate);
        } else {
            delete vm.$storage.startDate;
        }
        vm.schedule = getSchedule();
    }

    /**
     * Works out which cycle/week today falls in, based on the start date
     *
     * @return {{cycle: int, week: int, weeksIn: int}|null} null if no start date
     */
    function getSchedule() {
        var start = parseDate(vm.$storage.startDate);
        if (!start) {
            return null;
        }

        var days = dayNumber(new Date()) - dayNumber(start);
        var weeksIn = Math.floor(days / 7);

        return {
            cycle: Math.floor(weeksIn / 4),
            week: weeksIn % 4,
            weeksIn: weeksIn,
        };
    }

    /**
     * How many weeks the selected cycle/week is ahead (+) or behind (-) of today
     */
    function scheduleOffset() {
        var viewing = vm.$storage.currentCycle * 4 + vm.$storage.currentWeek;
        return viewing - vm.schedule.weeksIn;
    }

    function goToSchedule() {
        vm.$storage.currentCycle = vm.schedule.cycle;
        vm.$storage.currentWeek = vm.schedule.week;
    }

    // Days since epoch for the local calendar date, so DST doesn't skew the diff
    function dayNumber(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 864e5;
    }

    function parseDate(str) {
        var parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str || '');
        return parts ? new Date(+parts[1], parts[2] - 1, +parts[3]) : null;
    }

    function formatDate(date) {
        var mm = ('0' + (date.getMonth() + 1)).slice(-2);
        var dd = ('0' + date.getDate()).slice(-2);
        return date.getFullYear() + '-' + mm + '-' + dd;
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
