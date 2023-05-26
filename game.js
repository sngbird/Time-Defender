class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){

    }
    create(){
        let title = this.add.text(this.game.config.width/4,this.game.config.height/4)
        .setText("Time Defender")
        .setStyle({ fontSize: `${1.5 * 70}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        let credit = this.add.text(this.game.config.width/4,this.game.config.height/2)
        .setText("Created by:\n Ethan Earle \n Lumina Kinsinger-Dang \n Wyatt Hawes")
        .setStyle({ fontSize: `${1.5 * 40}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 

    
    }
}

class Test extends DefenderScene{
    constructor(){
        super('test')
    }
    onEnter(){
        this.turret = this.createTurret(this.w*.3,this.h*.2);
        let turretSprite = this.createTurretSprite(this.w*.5,this.h*.5);

        this.tweens.add({
            targets: turretSprite,
            angle: -360,
            duration: 6000,
            yoyo: true,
            repeat: -1
        });    
        this.tweens.add({
            targets: this.turret,
            angle: -15,
            duration: 6000,
            yoyo: true,
            repeat: -1
        });    }
   

    
    
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
    scene: [Test],
    title: "Time Defender",
});
