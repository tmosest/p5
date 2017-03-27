(function () {
    'use strict';
    angular
        .module('app.bird')
        .factory('BirdSketch',
        ['p5', '$window', 'Bird', 'Pipe',
            function (p5, $window, Bird, Pipe) {
                return function (sketch) {
                    var bird;
                    var pipes = [];
                    sketch.setup = function () {
                        sketch.createCanvas(600, 600);
                        bird = Bird.newBird(sketch);
                        pipes.push(Pipe.newPipe(sketch));
                    }

                    sketch.draw = function () {
                        sketch.background(51);
                        for (var i = pipes.length - 1; i >= 0; i--) {
                            pipes[i].show();
                            pipes[i].update();

                            if (pipes[i].hits(bird)) {
                                console.log("HIT");
                            }


                            if (pipes[i].offscreen()) {
                                pipes.splice(i, 1);
                            }


                        }

                        bird.update();
                        bird.show();

                        if (sketch.frameCount % 100 == 0) {
                            pipes.push(Pipe.newPipe(sketch));
                        }
                    }

                    sketch.keyPressed = function (keyE) {
                        var key = keyE.key;
                        if (key == ' ') {
                            bird.up();
                            console.log("SPACE");
                        }
                    } // mousePressed
                };
            }
        ]);
})();
