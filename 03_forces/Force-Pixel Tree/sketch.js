let img;
let bgImg;

let cam;

let t;

let pointClouds = [];
// let d;
let cz= -450;

function setup() {
  background(255);
  createCanvas(800, 800, WEBGL);
  // img = loadImage("woman.jpg");
  bgImg = loadImage("tree-bg.gif");
  // img = loadImage("tree-bg.gif");
  // bgimg = loadImage("tree-bg.gif");
  // img = loadImage("color-tree.jpg")
  // img = loadImage("color-tree2.png")
  // img = loadImage("black-and-white.jpg");
    // img = loadImage("tree.gif");
  // img = loadImage("tree2.gif");
  img = loadImage("tree3.png");
  // img = loadImage("flower2.jpg");
  // img = loadImage("flower3.jpg");
  // img = loadImage("Ethereal image of Cosmos flowers wins photo competition.png");

  
  img.resize(100, 100);
    cam = createCamera(0,0,cz);
  // cam.move(-width/2,-height/2,-500)
  cam.move(50,50,cz);
  
      
      
      // push();
      //     stroke(c);
      //     strokeWeight(1);
      //     point(x * tileSize, y * tileSize, z);
      // pop();
      
        
    // pointClouds.push(new Life(x,y,c,b,z, tileSize, d));
        
      // }}}

  
  
}

function draw() {
  background(255);
  orbitControl(1,1,0.01);
  noStroke();
        let tiles = 50;
      let tileSize = img.width / tiles;
  
  
  // translate(-width/2, -height/2);
  
  // camera(0, 0, 0, 0, 0, 0, 0, 1, 0);
  push();
  
  let dis = 5;
        rotateX(0.009*frameCount);
      // rotateY(0.03*frameCount);
  
  for (let x = 0; x < tiles; x++) {
    for (let y = 0; y < tiles; y++) {
      let c = img.get(x*tileSize, y*tileSize);
      let b = map(brightness(c),0,255,1,0);
      let z = map(b,0,1,-150,150);
      
      
      let d = dist(x , y, z, mouseX, mouseY, cz );
      
      
      // push();
      //     stroke(c);
      //     strokeWeight(1);
      //     point(x * tileSize, y * tileSize, z);
      // pop();
      

      
      
      let p1 = new Life(x,y,c,b,z, tileSize, d);
      
      p1.update();
      p1.show();
      
      push();
      
      translate(100,10,10);
      let p2 = new Life(x,y,c,b,z, tileSize, d);
        
      p2.update();
      p2.show();
      
      pop();
        
        
        
//       push();
      
//       translate(-100,10,10);
//       let p3 = new Life(x,y,c,b,z, tileSize, d);
        
//       p3.update();
//       p3.show();
      
//       pop();
      
      
      push();
      
      translate(-100,50,10);
      let p4 = new Life(x,y,c,b,z, tileSize, d);
        
      p4.update();
      p4.show();
      
      pop();
      
      push();
      
      translate(-50,-50,10);
      let p5 = new Life(x,y,c,b,z, tileSize, d);
        
      p5.update();
      p5.show();
      
      pop();
      
      
//       push();
      
//       translate(50,50,10);
//       let p6 = new Life(x,y,c,b,z, tileSize, d);
        
//       p6.update();
//       p6.show();
      
//       pop();
      
      
//       push();
      
//       translate(0,-50,10);
//       let p7 = new Life(x,y,c,b,z, tileSize, d);
        
//       p7.update();
//       p7.show();
      
//       pop();
      
      
//             push();
      
//       translate(0,0,10);
//       let p8 = new Life(x,y,c,b,z, tileSize, d);
        
//       p8.update();
//       p8.show();
      
//       pop();
      
      }
      } 
  
  
//       for (let s = 0; s < pointClouds.length; s++) {

//       // translate(-100,10,10);
//       pointClouds[s].update();
//       pointClouds[s].show();
      
//     }
  
  t+=0.01;
    // }
  // }
  // pop();
  
  // t+=0.01;
  
  // push();
  // rotateX(0.009*frameCount);
  // rotateY(0.03*frameCount);
  // rotateY(30);
  noStroke();
  texture(bgImg);
  // sphere(900);
  pop();
}


class Life {
  constructor(x, y,c,b,z, tileSize,d) {
    this.pos = createVector(x, y);
    // this.vel = createVector(noise(30+t), -1);
    this.vel = p5.Vector.random2D();
    // this.vel = createVector(300,300);
    // this.vel = 30;
    // this.vel = noise(frameCount+t);
    this.vel.mult(100);
    
    this.col = c;
    this.b = b;
    this.z = z;
    this.tileSize = tileSize;
    this.d = d;
  }

  update() { 
    
  
    if (this.d<10){
      
      let mouse = createVector(mouseX, mouseY);
      this.acc = p5.Vector.sub(mouse, this.pos);
      this.acc.setMag(100);

      this.vel.add(this.acc); 
      // this.vel.limit(5);
      
      this.mo = width * noise(t);

    this.pos.add(this.vel);
      this.pos.add(this.mo);
      t+=0.01;
      
      } 
    
  }

  show() {

    fill(this.col);
    // translate(this.pos.x,this.pos.y,this.z);
    ellipse(this.pos.x,this.pos.y, 2);
    // stroke(this.col);
    // strokeWeight(1);
    // point(this.pos.x * this.tileSize, this.pos.y * this.tileSize, this.z);
      // point(this.pos.x , this.pos.y , this.z);
  }
}
