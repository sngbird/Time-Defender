class Logo extends DefenderScene{

    constructor(){
        super("logo")
    }
    pre_load(){
        //console.log("Loading logo")
        this.load.image('logo', "Assets/Company_Logo.png");
        

    }


    create(){
        let watched = localStorage.getItem("logo_watched");
        localStorage.removeItem("active_scene");
        //this.view_blocker = this.add.rectangle(0,0, this.game.config.width, this.game.config.height, 0x000000).setOrigin(0,0);
        if(watched == "true"){
            console.log("already watched");
            this.scene.start('intro');

            localStorage.setItem("active_scene", "intro");
            localStorage.setItem("intro_skipped", "true");
            return;
        }
        localStorage.setItem("active_scene","logo");
         this.scene.launch("intro");
        this.scene.get('intro').events.once('start', () => {
             this.scene.setVisible(false, 'intro');
        });

        this.scene.bringToTop("logo");
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

        this.next_trigger = 0;
        this.time.delayedCall(this.transitionDuration + 1000, () => {
            this.transition();
            
        });

        this.input.on('pointerdown', ()=>{
            console.log(localStorage.getItem("active_scene"));
            if(localStorage.getItem("active_scene") == "logo"){
            //Go to beginning scene
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                console.log("Logo Clicked");
                this.transition();
            }
        })
    
    }

    transition(){
        let next_trigger = this.next_trigger;
        if(next_trigger != 1){
            localStorage.setItem("active_scene","transition");
            next_trigger = 1;
            this.next_trigger = 1;
            this.cameras.main.fadeOut(500, 0, 0, 0);
                let rect;
                this.time.delayedCall(500,   () => {
                    this.scene.setVisible(false,"logo");
                    rect = this.scene.get('intro').add.rectangle(0,0,this.game.config.width, this.game.config.height, 0x000000).setOrigin(0,0).setDepth(10);
                });
                this.time.delayedCall(1000, () => {
                    this.scene.get('intro').add.tween({
                        targets: rect,
                        duration: 3000,
                        alpha: 0,
                    })
                    this.scene.setVisible(true,"intro");
                    localStorage.setItem("active_scene","intro");
                    //this.view_blocker.setAlpha(0)
                    //rect.setAlpha(0);
                    //this.time.delayedCall(300, () => this.cameras.main.fadeIn(5000, 0, 0, 0));
                })
        }
    }

    gotoScene(key) {
        console.log("t")
        this.cameras.main.fadeOut(this.transitionDuration, 0, 0,0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }
}