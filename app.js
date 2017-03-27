angular
.module('app', 
    [
        'ngRoute', 
        'angular-p5', 
        'app.snake.game', 
        'app.hello', 
        'app.common',
        'app.starfield',
        'app.sponge'
    ]
)
.config(
  function($routeProvider) {

    var starFieldState = {
        controller: 'StarFeildControler as vm',
        name: 'starfield',
        templateUrl: 'starfield/starfield.html'
    };

    var helloState = {
        controller: 'HelloControler as vm',
        name: 'hello',
        templateUrl: 'hello/hello.html'
    };

    var snakeState = {
        controller: 'SnakeGameController as vm',
        name: 'snake',
        templateUrl: 'snake/snake.html',
    };

    var spongeState = {
        controller: 'SpongeControler as vm',
        name: 'sponge',
        templateUrl: 'sponge/sponge.html',
    };


    $routeProvider
    .when("/", helloState)
    .when("/snake", snakeState)
    .when("/sponge", spongeState)
    .when("/star-field", starFieldState);
  }
);