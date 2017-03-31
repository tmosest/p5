(function () {
    'use strict';

    angular
        .module('app.mine')
        .factory('MineSweeper', MineSweeper);

    MineSweeper.$inject = ['$rootScope'];

    function MineSweeper($rootScope) {
        var bombCount;

        var gameOver;

        var n = 16;
        var m = 30;

        var w = 600;
        var h = 320;

        var dx = w / m;
        var dy = h / n;

        function getI(y) {
            return Math.floor(y / dy);
        }

        function getJ(x) {
            return Math.floor(x / dx);
        }

        var grey = {
            r: 144,
            g: 144,
            b: 144
        };

        function getGrey() {
            return grey;
        }

        var blue = {
            r: 0,
            g: 0,
            b: 255
        };

        var lightBlue = {
            r: 0,
            g: 0,
            b: 200
        };


        var grid;
        var sketch;

        /*
         * value = - 1 => Bomb
         * value = 0 => Empty Space
         * vlaue > 0 => Count to Bomb
         */
        class Tile {
            construct(value) {
                this.isOpen = true;
                this.value = value || 0;
            }
            getIsOpen() {
                return this.isOpen;
            }
            setIsOpen(isOpen) {
                this.isOpen = isOpen;
            }
            getValue() {
                return this.value;
            }
            setValue(value) {
                this.value = value;
            }
            getIsBomb() {
                return this.isBomb;
            }
            setIsBomb(value) {
                this.isBomb = value
            }
        }

        function createNewGame(mySketch) {
            bombCount = 50;
            $rootScope.$broadcast('mine:marked', bombCount);
            gameOver = false;
            $rootScope.$broadcast('mine:death', gameOver);
            sketch = mySketch;
            grid = [];
            for (var i = 0; i < n; i++) {
                var layer = [];
                for (var j = 0; j < m; j++) {
                    layer.push(new Tile());
                }
                grid.push(layer);
            }
            for (var b = 0; b < bombCount; b++) {
                var rI = Math.floor(sketch.random(0, n));
                var rJ = Math.floor(sketch.random(0, m));
                if (grid[rI][rJ].getValue() == -1)
                    b--;
                grid[rI][rJ].setValue(-1);
            }
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < m; j++) {
                    var c = 0;
                    if (j - 1 >= 0) {
                        if (grid[i][j - 1].getValue() == -1) {
                            c++;
                        }
                        if (i - 1 >= 0) {
                            if (grid[i - 1][j - 1].getValue() == -1) {
                                c++;
                            }
                        }
                        if (i + 1 < n) {
                            if (grid[i + 1][j - 1].getValue() == -1) {
                                c++;
                            }
                        }
                    }
                    if (j + 1 < m) {
                        if (grid[i][j + 1].getValue() == -1) {
                            c++;
                        }
                        if (i - 1 >= 0) {
                            if (grid[i - 1][j + 1].getValue() == -1) {
                                c++;
                            }
                        }
                        if (i + 1 < n) {
                            if (grid[i + 1][j + 1].getValue() == -1) {
                                c++;
                            }
                        }
                    }
                    if (i - 1 >= 0) {
                        if (grid[i - 1][j].getValue() == -1) {
                            c++;
                        }
                    }
                    if (i + 1 < n) {
                        if (grid[i + 1][j].getValue() == -1) {
                            c++;
                        }
                    }
                    if (grid[i][j].getValue() != -1)
                        grid[i][j].setValue(c);
                    grid[i][j].setIsOpen(false);
                    grid[i][j].setIsBomb(false);
                }
            }
        }

        function drawBomb(sketch, i, j) {
            sketch.textSize(dx * 0.8);
            sketch.text("💣", dx * j + 0.2 * dx, dy * i + 0.8 * dy);
        }

        function drawGrid() {
            if (sketch == null)
                return;
            sketch.stroke(2);
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < m; j++) {
                    if (grid[i][j].getIsOpen() == true) {
                        sketch.fill(grey.r, grey.g, grey.b);
                        sketch.rect(dx * j, dy * i, dx, dy);
                        if (grid[i][j].getValue() != 0) {
                            sketch.fill(blue.r, blue.g, blue.b);
                            sketch.textSize(dx * 0.8);
                            sketch.text(grid[i][j].getValue(), dx * j + 0.2 * dx, dy * i + 0.8 * dy);
                        }
                        if (grid[i][j].getValue() === -1) {
                            drawBomb(sketch, i, j);
                            sketch.fill(255, 0, 0);
                            sketch.textSize(dx * 0.8);
                            sketch.text('X', dx * j + 0.2 * dx, dy * i + 0.8 * dy);
                        }
                    } else if (grid[i][j].getIsBomb() == true) {
                        sketch.fill(255, 0, 0);
                        sketch.rect(dx * j, dy * i, dx, dy);
                        drawBomb(sketch, i, j);
                    } else {
                        sketch.fill(blue.r, blue.g, blue.b);
                        sketch.rect(dx * j, dy * i, dx, dy);
                    }
                }
            }
            if (bombCount == 0) {

            }
        }

        function checkForWin() {
            if (bombCount == 0) {
                for (var i = 0; i < n; i++) {
                    for (var j = 0; j < m; j++) {
                        if (grid[i][j].getIsBomb() === true &&
                            grid[i][j].getValue() != -1) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }

        function hightLight(x, y) {
            var i = getI(y);
            var j = getJ(x);
            if (gameOver || grid == null)
                return;
            if (i >= 0 && i < n && j >= 0 && j < m) { //&& grid[i][j].getIsOpen() === false) {
                if (grid[i][j].getIsOpen() == undefined || grid[i][j].getIsOpen() == false) {
                    sketch.fill(lightBlue.r, lightBlue.g, lightBlue.b);
                    sketch.rect(dx * j, dy * i, dx, dy);
                }
            }
        }

        function openTile(event, x, y) {
            var i = getI(y);
            var j = getJ(x);
            if (gameOver || grid == null)
                return;
            if (i >= 0 && i < n && j >= 0 && j < m) { //&& grid[i][j].getIsOpen() === false) {

                if (sketch.mouseButton == sketch.RIGHT) {
                    if (grid[i][j].getIsOpen() == undefined || grid[i][j].getIsOpen() == false) {
                        if (grid[i][j].getIsBomb() == false) {
                            grid[i][j].setIsBomb(true);
                            bombCount--;
                        } else {
                            grid[i][j].setIsBomb(false);
                            bombCount++;
                        }
                        $rootScope.$broadcast('mine:marked', bombCount);
                    }
                    if (checkForWin()) {
                        $rootScope.$broadcast('mine:death', 'WIN');
                    }
                } else {

                    if (grid[i][j].getIsOpen() == undefined || grid[i][j].getIsOpen() == false) {
                        grid[i][j].setIsOpen(true);
                        if (grid[i][j].getValue() === -1) {
                            drawBomb(sketch, i, j);
                            gameOver = true;
                            $rootScope.$broadcast('mine:death', gameOver);
                            //createNewGame(sketch);
                        } else if (grid[i][j].getValue() === 0) {
                           // var graph = angular.copy(grid);
                            var gridToCheckI = [];
                            var gridToCheckJ = [];
                            gridToCheckI.push(i);
                            gridToCheckJ.push(j);
                            while (gridToCheckI.length > 0) {
                                var gI, gJ;
                                gI = gridToCheckI.pop();
                                gJ = gridToCheckJ.pop();
                                if (gJ - 1 >= 0) {
                                    grid[gI][gJ - 1].setIsOpen(true);
                                    if (grid[gI][gJ - 1].getIsOpen() === false &&
                                        grid[gI][gJ - 1].getValue() == 0) {
                                        gridToCheckI.push(gI);
                                        gridToCheckJ.push(gJ - 1);
                                    }
                                    if (gI - 1 >= 0) {
                                        grid[gI - 1][gJ - 1].setIsOpen(true);
                                        if (grid[gI - 1][gJ - 1].getIsOpen() === false &&
                                            grid[gI - 1][gJ - 1].getValue() == 0) {
                                            gridToCheckI.push(gI - 1);
                                            gridToCheckJ.push(gJ - 1);
                                        }
                                    }
                                    if (gI + 1 < n) {
                                        grid[gI + 1][gJ - 1].setIsOpen(true);
                                        if (grid[gI + 1][gJ - 1].getIsOpen() == false &&
                                            grid[gI + 1][gJ - 1].getValue() == 0) {
                                            gridToCheckI.push(gI + 1);
                                            gridToCheckJ.push(gJ - 1);
                                        }
                                    }
                                }
                                if (gJ + 1 < m) {
                                    grid[gI][gJ + 1].setIsOpen(true);
                                    if (grid[gI][gJ + 1].getValue() == 0) {
                                        gridToCheckI.push(gI);
                                        gridToCheckJ.push(gJ + 1);
                                    }
                                    if (gI - 1 >= 0) {
                                        grid[gI - 1][j + 1].setIsOpen(true);
                                        if (grid[gI - 1][gJ + 1].getIsOpen() == false &&
                                            grid[gI - 1][gJ + 1].getValue() == 0) {
                                            gridToCheckI.push(gI - 1);
                                            gridToCheckJ.push(gJ + 1);
                                        }
                                    }
                                    if (gI + 1 < n) {
                                        grid[gI + 1][gJ + 1].setIsOpen(true);
                                        if (grid[gI + 1][gJ + 1].getIsOpen() == false &&
                                            grid[gI + 1][gJ + 1].getValue() == 0) {
                                            gridToCheckI.push(gI + 1);
                                            gridToCheckJ.push(gJ + 1);
                                        }
                                    }
                                }
                                if (gI - 1 >= 0) {
                                    grid[gI - 1][gJ].setIsOpen(true);
                                    if (grid[gI - 1][gJ].getIsOpen() == false &&
                                        grid[gI - 1][gJ].getValue() == 0) {
                                        gridToCheckI.push(gI - 1);
                                        gridToCheckJ.push(gJ);
                                    }
                                }
                                if (gI + 1 < n) {
                                    grid[gI + 1][gJ].setIsOpen(true);
                                    if (grid[gI + 1][gJ].getIsOpen() == false &&
                                        grid[gI + 1][gJ].getValue() == 0) {
                                        gridToCheckI.push(gI + 1);
                                        gridToCheckJ.push(gJ);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        function getSketch() {
            return sketch;
        }

        return {
            createNewGame: createNewGame,
            drawGrid: drawGrid,
            getGrey: getGrey,
            hightLight: hightLight,
            openTile: openTile,
            getSketch: getSketch
        };
    }

})();