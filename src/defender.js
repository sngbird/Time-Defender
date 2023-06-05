class DefenderScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload(){
        //loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('star','src/assets/star.png')
        this.load.image('turret','src/assets/turretplaceholder.png')
        this.load.image('repairblast','src/assets/repairblastplaceholder.png')
        this.load.image('repairbeam','src/assets/repairbeamplaceholder.png')
        this.load.image('timecrack','src/assets/timecrack.png')
        this.load.image('crackcenter','src/assets/crackcenter.png')
        this.load.image('shipbody', 'src/assets/placeholdershipbody.png')

     

    }
    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.queue = [];

        this.cameras.main.setBackgroundColor('#000');
        //Ship and Starfield Background
        this.add.particles(this.w*1.3, 0, 'star', {
            y: { min: 0, max: this.h },
            quantity: 2,
            lifespan: 7000,
            gravityX: -200
        });
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        //this.input.on('pointerup', this.handlePointerUp(pointer))
        this.synth = new Tone.Synth({
            oscillator: {
                type: 'square'
            }}).toDestination();
        this.sceneLayout();
        this.onEnter();



    }
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }
    createTurret(x,y){
        let dome = this.add.circle(x,y,50,'0xffffff',1);
        let barrel = this.add.rectangle(dome.x,dome.y-70,15,50, '0xffffff',1);
        const turret = this.add.container(x,y);
        turret.add(dome);
        turret.add(barrel);   
        return(turret);
    }
    createTurretSprite(x,y){
        let turret = this.add.sprite(x,y,'turret');
        turret.setAngle(-90)
        return(turret);
    }
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }

// Sound Effects

lowHumSound = () => {
    // Create an oscillator for the low hum sound
    const oscillator = new Tone.Oscillator({
        frequency: 100, // 55 Hz (low A) to start, deeper
        volume: -20, // start pretty quiet
        type: 'sine' // pure tone
    }).toDestination();

    // Create an LFO to modulate the volume of the oscillator, giving it a pulsating effect
    const lfo = new Tone.LFO({
        frequency: 5, // LFO rate
        type: 'sine', // LFO wave type
        min: -24, // minimum output volume
        max: -20 // maximum output volume
    }).connect(oscillator.volume);

    // Start the LFO
    lfo.start();

    // Start the oscillator
    oscillator.start();

    // Stop the oscillator after 1 second, shorter
    setTimeout(() => {
        oscillator.stop();
    }, 2000);
};

processQueue = () => {
    if (this.queue.length === 0) {
        return;
    }

    // Remove the first item from the queue and play it
    const synth = this.queue.shift();

    // Define the score up pitches, for a more 'arcade' feel
    const pitches = ["C4", "E4", "G4", "B4", "C5", "E5", "G5", "B5", "C6"];

    // Define the speed of the score up sound
    const speed = 0.05; // 50 ms per pitch

    // Schedule the pitches
    pitches.forEach((pitch, index) => {
        Tone.Transport.schedule(() => {
            synth.triggerAttack(pitch);
            if (index === pitches.length - 1) {
                synth.triggerRelease();
            }
        }, speed * index); // delay each pitch by the speed times its position in the score up sound
    });

    // When the sound finishes playing, process the next item in the queue
    Tone.Transport.schedule(() => {
        this.processQueue();
    }, speed * pitches.length);
};

