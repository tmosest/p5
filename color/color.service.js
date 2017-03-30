(function () {
    'use strict';
    angular
        .module('app.color')
        .factory('Color', Color);

    Color.$inject = [
        'p5',
        '$rootScope',
    ];

    function Color(p5, $rootScope) {
        return {

        };
    }

})();