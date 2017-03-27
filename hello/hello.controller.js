(function () {
    'use strict';
    angular
        .module('app.hello')
        .controller('HelloControler',
        [
            '$location',
            'GamesService',
            function ($location, GamesService) {
                var vm = this;
                vm.games = GamesService.getGames();
                console.log(vm.games);
                vm.goToGame = function (name) {
                    $location.url(name);
                };
            }
        ]);
})();
