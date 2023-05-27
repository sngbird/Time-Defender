class Intro extends DefenderScene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.image('title', "Assets/Title.png");

        this.pre_load();
    }

    onEnter(){

        let title_cont = this.add.container(this.game.config.width/2,this.game.config.height/4)
        
        //The rectangle prevents stars from showing below the entire title, Is this something we want?
        title_cont.add(this.add.rectangle(0,-10,830,180,0x000000).setOrigin(0.5,0.5));
        title_cont.add(this.add.image(0,0,'title').setScale(4).setOrigin(0.5,0.5));

        let t1 = this.add.tween({
            targets: title_cont,
            paused: false,
            duration: 8000,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "easeInOutQuint",
            
        });
        
        // I would like the angle to start at 0 but I cant seem to figure out how to do that
        let r = this.add.tween({
            targets: title_cont,
            angle: {from: -3, to: 3},
            duration: 12000,
            yoyo:true,
            repeat: -1,
        })

        // let title = this.add.text(this.game.config.width/4,this.game.config.height/4)
        // .setText("Time Defender")
        // .setStyle({ fontSize: `${1.5 * 70}px` })
        // .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 

        // A Box that will prevent the stars from showing above it. Im using this for the title and I will most likely add it for the names eventually
        //let credit_box = this.add.rectangle(this.game.config.width/4,this.game.config.height/4 * 3, 800,230, 0x000000).setOrigin(0,0);
        let credit = this.add.text(this.game.config.width/4,this.game.config.height/4 * 3)
        .setText("Created by:\n Ethan Earle \n Lumina Kinsinger-Dang \n Wyatt Hawes")
        .setStyle({ fontSize: `${1.5 * 40}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        

    
    }
}

class Test extends DefenderGameScene{
    constructor(){
        super('test')
    }
    onEnter(){
        // this.turret = this.createTurret(this.w*.3,this.h*.2);
        // let turretSprite = this.createTurretSprite(this.w*.5,this.h*.5);
        // console.log(this.turret);
        // console.log(this.turret.list[0]);

        // this.tweens.add({
        //     targets: turretSprite,
        //     angle: -360,
        //     duration: 6000,
        //     yoyo: true,
        //     repeat: -1
        // });    
        // this.tweens.add({
        //     targets: this.turret.list,
        //     angle: -15,
        //     duration: 6000,
        //     yoyo: true,
        //     repeat: -1
        // });    
    }
   

    
    
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        
    },
    scene: [Intro],
    title: "Time Defender",
});
