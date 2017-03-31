(function () {
    'use strict';
    angular
        .module('app.hello')
        .controller('HelloController',
        [
            '$location',
            'GamesService',
            'User',
            'socket',
            function ($location, GamesService, User, socket) {
                var vm = this;
                vm.games = GamesService.getGames();
                vm.name = User.getName();
                console.log('Name: ' + vm.name);
                console.log(vm.games);
                vm.goToGame = function (name) {
                    $location.url(name);
                };
                socket.on('send:time', function (data) {
                    vm.time = data.time;
                });
            }
        ]);
})();
