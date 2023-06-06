class DefenderScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload(){
        //loadFont("witchkin", "assets/witchkin.ttf");
        console.log("loading stars");
        this.load.image('star','Assets/star.png')
        this.load.image('turret','Assets/turretplaceholder.png')
        
        this.pre_load()
    }
    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#000');
        //Ship and Starfield Background
        this.particle_system = this.add.particles(this.w*1.3, 0, 'star', {
            y: { min: 0, max: this.h },
            quantity: 2,
            lifespan: 7000,
            gravityX: -200,
            //speedX: -150,
        });
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        //this.input.on('pointerup', this.handlePointerUp(pointer))
        let testTurret = this.createTurretSprite(this.w*.5,this.h*.5);
        
        this.thisturr = testTurret;
        this.input.on('pointerup', (pointer) => {
            this.handlePointerUp(pointer, testTurret)
        });

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
}