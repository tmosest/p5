(function () {
    'use strict';
    angular
        .module('app.snake.game')
        .factory('Snake',
        ['p5', '$rootScope',
            function (p5, $rootScope) {
                var x = 0;
                var y = 0;
                var xspeed = 1;
                var yspeed = 0;
                var total = 0;
                var tail = [];
                var sketch = null;
                var isActive = false;

                function activate(activeSketch) {
                    sketch = activeSketch;
                }

                function reset() {
                    x = 0;
                    y = 0;
                    xspeed = 1;
                    yspeed = 0;
                    total = 0;
                    tail = [];
                    isActive = true;
                }

                function getTotal() {
                    return total;
                }

                function eat(pos) {
                    if (angular.isDefined(sketch)) {
                        var d = sketch.dist(x, y, pos.x, pos.y);
                        if (d < 1) {
                            total++;
                            $rootScope.$broadcast('snake:eat', total);
                            return true;
                        } else {
                            return false;
                        }
                    }
                }

                function dir(x, y) {
                    xspeed = x;
                    yspeed = y;
                }

                function death() {
                    if (angular.isDefined(sketch)) {
                        for (var i = 0; i < tail.length; i++) {
                            var pos = tail[i];
                            var d = sketch.dist(x, y, pos.x, pos.y);
                            if (d < 1) {
                                total = 0;
                                tail = [];
                                isActive = false;
                                $rootScope.$broadcast('snake:death');
                            }
                        }
                    }
                }

                function update(scl) {
                    if (angular.isDefined(sketch)) {
                        if (total === tail.length) {
                            for (var i = 0; i < tail.length - 1; i++) {
                                tail[i] = tail[i + 1];
                            }
                        }
                        tail[total - 1] = new p5.Vector(x, y);

                        x = x + xspeed * scl;
                        y = y + yspeed * scl;

                        x = sketch.constrain(x, 0, sketch.width - scl);
                        y = sketch.constrain(y, 0, sketch.height - scl);
                    }
                }

                function show(scl) {
                    if (angular.isDefined(sketch)) {
                        sketch.fill(255);
                        for (var i = 0; i < tail.length; i++) {
                            sketch.rect(tail[i].x, tail[i].y, scl, scl);
                        }
                        sketch.rect(x, y, scl, scl);
                    }
                }

                function getActive() {
                    return isActive;
                }

                return {
                    activate: activate,
                    eat: eat,
                    show: show,
                    update: update,
                    death: death,
                    dir: dir,
                    getTotal: getTotal,
                    getIsActive: getActive,
                    reset: reset
                };
            }]);
})();