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
        url: '/hello'
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

    var mazeState = {
        controller: 'MazeController as vm',
        name: 'Maze DFS',
        templateUrl: 'maze/maze.html',
        url: '/maze'
    };

    var ssState = {
        controller: 'SsController as vm',
        name: 'Solar System',
        templateUrl: 'ss/ss.html',
        url: '/ss'
    };

    var perlinState = {
        controller: 'PerlinController as vm',
        name: 'Perlin',
        templateUrl: 'perlin/perlin.html',
        url: '/perlin'
    };

    var birdState = {
        controller: 'HappyBirdController as vm',
        name: 'Happy Bird',
        templateUrl: 'bird/bird.html',
        url: '/bird'
    };

    var chessState = {
        controller: 'ChessController as vm',
        name: 'Chess',
        templateUrl: 'chess/chess.html',
        url: '/chess'
    };

    var paishoState = {
        controller: 'PaishoController as vm',
        name: 'Pai Sho',
        templateUrl: 'paisho/paisho.html',
        url: '/paisho'
    };

    var colorState = {
        controller: 'ColorController as vm',
        name: 'Color Selector',
        templateUrl: 'color/color.html',
        url: '/color'
    };

    var mineState = {
        controller: 'MineController as vm',
        name: 'Mine Sweep',
        templateUrl: 'mine/mine.html',
        url: '/mine'
    };

    var games = [
        starFieldState,
        spongeState,
        snakeState,
        purpleRainState,
        invadersState,
        mitosisState,
        mazeState,
        ssState,
        perlinState,
        birdState,
        chessState,
        paishoState,
        colorState,
        mineState
    ];

    angular
        .module('app.common')
        .constant('games', games);
})();