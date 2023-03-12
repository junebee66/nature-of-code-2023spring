
let glitch, capture, w = 320, h = 240;

const buildings = [];

const walkingPPLs = [];
const characters = [];

let t = 0.01;

function preload(){
  
    loadImage("waterloo.gif", 
              incomingImg => {characters[0] = incomingImg; 
                              console.log("waterloo added");})
  
    loadImage("kirby.gif", 
              incomingImg => {characters[1] = incomingImg; 
                              console.log("kirby added");})
    loadImage("pikachu.gif", 
              incomingImg => {characters[2] = incomingImg; 
                              console.log("pikachu added");});
    loadImage("deer.gif", 
              incomingImg => {characters[3] = incomingImg; 
                              console.log("deer added");});
  
    loadImage("mario.gif", 
              incomingImg => {characters[4] = incomingImg; 
                              console.log("mario added");});
  
}

function setup() {
	capture = createCapture(VIDEO);
	capture.size(w, h);
	capture.hide();

	createCanvas(windowWidth, windowHeight, WEBGL);

	imageMode(CENTER);
  

	glitch = new Glitch();
	glitch.pixelate(5);
  
    buildings.shift(buildings.length);
  
    walkingPPLs.shift(walkingPPLs.length);
  
    cam = createCamera();
}

function draw() {
  background(255);

  camera(width/4, height/2, height/2 + frameCount*noise(t), 100*noise(t), 100*noise(t), 0, 1, 1, 1);
  
  // cam.move(noise(t)*frameCount , noise(t)*frameCount, noise(t)*frameCount);
  
  // new camera([x], [y], [z], [centerX], [centerY], [centerZ], [upX], [upY], [upZ])
  t = t + 0.01;
  // t = t + 5;

  // pop();
  
  push();
  translate(-width/2, -width/2);
  
  // orbitControl();
  // rotateX(frameCount/3);
  // rotateZ(frameCount/3);
  
	if(frameCount % 3 === 0) {
		
		// if(!mouseIsPressed){
			glitch.loadImage(capture);
		// }
		
		// map mouseX to # of randomBytes() + mouseY to limitBytes()
		glitch.limitBytes(map(mouseY, 0, height, 0, 1) );
		glitch.randomBytes(map(mouseX, 0, width, 0, 100));
		glitch.buildImage();
	}
	
  
  for (let i = buildings.length-1; i >= 0; i--) {
  	buildings[i].show();
    
    if (buildings[i].y > height) {
    	buildings.splice(i,1); //add first characters to the character array
    }
    
    if (buildings.length > 340) {
      buildings.shift(); //remove the first flower from the character array
    }
  }
  
  
  	let newbuilding = new Box(glitch.image, mouseX, mouseY, random(-width,width), random(0,50));
	buildings.push(newbuilding);
  



  for (let w = walkingPPLs.length-1; w >= 0; w--) {
    // rotateX(-PI/2);
  	walkingPPLs[w].showing();
    
    if (walkingPPLs[w].y > height) {
    	walkingPPLs.splice(i,1); //add first characters to the character array
    }
    
    if (walkingPPLs.length > 30) {
      walkingPPLs.shift(); //remove the first flower from the character array
    }
  
  }

}

// function mouseDragged() {
// 	let newbuilding = new Box(glitch.image, mouseX, mouseY, 0, random(0,50));
// 	buildings.push(newbuilding);
// }

// function mousePressed() {
// 	let newbuilding = new Box(glitch.image, mouseX, mouseY,random(-width,width),random(0,50));
// 	buildings.push(newbuilding);
// }


function mouseDragged() {
  
	let newcharacter = new Character(characters[round(random(0,4))], mouseX, mouseY, random(-mouseX, mouseX), random(20,50));
	walkingPPLs.push(newcharacter);
}
  


class Box{
  constructor(block, x, y, z, si) {
  this.content = block;
  this.x = x; 
  this.y = y;
  this.z = z;
  this.size = si;
}

  show() {
    push();
    translate(this.x,this.y, this.z);
    texture(this.content);
    box(this.size);
    pop();
    
  }
  
}




class Character{
  constructor(walk, x, y, z, si) {
  this.content = walk;
  this.x = x; 
  this.y = y;
  this.z = z;
  this.size = si;
}

  showing() {
    push();
    push();
    rotateX(-PI/2);
    translate(0,-240, this.z+300);
    image(this.content, this.x,this.y, this.size, this.size);
    pop();
    pop();
    
  }
  
}
