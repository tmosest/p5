(function () {
    'use strict';
    angular
    .module('app.invaders')
    .factory('Ship',
        [
            function() {
                function Ship(sketch) {
                    this.x = sketch.width / 2;
                    this.xdir = 0;

                    this.show = function() {
                        sketch.fill(255);
                        sketch.rectMode(sketch.CENTER);
                        sketch.rect(this.x, sketch.height - 20, 20, 60);
                    }

                    this.setDir = function(dir) {
                        this.xdir = dir;
                    }
                    
                     this.move = function(dir) {
                         this.x += this.xdir * 5;
                     }
                }
                function newShip(sketch) {
                    return new Ship(sketch);
                }
                return {
                    newShip : newShip
                }
            }
        ]
    );
})();