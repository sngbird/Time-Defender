class Outro extends DefenderScene {
    constructor() {
        super('outro');
        //console.log("credits")
    }
    init(data){
        this.difficulty = data.difficulty;
        this.score = data.score;
    }
    sceneLayout(){

    }
    onEnter(){

        let survived = 3;
        let outrotext = this.add.text(this.game.config.width/6,this.game.config.height*.25)
        .setText("Your crew has returned from it's duties repairing the time stream.\n\n Thanks to your repairs, the Temporal Defense Consortium was able to prevent Time from converging, preventing it from collapse for another "+ this.difficulty + " days.")
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 40}px` })
        .setWordWrapWidth(this.w * .75);
        let scoretext = this.add.text(this.game.config.width*.45,this.game.config.height*.15)
        .setText("Score: "+this.score)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 40}px` })
        .setWordWrapWidth(this.w * .75);  
        this.time.delayedCall(8000, () => {
            //this.scene.start('credits', { inventory: this.inventory });
            this.scene.start('credits');
        });
    }
    update(){
        //console.log("cred");
    }
}