(function () {
    'use strict';
    angular
        .module('app',
        [
            // 3rd party dependencies
            'ngRoute',
            'angular-p5',
            'firebase',
            'btford.socket-io',
            // My dependencies
            'app.common',
            'app.bird',
            'app.snake.game',
            'app.hello',
            'app.starfield',
            'app.sponge',
            'app.rain',
            'app.invaders',
            'app.mitosis',
            'app.maze',
            'app.perlin',
            'app.ss',
            'app.chess',
            'app.paisho',
            'app.color',
            'app.mine'
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