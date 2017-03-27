angular
.module('app.common')
.service('GamesService', 
[
    'games',
    function(games) {
        
        function getGames() {
            return games;
        }

        return {
            getGames: getGames    
        };
    }    
]);