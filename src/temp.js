class Temp extends DefenderScene {
    constructor() {
        super('temp');
    }
    pre_load(){
        this.load.image('sound','Assets/sound.png')
    }
    sceneLayout(){

    }
    onEnter(){


        let menu = this.add.container(this.game.config.width/2, this.game.config.height/2);
        menu.add(this.add.rectangle(0,0,400,600,0x0F0F0F))

        let sound_bit = this.add.container(0, 0);
        let surrounding_box = this.add.rectangle(5,0,100,100,0x0f0F0F).setInteractive();
        sound_bit.add(surrounding_box)
        sound_bit.add(this.add.sprite(0,0,'sound'));
        let lines = this.add.container(0,0);
        lines.add(this.add.line(30,30,-30,-30,30,30,0xFF0000).setLineWidth(3))
        lines.add(this.add.line(30,30,-30,30,30,-30,0xFF0000).setLineWidth(3))
        sound_bit.add(lines).setScale(2);

        menu.add(sound_bit);

        lines.setAlpha(1);
        surrounding_box.on('pointerdown', ()=>{
            shake.pause();
            if(lines.alpha == 1){
                lines.setAlpha(0.0001);
            }else{
                lines.setAlpha(1)
            }
            this.add.tween({
                targets: sound_bit,
                duration: 10,
                scale: 2.6,
                ease: "" ,
            });
        })
        surrounding_box.on('pointerup', ()=>{
            shake.pause();
            this.add.tween({
                targets: sound_bit,
                duration: 100,
                scale: 2,
                ease: "" ,
            });
        })
        let c = 0;
        let shake = this.tweens.chain({
            targets: sound_bit,
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
                    targets: sound_bit,
                    duration:25,
                    repeat: 0,
                    delay: 0,
                    ease: "Sin.InOut",
                    angle: {from: -5, to: 0},
                },


            ],
            onLoop: ()=>{
                console.log(c);
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
