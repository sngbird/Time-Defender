
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
    scene: [Temp, Logo, Credits, Intro, Gameplay],
    title: "Time Defender",
});
