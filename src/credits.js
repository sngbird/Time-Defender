class Credits extends DefenderScene {
    constructor() {
        super('credits');
    }
    preload(){

    }
    sceneLayout(){

    }
    onEnter(){

        this.input.on('pointerdown', ()=>{
            //Go to beginning scene
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                this.scene.start('intro')
        })

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
