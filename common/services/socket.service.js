(function () {
    'use strict';
    angular
        .module('app.common')
        .factory('socket', function (socketFactory) {
            return socketFactory();
        });
})();