class Spring extends VerletSpring2D {
  constructor(a, b, strength) {
    let l = dist(a.x, a.y, b.x, b.y);
    super(a, b, l, strength);
    physics.addSpring(this);
  }

  show() {
    // stroke(255);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
