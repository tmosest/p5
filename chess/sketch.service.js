(function () {
    'use strict';
    angular
        .module('app.chess')
        .factory('ChessSketch',
        ['p5', '$window',
            function (p5, $window) {
                return function (sketch) {
                    var grid = [];
                    sketch.setup = function() {
                        sketch.createCanvas(640, 640);
                        var k = 0;
                        for(var i = 0; i < 8; i++) {
                            var row = [];
                            for(var j = 0; j < 8; j++) {
                                if ( (i % 2 ==  j % 2) ) {
                                    row.push("red");
                                    sketch.fill(255, 255, 255, 100);
                                } else {
                                    row.push("black");
                                    sketch.fill(0, 0, 0, 100);
                                }
                                sketch.rect(80 * j, 80 * i, 80, 80);
                            }
                            grid.push(row);
                        }
                    };
                    sketch.draw = function () {
                        sketch.background(51);
                        sketch.fill(0, 0, 255, 100);
                        var k = 0;
                        for(var i = 0; i < 8; i++) {
                            var row = [];
                            for(var j = 0; j < 8; j++) {
                                if ( (i % 2 ==  j % 2) ) {
                                    sketch.fill(255, 255, 255, 100);
                                } else {
                                    sketch.fill(0, 0, 0, 100);
                                }
                                sketch.rect(80 * j, 80 * i, 80, 80);
                            }
                            grid.push(row);
                        }
                    };
                }
            }
        ]);
})();
