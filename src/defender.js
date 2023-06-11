
class DefenderScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        console.log("defenderscene")
    }
    preload(){
        //loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('turret','src/assets/sprites/turretplaceholder.png')
        this.load.image('repairblast','src/assets/sprites/repairblastplaceholder.png')
        this.load.image('repairbeam','src/assets/sprites/repairbeamplaceholder.png')
        this.load.image('timecrack','src/assets/sprites/timecrack.png')
        this.load.image('crackcenter','src/assets/sprites/crackcenter.png')
        this.load.image('shipbody', 'src/assets/sprites/placeholdershipbody.png')
        this.load.image('powerupbase','src/assets/sprites/powerupbase.png')
        this.load.image('HP','src/assets/sprites/powerup_health.png')
        this.load.image('bombindicator','src/assets/sprites/powerup_bomb.png')
        this.load.image('pierce','src/assets/sprites/powerup_pierce.png')
        this.load.image('bomb','src/assets/sprites/bomb.png')
        this.load.image('smoke','src/assets/sprites/smokepuff.png')
        this.load.image('repair','src/assets/sprites/repairparticle.png')





        this.load.audio('bgm','src/assets/sounds/song1.mp3');
        this.load.glsl('warp', 'src/assets/shaders/domain.frag');
        this.load.glsl('stars','src/assets/shaders/starfield.frag'); 
        this.load.glsl('bolt','src/assets/shaders/bolt.frag')
        
        if(typeof this.pre_load != "undefined"){
            this.pre_load()
        }
    }
    create() {
        console.log("DefenderScene");
        this.createCamera();
        this.createShaders();
        this.initializeAudio()
        this.sceneLayout();
        this.onEnter();
        this.keyboardInput();
    }
    createCamera(){
        this.transitionDuration = 1000;
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.cameras.main.setBackgroundColor('#000');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
    }
    createShaders(){
         //Ship and Starfield Background
         //Do not change the depth of the shaders, hiding of the stars depends on it -Wyatt
        const starfield = this.add.shader('stars',this.w/2, this.h/2, this.w, this.h).setDepth(-3);
        const shader = this.add.shader('warp', this.w/2, this.h/2, this.w, this.h).setDepth(-1);
    }
    createTurretSprite(x,y){
        let turret = this.add.sprite(x,y,'turret');
        turret.setAngle(-90)
        return(turret);
    }
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
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
    initializeAudio(){
        this.synth = new Tone.Synth({ oscillator: {type: 'square'}}).toDestination();
    }
    keyboardInput(){
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceBar.on('down', ()=>{
            console.log("CLEARING LOCAL STORAGE")
            localStorage.clear();
        })
    }
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }

}


