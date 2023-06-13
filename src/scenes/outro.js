class Outro extends DefenderScene {
    constructor() {
        super('outro');
        //console.log("credits")
    }

    sceneLayout(){

    }
    onEnter(){

        let survived = 3;
        let outrotext = this.add.text(this.game.config.width/6,this.game.config.height*.25)
        .setText("Your crew has returned from it's duties repairing the time stream.\n\n Thanks to your repairs, the Consortium was able to prevent Time from converging on your civilizations frame in the timestream, preventing it from collapse for another "+ survived + " days.")
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 40}px` })
        .setWordWrapWidth(this.w * .75); 
        this.time.delayedCall(7000, () => {
            //this.scene.start('credits', { inventory: this.inventory });
            this.scene.start('credits');
        });
    }
    update(){
        //console.log("cred");
    }
}