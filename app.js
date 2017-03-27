(function () {
    'use strict';
    angular
        .module('app',
        [
            'ngRoute',
            'angular-p5',
            'app.snake.game',
            'app.hello',
            'app.common',
            'app.starfield',
            'app.sponge',
            'app.rain',
            'app.invaders',
            'app.mitosis',
            'app.maze'
        ]
        )
        .config(['$routeProvider', 'games',
        function ($routeProvider, games) {
            for (var i = 0; i < games.length; i++) {
                $routeProvider
                    .when(games[i].url, games[i]);
            }
            var helloState = {
                controller: 'HelloController as vm',
                name: 'hello',
                templateUrl: 'hello/hello.html'
            };
            var loginState = {
                controller: 'LoginController as vm',
                name: 'login',
                templateUrl: 'login/login.html'
            };
            $routeProvider
                .when('/hello', helloState)
                .when('/', loginState);
        }
        ]);
})();