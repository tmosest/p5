(function () {
    'use strict';
    angular
        .module('app.common')
        .controller('LoginController',
        [
            '$location',
            'User',
            '$firebaseAuth',
            function ($location, User, $firebaseAuth) {
                var auth = $firebaseAuth();
                var vm = this;
                vm.name = User.getName();
                vm.submit = function () {
                    User.setName(vm.name);
                    return $location.url('hello');
                    // Login with Facebook
                    auth.$signInWithPopup("facebook").then(function (firebaseUser) {
                        console.log("Signed in as:", firebaseUser.uid);
                        console.log(firebaseUser);
                    }).catch(function (error) {
                        console.log("Authentication failed:", error);
                    });
                };
            }
        ]
        );
})();