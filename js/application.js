(function() {

  window.onload = function() {
    init();
  }

  var init = function() {
    var canvas = document.getElementById('board');
    var xCenter = canvas.width / 2;
    var yCenter = canvas.height / 2;
    var ctx = canvas.getContext('2d');
    var myCircle = new Circle(xCenter, 0, 20.5, 'red', 4, 0);
    setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myCircle.move(0, canvas.width, canvas.height);
      myCircle.draw(ctx);
      console.log(myCircle.vy)
    }, 16);
  };

  var Circle = function(x, y, r, color, vx, vy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.vx = vx;
    this.vy = vy;
  };

  Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  };

  Circle.prototype.move = function(leftWallX, rightWallX, floorY) {
    if (this.x + this.r > rightWallX) {
      this.x = rightWallX - this.r;
      this.wallBounce();
    }
    if (this.x - this.r < leftWallX) {
      this.x = leftWallX + this.r;
      this.wallBounce();
    }
    if (this.y + this.r > floorY) {
      this.y = floorY - this.r;
      this.floorBounce();
    }
    if (this.y <= 0) {
      this.y = 0.1;
      this.floorBounce();
    }
    if (this.vy < 0) {
      this.vy = -Math.sqrt(this.y);
    }
    if (this.vy >= 0) {
      this.vy = Math.sqrt(this.y);
    }
    this.x += this.vx;
    this.y += this.vy;
  };

  Circle.prototype.wallBounce = function() {
    this.vx = -this.vx;
  };

  Circle.prototype.floorBounce = function() {
    this.vy = -this.vy;
  }

}).call(this);
