class DefenderScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload(){
        //loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('star','src/assets/sprites/star.png')
        this.load.image('turret','src/assets/sprites/turretplaceholder.png')
        this.load.image('repairblast','src/assets/sprites/repairblastplaceholder.png')
        this.load.image('repairbeam','src/assets/sprites/repairbeamplaceholder.png')
        this.load.image('timecrack','src/assets/sprites/timecrack.png')
        this.load.image('crackcenter','src/assets/sprites/crackcenter.png')
        this.load.image('shipbody', 'src/assets/sprites/placeholdershipbody.png')
        this.load.image('powerupbase','src/assets/sprites/powerupbase.png')
        this.load.image('HP','src/assets/sprites/powerup_health.png')


        this.load.audio('bgm','src/assets/sounds/song1.mp3');
        this.load.glsl('warp', 'src/assets/shaders/domain.frag');
        this.load.glsl('stars','src/assets/shaders/starfield.frag');
        
        if(typeof this.pre_load != "undefined"){
            this.pre_load()
        }
    }
    create() {
        console.log("DefenderScene");
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        //Do not change the depth of the shaders, hiding of the stars depends on it -Wyatt
        const starfield = this.add.shader('stars',this.w/2, this.h/2, this.w, this.h).setDepth(-3);
        const shader = this.add.shader('warp', this.w/2, this.h/2, this.w, this.h).setDepth(-1);

        this.cameras.main.setBackgroundColor('#000');
        //Ship and Starfield Background
        // this.add.particles(this.w*1.3, 0, 'star', {
        //     y: { min: 0, max: this.h },
        //     quantity: 2,
        //     lifespan: 7000,
        //     gravityX: -200
        // });
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        //this.input.on('pointerup', this.handlePointerUp(pointer))
        this.synth = new Tone.Synth({ oscillator: {type: 'square'}}).toDestination();
        this.sceneLayout();
        this.onEnter();

        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on('down', ()=>{
            console.log("CLEARING LOCAL STORAGE")
            localStorage.clear();
        })


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
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
    handlePointerUp(pointer, targets){
        const targetRad = Phaser.Math.Angle.Between(
        targets.x, targets.y, pointer.x, pointer.y
        )
        const target = Phaser.Math.RadToDeg(targetRad)
        console.log(target);
        this.tweens.add
    }
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
    console.log("DefenderGameScene");
    
    this.g_startTime = performance.now()/1000.0;
    this.g_seconds;
    this.ship = new Ship(this,this.w*.5,this.h*.95,'shipbody');
    //console.log(this.ship)
    this.score = 0;
    this.currently_shooting = false;
    let turret = this.createTurretSprite(this.w*.5,this.h*.88);
        this.input.on('pointerdown', (pointer) => {
            //console.log(this.currently_shooting)
            if(this.currently_shooting == false){
                this.currently_shooting = true;
                let targetx = pointer.x;
                let targety = pointer.y;
                let targetDeg = this.rotateToMouse(pointer, turret)
                setTimeout(()=>{
                    this.shootLaser(this,targetx,targety,targetDeg,turret);
                    this.currently_shooting = false;}
                    ,this.turret_rotate_time)
            }
        },this);
    this.crackGroup = this.physics.add.group({});
    this.blastGroup = this.physics.add.group({});
    this.powerUpsGroup = this.physics.add.group({});
    this.powerUpsGroup.defaults = {};
    // this.crackGroup.add(this.crack(.25,.5));
    // this.crackGroup.add(this.crack(.65,.5));
    
    this.difficulty = 0;
    this.laserGroup = new LaserGroup(this);    
    this.physics.add.overlap(this.laserGroup, this.crackGroup, this.destroyCrack, null, this);
    this.physics.add.overlap(this.ship, this.blastGroup, this.decreaseShipHealth, null, this);
    this.physics.add.overlap(this.laserGroup, this.powerUpsGroup, this.getPowerup, null, this);
    this.physics.add.collider(this.ship, this.powerUpsGroup);
    //let trial = new TimeCrack(this,500,500);
    //this.crackGroup.add(trial);
    this.bgm = this.sound.add('bgm', {loop: true, volume: 0.5});
    this.spawnPowerup();
    if(localStorage.getItem("music") != 1){
        this.bgm.play()
    }
    
    }
    update(){
    }
    spawnCrack(){
        this.crackGroup.add(new TimeCrack(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)));
        this.play_sound("alert");
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
        
        this.turret_rotate_time = Math.abs(diff + 90) * 5;
        if(this.turret_rotate_time > 500){
            this.turret_rotate_time = 500;
        }
        //console.log(this.turret_rotate_time);
       
        this.tweens.add({
            targets: targets,
            angle: targetDeg,
            duration: this.turret_rotate_time,
        })
        return targetDeg;
    }
    shootLaser(scene,targetx,targety,targetDeg,turret){
        this.laserGroup.fireLaser(scene,targetx,targety,targetDeg,turret);
    }
    decreaseShipHealth(ship,blast){
        ship.decreaseHealth();
        //console.log(ship.getHP())
    }
    destroyCrack(beam,crack){
        if(crack.exploding == 1){
            return;
        }
        beam.setActive(false);
        beam.setVisible(false);
        beam.body.reset();
        this.explode(crack.x,crack.y);
        this.crackGroup.remove(crack);
        crack.repair(this);
        this.gain_score(this.difficulty)
        this.play_sound("scoreUp");
        
    }
    getRandomBetween(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }
    explode(x,y){
        let explosion = this.physics.add.sprite(x,y,'repairblast').setAlpha(0).setAngle(Math.random() * 360);
        let scene = this;
        this.tweens.add({
            targets:explosion,
            delay:300,
            alpha: .2,
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
    gain_score(val){
        this.score += (5 * val);
    }
    spawnPowerup(){
        let chosen = this.getRandomBetween(1,1);
        switch(chosen){
            case 1:
                this.powerUpsGroup.add(new HealthUp(this,500,500));
                break;
            // case 2:
            //     alertSound();
            //     break;
            // case 3:
            //     scoreUpSound();
            //     break;
        }
        
    }
    getPowerup(laser,powerup){
        powerup.collectPowerUp(this) 
        laser.destroy()
    }

    play_sound(index){
        if(localStorage.getItem("sound") == 1){
            //console.log("sound muted!");
            return;
        }
        switch(index){
            case "laser":
                laserSound();
                break;
            case "alert":
                alertSound();
                break;
            case "scoreUp":
                scoreUpSound();
                break;
        }
    }
}