class DefenderGameScene extends DefenderScene {
    constructor(key) {
        super(key);
        
    }
    useBomb(){
        if(this.ship.getBombs() > 0){
            this.ship.removeBomb();
            console.log("boom");
            let bombRadius = this.add.rectangle(this.w/2,this.h/2,this.w,this.h,'0xff0000',0)
            this.bombGroup.add(bombRadius);
            setTimeout(()=>{
                bombRadius.destroy()
            },1000)
        }
    }
    bombButton(){
        this.bombButtonImg = this.add.image(this.w*.65,this.h*.92,'bomb').setInteractive().setScale(.66);
        this.bombText = this.add.text(this.bombButtonImg.x-25,this.bombButtonImg.y + 25)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 25}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        let test = this.tweens.add({
            targets: this.bombButtonImg,
            angle: 25,
            yoyo: true,
            repeat: -1,
            duration: 200,
        })
        test.pause()
        this.bombButtonImg.on('pointerover',() =>{
            if(this.ship.getBombs() > 0){
                this.bombButtonImg.setTint(0xff0000);
                test.resume();
            }
        })
        this.bombButtonImg.on('pointerout',() =>{
            this.bombButtonImg.clearTint();
            test.restart();
            test.pause();
           
        })
        this.bombButtonImg.on('pointerdown',() => {
                        this.useBomb();
        })
    }
    choose_color(){
        let colorChoice = this.getRandomBetween(1,10);
        let color;
        switch(colorChoice){
            case 1: color = 0xfc035e;
                break;
            case 2: color = 0x27f242;
                break;
            case 3: color = 0x1ce8ff;
                break;
            case 4: color = 0xf2f540;
                break;
            case 5: color =  0xff5e00;
                break;
            case 6: color = 0xff5e00;
                break;
            case 7: color = 0x0dff00;
                break;
            case 8: color = 0x0011ff;
                break;
            case 9: color = 0xfa3744;
       
        }
        return color;

    }
    create_timer(){
    }
   
    createCollision(){
    this.physics.add.overlap(this.laserGroup, this.crackGroup, this.destroyCrack, null, this);
    this.physics.add.overlap(this.bombGroup, this.crackGroup, this.bombCrack, null, this);
    this.physics.add.overlap(this.ship, this.blastGroup, this.shipHit, null, this);
    this.physics.add.overlap(this.laserGroup, this.powerUpsGroup, this.getPowerup, null, this);
    this.physics.add.collider(this.ship, this.powerUpsGroup);
    this.physics.add.collider(this.ship, this.powerUpsIndicatorGroup);
    }
    createShip(){
    this.currently_shooting = false;
    this.ship = new Ship(this,this.w*.5,this.h*.95,'shipbody');
    this.turret = this.createTurretSprite(this.w*.5,this.h*.88);
        this.input.on('pointerdown', (pointer) => {
            //console.log(this.currently_shooting)
            if(this.currently_shooting == false){
                this.currently_shooting = true;
                let targetx = pointer.x;
                let targety = pointer.y;
                let targetDeg = this.rotateToMouse(pointer, this.turret)
                setTimeout(()=>{
                    this.shootLaser(this,targetx,targety,targetDeg,this.turret);
                    this.currently_shooting = false;}
                    ,this.turret_rotate_time)
            }
        },this);
    }
    bombCrack(bomb,crack){
        this.explode(crack, crack.x,crack.y);
        this.spawnPowerUpCheck(crack.x,crack.y);
        this.crackGroup.remove(crack);
        crack.repair(this);
        this.gain_score(this.difficulty)
        this.play_sound("scoreUp");
    }
    
    //Create physics groups
    createGroups(){
        this.laserGroup = new LaserGroup(this); 
        this.crackGroup = this.physics.add.group({});
        this.blastGroup = this.physics.add.group({});
        this.bombGroup = this.physics.add.group({});
        this.powerUpsGroup = this.physics.add.group({});
        this.powerUpsIndicatorGroup = this.physics.add.group({});
        this.powerUpsGroup.defaults = {};
        this.powerUpsIndicatorGroup.defaults = {};
    }
    //decrease health of the ship
    shipHit(ship,blast){
        let hitspark = this.add.particles(blast.x, ship.y-100, 'smoke', {
            speed: 250,
                tint: 0xFF11FF,
                quantity: 5,
                scale: { start: 0.1, end: 1 },
                alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
                lifespan: 500
            });
        this.tweens.add({
            targets: hitspark,
            alpha: .25,
            duration: 500,
            onComplete: () => {
                hitspark.destroy()
            },
        })
        ship.decreaseHealth();
        //console.log(ship.getHP())
    }
    //destroy time crack
    destroyCrack(beam,crack){
        if(crack.exploding == 1){
            return;
        }
        this.explode(crack, crack.x,crack.y);
        if(this.ship.getWeapon() != 'Piercing Laser'){
            beam.setActive(false);
            beam.setVisible(false);
            beam.body.reset();
            beam.reset();
        }
        this.spawnPowerUpCheck(crack.x,crack.y);
        this.crackGroup.remove(crack);
        crack.repair(this);
        this.gain_score(this.difficulty)
        this.play_sound("scoreUp");
        
    }
    //explosion animation
    explode(crack, x,y){
        let color = this.choose_color();
        
        let explosion = this.add.particles(x, y, 'repair', {
            speed: 250,
                tint: color,
                quantity: 7,
                scale: { start: 0.1, end: 1 },
                alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
                lifespan: 1000
            });
        this.tweens.add({
            targets: explosion,
            alpha: .25,
            duration: 1000,
            onComplete: () => {
                explosion.destroy()
            },
        })
        //setTimeout(() => {explosion.destroy()}, 1000);
        //console.log(cra}ck.type)
        // let explosion = this.physics.add.sprite(x,y,'repairblast').setAlpha(0).setAngle(Math.random() * 360);
        // let scene = this;
        // let delay_value = 300;
        // if(crack.type == "bolt"){
        //     delay_value += 100;
        // }else
        // {
        //     this.tweens.add({
        //         targets:explosion,
        //         delay:delay_value,
        //         alpha: .2,
        //         scale: 5,
        //         duration: 500,
        //         onComplete: function(){
        //             scene.tweens.add({
        //                 targets: explosion,
        //                 alpha: 0,
        //                 duration: 1000,
        //                 onComplete: function(){
        //                     explosion.destroy();
        //                 }
        //             })
        //         }
        // })}
    }
    explodePowerup(powerup, x,y){
        let color = this.choose_color();
        let explosion = this.add.particles(x, y-30, 'repair', {
            speed: 250,
                tint: color,
                quantity: 7,
                scale: { start: 0.1, end: 1 },
                alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
                lifespan: 1000
            });
        this.tweens.add({
            targets: explosion,
            y: y-120,
            alpha: .25,
            duration: 1000,
            onComplete: () => {
                explosion.destroy()
            },
        })
    }
    getRandomBetween(min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    //Simple Score Function
    gain_score(val){
        this.score += (5 * val);
    }
    //Collect powerup
    getPowerup(beam,powerup){
        this.explodePowerup(powerup,powerup.x,powerup.y)
        beam.setActive(false);
        beam.setVisible(false);
        beam.body.reset();
        beam.reset();
        this.powerUpsGroup.remove(powerup);
        powerup.collectPowerUp(this); 
        this.gain_score(5*this.difficulty);
    }
    //audio
    play_music(){
        if(localStorage.getItem("music") != 1){
            if(this.currently_playing_music == false){
                this.bgm.play()
                this.currently_playing_music = true
            }
        }else{
            this.currently_playing_music = false
            this.bgm.stop()
        }
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
    //For the turret rotation animation
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

        //Locks the turret to 180 degrees facing north
        if(targetDeg > 0){
            if(targetDeg > 90){
                targetDeg = -180;
            }else{
                targetDeg = 0;
            }
        }
        
        console.log(targetDeg);

    
        this.tweens.add({
            targets: targets,
            angle: targetDeg,
            duration: this.turret_rotate_time,
        })
        return targetDeg;
    }
    //initialize Scene
    sceneLayout(){
        console.log("DefenderGameScene");
        
        this.g_startTime = performance.now()/1000.0;
        this.g_seconds;
     
  
        this.blinkTimer = this.time.delayedCall(25000, this.blinkOn, [], this);
        this.blinkTimer.paused = true;
        this.powerupTimer = this.time.delayedCall(30000, this.powerupOff, [], this);
        this.powerupTimer.paused = true;
        
        this.score = 0;
        //console.log(this.choose_color());
        this.createGroups();
        this.createShip(); 
        this.blink = this.tweens.add({
            targets: this.turret,
            alpha: .5,
            yoyo: true,
            loop: -1,
            duration: 250,
        })
        this.blink.pause();
        
        this.blinkTimer;
        this.powerupTimer;
        this.createCollision(); 
        this.bombButton();
        // this.spawnPowerup(500,500);
        // this.spawnPowerup(500,500);

        this.bgm = this.sound.add('bgm', {loop: true, volume: 0.5});
        this.currently_playing_music = false;
        this.play_music()
    }
    // Fire the Laser in the direction of the pointerdown location
    shootLaser(scene,targetx,targety,targetDeg,turret){
        this.laserGroup.fireLaser(scene,targetx,targety,targetDeg,turret);
    }
    powerupBlinkTimer(){
        this.blinkTimer.reset({delay: 25000, callback: this.blinkOn, args: [], callbackScope: this})
        this.powerupTimer.reset({delay: 30000, callback: this.powerupOff, args: [], callbackScope: this})
    }
    powerupOff(){
        this.blink.restart();
        this.blink.pause();
        this.ship.resetWeapon();
    }
    blinkOn(){
        //this.blink.restart();
        this.blink.resume();
    }
    // creates a random time fissure and adds it to the collision group
    spawnCrack(){
        let dev = false;
        if(dev){
            this.crackGroup.add(new TimeCrackBolt(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)));
            this.play_sound("alert");
            return;
        }
        if(this.difficulty < 10){
            this.crackGroup.add(new TimeCrackRing(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)));
        }else{
            let choice = this.getRandomBetween(1,11);
            if(choice < 8){
                this.crackGroup.add(new TimeCrackRing(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)));
            }else if(choice >= 8){
                this.crackGroup.add(new TimeCrackBolt(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)));
            }
        }
        this.play_sound("alert");
    }
    //randoms a spawn
    spawnPowerUpCheck(x,y){
    //     if (this.getRandomBetween(1,101) <= Math.max(5,(15 - this.difficulty/2))){
    //         this.spawnPowerup(x,y)}
    // }
        if(this.getRandomBetween(1,101) <= 20){
            this.spawnPowerup(x,y);
        }
    }
    spawnDanger(){
        if(this.getRandomBetween(0,1000) < 5 + this.difficulty && this.crackGroup.getLength() < this.difficulty/2 ){
            this.spawnCrack();
      }
    }
    // randomly spawns one of the powerups
    spawnPowerup(x,y){
        let chosen = this.getRandomBetween(1,4);
        switch(chosen){
            case 1:
                new HealthUp(this,x,y);
                break;
            case 2:
                new Bomb(this,x,y);
                break;
            case 3:
                new PierceAmmo(this,x,y);
                break;
        }
        
    }
    update(){

    }
}
