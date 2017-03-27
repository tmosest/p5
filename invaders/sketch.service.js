(function () {
    'use strict';
    angular
        .module('app.invaders')
        .factory('InvadersSketch',
        ['p5', '$window', 'Ship', 'Flower', 'iDrop',
            function (p5, $window, Ship, Flower, Drop) {
                return function (sketch) {
                    var ship;
                    var flowers = [];
                    var drops = [];

                    sketch.setup = function () {
                        sketch.createCanvas(600, 600);
                        ship = Ship.newShip(sketch);
                        for (var i = 0; i < 6; i++) {
                            flowers[i] = Flower.newFlower(sketch, i * 80 + 80, 60);
                        }
                    };

                    sketch.draw = function () {
                        sketch.background(51);
                        ship.show();
                        ship.move();

                        for (var i = 0; i < drops.length; i++) {
                            drops[i].show();
                            drops[i].move();
                            for (var j = 0; j < flowers.length; j++) {
                                if (drops[i].hits(flowers[j])) {
                                    flowers[j].grow();
                                    drops[i].evaporate();
                                }
                            }
                        }

                        var edge = false;

                        for (var i = 0; i < flowers.length; i++) {
                            flowers[i].show();
                            flowers[i].move();
                            if (flowers[i].x > sketch.width || flowers[i].x < 0) {
                                edge = true;
                            }
                        }

                        if (edge) {
                            for (var i = 0; i < flowers.length; i++) {
                                flowers[i].shiftDown();
                            }
                        }

                        for (var i = drops.length - 1; i >= 0; i--) {
                            if (drops[i].toDelete) {
                                drops.splice(i, 1);
                            }
                        }
                    };

                    sketch.keyReleased = function (keyE) {
                        if (keyE.key != ' ') {
                            ship.setDir(0);
                        }
                    };

                    sketch.keyPressed = function (keyE) {
                        console.log(keyE);
                        var keyCode = keyE.keyCode;
                        if (keyE.key === ' ') {
                            console.log('New Bullet');
                            var drop = Drop.newDrop(sketch, ship.x, sketch.height);
                            console.log(drop);
                            drops.push(drop);
                        }
                        if (keyCode === sketch.RIGHT_ARROW) {
                            ship.setDir(1);
                        } else if (keyCode === sketch.LEFT_ARROW) {
                            ship.setDir(-1);
                        }
                    };
                }
            }
        ]);
})();