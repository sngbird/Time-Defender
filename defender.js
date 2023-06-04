class DefenderScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload(){
        //loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('star','Assets/star.png')
        this.load.image('turret','Assets/turretplaceholder.png')
        this.load.image('repairblast','Assets/repairblastplaceholder.png')
        this.load.image('repairbeam','Assets/repairbeamplaceholder.png')
        this.load.image('timecrack','Assets/timecrack.png')


     

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
    let turret = this.createTurretSprite(this.w*.5,this.h*.8);
        this.input.on('pointerdown', (pointer) => {
            let targetx = pointer.x;
            let targety = pointer.y;
            let targetDeg = this.rotateToMouse(pointer, turret)
            setTimeout(()=>{            this.shootLaser(this,targetx,targety,targetDeg,turret);
            },500)
            //this.repair(this,targetx,targety, targetDeg, turret)
        },this);
    this.crackGroup = this.physics.add.group({});
    this.crackGroup.add(this.crack(.25,.5));
    this.laserGroup = new LaserGroup(this);    
    this.physics.add.overlap(this.laserGroup, this.crackGroup, this.destroyCrack, null, this);
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
    crack(xmult,ymult){
        let crack = this.physics.add.sprite(this.w*xmult,this.h*ymult,'timecrack');
        this.tweens.add({ 
            targets: crack,
            scale:20,
            duration: 5000,
        })
        return(crack)
    }
    destroyCrack(beam,crack){
        beam.destroy();
        crack.destroy();
        
    }
    getRandomBetween(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
      }
}