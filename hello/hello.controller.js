(function () {
    'use strict';
    angular
        .module('app.hello')
        .controller('HelloController',
        [
            '$location',
            'GamesService',
            'User',
            '$firebaseArray',
            function ($location, GamesService, User, $firebaseArray) {
                var vm = this;
                vm.games = GamesService.getGames();
                vm.name = User.getName();
                console.log('Name: ' + vm.name);
                console.log(vm.games);
                vm.goToGame = function (name) {
                    $location.url(name);
                };

                var ref = firebase.database().ref().child("messages");
                // create a synchronized array
                vm.messages = $firebaseArray(ref);
                console.log(vm.messages);
                // add new items to the array
                // the message is automatically added to our Firebase database!
                vm.addMessage = function () {
                    vm.messages.$add({
                        text: vm.newMessageText
                    });
                };
            }
        ]);
})();
