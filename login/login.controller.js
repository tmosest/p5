(function () {
    'use strict';
    angular
    .module('app.common')
    .controller('LoginController', 
        [   
            '$location',
            'User',
            function($location, User) {
                var vm = this;
                vm.name = User.getName();
                vm.submit = function () {
                    User.setName(vm.name);
                    return $location.url('hello');
                };
            }
        ]
    );
})();