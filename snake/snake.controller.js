(function () {
    'use strict';
    angular
        .module('app.snake.game')
        .controller('SnakeGameController',
        ['Snake', '$scope', '$window',
            function (Snake, $scope, $window) {
                var vm = this;
                vm.total = Snake.getTotal();
                vm.isOverlay = true;
                vm.isGameOver = false;
                vm.name = 'HelloWorld';
                $scope.$on('snake:eat', function (event, total) {
                    vm.total = total * 10;
                    $scope.$apply();
                });
                $scope.$on('snake:death', function () {
                    vm.isOverlay = true;
                    $scope.$apply();
                });
                vm.newGame = function () {
                    Snake.reset();
                    vm.isOverlay = false;
                    vm.isGameOver = true;
                    vm.total = 0;
                }
            }
        ]);
})();
