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

var games = [starFieldState, spongeState, snakeState];

angular
.module('app.common')
.constant('games', games);

