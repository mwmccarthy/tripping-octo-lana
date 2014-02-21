(function() {

  window.onload = function() {
    init();
  }
  
  var shapeArray = [];

  var init = function() {
    var canvas = document.getElementById('board');
    var xCenter = canvas.width / 2;
    var yCenter = canvas.height / 2;
    var ctx = canvas.getContext('2d');
    var myCircle = new Circle(xCenter, yCenter, 20.5, 'red');
    shapeArray.push(myCircle);
    canvas.onclick = function() {
      shapeArray[0].move(10,10);
    };
    setInterval(function() {render(ctx)}, 32);
  };
  
  var render = function(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (i in shapeArray) {
      shapeArray[i].draw(ctx);
    }
  };

  var Circle = function(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  };

  Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };
  
  Circle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
  }
  
}).call(this);
