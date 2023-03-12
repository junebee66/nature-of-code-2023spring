var num = 2000;
var noiseScale=500, noiseStrength=1;
var particles = [num];
let cam;
let x = 0;
let y = 0;
let z = 1;
let img;

let tiles;
let tileSize;
let p;
let flower;
let flowerBg;

function preload(){
  // img = loadImage('flower.jpg');
  // img.resize(100, 100);
  flower = loadModel('flower-big.obj');
  flowerBg = loadImage('flower.jpg');
  // let m = flower.resize(5);
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  
  img = loadImage('flower.jpg');
  img.resize(100, 100);
      
  for (let i=0; i<num; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
    var loc = createVector(random(width*1.2), random(height), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5,2);
    // var speed = random(5,map(mouseX,0,width,5,20));   // faster
      

    particles[i]= new Particle(loc, dir, speed);
    
      
    }



      
      
  cam = createCamera(0,0,z);
  

  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}
function draw() {
  orbitControl(1,1, 0.001);
  background(0);

  push();
  // scale(330);
  texture(flowerBg);
  translate(mouseX,mouseY,-300)
  sphere(300)
  pop();
  
  translate(-width/2, -height/2);

    for (let i=0; i<particles.length; i++) {
    particles[i].move();
    particles[i].update();

    }
  
  //camera movement
  if (keyIsDown(LEFT_ARROW)) {
    x -= 0.5;
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    x += 0.5;
  }
  
  if (keyIsDown(UP_ARROW)) {
    y -= 0.5;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    y += 0.5;
  }
  
    if (key === 'w') {
    z -= 0.05;
  }
  
  if (key === 's') {
    z += 0.05;
  }
  

  cam.move(x, y, z);
  
  
  //texture(flower);
  //sphere(100);
}

class Particle{
  constructor(_loc,_dir,_speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
  }
  move(){
    // console.log("this is loc before eveything" + this.loc.x);
    let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d =1;
    
    let dis = dist(this.loc.x, this.loc.y, this.loc.z, mouseX, mouseY, z);
    if(dis <50){
    
     d =5;  //direction change 
    
    }else{
      d = 1;
    }
    
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
  }
  
  update(){
    
  
    
    // fill(this.col);
    // console.log(this.col);
  
    
    let dis = dist(this.loc.x, this.loc.y, this.loc.z, mouseX, mouseY, z);
    if(dis <50){
    fill(255);
    }else{
    fill(255,0,0);
    }
    
    //     let dis = dist(this.loc.x, this.loc.y, this.loc.z, mouseX, mouseY, z);
    // if(dis <50){
    // push();
    // fill(255,0,0)
    // model(flower);
    // pop();
    // }
    // else{
    //   ellipse(this.loc.x, this.loc.y, this.loc.z);
    // }
    
    // ellipse(this.loc.x, this.loc.y, this.loc.z);
    // translate(this.loc.x, this.loc.y, 0);
    // push();
    
    // scale(50);
    push();
    texture(flowerBg);
    translate(this.loc.x, this.loc.y, 0);
    pointLight(250, 250, 250, width/2, width/2, 50);
    model(flower);
    pop();
    
    // pop();
    
    // translate(this.loc.x, this.loc.y, this.loc.y);
    // sphere(5);
    
    
  }
}