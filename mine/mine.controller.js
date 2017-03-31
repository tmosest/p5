(function () {

    'use strict';
    angular
        .module('app.mine')
        .controller('MineController', MineController);

    MineController.$inject = [
        '$scope',
        '$timeout',
        'MineSweeper'
    ];

    function MineController($scope, $timeout, MineSweeper) {
        var vm = this;
        vm.mineCount = 35;
        vm.isGameOver = false;
        vm.isWin = false;
        $scope.$on('mine:marked', function (event, data) {
            vm.mineCount = data;
            $timeout(function () { $scope.$apply(); });
        });
        $scope.$on('mine:death', function (event, data) {
            vm.isGameOver = data;
            if(vm.isGameOver == 'WIN') vm.isWin = true;
            $timeout(function () { $scope.$apply(); });
        });
        vm.newGame = function () {
            vm.isWin = false;
            MineSweeper.createNewGame(MineSweeper.getSketch());
        }
    }

})();
