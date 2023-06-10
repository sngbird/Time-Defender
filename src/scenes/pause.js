class Pause extends Phaser.Scene {
    constructor() {
        super("pause");
        console.log("pause")
    }
    preload(){
        this.load.image('resume','src/assets/sprites/Resume.png')
        this.load.image('return_title','src/assets/sprites/title_return.png')
        this.load.image('pause_btn','src/assets/sprites/pause_button.png')

        this.load.image('sound','src/assets/sprites/sound.png')
        this.load.image('music','src/assets/sprites/music.png')
    }
    create() {  

        //making the pause button in the bottom left

        let pbtn = this.add.sprite(65,this.game.config.height - 65,"pause_btn").setOrigin(0.5,0.5).setInteractive().setScale(2);
        pbtn.on('pointerdown', ()=>{
            this.scene.pause("gameplay")
            this.add.tween({
                targets: pbtn,
                scale: 1.6,
                duration: 50,
            })
        })
        pbtn.on('pointerup', ()=>{
            this.scene.pause("gameplay")
            this.dim_rect = this.add.rectangle(0,0,this.game.config.width, this.game.config.height,0x0).setOrigin(0,0).setAlpha(.8).setDepth(0).setAlpha(0);
            //tweening the dimming effect, it currently does nothing but just incase we want to change it later.
            this.add.tween({
                targets: this.dim_rect,
                duration: 0,
                alpha: .7,
            })
            this.add.tween({
                targets: pbtn,
                scale: 2,
                duration: 50,
                onComplete: ()=>{
                    pbtn.visible = (false);
                    
                }
            })

           this.pause_container.y = this.game.config.height/2
        })
        


        //Here is the actual pause menu
        this.pause_container = this.add.container(this.game.config.width/2, 2000).setDepth(1);

        let resume = this.add.sprite(0 + 130,0 + 100, 'resume').setOrigin(0.5,0.5).setInteractive().setScale(2.2)
        let title = this.add.sprite(0+ 130,0 - 100, 'return_title').setOrigin(0.5,0.5).setInteractive().setScale(2.2)

        this.pause_container.add(this.add.rectangle(0,0,375,250,0x0F0F0F).setScale(2))
        this.pause_container.add(resume).add(title)

        resume.on('pointerdown', ()=>{
            //console.log("resume clicked!")
            this.add.tween({
                targets: resume,
                scale: 1.8,
                duration: 50,
            })
        })
        resume.on('pointerup', ()=>{
            this.time.delayedCall(3000, ()=>{pbtn.visible = true});
            this.countdown();
            this.time.delayedCall(3000, ()=> {this.scene.resume("gameplay"); this.dim_rect.visible = false; this.scene.get('gameplay').play_music()});
            this.time.delayedCall(2000, ()=>{
                this.add.tween({
                    targets: this.dim_rect,
                    duration: 1000,
                    alpha: 0.000001,
                })
            })
            //console.log("resume clicked!")
            this.add.tween({
                targets: resume,
                scale: 2.2,
                duration: 50,
            })
            this.pause_container.y = 2000
        })

        title.on('pointerdown', ()=>{
            //console.log("resume clicked!")
            this.add.tween({
                targets: title,
                scale: 1.8,
                duration: 50,
            })
        })
        title.on('pointerup', ()=>{
            console.log("title clicked!")
            this.add.tween({
                targets: title,
                scale: 2.2,
                duration: 50,
                onComplete:()=>{
                    
                    this.scene.start("intro");
                    console.log("after start");
                }
            })
        })
        


        //Here is the sound button
        let sound_bit = this.add.container(-200, -100);
        let surrounding_box = this.add.rectangle(5,0,100,100,0x0f0F0F).setInteractive();
        sound_bit.add(surrounding_box);
        let sound_sprite = this.add.sprite(0,0,'sound')
        sound_bit.add(sound_sprite);
        sound_bit.setScale(2)

        this.pause_container.add(sound_bit);

        //here is the music button
        let music_bit = this.add.container(-200, +100)
        let surrounding_box2 = this.add.rectangle(5,0,100,100,0x0f0f0f).setInteractive();
        music_bit.add(surrounding_box2)
        let music_sprite = this.add.sprite(0,0,'music')
        music_bit.add(music_sprite);
        music_bit.setScale(2)

        this.pause_container.add(music_bit);

        //Adding functionality
        this.create_clickable_x_button(music_bit, music_sprite,surrounding_box2, "music")
        this.create_clickable_x_button(sound_bit,sound_sprite,surrounding_box, "sound")
        
    }

    countdown(){
        let text = this.add.text(this.game.config.width/2 - 50,this.game.config.height/2 - 100, "3").setFontSize(200).setDepth(3);
        text.setVisible(true)
        this.time.delayedCall(1000, ()=> {text.setText("2")});
        this.time.delayedCall(2000, ()=> {text.setText("1")});
        this.time.delayedCall(3000, ()=> {text.setVisible(false)});
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