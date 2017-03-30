(function () {
    'use strict';
    angular
        .module('app.paisho')
        .factory('PaishoSketch',
        ['p5', '$window', '$rootScope', 'Paisho',
            function (p5, $window, $rootScope, Paisho) {
                return function (sketch) {

                    var canvasSize = 640;
                    var boardRadius = 440;
                    var center = canvasSize / 2;
                    var dx = boardRadius / 18;

                    sketch.preload = function () {
                        Paisho.preloadImages(sketch);
                    };

                    sketch.setup = function () {
                        Paisho.constructHands(sketch);
                        sketch.createCanvas(canvasSize, canvasSize);
                    };

                    sketch.draw = function () {
                        sketch.background(100);
                        Paisho.drawPaishoBoard(sketch);
                        Paisho.drawPlayerAreas(sketch);
                        Paisho.drawHands(sketch);
                    };
                    
                    sketch.mousePressed = function (s) {
                        console.log(s);
                        Paisho.checkHands(sketch, s);
                    };
                }
            }
        ]);
})();
