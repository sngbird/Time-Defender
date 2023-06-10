class Temp extends DefenderScene {
    constructor() {
        super('temp');
        console.log("temp")
    }
    pre_load(){
        console.log("loading icons");
        this.load.image('sound','src/assets/sound.png')
        this.load.image('music','src/assets/music.png')
        this.load.image('options', 'src/assets/options_no_edge.png')

    }
    sceneLayout(){

    }
    onEnter(){
        this.make_menu()
        

    }
    make_menu(){
        let mee = this;

        this.menu = this.add.container(this.game.config.width/2, 1400);
        this.menu.add(this.add.rectangle(-200,-240,400,500,0x0F0F0F).setOrigin(0,0))
        
        //Adding rectangle to lower menu
        let hide_rectangle = this.add.rectangle(0,-200,400,80,0xaaaaaa).setInteractive();
        this.menu.add(hide_rectangle)

        let triangles = this.add.container(0,0);
        this.menu.add(this.add.sprite(-100,-225,'options').setOrigin(0,0).setScale(1.6))

        triangles.add(this.add.triangle(-150,-224, -50,0,50,0,0,50,0x707070).setOrigin(0,0))
        triangles.add(this.add.triangle(150,-224, -50,0,50,0,0,50,0x707070).setOrigin(0,0))
        this.menu.add(triangles)
        let menu_state = "down"
        let mt;
        if(menu_state == "down"){
            triangles.angle = 180;
            triangles.y = triangles.y - 400
            
            mt = this.add.tween({
                targets: this.menu,
                delay: 3000,
                repeatDelay: 5000,
                repeat: -1,
                ease: "Back.Out",
                y: 1400 - 20,

            })
        }
        hide_rectangle.on('pointerdown', ()=>{
            mt.pause();
            if(menu_state == "up"){
                mee.add.tween({
                targets: this.menu,
                duration: 600,
                y: 1400,
                ease: "Back.In",
                onComplete:()=>{
                    triangles.angle = 180;
                    triangles.y = triangles.y - 400
                }
                })
                menu_state = "down";
            }else{
                mee.add.tween({
                    targets: this.menu,
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
        this.create_clickable_x_button(sound_bit,sound_sprite,surrounding_box, "sound")


        //Adding music button
        let music_bit = this.add.container(0, 150)
        let surrounding_box2 = this.add.rectangle(5,0,100,100,0x0f0f0f).setInteractive();
        music_bit.add(surrounding_box2)
        let music_sprite = this.add.sprite(0,0,'music')
        music_bit.add(music_sprite);
        this.create_clickable_x_button(music_bit, music_sprite,surrounding_box2, "music")


        //Adding buttons to the menu
        this.menu.add(sound_bit);
        this.menu.add(music_bit)

        //Scaling menu
        this.menu.setScale(2);

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
