(function() {

  window.onload = function() {
    init();
  }

  var init = function() {
    var canvas = document.getElementById('board');
    var xCenter = canvas.width / 2;
    var yCenter = canvas.height / 2;
    var ctx = canvas.getContext('2d');
    var myCircle = new Circle(xCenter, 0, canvas.height/20, 'red', 4, 0);
    document.getElementById('speed').onchange = function() {
      if (myCircle.vx < 0) {
        myCircle.vx = -document.getElementById('speed').value;
      }
      if (myCircle.vx >= 0) {
        myCircle.vx = document.getElementById('speed').value;
      }
    }
    setInterval(function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      myCircle.move(0, canvas.width, canvas.height, 0, document.getElementById('gravity').value / 10);
      myCircle.draw(ctx);
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

  Circle.prototype.move = function(leftWallX, rightWallX, floorY, ceilY, g) {
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
    if (this.y - this.r <= ceilY) {
      this.y = ceilY + this.r;
      this.floorBounce();
    }

    if (this.vy < 0) {
      this.vy = -Math.sqrt((this.y - this.r) * g);
    }
    if (this.vy >= 0) {
      this.vy = Math.sqrt((this.y - this.r + 0.001) * g);
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
