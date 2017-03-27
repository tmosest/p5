//SpongBoxSketch
angular
.module('app.sponge')
.factory('SpongBoxSketch',  
['p5', '$window', 'Box', '$rootScope',
function(p5, $window, Box, $rootScope) {
  return function(sketch) {
    var a = 0;
    var sponge = [];

    sketch.setup = function() {
      sketch.createCanvas($window.innerWidth, $window.innerHeight, sketch.WEBGL);
      sponge = []
      var b = Box.newBox(0, 0, 0, 200, sketch);
      sponge.push(b);
    };

    sketch.mousePressed = function(sketch) {
      // Generate the next set of boxes
      var next = [];
      for (var i = 0; i < sponge.length; i++) {
        var b = sponge[i];
        //console.log(i);
        var newBoxes = b.generate();
        $rootScope.$broadcast('sponge:do');
        //console.log(newBoxes);
        next = next.concat(newBoxes);
      }
      sponge = next;
    };

    sketch.draw = function() {
      sketch.background(51);
      sketch.rotateX(a);
      sketch.rotateY(a * 0.4);
      sketch.rotateZ(a * 0.1);
      // Show what you've got!
      for (var i = 0; i < sponge.length; i++) {
        sponge[i].show();
      }
      a += 0.01;
    };
  }
}]);