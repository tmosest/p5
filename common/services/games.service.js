angular
.module('app.common')
.service('GamesService', [
    function() {
        var games = [
            {name: 'Snake', url: '/snake'},
            {name: 'Snake', url: '/snake'}
        ];
        
        function getGames() {
            return games;
        }

        return {
            getGames: getGames    
        };
    }    
]);