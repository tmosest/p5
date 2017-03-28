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
                $scope.$on('chess:turn', function (event) {
                    vm.turn += 1;
                    (vm.turn % 2 == 0) ? vm.player = 'Blue' : vm.player = 'Red'; 
                    $timeout(function () { $scope.$apply(); });
                });
            }
        ]);
})();