class DefenderScene extends Phaser.Scene {
    constructor(key) {
        super(key);
    }
    preload(){
        //loadFont("witchkin", "assets/witchkin.ttf");
        this.load.image('star','Assets/star.png')
        this.load.image('turret','Assets/turretplaceholder.png')

    }
    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;

        this.cameras.main.setBackgroundColor('#444');
        //Ship and Starfield Background
        this.add.particles(this.w*1.5, 0, 'star', {
            y: { min: 0, max: this.h },
            quantity: 2,
            lifespan: 7000,
            gravityX: -200
        });
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
    
        this.onEnter();


    }
    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }
    createTurret(){
        let dome = this.add.circle(this.w*.3,this.w*.25,50,'0xffffff',1);
        let barrel = this.add.rectangle(this.w*.3,this.w*.21,15,50, '0xffffff',1);
        const turret = this.add.container(this.w*.3,this.w*.25);
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
    loadFont(name, url) {
        var newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}


