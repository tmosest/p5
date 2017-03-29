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
                    // Login w/ Google
                    auth.$signInWithPopup("google").then(function (firebaseUser) {
                        console.log("Signed in as:", firebaseUser.uid);
                        console.log(firebaseUser);
                        User.setName(firebaseUser.user.displayName);
                        $location.url('hello');
                    }).catch(function (error) {
                        console.log("Authentication failed:", error);
                    });
                };
            }
        ]
        );
})();