(function () {
    'use strict';
    angular
        .module('app.maze')
        .factory('MazeSketch',
        ['p5', '$window', 'Maze',
            function (p5, $window, Maze) {
                return function (sketch) {
                    var cols, rows;
                    var w = 20;
                    var grid = [];
                    var current;
                    var stack = [];

                    function removeWalls(a, b) {
                        var x = a.i - b.i;
                        if (x === 1) {
                            a.walls[3] = false;
                            b.walls[1] = false;
                        } else if (x === -1) {
                            a.walls[1] = false;
                            b.walls[3] = false;
                        }
                        var y = a.j - b.j;
                        if (y === 1) {
                            a.walls[0] = false;
                            b.walls[2] = false;
                        } else if (y === -1) {
                            a.walls[2] = false;
                            b.walls[0] = false;
                        }
                    }

                    sketch.setup = function () {
                        sketch.createCanvas(600, 600);
                        cols = Math.floor(sketch.width / w);
                        rows = Math.floor(sketch.height / w);
                        //frameRate(5);

                        for (var j = 0; j < rows; j++) {
                            for (var i = 0; i < cols; i++) {
                                var cell = Maze.newCell(sketch, i, j, w);
                                grid.push(cell);
                            }
                        }

                        current = grid[0];
                    }

                    sketch.draw = function () {
                        sketch.background(51);
                        for (var i = 0; i < grid.length; i++) {
                            grid[i].show();
                        }

                        current.visited = true;
                        current.highlight();
                        // STEP 1
                        var next = current.checkNeighbors(grid);
                        if (next) {
                            next.visited = true;

                            // STEP 2
                            stack.push(current);

                            // STEP 3
                            removeWalls(current, next);

                            // STEP 4
                            current = next;
                        } else if (stack.length > 0) {
                            current = stack.pop();
                        }
                    }

                    sketch.mousePressed = function () {

                    } // mousePressed
                };
            }
        ]);
})();
