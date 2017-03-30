(function () {
    'use strict';
    angular
    .module('app.color')
    .controller('ColorController', ColorController);

    ColorController.$inject = [
        '$scope',
        '$timeout'
    ];

    function ColorController($scope, $timeout) {
        $scope.$on('color:change', function (event, color) {
            $scope.color = color;
            $timeout(function () { $scope.$apply(); });
        });
    }

})();