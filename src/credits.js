class Credits extends DefenderScene {
    constructor() {
        super('credits');
    }
    preload(){

    }
    sceneLayout(){

    }
    onEnter(){

        this.input.on('pointerup', ()=>{
            //Go to beginning scene
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                //this.scene.get('intro').bringToTop();
                if(localStorage.getItem("active_scene") == "credits"){
                    console.log("credits clicked")
                    //this.scene.bringToTop("intro");

                    this.scene.resume("intro");

                    localStorage.setItem("active_scene","transition");

                    let rect1 = this.scene.get('credits').add.rectangle(0,0,this.game.config.width, this.game.config.height, 0x000000).setOrigin(0,0).setDepth(10).setAlpha(0);
                    let rect2 = this.scene.get('intro').add.rectangle(0,0,this.game.config.width, this.game.config.height, 0x000000).setOrigin(0,0).setDepth(10);


                    this.scene.get('credits').add.tween({
                        targets:rect1,
                        duration: 300,
                        alpha: 1,
                        onComplete: ()=>{
                            //this.scene.pause('logo');
                            this.scene.bringToTop("intro");
                            //this.scene.pause("intro")
                            this.scene.get('intro').add.tween({
                                targets:rect2,
                                duration: 300,
                                alpha: 0,
                                onComplete: ()=>{
                                    rect1.setAlpha(0);
                                    localStorage.setItem("active_scene","intro");
                                }
                            })
                        }

                    })


                }
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
    update(){
        //console.log("cred");
    }
}
