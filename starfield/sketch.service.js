angular
.module('app.starfield')
.factory('StarFeildSketch',  
['p5', '$window', 'Star', '$rootScope',
function(p5, $window, Star, $rootScope) {
  return function(sketch) {
    var stars = [];
    var speed;

    sketch.setup = function() {
        sketch.createCanvas($window.innerWidth, $window.innerHeight);
        for (var i = 0; i < 800; i++) {
            stars[i] = Star.newStar(sketch);
        }
    }

    sketch.draw = function() {
        speed = sketch.map(sketch.mouseX, 0, sketch.width, 0, 50);
        $rootScope.$broadcast('starfield:speed', speed);
        sketch.background(0);
        sketch.translate(sketch.width / 2, sketch.height / 2);
        for (var i = 0; i < stars.length; i++) {
            stars[i].update(speed);
            stars[i].show();
        }
    }

    sketch.keyPressed = function(keyEvent) {
        keyEvent.preventDefault();
    }
  } // return 
}]);