angular
.module('app.sponge')
.controller('SpongeControler',
[
    '$scope', '$timeout',
    function($scope, $timeout) {
       var vm = this;
       vm.speed = 0;
       $scope.$on('sponge:do', function(event, speed) {
            vm.speed = speed;
            $timeout(function() {$scope.$apply();});
        });
    }
]   
);