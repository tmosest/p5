(function () {
    'use strict';
    angular
        .module('app.common')
        .directive('backbtn',
        [
            '$window',
            function ($window) {
                return {
                    template: '<button class="back" ng-click="back()">Back</button>',
                    link: function (scope, elem, attrs) {
                        scope.back = function () {
                            $window.history.back();
                        };
                    },
                    restrict: 'E'
                };
            }
        ]);
})();
