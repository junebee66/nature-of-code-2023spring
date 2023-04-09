let rows, cols;
let grid;
let resolution = 20;
let flowers = [];
let myShader;

let randomNum1;
let randomNum2;


function preload() {
  myShader = loadShader("shader.vert", "shader.frag");
  noisePic = loadImage("tree.png");
}

function setup() {
  createCanvas(400, 800, WEBGL);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  stroke(71, 26, 92);
  strokeWeight(3);
  // noStroke();
  
  rows = height / resolution;
  cols = width / resolution;
  
  grid = new Array(cols);
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  // background(75, 79, 51);
  background(255);
  // background(0);
  orbitControl(4, 4);
  rotateX(70);
  
  rotateZ(frameCount/10);
  // rotateX(frameCount/10);
  // rotateY(frameCount/10);
  
  // shader(myShader);
  
  randomNum1 = random(50);
  randomNum2 = random(10);

  // Send the frameCount to the shader
  myShader.setUniform("uFrameCount", frameCount);
  myShader.setUniform("uNoiseTexture", noisePic);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution - width / 2;
      let y = j * resolution - height / 2;
      
      if (grid[i][j] == 1) {
      
        // rect(x,y, 30,30);
        // fill(random(255), 300,90);
        ellipse(x,y, 30,30);
        push();
        
        translate(x,y, 70);
        // translate(x,y);
        // stroke(random(255), random(255), random(255));
        // scale(1, 1,1);
        // scale(0.05);
        scale(0.3);
        // stroke(350, 25, 100);
        drawFlower(x, y);
        
        // sphere(30);
        pop();
      }
    }
  }
  
  let next = new Array(cols);
  for (let i = 0; i < cols; i++) {
    next[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);
      
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function drawFlower(x, y) {
  randomNum = random(200,500);
  beginShape()
  for(let theta=0; theta<60; theta +=11){
    for(let phi=0; phi<360; phi +=10){
      fill(randomNum, 40-theta*2,90);
      noStroke();
    let r = (70*pow(abs(sin(phi*8/2)),1)+25*theta/60)*sin(frameCount);
    let x = r*cos(phi)*sin(frameCount+ randomNum1);
    let y = r*sin(phi)*sin(frameCount+ randomNum2);
    let z = vShape(100,r/100,0.8,0.15,1.5) - 200 + bumpiness(1.5, r/100,12, phi)*sin(frameCount);
        
    vertex(x,y,z)
  }
  }
  endShape()
  
//     beginShape()
//   for(let theta=0; theta<60; theta +=11){
//     for(let phi=0; phi<360; phi +=12){
//       fill(340, 100-theta*2,100);
//       // fill(71, 100-theta*3, 92);
//             noStroke();
//     let r = (70*pow(abs(sin(phi*8/2)),1)+125*theta/10)*sin(frameCount)
//     let x = r*cos(phi)*sin(frameCount)
//     let y = r*sin(phi)*sin(frameCount)
//     let z = vShape(500,r/100,0.8,0.15,1.5) - 200 + bumpiness(1.5, r/100,12, phi)*sin(frameCount)
        
//     vertex(x,y,z)
//   }
//   }
//   endShape()

}

function vShape(A,r,a,b,c){
  return A * pow(Math.E, -b*pow(abs(r),c))* pow(abs(r),a)
}

function bumpiness(A,r,f, angle){
  return 1+ A * pow(r,2) * sin(f*angle)
}