scoreUpSound = () => {
    const pitches = ["C4", "E4", "G4", "B4", "C5", "E5", "G5", "B5", "C6"];

    // Define the speed of the score up sound
    const speed = 0.05; // 50 ms per pitch
    // Create a monophonic synthesizer with a square wave
    if (Tone.Transport.state === 'started') {
        Tone.Transport.cancel();
        Tone.Transport.stop();
      }
    
      // Schedule the pitches
      pitches.forEach((pitch, index) => {
        Tone.Transport.schedule(time => {
          this.synth.triggerAttackRelease(pitch, "32n", time);
        }, speed * index); 
      });
    
      // Start the transport to play the scheduled pitches
      Tone.Transport.start();
    };



    // Play the glass breaking sound, then the low hum sound
    
    laserSound = () => {
        // Create an oscillator with a high initial frequency, resembling a 'pew' sound
        const oscillator = new Tone.Oscillator({
            frequency: 2000, // 2 kHz to start
            volume: -10, // start pretty quiet
            type: 'sine' // pure tone
        });
    
        // Create an amplitude envelope
        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.01, // Fast attack
            decay: 0.1, // Decay to sustain level quickly
            sustain: 0.5, // Sustain at half volume
            release: 0.8 // Release somewhat slowly
        }).toDestination();
    
        // Connect the oscillator to the envelope
        oscillator.connect(envelope);
    
        // Start the oscillator
        oscillator.start();
    
        // Trigger the envelope
        envelope.triggerAttackRelease(0.5); // Attack and release over half a second
    
        // Glide the oscillator frequency down, like a 'pew' sound
        oscillator.frequency.rampTo(100, 1); // Ramp to 100 Hz over half a second
    
        // Create a LFO and connect it to the oscillator frequency
        const lfo = new Tone.LFO({
            frequency: 10, // frequency of the LFO
            min: 100, // minimum output value
            max: 2000 // maximum output value
        }).connect(oscillator.frequency);
    
        // Start the LFO
        lfo.start();
    };
    
    // handlePointerMove(pointer){
    //     const px = pointer.x
    //     const py = pointer.y

    //     const targetAngle = Phaser.Math.RadToDeg(Phaser.Math.Angle.)
    // }
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}


class DefenderGameScene extends DefenderScene {
    constructor(key) {
        super(key);
    }
    sceneLayout(){
        
    this.g_startTime = performance.now()/1000.0;
    this.g_seconds;
    this.ship = new Ship(this,this.w*.5,this.h*.95,'shipbody');
    console.log(this.ship)

    let turret = this.createTurretSprite(this.w*.5,this.h*.88);
        this.input.on('pointerdown', (pointer) => {
            let targetx = pointer.x;
            let targety = pointer.y;
            let targetDeg = this.rotateToMouse(pointer, turret)
            setTimeout(()=>{this.shootLaser(this,targetx,targety,targetDeg,turret);},500)
        },this);
    this.crackGroup = this.physics.add.group({});
    this.blastGroup = this.physics.add.group({});
    // this.crackGroup.add(this.crack(.25,.5));
    // this.crackGroup.add(this.crack(.65,.5));
    
    this.difficulty = 0;
    this.laserGroup = new LaserGroup(this);    
    this.physics.add.overlap(this.laserGroup, this.crackGroup, this.destroyCrack, null, this);
    this.physics.add.overlap(this.ship, this.blastGroup, this.decreaseShipHealth, null, this);
    //let trial = new TimeCrack(this,500,500);
    //this.crackGroup.add(trial);
    
    }
    update(){
    }
    spawn(){
        this.crackGroup.add(new TimeCrack(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)));
        this.lowHumSound()
    }
    rotateToMouse(pointer, targets){
        //console.log(this.cameras.main.scrollX,this.cameras.main.scrollY);
        let targetRad = Phaser.Math.Angle.Between(targets.x, targets.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY)
        let targetDeg = Phaser.Math.RadToDeg(targetRad)
        
        // Section below for making the spin less weird, needs debugging
        let currentAngle = targets.angle;
        currentAngle = currentAngle+90;
        let diff = targetDeg - currentAngle;
        if (diff < -180){
            diff +=360
        }else if (diff > 180){
            diff -= 360
        }
  
       
        this.tweens.add({
            targets: targets,
            angle: targetDeg,
            duration: 500,
        })
        return targetDeg;
    }
    shootLaser(scene,targetx,targety,targetDeg,turret){
        this.laserSound();
        this.laserGroup.fireLaser(scene,targetx,targety,targetDeg,turret);
    }
    decreaseShipHealth(ship,blast){
        ship.decreaseHealth();
        //console.log(ship.getHP())
    }
    destroyCrack(beam,crack){
        beam.setActive(false);
        beam.setVisible(false);
        beam.body.reset();
        this.explode(crack.x,crack.y);
        crack.repair(this);
        this.scoreUpSound();
        
    }
    getRandomBetween(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }
    explode(x,y){
        let explosion = this.physics.add.sprite(x,y,'repairblast').setAlpha(0);
        let scene = this;
        this.tweens.add({
            targets:explosion,
            alpha: .9,
            scale: 5,
            duration: 500,
            onComplete: function(){
                scene.tweens.add({
                    targets: explosion,
                    alpha: 0,
                    duration: 1000,
                    onComplete: function(){
                        explosion.destroy();
                        }
                })
            }
        })
    }
}
