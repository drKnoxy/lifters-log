angular.module('llApp', []);

(function(angular){
"use strict";

angular.module('llApp')
.controller('AppCtrl', AppCtrl);

function AppCtrl() {
    console.log('here')
    var vm = this;

    vm.hello = 'world';
}

})(angular)