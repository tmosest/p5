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
            'app.rain'
        ]
        )
        .config(['$routeProvider', 'games',
        function ($routeProvider, games) {
            for (var i = 0; i < games.length; i++) {
                console.log(games[i]);
                $routeProvider
                    .when(games[i].url, games[i]);
            }
            var helloState = {
                controller: 'HelloControler as vm',
                name: 'hello',
                templateUrl: 'hello/hello.html'
            };
            $routeProvider
                .when("/", helloState);
        }
        ]);
})();