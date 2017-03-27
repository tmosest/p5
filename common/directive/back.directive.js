angular
.module('app.common')
.directve('backbtn', 
[
    '$scope',
    '$window',
    function($scope, $window) {
        return {
            template: `<button class="back" ng-click="back()">Back</button>`,
            replace: true,
            link: function(scope, elem, attrs) {
                $scope.back = function() {
                    $window.history.back();
                };
            },
            restrict: 'ACE'
        };    
    }
]);