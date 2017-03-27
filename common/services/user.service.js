(function () {
    'use strict';
    angular
    .module('app.common')
    .factory('User',
        [
            function() {
                var name;

                function setName(setName) {
                    name = setName;
                }
                
                function getName() {
                    return name;
                }

                return {
                    setName: setName,
                    getName: getName
                };
            }
        ]
    );
})();