angular
.module('app', 
    ['ngRoute', 'angular-p5', 'app.snake.game', 'app.hello', 'app.common']
)
.config(
  function($routeProvider) {
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
    .when("/snake", snakeState);
  }
);