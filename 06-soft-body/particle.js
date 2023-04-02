class Particle extends VerletParticle2D {
  constructor(x, y, z) {
    super(x, y);
    this.r = 2;
    z = this.z;
    physics.addParticle(this);
  }

  show() {
    // fill(0);
    // translate(this.x, this.y, this.z);
    // sphere(this.r * 20);
    circle(this.x, this.y, this.r)
  }
}
