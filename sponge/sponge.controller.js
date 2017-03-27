angular
.module('app.sponge')
.controller('SpongeControler',
[
    '$scope', '$timeout',
    function($scope, $timeout) {
       var vm = this;
       vm.speed = 0;
       $scope.$on('sponge:do', function(event) {
            vm.speed += 1;
            $timeout(function() {$scope.$apply();});
        });
    }
]   
);