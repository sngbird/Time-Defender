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
        this.HP = this.add.text(this.game.config.width*.05,this.game.config.height*.92)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        
        this.diffText = this.add.text(this.game.config.width*.65,this.game.config.height*.92)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
    }
    update(){
        this.g_seconds = performance.now()/1000.0 - this.g_startTime;
        this.difficulty = Math.round(this.g_seconds /15);
        console.log(this.difficulty)
        this.HP.setText("HP: "+ this.ship.getHP() + " / " + this.ship.getMax())
        this.diffText.setText("Difficulty: " + this.difficulty)

        if(this.getRandomBetween(0,1000) < 5 +this.difficulty){
              this.crackGroup.add(new TimeCrack(this,this.getRandomBetween(this.w*.1,this.w*.9),this.getRandomBetween(this.h*.1,this.h*.6)))
        }
        if (this.ship.getHP() <= 0){
            this.scene.restart();
        }
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
