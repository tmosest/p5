(function () {
    'use strict';
    angular
        .module('app.ss')
        .factory('SsSketch',
        ['p5', '$window', 'SS',
            function (p5, $window, SS) {
                return function (sketch) {
                    sketch.setup = function () {
                        sketch.createCanvas(600, 600);
                    };
                    sketch.draw = function () {
                        sketch.background(51);
                    };
                };
            }
        ]);
})();