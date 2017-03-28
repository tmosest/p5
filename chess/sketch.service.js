(function () {
    'use strict';
    angular
        .module('app.chess')
        .factory('ChessSketch',
        ['p5', '$window', 'Chess',
            function (p5, $window, Chess) {
                return function (sketch) {
                    var grid = [];
                    var activePiece = null;
                    var aI, aJ;
                    var moves;
                    var currentTurn = 0;
                    function isValidMove(moves, i, j) {
                        for (var m = 0; m < moves.length; m++) {
                            if (moves[m].i == i && moves[m].j == j)
                                return true;
                        }
                        return false;
                    }
                    sketch.setup = function () {
                        sketch.createCanvas(640, 640);
                        grid = Chess.createNewBoard(sketch);
                    };
                    sketch.draw = function () {
                        sketch.background(51);
                        sketch.fill(0, 0, 255, 100);
                        var k = 0;
                        if (activePiece != null) {
                            Chess.setGrid(grid);
                            Chess.setPos(aI, aJ);
                            moves = activePiece.getMoves();
                        }
                        for (var i = 0; i < 8; i++) {
                            for (var j = 0; j < 8; j++) {
                                if ((i % 2 == j % 2)) {
                                    sketch.fill(255, 255, 255, 100);
                                } else {
                                    sketch.fill(0, 0, 0, 100);
                                }
                                if (activePiece != null && i == aI && j == aJ) {
                                    if (currentTurn % 2 == 0) {
                                        sketch.fill(0, 255, 255, 100);
                                    } else {
                                        sketch.fill(255, 255, 0, 100);
                                    }
                                }
                                sketch.rect(80 * j, 80 * i, 80, 80);
                                if (grid[i][j] != null) {
                                    sketch.textSize(30);
                                    if (grid[i][j].color == 'R') {
                                        sketch.fill(255, 0, 0);
                                    } else {
                                        sketch.fill(0, 0, 255);
                                    }
                                    sketch.text(grid[i][j].name, 80 * j + 30, 80 * i + 50);
                                }
                            }
                        }
                        if (activePiece != null) {
                            for (var m = 0; m < moves.length; m++) {
                                if (currentTurn % 2 == 0) {
                                    sketch.fill(0, 255, 255, 100);
                                } else {
                                    sketch.fill(255, 255, 0, 100);
                                }
                                sketch.rect(80 * moves[m].j, 80 * moves[m].i, 80, 80);
                            }
                        }
                    };
                    sketch.mousePressed = function (s) {
                        console.log(s);
                        var x = s.layerX;
                        var y = s.layerY;
                        var j = Math.floor(x / 80);
                        var i = Math.floor(y / 80);
                        console.log('i: ' + i + ', j: ' + j);
                        if (activePiece != null && isValidMove(moves, i, j)) {
                            var testPiece = grid[i][j];
                            if (testPiece == null ||
                                (testPiece != null && testPiece.color != activePiece.color)) {
                                grid[i][j] = activePiece;
                                grid[aI][aJ] = null;
                                currentTurn++;
                                if (testPiece != null && testPiece.name == 'K') {
                                    console.log("Game Over");
                                    grid = Chess.createNewBoard(sketch);
                                    currentTurn = 0;
                                }
                            }
                            activePiece = null;
                            moves = [];
                            aI = null;
                            aJ = null;
                        }
                        if (activePiece != null && grid[i][j] == activePiece) {
                            activePiece = null;
                            moves = [];
                        } else {
                            activePiece = grid[i][j];
                        }
                        if (activePiece.color == 'B' && currentTurn % 2 == 1) {
                            activePiece = null;
                            moves = [];
                            console.log("Wrong turn");
                        }
                        if (activePiece.color == 'R' && currentTurn % 2 == 0) {
                            activePiece = null;
                            moves = [];
                            console.log("Wrong turn");
                        }
                        console.log('Piece Selected: ');
                        console.log(activePiece);
                        if (activePiece != null) {
                            aI = i;
                            aJ = j;
                            Chess.setGrid(grid);
                            Chess.setPos(aI, aJ);
                            moves = activePiece.getMoves();
                        }
                        console.log('aI: ' + aI + ' aJ: ' + aJ);
                    };
                }
            }
        ]);
})();
