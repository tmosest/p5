angular
.module('app.snake.game')
.factory('snakeSketch',  
['p5', '$window', 'Snake',
function(p5, $window, Snake) {
  return function(sketch) {
    var s;
    var scl = 20;
    var food;

    sketch.setup = function() {
      sketch.createCanvas($window.innerWidth, $window.innerHeight);
      Snake.activate(sketch);
      sketch.frameRate(10);
      sketch.pickLocation();
    };

    sketch.pickLocation = function() {
        var cols = Math.floor(sketch.width/scl);
        var rows = Math.floor(sketch.height/scl);
        food = new p5.Vector(
            Math.floor(Math.random() * cols), 
            Math.floor(Math.random() * rows)
        );
        food.mult(scl);
    }

    sketch.draw = function() {
        sketch.background(51);

        if (Snake.eat(food)) {
            sketch.pickLocation();
        }
        Snake.death();
        Snake.update(scl);
        Snake.show(scl);

        sketch.fill(255, 0, 100);
        sketch.rect(food.x, food.y, scl, scl);
    };

    sketch.keyPressed = function(keyEvent) {
        keyEvent.preventDefault();
        if(Snake.getIsActive() === true) {
            var keyCode = sketch.keyCode
            if (keyCode === sketch.UP_ARROW) {
                Snake.dir(0, -1);
            } else if (keyCode === sketch.DOWN_ARROW) {
                Snake.dir(0, 1);
            } else if (keyCode === sketch.RIGHT_ARROW) {
                Snake.dir(1, 0);
            } else if (keyCode === sketch.LEFT_ARROW) {
                Snake.dir(-1, 0);
            }
        }
    }
  };
}]);