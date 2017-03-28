(function () {
    'use strict';
    angular
        .module('app.chess')
        .factory('Chess',
        ['p5', '$rootScope',
            function (p5, $rootScope) {
                var grid, i, j;
                /** 
                 * Piece Class 
                 */
                class Piece {
                    constructor(name, color) {
                        this.name = name || 'P';
                        this.color = color || 'B';
                    }
                    getMoves() {
                        var moves = [];
                        if (this.color === 'B') {
                            if (i == 6)
                                if (grid[i - 2][j] == null)
                                    moves.push({ i: i - 2, j: j });
                            --i;
                            if (j - 1 > -1) {
                                if (grid[i][j - 1] != null && grid[i][j - 1].color != this.color)
                                    moves.push({ i: i, j: j - 1 });
                            }
                            if (j + 1 < 8) {
                                if (grid[i][j + 1] != null && grid[i][j + 1].color != this.color)
                                    moves.push({ i: i, j: j + 1 });
                            }
                        } else {
                            if (i == 1)
                                if (grid[i + 2][j] == null)
                                    moves.push({ i: i + 2, j: j });
                            ++i;
                            if (j - 1 > -1) {
                                if (grid[i][j - 1] != null && grid[i][j - 1].color != this.color)
                                    moves.push({ i: i, j: j - 1 });
                            }
                            if (j + 1 < 8) {
                                if (grid[i][j + 1] != null && grid[i][j + 1].color != this.color)
                                    moves.push({ i: i, j: j + 1 });
                            }
                        }
                        if (i >= 0 && j >= 0 && i < 8 && j < 8) {
                            if (grid[i][j] == null)
                                moves.push({ i: i, j: j });
                        }
                        return moves;
                    }
                }
                /** 
                 * King Class 
                 */
                class King extends Piece {
                    constructor(color) {
                        super('K', color);
                    }
                    getMoves() {
                        var moves = [];
                        if (i - 1 > -1 && -1 < j && j < 8) {
                            if (grid[i - 1][j] == null ||
                                grid[i - 1][j].color != this.color)
                                moves.push({ i: i - 1, j: j });
                            if (j - 1 > -1 && -1 < i && i < 8) {
                                if (grid[i - 1][j - 1] == null ||
                                    grid[i - 1][j - 1].color != this.color)
                                    moves.push({ i: i - 1, j: j - 1 });
                            }
                            if (j + 1 < 8 && -1 < i && i < 8) {
                                if (grid[i - 1][j + 1] == null ||
                                    grid[i - 1][j + 1].color != this.color)
                                    moves.push({ i: i - 1, j: j + 1 });
                            }
                        }
                        if (j - 1 > -1 && -1 < i && i < 8) {
                            if (grid[i][j - 1] == null ||
                                grid[i][j - 1].color != this.color)
                                moves.push({ i: i, j: j - 1 });
                            if (i + 1 < 8 && -1 < j && j < 8) {
                                if (grid[i + 1][j - 1] == null ||
                                    grid[i + 1][j - 1].color != this.color)
                                    moves.push({ i: i + 1, j: j - 1 });
                            }
                        }
                        if (i + 1 < 8 && -1 < j && j < 8) {
                            if (grid[i + 1][j] == null ||
                                grid[i + 1][j].color != this.color)
                                moves.push({ i: i + 1, j: j });
                            if (j + 1 < 8 && -1 < i && i < 8) {
                                if (grid[i + 1][j + 1] == null ||
                                    grid[i + 1][j + 1].color != this.color)
                                    moves.push({ i: i + 1, j: j + 1 });
                            }
                        }
                        if (j + 1 < 8 && -1 < i && i < 8) {
                            if (grid[i][j + 1] == null ||
                                grid[i][j + 1].color != this.color)
                                moves.push({ i: i, j: j + 1 });
                        }
                        return moves;
                    }
                }
                /** 
                 * Knight Class 
                 */
                class Knight extends Piece {
                    constructor(color) {
                        super('N', color);
                    }
                    getMoves() {
                        var moves = [];
                        if (i - 2 > -1 && -1 < j + 1 && j + 1 < 8) {
                            if (grid[i - 2][j + 1] == null ||
                                grid[i - 2][j + 1].color != this.color)
                                moves.push({ i: i - 2, j: j + 1 });
                        }
                        if (i + 2 < 8 && -1 < j + 1 && j + 1 < 8) {
                            if (grid[i + 2][j + 1] == null ||
                                grid[i + 2][j + 1].color != this.color)
                                moves.push({ i: i + 2, j: j + 1 });
                        }
                        if (i + 2 < 8 && -1 < j - 1 && j - 1 < 8) {
                            if (grid[i + 2][j - 1] == null ||
                                grid[i + 2][j - 1].color != this.color)
                                moves.push({ i: i + 2, j: j - 1 });
                        }
                        if (i - 2 > -1 && -1 < j - 1 && j - 1 < 8) {
                            if (grid[i - 2][j - 1] == null ||
                                grid[i - 2][j - 1].color != this.color)
                                moves.push({ i: i - 2, j: j - 1 });
                        }

                        if (i - 1 > -1 && -1 < j + 2 && j + 2 < 8) {
                            if (grid[i - 1][j + 2] == null ||
                                grid[i - 1][j + 2].color != this.color)
                                moves.push({ i: i - 1, j: j + 2 });
                        }
                        if (i + 1 < 8 && -1 < j + 2 && j + 2 < 8) {
                            if (grid[i + 1][j + 2] == null ||
                                grid[i + 1][j + 2].color != this.color)
                                moves.push({ i: i + 1, j: j + 2 });
                        }
                        if (i - 1 > -1 && -1 < j - 2 && j - 2 < 8) {
                            if (grid[i - 1][j - 2] == null ||
                                grid[i - 1][j - 2].color != this.color)
                                moves.push({ i: i - 1, j: j - 2 });
                        }
                        if (i + 1 < 8 && -1 < j - 2 && j - 2 < 8) {
                            if (grid[i + 1][j - 2] == null ||
                                grid[i + 1][j - 2].color != this.color)
                                moves.push({ i: i + 1, j: j - 2 });
                        }
                        return moves;
                    }
                }
                /** 
                 * Rook Class 
                 */
                class Rook extends Piece {
                    constructor(color) {
                        super('R', color);
                    }
                    getMoves() {
                        var moves = [];
                        var c = i;
                        var d = j;
                        while (c - 1 > -1) {
                            c--;
                            if (c < 8 && -1 < j && j < 8) {
                                if (grid[c][j] == null ||
                                    grid[c][j].color != this.color)
                                    moves.push({ i: c, j: j });
                                if (grid[c][i] != null)
                                    break;
                            }
                        }
                        c = i;
                        while (c + 1 < 8) {
                            c++;
                            if (c > -1 && -1 < j && j < 8) {
                                if (grid[c][j] == null ||
                                    grid[c][j].color != this.color)
                                    moves.push({ i: c, j: j });
                                if (grid[c][j] != null)
                                    break;
                            }
                        }
                        c = i;
                        while (d + 1 < 8) {
                            d++;
                            if (d > -1 && -1 < i && i < 8) {
                                if (grid[i][d] == null ||
                                    grid[i][d].color != this.color)
                                    moves.push({ i: i, j: d });
                                if (grid[i][d] != null)
                                    break;
                            }
                        }
                        d = j;
                        while (d - 1 > -1) {
                            d--;
                            if (d < 8 && -1 < i && i < 8) {
                                if (grid[i][d] == null ||
                                    grid[i][d].color != this.color)
                                    moves.push({ i: i, j: d });
                                if (grid[i][d] != null)
                                    break;
                            }
                        }
                        d = j;
                        return moves;
                    }
                }
                /** 
                 * Bishop Class 
                 */
                class Bishop extends Piece {
                    constructor(color) {
                        super('B', color);
                    }
                    getMoves() {
                        var moves = [];
                        var c = i;
                        var d = j;
                        while (c > 0 && d > 0) {
                            c--;
                            d--;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c < 7 && d < 7) {
                            c++;
                            d++;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c < 7 && d > 0) {
                            c++;
                            d--;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c > 0 && d < 7) {
                            c--;
                            d++;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        return moves;
                    }
                }
                /** 
                 * Queen Class 
                 */
                class Queen extends Piece {
                    constructor(color) {
                        super('Q', color);
                    }
                    getMoves() {
                        var moves = [];
                        var c = i;
                        var d = j;
                        while (c > 0 && d > 0) {
                            c--;
                            d--;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c < 7 && d < 7) {
                            c++;
                            d++;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c < 7 && d > 0) {
                            c++;
                            d--;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c > 0 && d < 7) {
                            c--;
                            d++;
                            if (c < 8 && -1 < d && d < 8) {
                                if (grid[c][d] == null ||
                                    grid[c][d].color != this.color)
                                    moves.push({ i: c, j: d });
                                if (grid[c][d] != null)
                                    break;
                            }
                        }
                        c = i;
                        d = j;
                        while (c - 1 > -1) {
                            c--;
                            if (c < 8 && -1 < j && j < 8) {
                                if (grid[c][j] == null ||
                                    grid[c][j].color != this.color)
                                    moves.push({ i: c, j: j });
                                if (grid[c][i] != null)
                                    break;
                            }
                        }
                        c = i;
                        while (c + 1 < 8) {
                            c++;
                            if (c > -1 && -1 < j && j < 8) {
                                if (grid[c][j] == null ||
                                    grid[c][j].color != this.color)
                                    moves.push({ i: c, j: j });
                                if (grid[c][j] != null)
                                    break;
                            }
                        }
                        c = i;
                        while (d + 1 < 8) {
                            d++;
                            if (d > -1 && -1 < i && i < 8) {
                                if (grid[i][d] == null ||
                                    grid[i][d].color != this.color)
                                    moves.push({ i: i, j: d });
                                if (grid[i][d] != null)
                                    break;
                            }
                        }
                        d = j;
                        while (d - 1 > -1) {
                            d--;
                            if (d < 8 && -1 < i && i < 8) {
                                if (grid[i][d] == null ||
                                    grid[i][d].color != this.color)
                                    moves.push({ i: i, j: d });
                                if (grid[i][d] != null)
                                    break;
                            }
                        }
                        d = j;
                        return moves;
                    }
                }

                function createNewBoard(sketch) {
                    grid = [];
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
                    grid[0][0] = new Rook('R'); //{ name: 'R', color: 'R' };
                    grid[0][7] = new Rook('R'); //{ name: 'R', color: 'R' };
                    grid[7][0] = new Rook('B'); //{ name: 'R', color: 'B' };
                    grid[7][7] = new Rook('B'); //{ name: 'R', color: 'B' };
                    
                    grid[0][1] = new Knight('R'); //{ name: 'N', color: 'R' };
                    grid[0][6] = new Knight('R'); //{ name: 'N', color: 'R' };
                    grid[7][1] = new Knight('B'); //{ name: 'N', color: 'B' };
                    grid[7][6] = new Knight('B'); //{ name: 'N', color: 'B' };
                    
                    grid[0][2] = new Bishop('R');//{ name: 'B', color: 'R' };
                    grid[0][5] = new Bishop('R');//{ name: 'B', color: 'R' };
                    grid[7][2] = new Bishop('B');//{ name: 'B', color: 'B' };
                    grid[7][5] = new Bishop('B');//{ name: 'B', color: 'B' };
                    
                    grid[0][3] = new Queen('R'); //{ name: 'Q', color: 'R' };
                    grid[0][4] = new King('R'); //{ name: 'K', color: 'R' };
                    grid[7][3] = new Queen('B'); //{ name: 'Q', color: 'B' };
                    grid[7][4] = new King('B'); //{ name: 'K', color: 'B' };

                    for (var i = 0; i < 8; i++) {
                        grid[1][i] = new Piece('P', 'R');//{ name: 'P', color: 'R' };
                    }
                    for (var i = 0; i < 8; i++) {
                        grid[6][i] = new Piece('P', 'B');//{ name: 'P', color: 'B' };
                    }
                    return grid;
                }
                function setGrid(g) {
                    grid = g;
                }
                function getGrid() {
                    return grid;
                }
                function setPos(x, y) {
                    i = x;
                    j = y;
                }
                return {
                    createNewBoard: createNewBoard,
                    setGrid: setGrid,
                    getGrid: getGrid,
                    setPos: setPos
                };
            }
        ]);
})();
