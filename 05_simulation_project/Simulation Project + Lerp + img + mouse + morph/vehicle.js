// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.history = [];
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {

    var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  show() {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + PI / 2;
    
    
    
    fill(127);
    stroke(255);
    strokeWeight(2);
    push();
    
    vPos = createVector(this.position.x, this.position.y);
    
    this.history.push(vPos);
    
    if (this.history.length > 3) {
      this.history.splice(0, 1);
    }
    
    
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i];
      // noFill();
      translate(pos.x, pos.y)
      fill(255,0,0);
      noStroke();
      sphere(10);
    }
    
    translate(this.position.x, this.position.y);
    // rotate(theta);
    // beginShape();
    // vertex(pointPos.x, pointPos.y);
    // // vertex(0, -this.r * 2);
    // // vertex(-this.r, this.r * 2);
    // // vertex(this.r, this.r * 2);
    // endShape(CLOSE);
    
    noStroke();
    fill(255,0,0);
    // sphere(10);
    pop();
  }
}