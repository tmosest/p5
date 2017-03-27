(function () { 
    'use strict';
    angular
    .module('app.invaders')
    .factory('Flower', 
        [
            function () {
                var sketch;
                function Flower (x, y) {
                    this.x = x;
                    this.y = y;
                    this.r = 30;
                    this.xdir = 1;
                    
                    this.grow = function () {
                        this.r += 2;
                    };

                    this.shiftDown = function () { 
                        this.xdir *= -1;
                        this.y += this.r;
                    };

                    this.move = function () {
                        this.x += this.xdir;
                    };

                    this.show = function () {
                        sketch.noStroke();
                        sketch.fill(255, 0, 200, 150);
                        sketch.ellipse(this.x, this.y, this.r * 2, this.r * 2);
                    }
                }
                function newFlower (activeSketch, x, y) {
                    sketch = activeSketch;
                    return new Flower (x, y);
                }
                return {
                    newFlower: newFlower
                };
            }
        ]
    );
})();