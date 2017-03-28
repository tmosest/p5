(function () {
    'use strict';
    angular
        .module('app.chess')
        .factory('ChessSketch',
        ['p5', '$window',
            function (p5, $window) {
                return function (sketch) {
                    var grid = [];
                    var activePiece = null;
                    var aI, aJ;
                    var moves;
                    var currentTurn = 0;
                    function setupPieces(grid) {
                        grid[0][0] = { name: 'R', color: 'R' };
                        grid[0][7] = { name: 'R', color: 'R' };
                        grid[7][0] = { name: 'R', color: 'B' };
                        grid[7][7] = { name: 'R', color: 'B' };

                        grid[0][1] = { name: 'N', color: 'R' };
                        grid[0][6] = { name: 'N', color: 'R' };
                        grid[7][1] = { name: 'N', color: 'B' };
                        grid[7][6] = { name: 'N', color: 'B' };

                        grid[0][2] = { name: 'B', color: 'R' };
                        grid[0][5] = { name: 'B', color: 'R' };
                        grid[7][2] = { name: 'B', color: 'B' };
                        grid[7][5] = { name: 'B', color: 'B' };

                        grid[0][3] = { name: 'Q', color: 'R' };
                        grid[0][4] = { name: 'K', color: 'R' };
                        grid[7][3] = { name: 'Q', color: 'B' };
                        grid[7][4] = { name: 'K', color: 'B' };

                        for (var i = 0; i < 8; i++) {
                            grid[1][i] = { name: 'P', color: 'R' };
                        }
                        for (var i = 0; i < 8; i++) {
                            grid[6][i] = { name: 'P', color: 'B' };
                        }
                    }
                    function isValidMove(moves, i, j) {
                        for (var m = 0; m < moves.length; m++) {
                            if (moves[m].i == i && moves[m].j == j)
                                return true;
                        }
                        return false;
                    }
                    function showActiveMoves(piece, i, j) {
                        var moves = [];
                        switch (piece.name) {
                            case 'K':
                                moves.push({ i: i - 1, j: j });
                                moves.push({ i: i, j: j - 1 });
                                moves.push({ i: i + 1, j: j });
                                moves.push({ i: i, j: j + 1 });

                                moves.push({ i: i - 1, j: j - 1 });
                                moves.push({ i: i - 1, j: j + 1 });
                                moves.push({ i: i + 1, j: j + 1 });
                                moves.push({ i: i + 1, j: j - 1 });
                                break;
                            default:
                                if (piece.color === 'B') {
                                    if (i == 6)
                                        moves.push({ i: --i, j: j });
                                    --i;
                                } else {
                                    if (i == 1)
                                        moves.push({ i: ++i, j: j });
                                    ++i;
                                }
                                if (i >= 0 && j >= 0 && i < 8 && j < 8) {
                                    moves.push({ i: i, j: j });
                                }
                                break;
                        }
                        return moves;
                    }
                    sketch.setup = function () {
                        sketch.createCanvas(640, 640);
                        var k = 0;
                        for (var i = 0; i < 8; i++) {
                            var row = [];
                            for (var j = 0; j < 8; j++) {
                                if ((i % 2 == j % 2)) {
                                    row.push(null);
                                    sketch.fill(255, 255, 255, 100);
                                } else {
                                    row.push(null);
                                    sketch.fill(0, 0, 0, 100);
                                }
                                sketch.rect(80 * j, 80 * i, 80, 80);
                            }
                            grid.push(row);
                        }
                        setupPieces(grid);
                    };
                    sketch.draw = function () {
                        sketch.background(51);
                        sketch.fill(0, 0, 255, 100);
                        var k = 0;
                        if (activePiece != null) {
                            moves = showActiveMoves(activePiece, aI, aJ);
                        }
                        for (var i = 0; i < 8; i++) {
                            for (var j = 0; j < 8; j++) {
                                if ((i % 2 == j % 2)) {
                                    sketch.fill(255, 255, 255, 100);
                                } else {
                                    sketch.fill(0, 0, 0, 100);
                                }
                                if (activePiece != null && i == aI && j == aJ) {
                                    sketch.fill(0, 255, 255, 100);
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
                            }
                        }
                        if (activePiece != null && grid[i][j] == activePiece) {
                            activePiece = null;
                        } else {
                            activePiece = grid[i][j];
                        }
                        if (activePiece.color == 'B' && currentTurn % 2 == 1)
                            activePiece = null;
                        if (activePiece.color == 'R' && currentTurn % 2 == 0)
                            activePiece = null;
                        console.log('Piece Selected: ');
                        console.log(activePiece);
                        if (activePiece != null) {
                            aI = i;
                            aJ = j;
                            moves = showActiveMoves(activePiece, aI, aJ);
                        }
                        console.log('aI: ' + aI + ' aJ: ' + aJ);
                    };
                }
            }
        ]);
})();
