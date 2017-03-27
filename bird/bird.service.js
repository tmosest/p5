(function () {
    'use strict';
    angular
        .module('app.bird')
        .factory('Bird', [
            function () {
                function Bird(sketch) {
                    this.y = sketch.height / 2;
                    this.x = 64;
                    this.gravity = 0.6;
                    this.lift = -15;
                    this.velocity = 0;

                    this.show = function () {
                        sketch.fill(255);
                        sketch.ellipse(this.x, this.y, 32, 32);
                    }

                    this.up = function () {
                        console.log('V: ' + this.velocity);
                        this.velocity = this.lift + this.velocity;
                    }

                    this.update = function () {
                        this.velocity += this.gravity;
                        this.velocity *= 0.9;
                        this.y = this.velocity + this.y;

                        if (this.y > sketch.height) {
                            this.y = sketch.height;
                            this.velocity = 0;
                        }

                        if (this.y < 0) {
                            this.y = 0;
                            this.velocity = 0;
                        }
                    }
                }
                function newBird(sketch) {
                    return new Bird(sketch);
                }
                return {
                    newBird: newBird
                };
            }
        ]);
})();