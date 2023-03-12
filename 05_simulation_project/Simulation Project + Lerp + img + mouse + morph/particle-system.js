class PointCloudParticleSystem {
	// ES6 syntax to have scale parameter be optional as per...
	// https://stackoverflow.com/questions/12797118/how-can-i-declare-optional-function-parameters-in-javascript
	constructor(cloud,reductionFactor,scale = 1){
		this.scale = scale;
		this.particles = [];
		for (let i = 0; i < cloud.getRowCount(); i+= reductionFactor){
			let position = createVector(cloud.get(i,0),cloud.get(i,1),cloud.get(i,2)).mult(this.scale);
          
           morph.push(position);
          
          //me
          
          // let morphFrom = morphBtn.value();
          
          // let morphFrom = lerp(morph[0], morph[1], 3);
          
          let locM = createVector(random(width*1.2), random(height), random(width*1.2));
          var angleM = 0; //any value to initialize
          var dirM = createVector(cos(angleM), sin(angleM));
          var speedM = random(0.5,2);
          
          // beginShape();
          
//           let morphFrom;
          
//           if (morph[1]){
//             morphFrom = morph[1];
//           }
//           else{
//             morphFrom = morph[0];
//           }

			this.particles.push(new PointCloudParticle(position, locM, dirM, speedM));
          
          // endShape(CLOSE);
		}
		// console.log('point cloud size:', cloud.getRowCount());
		// console.log('particle system size:',this.particles.length);

		// this.homeCounter = 0;
	}

	run(){
      // this.particles = aTob;
      // console.log(aTob);
      
		for (let particle of this.particles) {
			particle.run();
		}
	}

	applyForce(force){
		for (let particle of this.particles){
			particle.goingHome = false;
			particle.applyForce(force);
		}
	}

	bringThemHome(){
		 for (let i = 0; i < this.particles.length; i++){
			this.particles[i].goingHome = true;
		}
	}
}




























class ParticleSystem {
	constructor(origin, size){
		this.particles = [];
		this.origin = origin.copy();
		this.size = size;
		for (let i = 0; i < this.size; i++){
			this.addParticle();
		}
	}

	addParticle(){
		this.particles.push(new Particle(this.origin,floor(random(10,100))));
	}

	run(){
		this.update();
		for (let particle of this.particles) {
			particle.run();
		}
	}

	applyForce(force){
		for (let particle of this.particles){
			particle.applyForce(force);
		}
	}

	update(){
		// cull old particles
		this.particles = this.particles.filter(particle => !particle.isDead());
		// add new up to size
		for (let i = 0; i < (this.size - this.particles.length); i++){
			this.addParticle();
		}
	}
}
