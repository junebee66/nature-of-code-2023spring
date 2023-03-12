function mouseClicked(){

  movers.push(new Mover(random(1,4),mouseX, mouseY));
}


let Mover = function(m, x, y) {
  this.mass = m;
  this.position = createVector(x, y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  this.applyForce = function(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  };
    
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function() {
    noStroke();
    fill(255,0,0);
    push();
    translate(this.position.x, this.position.y);
    sphere(m*50)
    // quad(m*50);
    pop();
    // ellipse(this.position.x, this.position.y, m*10, m*10);
    // ellipse(x, y, w, [h])
  };

  this.checkEdges = function() {
    if (this.position.x > planeX) {
      this.position.x = planeX;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > planeY) {
      this.velocity.y *= -1;
      this.position.y = planeY;
    }
  };

};
  