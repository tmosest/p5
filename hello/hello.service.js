(function () {
    'use strict';
    angular
        .module('app.hello')
        .service('HelloService',
        ['GamesService',
            function (GamesService) {

                function getGames() {
                    return GamesService.getGames();
                }

                getGames();

                return {
                    getGames: getGames
                };
            }
        ]
        );
})();
