(function () {
    'use strict';
    angular
    .module('app.invaders')
    .factory('iDrop',
        [
            function() {
                function Drop (sketch, x, y) {
                    this.x = x;
                    this.y = y;
                    this.r = 8;
                    this.toDelete = false;

                    this.show = function() {
                        sketch.noStroke();
                        sketch.fill(150, 0, 255);
                        sketch.ellipse(this.x, this.y, this.r*2, this.r*2);
                    }

                    this.evaporate = function() {
                        this.toDelete = true;
                    }

                    this.hits = function(flower) {
                        var d = sketch.dist(this.x, this.y, flower.x, flower.y);
                        if (d < this.r + flower.r) {
                        return true;
                        } else {
                        return false;
                        }
                    }

                    this.move = function() {
                        this.y -= 5;
                    }
                }
                function newDrop (sketch, x, y) {
                    return new Drop(sketch, x, y);
                }
                return {
                    newDrop: newDrop
                };
            }
        ]
    );
})();