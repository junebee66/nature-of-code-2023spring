// var movers = [];

// function setup() {
//   createCanvas(640, 600);
  

//   movers[0] = new Mover(1,30,40);
  
// }

function mouseClicked(){

  movers.push(new Mover(random(1,4),mouseX, mouseY));
}

// function draw() {
//   background(255);
  
//   for (var i = 0; i < movers.length; i++) {
//     var wind = createVector(0.01, 0);
//     var gravity = createVector(0, 0.1*movers[i].mass);

//     var c = 0.03;
    
    
//     var friction = movers[i].velocity.copy();
//     friction.mult(-1);
//     friction.normalize();
//     friction.mult(c);


//     movers[i].applyForce(friction);
//     movers[i].applyForce(wind);
//     movers[i].applyForce(gravity);
//     movers[i].update();
//     movers[i].display();
//     movers[i].checkEdges();
//   }
// }

var Mover = function(m, x, y) {
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
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  };

};
  