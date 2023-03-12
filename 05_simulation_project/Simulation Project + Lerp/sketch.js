// reference from Point Cloud Code by Adain Nelson (https://www.aidanjnelson.com/blog/nature-of-code/particle-systems/)

let sys;

// point cloud points reduction and scale
let reductionFactor = 1;
let scale = 10;

let expand = 30;

// keyboard control values
let tx = 0;
let ty = 0;
let tz = 0;
let rx = 0;
let ry = 0;
let rz = 0;

// bounding box values
let bbW = 0;
let bbH = 0;
let bbD = 0;

let gravityOn = false;
let img;

let pointClouds = [];

let cloudNum = 0;

let randomSmall = 10;

let lerpValue;

function preload() {
  loadTable("data/bunny.csv", "csv", createParticleSystem);
  loadTable("data/dragon.csv", "csv", createParticleSystem);
    loadTable("data/angel.csv","csv",createParticleSystem);
   loadTable("data/minerva.csv","csv",createParticleSystem);

  // img = loadImage("gradient.png");
}

function createParticleSystem(table) {
  let xMax = 0;
  let xMin = 0;
  let yMax = 0;
  let yMin = 0;
  let zMax = 0;
  let zMin = 0;

  // first, create a bounding box around all points in the cloud
  for (let i = 0; i < table.getRowCount(); i += reductionFactor) {
    // parsefloat necessary to ensure values from file aren't compared as strings
    let x = parseFloat(table.get(i, 0));
    let y = parseFloat(table.get(i, 1));
    let z = parseFloat(table.get(i, 2));

    if (x > xMax) {
      xMax = x;
    }
    if (x < xMin) {
      xMin = x;
    }
    if (y > yMax) {
      yMax = y;
    }
    if (y < yMin) {
      yMin = y;
    }
    if (z > zMax) {
      zMax = z;
    }
    if (z < zMin) {
      zMin = z;
    }
  }
  // console.log('xMax,xMin,yMax,yMin,zMax,zMin:',xMax,xMin,yMax,yMin,zMax,zMin);
  bbW = xMax - xMin;
  bbH = yMax - yMin;
  bbD = zMax - zMin;

  // console.log('w/h/d of bounding box: ',bbW,'/',bbH,'/',bbD);

  // use min/max values from bounding box to map everything around 0,0
  for (let i = 0; i < table.getRowCount(); i += reductionFactor) {
    let x = parseFloat(table.get(i, 0));
    let y = parseFloat(table.get(i, 1));
    let z = parseFloat(table.get(i, 2));

    // map around 0,0 without scaling values
    x = map(x, xMin, xMax, -bbW / 2, bbW / 2);
    y = map(y, yMin, yMax, bbH / 2, -bbH / 2); //flip Y for the bunny
    z = map(z, zMin, zMax, -bbD / 2, bbD / 2);

    table.setNum(i, 0, x);
    table.setNum(i, 1, y);
    table.setNum(i, 2, z);
  }

  // scale this after the mapping to avoid scaling x,y,z values twice

  bbW = bbW * scale;
  bbH = bbH * scale;
  bbD = bbD * scale;

  pointClouds.push(new PointCloudParticleSystem(table, reductionFactor, scale));
}

function setup() {
  createCanvas(800, 400, WEBGL);

  camera(0, 0, 600, 0, 0, 0, 0, 1, 0);
  perspective(0.8, width / height, 50, 5000);
   // orbitControl();

  RabbitBtn = createButton("Rabbit");
  RabbitBtn.position(0, 0);
  RabbitBtn.mousePressed(ChangeToRabbit);

  dragonBtn = createButton("Dragon");
  dragonBtn.position(50, 0);
  dragonBtn.mousePressed(ChangeToDragon);

  angelBtn = createButton("Angel");
  angelBtn.position(100, 0);
  angelBtn.mousePressed(ChangeToAngel);

  minervaBtn = createButton("Minerva");
  minervaBtn.position(150, 0);
  minervaBtn.mousePressed(ChangeToMinerva);

  resetBtn = createButton("Reset");
  resetBtn.position(200, 0);
  resetBtn.mousePressed(setup);

  // pointSize = createSlider(2, 10, 5);
  // pointSize.position(0, height-30);
  // pointSize.style('width', '80px');

  randomRange = createSlider(10, 900, 10);
  randomRange.position(0, height - 50);
  randomRange.style("width", "80px");

  cloudSize = createSlider(1, 15, 1);
  cloudSize.position(0, height - 30);
  cloudSize.style("width", "800px");

  homeSlider = createSlider(0, 1, 0, 0.01);
  homeSlider.position(0, height - 90);
  homeSlider.style("width", "80px");
}

function draw() {
  background(0);

  push();
  translate(mouseX, mouseY);
  fill(255, 0, 0);
  sphere(30);
  pop();
  // orbitControl();

  // console.log(scale);

  // console.log(pointClouds);

  if (gravityOn) {
    let grav = createVector(0, 1, 0);
    pointClouds[cloudNum].applyForce(grav);
  }

  if (keyIsDown(72)) {
    // 'h'
    gravityOn = false;
    pointClouds[cloudNum].bringThemHome();
  }

  push();
  normalMaterial();
  keyboardControl();
  // drawFloor();
  // drawBoundingBox();
  pointClouds[cloudNum].run();
  pop();
}

function ChangeToRabbit() {
  cloudNum = 0;
}

function ChangeToDragon() {
  cloudNum = 1;
}

function ChangeToAngel() {
  cloudNum = 2;
}

function ChangeToMinerva() {
  cloudNum = 3;
}

function drawFloor() {
  push();
  let depth = width;
  translate(0, 100, 300 / 2);
  rotateX(PI / 2);
  fill(235, 50, 250);
  plane(width, depth);
  pop();
}

function drawBoundingBox() {
  let padding = 10;
  push();
  noFill();
  stroke(0);
  strokeWeight(0.5);
  box(bbW + padding, bbH + padding, bbD + padding);
  pop();
}

function keyboardControl() {
  	// these values can be mapped to framerate??
  	let rotationStep = PI/48;
  	let translationStep = 10;

  	// zoom
  	if (keyIsDown(38)&& !keyIsDown(16)) {
  		ty+=translationStep;
  	}
  	if (keyIsDown(40)&& !keyIsDown(16)){
  		ty-=translationStep;
  	}

  	// pan left-right
  	if (keyIsDown(37) && !keyIsDown(16)) {
  		tx+=translationStep;
  	}
  	if (keyIsDown(39) && !keyIsDown(16)){
  		tx-=translationStep;
  	}

  	// rotate about X
  	if (keyIsDown(38)&& keyIsDown(16)) {
  		rx+=rotationStep;
  	}
  	if (keyIsDown(40)&& keyIsDown(16)){
  		rx-=rotationStep;
  	}
  	//rotate about Y
  	if (keyIsDown(37) && keyIsDown(16)) {
  		ry+= rotationStep;
  	}
  	if (keyIsDown(39) && keyIsDown(16)){
  		ry-=rotationStep;
  	}

  	//zoom
  	if (keyIsDown(38) && keyIsDown(18)) {
  		tz+=translationStep;
  	}
  	if (keyIsDown(40) && keyIsDown(18)){
  		tz-=translationStep;
  	}

  if (keyIsDown(71)) {
    //'g'
    gravityOn = true;
  }

  translate(tx,ty,tz);
  rotateX(rx);
  rotateY(ry);
  rotateZ(rz);
}
