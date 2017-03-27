angular
.module('app', 
    [
        'ngRoute', 
        'angular-p5', 
        'app.snake.game', 
        'app.hello', 
        'app.common',
        'app.starfield'
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

    $routeProvider
    .when("/", helloState)
    .when("/snake", snakeState)
    .when("/star-field", starFieldState);
  }
);