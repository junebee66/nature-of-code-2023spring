class Particle {
  constructor(position, lifespan) {
    this.pos = position.copy();
    this.vel = createVector(0, 0, 0);
    this.acc = createVector(0, 0, 0);
    this.isImmortal = lifespan < 0;
    this.lifespan = lifespan;
    this.groundplane = 100; // level of ground below object at 0,0
    this.size = 2;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    let drag = 0.99; // to home
    this.vel.add(this.acc);
    this.vel.mult(drag);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan--;
  }

  display() {
    push();
    stroke(255);
    normalMaterial();
    translate(this.pos.x, this.pos.y, this.pos.z);
    // this.size = slider.value();
    sphere(pointSize.value());
    pop();
  }

  isDead() {
    return this.lifespan <= 0 && !this.isImmortal;
  }

  applyForce(force) {
    this.acc.add(force);
  }
}

class PointCloudParticle extends Particle {
  constructor(position, locM, dirM, speedM) {
    super(position, -1);
    this.home = position.copy();
    this.maxSpeed = random(5, 15);
    this.maxForce = random(1, 6);
    this.goingHome = false;
    this.img = img;
    this.loc = locM;
    this.dir = dirM;
    this.speed = speedM;
  }

  update() {
    super.update();
    this.checkEdges();

    if (this.goingHome) {
      this.steerHome();
    }
  }

  steerHome() {
    // from https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_59_Steering_Text_Paths/vehicle.js
    let desired = p5.Vector.sub(this.home, this.pos);

    let d = desired.mag();
    if (d < 0.1) {
      // if we're close enough to home, stop going there
      this.goingHome = false;
    }
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  checkEdges() {
    if (this.pos.y >= this.groundplane) {
      this.pos.y = this.groundplane;
      this.vel.mult(-0.9);
    }
  }

  display() {
    push();

    randomSmall = randomRange.value();

    var noiseScale = 500,
      noiseStrength = 1;
    let angle =
      noise(
        this.loc.x / noiseScale,
        this.loc.y / noiseScale,
        frameCount / noiseScale
      ) *
      TWO_PI *
      noiseStrength; //0-2PI
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d = 1;

    let dis = dist(this.loc.x, this.loc.y, this.loc.z, mouseX, mouseY, 1);
    if (dis < 50) {
      d = 5; //direction change
    } else {
      d = 1;
    }

    vel.mult(this.speed * d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel

    // expand = cloudSize.value()
    // translate(this.pos.x*cloudSize.value() + (loc.x/randomSmall), this.pos.y*cloudSize.value()+ (loc.y/randomSmall), this.pos.z*cloudSize.value()+ (loc.z/randomSmall));

    let lerpX = lerp(this.loc.x, 0, homeSlider.value());
    let lerpY = lerp(this.loc.y, 0, homeSlider.value());
    let lerpZ = lerp(this.loc.z, 0, homeSlider.value());

    translate(
      this.pos.x * cloudSize.value() + lerpX,
      this.pos.y * cloudSize.value() + lerpY,
      this.pos.z * cloudSize.value() + lerpZ
    );

    // translate(this.pos.x*cloudSize.value() +this.loc.x, this.pos.y*cloudSize.value() + this.loc.y, this.pos.z*cloudSize.value() + this.loc.x);

    // translate(this.pos.x, this.pos.y, this.pos.z);
    fill(255, 255, 0);
    sphere(this.size);
    pop();

    // fill(0, 0, 0, 0); ////the texture use transparency
    // texture(this.img);
    //ambientMaterial(255, 0, 0);
    // plane(20, 20);
  }
}
