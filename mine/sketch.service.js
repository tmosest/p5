(function () {
    'use strict';
    angular
        .module('app.mine')
        .factory('MineSketch', MineSketch);

    MineSketch.$inject = [
        'p5', '$window', 'Color', '$rootScope', 'MineSweeper'
    ];

    function MineSketch(p5, $window, Color, $rootScope, MineSweeper) {

        return function (sketch) {
            var w = 600;
            var h = 320;
            var grey = MineSweeper.getGrey();

            sketch.setup = function () {
                // create canvas
                sketch.createCanvas(w, h);
                sketch.frameRate(30);
                MineSweeper.createNewGame(sketch);
            };

            sketch.draw = function () {
                sketch.background(grey.r, grey.g, grey.b);
                MineSweeper.drawGrid();
                MineSweeper.hightLight(sketch.mouseX, sketch.mouseY);
            };

            sketch.mousePressed = function (event) {
                MineSweeper.openTile(event, sketch.mouseX, sketch.mouseY);
            };

            sketch.mouseMoved = function () {
                MineSweeper.hightLight(sketch.mouseX, sketch.mouseY);
            };
        }
    }

})();