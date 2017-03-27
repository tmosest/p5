(function () {
    'use strict';
    angular
        .module('app.maze')
        .factory('Maze',
        [
            function () {
                var cols;
                var rows; 
                
                function index(i, j) {
                    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
                        return -1;
                    }
                    return i + j * cols;
                }

                function Cell(sketch, i, j, w) {
                    this.i = i;
                    this.j = j;
                    this.walls = [true, true, true, true];
                    this.visited = false;

                    this.checkNeighbors = function (grid) {
                        var neighbors = [];
                        cols = Math.floor(sketch.width / w);
                        rows = Math.floor(sketch.height / w);
                        var top = grid[index(i, j - 1)];
                        var right = grid[index(i + 1, j)];
                        var bottom = grid[index(i, j + 1)];
                        var left = grid[index(i - 1, j)];

                        if (top && !top.visited) {
                            neighbors.push(top);
                        }
                        if (right && !right.visited) {
                            neighbors.push(right);
                        }
                        if (bottom && !bottom.visited) {
                            neighbors.push(bottom);
                        }
                        if (left && !left.visited) {
                            neighbors.push(left);
                        }

                        if (neighbors.length > 0) {
                            var r = Math.floor(sketch.random(0, neighbors.length));
                            return neighbors[r];
                        } else {
                            return undefined;
                        }


                    }
                    this.highlight = function () {
                        var x = this.i * w;
                        var y = this.j * w;
                        sketch.noStroke();
                        sketch.fill(0, 0, 255, 100);
                        sketch.rect(x, y, w, w);
                    }
                    this.show = function () {
                        var x = this.i * w;
                        var y = this.j * w;
                        sketch.stroke(255);
                        if (this.walls[0]) {
                            sketch.line(x, y, x + w, y);
                        }
                        if (this.walls[1]) {
                            sketch.line(x + w, y, x + w, y + w);
                        }
                        if (this.walls[2]) {
                            sketch.line(x + w, y + w, x, y + w);
                        }
                        if (this.walls[3]) {
                            sketch.line(x, y + w, x, y);
                        }

                        if (this.visited) {
                            sketch.noStroke();
                            sketch.fill(255, 0, 255, 100);
                            sketch.rect(x, y, w, w);
                        }
                    }
                }
                function newCell(sketch, i, j, w) {
                    return new Cell(sketch, i, j, w);
                }
                return {
                    newCell: newCell
                };
            }
        ]
        );
})();