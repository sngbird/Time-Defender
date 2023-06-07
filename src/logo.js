class Logo extends DefenderScene{

    constructor(){
        super("logo")
    }
    pre_load(){
        console.log("Loading logo")
        this.load.image('logo', "Assets/Company_Logo.png");
        

    }


    create(){
        let watched = localStorage.getItem("logo_watched");
        if(watched == "true"){
            this.scene.start('intro');
            localStorage.setItem("intro_skipped", "true");
            return;
        }
        localStorage.setItem("intro_skipped", "false");
        localStorage.setItem("logo_watched", "true");

        this.transitionDuration = 3000;
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        let log = this.add.sprite(this.game.config.width/2,this.game.config.height/2,'logo');

        let chain = this.tweens.chain({
            targets: log,
            repeat: 0,
            tweens: [
                {
                    delay: 300,
                    targets: log,
                    duration: 1000,
                    angle: 360,
                },
                {
                    duration:150,
                    repeat: 3,
                    delay: 50,
                    ease: "",
                    scale: 3,
                    
                },
            ]
        });

        this.time.delayedCall(this.transitionDuration + 100, () => this.gotoScene("intro"));

        this.input.on('pointerdown', ()=>{
            //Go to beginning scene
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                this.scene.start('intro')
        })
    
    }

    gotoScene(key) {
        console.log("t")
        this.cameras.main.fadeOut(this.transitionDuration, 0, 0,0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }
}