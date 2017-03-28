(function () {
    'use strict';
    angular
        .module('app.chess')
        .controller('ChessController', [
            '$scope', '$timeout',
            function ($scope, $timeout) {
                var vm = this;
                vm.turn = 0;
                vm.player = 'Blue';
                vm.count1 = 0;
                vm.count2 = 0;
                vm.count = 0;
                $scope.$on('chess:turn', function (event) {
                    vm.turn += 1;
                    (vm.turn % 2 == 0) ? vm.player = 'Blue' : vm.player = 'Red';
                    (vm.turn % 2 == 0) ? vm.count = vm.count1 : vm.count = vm.count2; 
                    $timeout(function () { $scope.$apply(); });
                });
                $scope.$on('chess:kill', function (event) {
                    (vm.turn % 2 == 0) ? vm.count1++ : vm.count2++; 
                    $timeout(function () { $scope.$apply(); });
                });
            }
        ]);
})();