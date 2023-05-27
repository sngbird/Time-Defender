class Credits extends DefenderScene {
    constructor() {
        super('credits');
    }
    sceneLayout(){}
    onEnter(){
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

class Test extends DefenderGameScene{
    constructor(){
        super('test')
    }
    onEnter(){
    }
    update(){
        // if(this.getRandomBetween(0,1000) < 5){
        //     
        // }
        
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
        arcade:{
        debug: true,
        }
        
    },
    scene: [Test],
    title: "Time Defender",
});
