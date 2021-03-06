(function () {
    'use strict';
    angular
        .module('app.paisho')
        .factory('Paisho',
        ['p5', '$rootScope',
            function (p5, $rootScope) {

                var jasmineImg;

                function preloadImages(sketch) {
                    jasmineImg = sketch.loadImage("paisho/WPSDarkJasmineTile.gif");
                }

                function drawJasmineTile(sketch, x, y, w, h) {
                    sketch.image(jasmineImg, x, y, w, h);
                }
                
                class Title {
                    constructor(name, image) {
                        this.name = name || 'j';
                        this.x = 0;
                        this.y = 0;
                        this.image = image || 'paisho/WPSDarkJasmineTile.gif';
                        this.r = 30;
                    }
                    getMoves() {
                    }
                };

                var grid = null;

                var canvasSize = 640;
                var boardRadius = 440;
                var center = canvasSize / 2;
                var dx = boardRadius / 18;

                function drawPaishoBoard(sketch) {
                    sketch.stroke(0, 0, 0);
                    if (grid == null)
                        constructGrid(sketch);
                    // Draw Circle
                    sketch.strokeWeight(0);
                    sketch.fill(255, 255, 0, 100);
                    sketch.ellipse(center, center, boardRadius, boardRadius);
                    // Draw Lines
                    sketch.strokeWeight(1);
                    sketch.fill(0, 0, 255, 100);
                    sketch.line(center, 0, center, canvasSize);
                    for (var i = 1; i <= 9; i++) {
                        sketch.line(center + i * dx, 0, center + i * dx, canvasSize);
                        sketch.line(center - i * dx, 0, center - i * dx, canvasSize);
                    }
                    sketch.line(0, center, canvasSize, center);
                    for (var i = 1; i <= 9; i++) {
                        sketch.line(0, center + i * dx, canvasSize, center + i * dx);
                        sketch.line(0, center - i * dx, canvasSize, center - i * dx);
                    }
                    // Colored Tiles
                    sketch.strokeWeight(0);
                    sketch.fill(255, 0, 0, 100);
                    // RED Corner Triangles
                    sketch.triangle(center, center - 7 * dx, center, center - 8 * dx, center - dx, center - 8 * dx);
                    sketch.triangle(center, center - 7 * dx, center, center - 8 * dx, center + dx, center - 8 * dx);
                    sketch.triangle(center - dx, center - 8 * dx, center - dx, center - 9 * dx, center - 2 * dx, center - 9 * dx);
                    sketch.triangle(center + dx, center - 8 * dx, center + dx, center - 9 * dx, center + 2 * dx, center - 9 * dx);

                    sketch.triangle(center, center + 7 * dx, center, center + 8 * dx, center - dx, center + 8 * dx);
                    sketch.triangle(center, center + 7 * dx, center, center + 8 * dx, center + dx, center + 8 * dx);
                    sketch.triangle(center - dx, center + 8 * dx, center - dx, center + 9 * dx, center - 2 * dx, center + 9 * dx);
                    sketch.triangle(center + dx, center + 8 * dx, center + dx, center + 9 * dx, center + 2 * dx, center + 9 * dx);

                    sketch.triangle(center + 7 * dx, center, center + 8 * dx, center, center + 8 * dx, center - dx);
                    sketch.triangle(center + 7 * dx, center, center + 8 * dx, center, center + 8 * dx, center + dx);
                    sketch.triangle(center + 8 * dx, center + dx, center + 9 * dx, center + dx, center + 9 * dx, center + 2 * dx);
                    sketch.triangle(center + 8 * dx, center - dx, center + 9 * dx, center - dx, center + 9 * dx, center - 2 * dx);

                    sketch.triangle(center - 7 * dx, center, center - 8 * dx, center, center - 8 * dx, center - dx);
                    sketch.triangle(center - 7 * dx, center, center - 8 * dx, center, center - 8 * dx, center + dx);
                    sketch.triangle(center - 8 * dx, center + dx, center - 9 * dx, center + dx, center - 9 * dx, center + 2 * dx);
                    sketch.triangle(center - 8 * dx, center - dx, center - 9 * dx, center - dx, center - 9 * dx, center - 2 * dx);

                    for (var i = -9; i < 9; i++) {
                        // Triangle Tiles
                        if (i < 0 && i > -8) {
                            var x1 = center - (-7 - i) * dx;
                            var y1 = center + (i + 1) * dx;
                            sketch.strokeWeight(0);
                            sketch.fill(255, 0, 0, 100);
                            sketch.triangle(x1, y1, x1 + dx, y1, x1, y1 - dx);
                            x1 = center - (-1 - i) * dx;
                            y1 = center + (i + 7) * dx;
                            sketch.triangle(x1, y1, x1 - dx, y1, x1, y1 + dx);
                            sketch.fill(255, 255, 255, 100);
                            x1 = center - (-1 - i) * dx;
                            y1 = center + (-7 - i) * dx;
                            sketch.triangle(x1, y1, x1 - dx, y1, x1, y1 - dx);
                            x1 = center - (-7 - i) * dx;
                            y1 = center + (-1 - i) * dx;
                            sketch.triangle(x1, y1, x1 + dx, y1, x1, y1 + dx);
                        }
                        if (i < 0 && i != -8 && i != -7) {
                            // TOP
                            sketch.strokeWeight(0);
                            sketch.fill(255, 0, 0, 100);
                            sketch.rect(center, center + i * dx, dx, dx);
                            if (i < -1) {
                                // LEFT 
                                sketch.rect(center + i * dx, center, dx, dx);
                                // TOP RIGHT
                                if (i > -6)
                                    sketch.rect(center + dx, center + i * dx, dx, dx);
                                if (i > -5)
                                    sketch.rect(center + 2 * dx, center + i * dx, dx, dx);
                                if (i > -4)
                                    sketch.rect(center + 3 * dx, center + i * dx, dx, dx);
                                if (i > -3)
                                    sketch.rect(center + 4 * dx, center + i * dx, dx, dx);
                            }
                            // TOP
                            if (i > -8) sketch.fill(255, 255, 255, 100);
                            sketch.rect(center - dx, center + i * dx, dx, dx);
                            if (i < -1) {
                                // LEFT
                                sketch.rect(center + i * dx, center - dx, dx, dx);
                                // TOP LEFT
                                if (i > -6)
                                    sketch.rect(center + i * dx, center - 2 * dx, dx, dx);
                                if (i > -5)
                                    sketch.rect(center + i * dx, center - 3 * dx, dx, dx);
                                if (i > -4)
                                    sketch.rect(center + i * dx, center - 4 * dx, dx, dx);
                                if (i > -3)
                                    sketch.rect(center + i * dx, center - 5 * dx, dx, dx);
                            }
                        }

                        if (i >= 0 && i != 6 && i != 7) {
                            // BOTTOM
                            sketch.strokeWeight(0);
                            sketch.fill(255, 0, 0, 100);
                            sketch.rect(center - dx, center + i * dx, dx, dx);
                            if (i > 0) {
                                // RIGHT
                                sketch.rect(center + i * dx, center - dx, dx, dx);
                                // BOTTOM LEFT
                                if (i < 5)
                                    sketch.rect(center - 2 * dx, center + i * dx, dx, dx);
                                if (i < 4)
                                    sketch.rect(center - 3 * dx, center + i * dx, dx, dx);
                                if (i < 3)
                                    sketch.rect(center - 4 * dx, center + i * dx, dx, dx);
                                if (i < 2)
                                    sketch.rect(center - 5 * dx, center + i * dx, dx, dx);
                            }
                            // BOTTOM
                            if (i < 6) sketch.fill(255, 255, 255, 100);
                            sketch.rect(center, center + i * dx, dx, dx);
                            if (i > 0) {
                                // RIGHT
                                sketch.rect(center + i * dx, center, dx, dx);
                                // BOTTOM RIGHT
                                if (i < 5)
                                    sketch.rect(center + dx, center + i * dx, dx, dx);
                                if (i < 4)
                                    sketch.rect(center + 2 * dx, center + i * dx, dx, dx);
                                if (i < 3)
                                    sketch.rect(center + 3 * dx, center + i * dx, dx, dx);
                                if (i < 2)
                                    sketch.rect(center + 4 * dx, center + i * dx, dx, dx);
                            }
                        }
                    }
                    for (var i = -9; i < 9; i++) {
                        var y = center + i * dx;
                        for (var j = -9; j < 9; j++) {
                            var x = center + j * dx;
                            var dist = sketch.dist(x, y, center, center);
                            if (dist < boardRadius / 2) {
                                //sketch.fill(0, 255, 0, 100);
                                //sketch.strokeWeight(2);
                                //sketch.point(x, y);
                            }
                        }
                    }
                    //sketch.textSize(50);
                    //sketch.text(count, 100, 100);
                }

                var playerArea1 = {
                    top: center + 9 * dx,
                    left: 0,
                    bottom: center - 9 * dx
                };

                var playerArea2 = {
                    top: 0,
                    left: 0,
                    bottom: center - 9 * dx
                };

                function drawPlayerAreas(sketch) {
                    sketch.fill(255, 255, 255, 100);
                    sketch.strokeWeight(3);
                    sketch.stroke(0, 0, 255);
                    sketch.rect(playerArea1.left, playerArea1.top, sketch.width, playerArea1.bottom);
                    sketch.stroke(255, 0, 0);
                    sketch.rect(playerArea2.left, playerArea2.top, sketch.width, playerArea2.bottom);
                }

                function constructGrid(sketch) {
                    grid = [];
                    for (var i = -9; i < 9; i++) {
                        var y = center + i * dx;
                        for (var j = -9; j < 9; j++) {
                            var x = center + j * dx;
                            var dist = sketch.dist(x, y, center, center);
                            if (dist < boardRadius / 2) {
                                grid.push({ i: i, j: j });
                            }
                        }
                    }
                }

                function getGrid(sketch) {
                    if (grid == null) {
                        constructGrid(sketch);
                    }
                    return grid;
                }

                function setGrid(g) {
                    grid = g;
                }

                var hand1 = [];
                var hand2 = [];

                function constructHands(sketch) {
                    hand1.push(new Title());
                    hand1.push(new Title());
                    hand1.push(new Title());
                    hand1.push(new Title());

                    hand2.push(new Title());
                    hand2.push(new Title());
                    hand2.push(new Title());
                    hand2.push(new Title());

                    for (var i = 0; i < hand1.length; i++) {
                        hand1[i].x = Math.random() * sketch.width + 250;
                        hand1[i].y = sketch.random(playerArea1.top, playerArea1.top + 3 * dx);
                        hand1[i].r = 30;
                    }
                    for (var i = 0; i < hand2.length; i++) {
                        hand2[i].x = Math.random() * sketch.width + 250;
                        hand2[i].y = sketch.random(playerArea2.top, playerArea2.bottom - 30);
                        hand2[i].r = 30;
                    }
                }

                function drawHands(sketch) {
                    for (var i = 0; i < hand1.length; i++) {
                        drawJasmineTile(sketch, hand1[i].x, hand1[i].y, hand1[i].r, hand1[i].r);

                    }
                    for (var i = 0; i < hand2.length; i++) {
                        drawJasmineTile(sketch, hand2[i].x, hand2[i].y, hand2[i].r, hand2[i].r);
                    }
                }

                function checkHands(sketch, s) {
                    var x = s.clientX;
                    var y = s.clientY;
                    for (var i = 0; i < hand1.length; i++) {
                        console.log(hand1[i].y);
                        if(sketch.dist(x,y - 45,hand1[i].x, hand1[i].y) <= hand1[i].r) {
                            hand1[i].r = 60;
                            console.log(hand1[i]);
                        } 
                        else hand1[i].r = 30;
                    }
                    for (var i = 0; i < hand2.length; i++) {
                        console.log(hand1[i].y);
                        if(sketch.dist(x,y - 45,hand2[i].x, hand2[i].y) <= hand2[i].r) {
                            hand2[i].r = 60;
                            console.log(hand2[i]);
                        } 
                        else hand2[i].r = 30;
                    }
                }

                function getHand1() {
                    return hand1;
                }

                function getHand2() {
                    return hand2;
                }

                function setHand1(h) {
                    hand1 = h;
                }

                function setHand2() {
                    hand1 = h;
                }

                return {
                    preloadImages: preloadImages,
                    constructHands: constructHands,
                    drawPaishoBoard: drawPaishoBoard,
                    drawPlayerAreas: drawPlayerAreas,
                    drawHands: drawHands,
                    checkHands: checkHands,
                    getGrid: getGrid,
                    setGrid: setGrid,
                    getHand1: getHand1,
                    getHand2: getHand2,
                    setHand1: setHand1,
                    setHand2: setHand2
                };
            }
        ]);
})();