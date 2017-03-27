angular
.module('app.common')
.service('GamesService', [
    function() {
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
        
        function getGames() {
            return games;
        }

        return {
            getGames: getGames    
        };
    }    
]);