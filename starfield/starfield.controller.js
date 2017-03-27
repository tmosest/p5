angular
.module('app.starfield')
.controller('StarFeildControler',
[
    '$scope', '$timeout',
    function($scope, $timeout) {
       var vm = this;
       vm.speed = 0;
       $scope.$on('starfield:speed', function(event, speed) {
            vm.speed = speed;
            $timeout(function() {$scope.$apply();});
        });
    }
]   
);