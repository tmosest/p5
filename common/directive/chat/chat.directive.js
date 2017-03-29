(function () {
    'use strict';
    angular
        .module('app.common')
        .directive('chat', Chat);

    Chat.$inject = [
        '$interval',
        '$timeout',
        '$firebaseArray'
    ];

    function Chat($interval, $timeout, $firebaseArray) {
        function link(scope, el, attrs) {
            var ref = firebase.database().ref().child("messages");
                // create a synchronized array
                scope.messages = $firebaseArray(ref);
                console.log(scope.messages);
                // add new items to the array
                // the message is automatically added to our Firebase database!
                scope.addMessage = function () {
                    scope.messages.$add({
                        text: scope.newMessageText
                    });
                };
        }
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            link: link,
            templateUrl: 'common/directive/chat/chat.html'
        };
    }
})();