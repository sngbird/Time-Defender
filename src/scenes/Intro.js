class Intro extends DefenderScene {
    constructor() {
        super('intro');
    }
    pre_load(){
        this.load.image('title', "src/assets/sprites/Title.png");
        this.load.image('play', "src/assets/sprites/Play.png");
        this.load.image('credits', "src/assets/sprites/credits.png");
        this.load.image('sound','src/assets/sprites/sound.png')
        this.load.image('music','src/assets/sprites/music.png')
        this.load.image('options', 'src/assets/sprites/options_no_edge.png')


    }

    sceneLayout(){

    }

    onEnter(){
        console.log("Intro running");
        //
        this.GAMEPLAY_SCENE = "gameplay";

        if(localStorage.getItem("intro_skipped") != "true"){
            this.cameras.main.fadeIn(7000, 0, 0, 0);
        }

        //this.thisturr.setOrigin(0.5,0.5);
        //this.thisturr.setPosition(this.game.config.width/2,this.game.config.height/2.5)
        let title_cont = this.add.container(this.game.config.width/2,this.game.config.height/4)
        
        //The rectangle prevents stars from showing below the entire title, Is this something we want?
        title_cont.add(this.add.rectangle(0,-20,800,140,0x000000).setOrigin(0.5,0.5));
        title_cont.add(this.add.image(0,0,'title').setScale(4).setOrigin(0.5,0.5));

        let t1 = this.add.tween({
            targets: title_cont,
            paused: false,
            duration: 7000,
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "Sine.easeInOut",
            
        });
        
        // I would like the angle to start at 0 but I cant seem to figure out how to do that
        let r = this.add.tween({
            targets: title_cont,
            angle: {from: -3, to: 3},
            duration: 12000,
            yoyo:true,
            repeat: -1,
        })

        this.add_buttons(title_cont);
        //Adding play button
        
        //Credits button
        
        this.make_options_menu();
    }


    run_transition_animation(me2, title_cont, play_button, credit){
        let r = me2.add.tween({
            delay: 0,
            targets: credit,
            duration: 6000,
            ease: "Quad.easeIn",
            x: -2000,
        });

        me2.add.tween({
            delay: 0,
            targets: [title_cont,play_button],
            duration: 5000,
            ease: "Quad.easeIn",
            x: -800
        })
        return;
    }

    add_buttons(title_cont){

        let play_button = this.add.container(this.game.config.width/2, this.game.config.height/5 * 3);
        let button = this.add.image(0,0, 'play').setScale(2).setInteractive();
        let button_background = this.add.rectangle(0,0,90,40,0x000000).setScale(2).setInteractive();
        play_button.add(button_background)
        play_button.add(button);

        let twn = this.add.tween({
            targets: [button,button_background],
            duration: 3000,
            scale:3,
            yoyo: true,
            repeat: -1,
            ease: "Sine.InOut"
        })

        //adding credits button
        let xv = 0;
        let yv = 200
        let cbutton = this.add.image(xv,yv, 'credits').setScale(2).setInteractive();
        let cbutton_background = this.add.rectangle(xv,yv,130,40,0x000000).setScale(2).setInteractive();
        play_button.add(cbutton_background)
        play_button.add(cbutton);


        //let credit = this.add.text(this.game.config.width/100,this.game.config.height/5 * 4)
        //.setText("Created by:\n Ethan Earle \n Lumina Kinsinger-Dang \n Wyatt Hawes")
        //.setStyle({ fontSize: `${1 * 40}px` })
        //.setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        

        let me2 = this;
        button.on('pointerdown', ()=>{
            
            twn.pause();
            me2.add.tween({
                targets: [button, button_background],
                duration:50,
                scale: 1.5,
                ease: ""
            })
        })

        let going_to_next_scene = 0;

        this.input.on('pointerup', ()=> {
            if(going_to_next_scene == 1){
                this.scene.start(this.GAMEPLAY_SCENE)
            }
        })

        button.on('pointerup', ()=>{
            me2.time.delayedCall(1000, ()=>{going_to_next_scene = 1});
            //Go to beginning scene
            me2.add.tween({
                targets: [button, button_background],
                duration:50,
                scale: 2,
                ease: ""
            })

            this.run_transition_animation(me2, title_cont, play_button);
            me2.time.delayedCall(6000, ()=>{
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene

                // Or even not do multiple "scenes" and just continue this one 
                console.log("Starting gameplay");

                this.scene.start(this.GAMEPLAY_SCENE);
                this.scene.sendToBack('credits');
                
            });

            me2.add.tween({
                targets: this.settings_menu,
                y:6000,
                duration:12000,
                ease: "Circ.In"
            })
        })

        cbutton.on('pointerdown', ()=>{
            
            //twn.pause();
            me2.add.tween({
                targets: cbutton,
                duration:50,
                scale: 1.5,
                ease: ""
            })
        })


        this.scene.launch("credits");
        this.scene.get('credits').events.once('start', () => {
            this.scene.setVisible(false, 'credits');
        });

        this.scene.bringToTop("intro");

        //localStorage.setItem("active_scene","intro")
        cbutton.on('pointerup', ()=>{
            if(localStorage.getItem("active_scene") == "intro"){
            //Go to beginning scene
                //Scene transition
                //I want to see if we can "load" the other scene before transitioning so there is
                //no gap in the stars when you load the next scene
                localStorage.setItem("active_scene","transition");
                me2.add.tween({
                    targets: cbutton,
                    duration:50,
                    scale: 2,
                    ease: ""
                })

                // Or even not do multiple "scenes" and just continue this one 
                let rect1 = this.scene.get('intro').add.rectangle(0,0,this.game.config.width, this.game.config.height, 0x000000).setOrigin(0,0).setDepth(10).setAlpha(0);
                let rect2 = this.scene.get('credits').add.rectangle(0,0,this.game.config.width, this.game.config.height, 0x000000).setOrigin(0,0).setDepth(10);


                this.scene.get('intro').add.tween({
                    targets:rect1,
                    duration: 300,
                    alpha: 1,
                    onComplete: ()=>{
                        //this.scene.pause('logo');
                        this.scene.bringToTop("credits");
                        this.scene.setVisible(true, 'credits');
                        //this.scene.pause("intro")
                        this.scene.get('credits').add.tween({
                            targets:rect2,
                            duration: 300,
                            alpha: 0,
                            onComplete: ()=>{
                                rect1.setAlpha(0);
                                this.scene.pause("intro");
                                localStorage.setItem("active_scene","credits");
                            }
                        })

                    }
                })


            }  
        })

    }

    update(){
        return;
        this.thisturr.rotation = (Phaser.Math.Angle.Between(
            this.thisturr.x, this.thisturr.y, game.input.mousePointer.x, game.input.mousePointer.y
            ))
    }

    make_options_menu(){
        let mee = this;

        let bottom_val = 1250;
        this.settings_menu = this.add.container(this.game.config.width/2, bottom_val);
        this.settings_menu.add(this.add.rectangle(-200,-240,400,500,0x0F0F0F).setOrigin(0,0))
        
        //Adding rectangle to lower menu
        let hide_rectangle = this.add.rectangle(0,-200,400,80,0xafafaf).setInteractive();
        this.settings_menu.add(hide_rectangle)

        let triangles = this.add.container(0,0);
        this.settings_menu.add(this.add.sprite(-100,-225,'options').setOrigin(0,0).setScale(1.6))

        triangles.add(this.add.triangle(-150,-214, -50,0,50,0,0,50,0x707070).setOrigin(0,0).setScale(0.5))
        triangles.add(this.add.triangle(150,-214, -50,0,50,0,0,50,0x707070).setOrigin(0,0).setScale(0.5))
        this.settings_menu.add(triangles)
        let menu_state = "down"
        let mt;
        if(menu_state == "down"){
            triangles.angle = 180;
            triangles.y = triangles.y - 400
            
            mt = this.add.tween({
                targets: this.settings_menu,
                delay: 3000,
                repeatDelay: 3000,
                repeat: -1,
                ease: "Back.Out",
                y: bottom_val - 20,

            })
        }
        let once = 0
        hide_rectangle.on('pointerdown', ()=>{
            mt.pause();
            if(once == 0){
                once = 1;
            this.settings_menu.y = bottom_val;
            }
            once = 1;
            if(menu_state == "up"){
                mee.add.tween({
                targets: this.settings_menu,
                duration: 600,
                y: bottom_val,
                ease: "Back.In",
                onComplete:()=>{
                    triangles.angle = 180;
                    triangles.y = triangles.y - 400
                }
                })
                menu_state = "down";
            }else{
                mee.add.tween({
                    targets: this.settings_menu,
                    duration: 600,
                    y: this.game.config.height/2,
                    ease: "Back.In",
                    onComplete:()=>{
                        triangles.angle = 0;
                        triangles.y = triangles.y + 400
                    }
                    
                })
                menu_state = "up"
            }
        });


        //Adding sound button
        let sound_bit = this.add.container(0, -50);
        let surrounding_box = this.add.rectangle(5,0,100,100,0x0f0F0F).setInteractive();
        sound_bit.add(surrounding_box);
        let sound_sprite = this.add.sprite(0,0,'sound')
        sound_bit.add(sound_sprite);

        //Do NOT CHANGE THE SOUND TAG HERE, IT CONTROLS THE VOLUME IN OTHER SCENES
        this.create_clickable_x_button(sound_bit,sound_sprite,surrounding_box, "sound")


        //Adding music button
        let music_bit = this.add.container(0, 150)
        let surrounding_box2 = this.add.rectangle(5,0,100,100,0x0f0f0f).setInteractive();
        music_bit.add(surrounding_box2)
        let music_sprite = this.add.sprite(0,0,'music')
        music_bit.add(music_sprite);

        //Do NOT CHANGE THE SOUND TAG HERE, IT CONTROLS THE VOLUME IN OTHER SCENES
        this.create_clickable_x_button(music_bit, music_sprite,surrounding_box2, "music")


        //Adding buttons to the menu
        this.settings_menu.add(sound_bit);
        this.settings_menu.add(music_bit)

        //Scaling menu
        this.settings_menu.setScale(1);

        //menu tween
    }

    create_clickable_x_button(container, Image, surrounding_box, index){
        let lines = this.add.container(0,0);
        lines.add(this.add.line(30,30,-30,-30,30,30,0xFF0000).setLineWidth(3))
        lines.add(this.add.line(30,30,-30,30,30,-30,0xFF0000).setLineWidth(3))
        container.add(lines).setScale(2);

        let opacity = localStorage.getItem(index);
        if(opacity == null){
            localStorage.setItem(index, 0);
        }

        lines.setAlpha(opacity);
        surrounding_box.on('pointerdown', ()=>{
            console.log(index)
            shake.pause();
            Image.angle = 0;
            if(lines.alpha == 1){
                localStorage.setItem(index, 0);
                lines.setAlpha(localStorage.getItem(index));
            }else{
                localStorage.setItem(index, 1);
                lines.setAlpha(localStorage.getItem(index))
            }
            this.add.tween({
                targets: Image,
                duration: 75,
                scale: 1.4,
                ease: "" ,
            });
        })
        surrounding_box.on('pointerup', ()=>{
            this.add.tween({
                targets: Image,
                duration: 50,
                scale: 1,
                ease: "" ,
            });
        })
        let c = 0;
        let shake = this.tweens.chain({
            targets: Image,
            repeat: -1,
            tweens: [
                {
                    duration:25,
                    repeat: 0,
                    delay: 0,
                     ease: "Sin.InOut",
                    angle: {from: 0, to: 5}
                },
                {
                    duration:50,
                    repeat: 0,
                    delay: 0,
                    ease: "Sin.InOut",
                    angle: {from: 5, to: -5},
                },
                {
                    duration:25,
                    repeat: 0,
                    delay: 0,
                    ease: "Sin.InOut",
                    angle: {from: -5, to: 0},
                },


            ],
            onLoop: ()=>{
                //console.log(c);
                if(c == 0){
                    shake.loopDelay = 3000;
                    c++;
                    
                }else{
                    shake.loopDelay = 0;
                    c++;
                    if (c >= 3){
                        c = 0;
                    }
                }
            }
        })
    }
}