let pX, pY, pZ;


function setup(){
    // background(0,-10);
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB);
  strokeWeight(2);
  angleMode(DEGREES);
}

function draw(){
  background(0,-10);
  orbitControl(1, 1);

  rotateY(frameCount);
  blendMode(ADD);
  

  for(let r = 0; r <= 1.02; r += 0.02){
    stroke(340+(mouseY/50), -r*50+100+(mouseY/50), r*50+50);
    strokeWeight(0.1+(mouseY/180));
    
    beginShape(POINTS);
    for(let petal = -2*180; petal <= 180*15; petal += 2){
      let phi = (frameCount/2)*Math.exp(-petal/(8*frameCount));
      let petalCut = 1 - (1/2) * pow((5/4)*pow(1-((3.6*petal%frameCount)/180), 2)-1/4, 2);
      let hangDown = (mouseY/180)*pow(r, 2)*pow(1.3*r-1, 2)*sin(phi);

      if(0 < petalCut * (r * sin(phi)+hangDown*cos(phi))){
        pX = 260 * petalCut * (r * sin(phi)+hangDown*cos(phi+frameCount)) * sin(petal);
        pY = -260 * petalCut * (r * cos(phi+frameCount)-hangDown*sin(phi));
        pZ = 260 * petalCut * (r * sin(phi+frameCount)+hangDown*cos(phi)) * cos(petal);
        
        vertex(pX, pY, pZ);
        
        

      }

    }
    endShape();
  }
  


}