let movers = [];
let stickImg;
let scl = 80;

function preload(){
  // stickImg = loadImage('stick.gif');
}


function make2DArray(rows, cols) {
  var arr = new Array(rows); //like arr[]; but with number of columns hardcoded
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

let angle = 0;
let w = 120;
let cols;
let rows;
let curves;

function setup() {
  // background(255);
  createCanvas(windowWidth, windowHeight, WEBGL);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  curves = make2DArray(rows,cols);
  // stickImg = loadImage('stick.gif');
  stickImg = loadImage('sky.png');

  


  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }
  
  
  movers[0] = new Mover(1,30,40);
}

function draw() {
  background(0);
  orbitControl();
  translate(-width/2, -height/2, -width/2);
  
  
  //wave
  
push();
  // noStroke();
 fill(255);
  strokeWeight(0.5);
  rotateX(PI/2);
  rotateZ(PI/2);
  
  directionalLight(mouseY,255,255,-1,1,0);
  directionalLight(0,0,255,1,1,0);
  
  
  
  let speed = frameCount/20;
  let amp = 0.5;
  let max = scl*8;
  noStroke();
 
//   rotateX(frameCount/30);
//   rotateY(frameCount/30);
  translate(0,0,-700);
  for(x=-max; x< max; x+=2.5*scl){
    for(y=-max; y< max; y+=2.5*scl){
      push();
      translate(x,y);
      let xoff = map(x, 0, scl*15, -PI, PI);
      let yoff = map(y, 0, scl*15, -PI, PI);
      rotateX(sin(speed + xoff)*amp);
      rotateY(cos(speed + yoff)*amp);
      // qaud(scl);
      // plane(scl,scl,scl*5);
      plane(100);
      pop();
    }
  }
  
  pop();
  
  
  //balls
    for (var i = 0; i < movers.length; i++) {
    var wind = createVector(0.01, 0);
    var gravity = createVector(0, 0.1*movers[i].mass);

    var c = 0.03;
    
    
    var friction = movers[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(c);


    movers[i].applyForce(friction);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].display();
    movers[i].checkEdges();
  }
  
  
  

  let d = w - 0.2 * w;
  let r = d / 2;

  // texture(stickImg);
  
  sphere(30);

  // rotateY(frameCount/100);
  

  noFill();
  stroke(255);
  strokeWeight(1);
  // box(1000,1000,1000);

  for (let i = 0; i < cols; i++) {
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    strokeWeight(1);
    stroke(255);
    // ellipse(cx, cy, d, d);
    let x = r * cos(angle * (i + 1) - HALF_PI);
    let y = r * sin(angle * (i + 1) - HALF_PI);
    strokeWeight(8);
    stroke(255);
    point(cx + x, cy + y,cy + y);
    stroke(255, 150);
    strokeWeight(1);
    line(cx + x, 0,cx + x, cx + x, height, cx + x);

    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }
  }

  noFill();
  stroke(255);
  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = w + j * w + w / 2;
    strokeWeight(1);
    stroke(255);
    // ellipse(cx, cy, d, d);
    // push();
    // translate(cx, cy, cy);
    // sphere(d);
    // pop();
    let x = r * cos(angle * (j + 1) - HALF_PI);
    let y = r * sin(angle * (j + 1) - HALF_PI);
    strokeWeight(8);
    stroke(255);
    point(cx + x, cy + y, cy + y);
    stroke(255, 150);
    strokeWeight(1);
    line(0, cy + y,cy + y , width, cy + y, cy + y) ;

    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }


  
  
  angle -= 0.01;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].reset();
      }
    }
    // saveFrame("lissajous#####.png");
    angle = 0;
  }
}