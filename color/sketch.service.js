(function () {
    'use strict';
    angular
        .module('app.color')
        .factory('ColorSketch', ColorSketch);

    ColorSketch.$inject = [
        'p5', '$window', 'Color', '$rootScope', '$firebaseObject'
    ];

    function ColorSketch(p5, $window, Color, $rootScope, $firebaseObject) {
        var ref = firebase.database().ref().child("color");
        var syncObject = $firebaseObject(ref);
        //syncObject.$bindTo($rootScope, "color");
        $rootScope.color = {};
        //Function to convert hex format to a rgb color
        function rgb2hex(rgb) {
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
        }
        var hex;
        return function (sketch) {
            var rSlider, gSlider, bSlider;

            sketch.setup = function () {
                // create canvas
                sketch.createCanvas(710, 400);
                sketch.textSize(15);
                sketch.noStroke();

                // create sliders
                rSlider = sketch.createSlider(0, 255, 100);
                rSlider.position(20, 20);
                gSlider = sketch.createSlider(0, 255, 0);
                gSlider.position(20, 50);
                bSlider = sketch.createSlider(0, 255, 255);
                bSlider.position(20, 80);
            };
            sketch.draw = function () {
                var r = rSlider.value();
                var g = gSlider.value();
                var b = bSlider.value();
                if ($rootScope.color == null) {
                    $rootScope.color = {
                        r: 0,
                        g: 0,
                        b: 0
                    }
                }
        
                $rootScope.color.r = r;
                $rootScope.color.g = g;
                $rootScope.color.b = b;

                $rootScope.$broadcast('color:change', $rootScope.color);

                sketch.background(r, g, b);
                sketch.fill(Math.abs(255 - r), Math.abs(255 - g), Math.abs(255 - b));
                sketch.text("red: " + r, rSlider.x * 2 + rSlider.width, 35);
                sketch.text("green: " + g, gSlider.x * 2 + gSlider.width, 65);
                sketch.text("blue: " + b, bSlider.x * 2 + bSlider.width, 95);

                var rgb = 'rgba(' + r + ', ' + g + ', ' + b + ', 1)';
                hex = rgb2hex(rgb);
                sketch.text(hex, bSlider.x * 2 + bSlider.width, 125);
            }
            sketch.mousePressed = function (s) {
                console.log(s);
            }
        }
    }

})();