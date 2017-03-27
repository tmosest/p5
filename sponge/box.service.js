angular
.module('app.sponge')
.factory('Box',
[ 'p5', '$rootScope',
function(p5, $rootScope) {
    function Box(x, y, z, r, sketch) {
        this.sketch = sketch;
        this.pos = sketch.createVector(x, y, z);
        this.r = r;

        this.generate = function(sketch) {
            var boxes = [];
            for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                for (var z = -1; z < 2; z++) {
                var sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
                var newR = this.r / 3;
                if (sum > 1) {
                    var b = newBox(this.pos.x + x * newR*2, this.pos.y + y * newR*2, this.pos.z + z * newR*2, newR, this.sketch);
                    boxes.push(b);
                }
                }
            }
            }
            return boxes;
        }
        
        this.show = function() {
            sketch.push();
            sketch.translate(this.pos.x, this.pos.y, this.pos.z);
            sketch.stroke(255);
            sketch.noStroke();
            sketch.noFill();
            //fill(255);
            sketch.box(this.r);
            sketch.pop();
        }

    }

    function newBox(x, y, z, r, sketch) {
        return new Box(x, y, z, r, sketch);
    }
    return {
        newBox: newBox
    }
}]);