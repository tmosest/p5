(function () {
    'use strict';
    angular
        .module('app.invaders')
        .factory('MitosisSketch',
        ['p5', '$window', 'Mitosis',
            function (p5, $window, Mitosis) {
                return function (sketch) {
                    var cells = [];

                    sketch.setup = function () {
                        sketch.createCanvas(700, 700);
                        cells.push(Mitosis.newCell(sketch, null, null, null));
                        cells.push(Mitosis.newCell(sketch, null, null, null));
                    }

                    sketch.draw = function () {
                        sketch.background(200);
                        for (var i = 0; i < cells.length; i++) {
                            cells[i].move();
                            cells[i].show();
                        }
                    }

                    sketch.mousePressed = function () {
                        for (var i = cells.length - 1; i >= 0; i--) {
                            if (cells[i].clicked(
                                    sketch.mouseX, 
                                    sketch.mouseY
                                )) {
                                cells.push(cells[i].mitosis());
                                cells.push(cells[i].mitosis());
                                cells.splice(i, 1);
                            }
                        }
                    } // mousePressed
                };
            }
        ]);
})();
