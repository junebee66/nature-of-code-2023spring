let myShader;
let noisePic;
var easycam;
let t =1;

//sphere
let r = 0;
let density;
let zIndex = [];
let cam;

const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect } = toxi.geom;

let physics;

let particles = [];
let particles1 = [];
let springs = [];
let springs1 = [];


function preload() {
  myShader = loadShader("shader.vert", "shader.frag");

  noisePic = loadImage("colorful.png");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  pixelDensity(5);
  
  
  //sphere
  angleMode(DEGREES);
  r = width/2;
  
  physics = new VerletPhysics2D();
  
      let gravity = new GravityBehavior (new Vec2D(0,-0.01));
  physics.addBehavior(gravity);
  
  let bounds = new Rect(0, 0, width, height/2);
  physics.setWorldBounds(bounds);

//   particles.push(new Particle(200, 100, 100));
//   particles.push(new Particle(400, 100, 200));
//   particles.push(new Particle(350, 200, 500));
//   particles.push(new Particle(400, 300, 600));
//   particles.push(new Particle(200, 300, 700));
//   particles.push(new Particle(250, 200, 800));
//   particles.push(new Particle(200, 300, 200));
//   particles.push(new Particle(250, 200, 100));
//   particles.push(new Particle(300, 300, 100));

  // for(let phi = 0; phi < 180; phi += 360/24){
  // for(let theta = 0; theta < 360; theta += 360/24){
  //   let x = r * cos(phi);
  //   let y = r * sin(phi) * sin(theta);
  //   let z = r * sin(phi) * cos(theta);
  //   // vertex(x, y, z);
  //   particles.push(new Particle(x,y,z));
  //   } 
  // }
  
  for(let phi = 0; phi < 90; phi += 360/24){
    beginShape();
    for(let theta = 0; theta < 180; theta += 360/24){
      let x = r * cos(phi);
      let y = r * sin(phi) * sin(theta);
      let z = r * sin(phi) * cos(theta);
      // vertex(x, y, z);
      particles.push(new Particle(x,y));
      zIndex.push(z);
    }
    endShape(CLOSE);
  }
   
  for ( let i = 0; i<71; i++){
  springs.push(new Spring(particles[i], particles[i+1], 0.001));
  }

}

function draw() {
  background(0);
  
  orbitControl();
  strokeWeight(1);
  shader(myShader);

  // Send the frameCount to the shader
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", noisePic);
  
  physics.update();
  
  // sphere(200, 200, 200);
  
  // rotateY(frameCount/10);
  rotateZ(65);
  
//   for(let phi = 0; phi < 180; phi += 360/24){
//     beginShape();
//     for(let theta = 0; theta < 360; theta += 360/24){
//       let x = r * cos(phi);
//       let y = r * sin(phi) * sin(theta);
//       let z = r * sin(phi) * cos(theta);
//       vertex(x, y, z);
//       // particles.push(new Particle(x,y,z));
//     }
//     endShape(CLOSE);
//   }
  
  // rotateZ(65);
  // for(let phi = 0; phi < 180; phi += 360/24){
  //   beginShape();
  //   for(let theta = 0; theta < 360; theta += 360/24){
  //     let x = r * cos(phi);
  //     let y = r * sin(phi) * sin(theta);
  //     let z = r * sin(phi) * cos(theta);
  //     vertex(x, y, z);
  //     // particles.push(new Particle(x,y,z));
  //   }
  //   endShape(CLOSE);
  // }
  
    // let numVertices = 100;
    // translate(0,numVertices,0);
    // rotateY(millis()/1000);
    // scale(20);
    // beginShape();
    // // a simple spiral shape
    // for(let i = 0; i < numVertices; i++) {
    //   vertex(
    //     sin((i/numVertices*TWO_PI)*5)*sin(i/numVertices*PI)*2,
    //     -i/10, 
    //     cos((i/numVertices*TWO_PI)*5)*sin(i/numVertices*PI)*2,
    //   );
    // }
    // endShape();
  
  
  // for(let phi = 0; phi < 180; phi += 360/24){
  //   beginShape();
  //   for(let theta = 0; theta < 360; theta += 360/24){
  //     let x = r * cos(phi);
  //     let y = r * sin(phi) * sin(theta);
  //     let z = r * sin(phi) * cos(theta);
  //     // vertex(x, y, z);
  //     for (let particle of particles) {
  //     vertex(particle.x, particle.y, z);
  // }  
  //     // particles.push(new Particle(x,y,z));
  //   }
  //   endShape(CLOSE);
  // }
  
  // rotateX(frameCount);
  // rotateY(frameCount);
  beginShape();
  for (i = 0; i<zIndex.length; i++){
  for (let particle of particles) {
    // translate(0,0, particle.z);
    vertex(particle.x, particle.y, zIndex[i]);
    // vertex(
    //   sin((i/100*TWO_PI)*5)*sin(i/100*PI)*2,
    //   -i/10, 
    //   cos((i/100*TWO_PI)*5)*sin(i/100*PI)*2
    // );
    // vertex(particle.x + random(100), particle.y + random(frameCount), random(10));
      }
  }  
  endShape(CLOSE);
  
  
  // rotateY(frameCount);
  rotateX(180);
  // rotateY(frameCount);
  beginShape();
  for (i = 0; i<zIndex.length; i++){
  for (let particle of particles) {
    // translate(0,0, particle.z);
    vertex(particle.x, particle.y, zIndex[i]);
    // vertex(
    //   sin((i/100*TWO_PI)*5)*sin(i/100*PI)*2,
    //   -i/10, 
    //   cos((i/100*TWO_PI)*5)*sin(i/100*PI)*2
    // );
    // vertex(particle.x + random(100), particle.y + random(frameCount), random(10));
      }
  }  
  endShape(CLOSE);


  
  // for (let particle of particles) {
  //   particle.show();
  // }
  
  strokeWeight(1);
  stroke(255);
  // for (let spring of springs) {
  //   spring.show();
  // }

  // beginShape(TRIANGLE_STRIP);
  //   vertex(30, 75, 40);
  //   vertex(40, 20, 540);
  //   vertex(50, 75, 240);
  //   vertex(60, 20, 40);
  //   vertex(70, 75, 140);
  //   vertex(80, 20, 140);
  //   vertex(90, 75, 40);
  //   vertex(160, 20, 40);
  //   vertex(170, 75, 140);
  //   vertex(180, 20, 140);
  // endShape();
  
  
  
  if (mouseIsPressed) {
    particles[0].lock();
    particles[0].x = mouseX;
    particles[0].y = mouseY;
    particles[0].z = mouseX;
    particles[0].unlock();
    
    // particles1[0].lock();
    // particles1[0].x = mouseX;
    // particles1[0].y = mouseY;
    // particles1[0].unlock();
    
  }
  
}
