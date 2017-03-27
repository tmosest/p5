(function () {
    'use strict';
    angular
        .module('app.mitosis')
        .factory('Mitosis',
        [
            function () {
                function Cell(sketch, pos, r, c) {
                    if (pos) {
                        this.pos = pos.copy();
                    } else {
                        this.pos = sketch.createVector(
                            sketch.random(sketch.width), 
                            sketch.random(sketch.height)
                        );
                    }

                    this.r = r || 60;
                    this.c = c || sketch.color(
                        sketch.random(100, 255), 
                        0, 
                        sketch.random(100, 255), 
                        100
                    );

                    this.clicked = function (x, y) {
                        var d = sketch.dist(this.pos.x, this.pos.y, x, y);
                        if (d < this.r) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    this.mitosis = function () {
                        var cell = new Cell(sketch, this.pos, this.r * 0.8, this.c);
                        return cell;
                    }

                    this.move = function () {
                        var vel = p5.Vector.random2D();
                        this.pos.add(vel);
                    }

                    this.show = function () {
                        sketch.noStroke();
                        sketch.fill(this.c);
                        sketch.ellipse(this.pos.x, this.pos.y, this.r, this.r)
                    }
                }
                function newCell(sketch, pos, r, c) {
                    return new Cell(sketch, pos, r, c);
                }
                return {
                    newCell: newCell
                };
            }
        ]
        );
})();