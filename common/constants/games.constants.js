(function () {
    'use strict';
    var starFieldState = {
        controller: 'StarFeildControler as vm',
        name: 'Star Field',
        templateUrl: 'starfield/starfield.html',
        url: '/star-field'
    };

    var helloState = {
        controller: 'HelloControler as vm',
        name: 'Welcome',
        templateUrl: 'hello/hello.html',
        url: '/'
    };

    var snakeState = {
        controller: 'SnakeGameController as vm',
        name: 'Snake',
        templateUrl: 'snake/snake.html',
        url: '/snake'
    };

    var spongeState = {
        controller: 'SpongeControler as vm',
        name: 'Sponge',
        templateUrl: 'sponge/sponge.html',
        url: '/sponge'
    };

    var purpleRainState = {
        controller: 'PurpleRainController as vm',
        name: 'Purple Rain',
        templateUrl: 'rain/rain.html',
        url: '/rain'
    };

    var invadersState = {
        controller: 'InvadersControllers as vm',
        name: 'Space Invaders',
        templateUrl: 'invaders/invaders.html',
        url: '/invaders'
    };

    var mitosisState = {
        controller: 'MitosisController as vm',
        name: 'Mitosis',
        templateUrl: 'mitosis/mitosis.html',
        url: '/mitosis'
    };

    var games = [
        starFieldState,
        spongeState,
        snakeState,
        purpleRainState,
        invadersState,
        mitosisState
    ];

    angular
        .module('app.common')
        .constant('games', games);
})();