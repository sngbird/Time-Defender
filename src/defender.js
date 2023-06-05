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
    this.ship = new Ship(this.w*.5,this.h*.95,'shipbody');
    let turret = this.createTurretSprite(this,this.w*.5,this.h*.88);
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
    this.physics.add.overlap(this.blastGroup, this.ship, this.ship.decreaseHealth(), null, this);
    //let trial = new TimeCrack(this,500,500);
    //this.crackGroup.add(trial);
    
    }
    update(){
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
        this.laserGroup.fireLaser(scene,targetx,targety,targetDeg,turret);
    }

    destroyCrack(beam,crack){
        beam.setActive(false);
        beam.setVisible(false);
        beam.body.reset();
        this.explode(crack.x,crack.y);
        crack.repair(this);
        
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
