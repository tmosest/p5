(function () {
    'use strict';
    angular
        .module('app.rain')
        .factory('PurpleRainSketch',
        ['p5', '$window', 'Drop',
            function (p5, $window, Drop) {
                return function (sketch) {
                    var drops = [];

                    sketch.setup = function() {
                        sketch.createCanvas($window.innerWidth, $window.innerHeight);
                        for (var i = 0; i < 500; i++) {
                            drops[i] = Drop.newDrop(sketch);
                        }
                    }

                    sketch.draw = function() {
                        sketch.background(230, 230, 250);
                        for (var i = 0; i < drops.length; i++) {
                            drops[i].fall();
                            drops[i].show();
                        }
                    }
                }
            }
        ]);
})();