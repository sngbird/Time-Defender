class TimeCrack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,){
        super(scene,x,y,'crackcenter').setAngle(Math.random() * 360).setDepth(0.1);
        this.setScale(.1);
        this.timecrack(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        console.log("crack")
    }
    //Enlarge the time fissure after creation
    timecrack(scene){
        scene.tweens.add({
            targets: this,
            scale: .5,
            duration: 10000,
        })
    }
    
    //Repair the rift in space (remove the time fissure)
    
}

class TimeCrackRing extends TimeCrack{
    constructor(scene,x,y){
        super(scene,x,y);
        this.blastrad = this.spread(scene);
        this.type = "crack";
    }
    //create the hitbox ring
    spread(scene){
        this.exploding = 0;
        let blast = scene.physics.add.sprite(this.x,this.y, 'timecrack').setAlpha(.1)
        this.underlying_circle = scene.add.circle(this.x,this.y,40,0x000000).setDepth(-2).setOrigin(0.5,0.5).setScale(0.7);
        scene.blastGroup.add(blast)
        scene.tweens.add({ 
            targets: blast,
            scale:20,
            duration: 10000,
        })
        scene.tweens.add({ 
            targets: [this.underlying_circle],
            scale:20,
            angle: 0,
            duration: 10000,
        })
        return blast;
    }
    repair(scene){
        if(this.exploding == 1){
            return;
        }
        this.exploding = 1;
        this.crack.destroy();
        scene.tweens.add({
            targets: [this],
            scale: .1,
            alpha: 1,
            duration: 500,
        })

        //Tween for the underlying circle that hides the stars, Maybe a delay would look good???
        scene.tweens.add({
            targets: this.underlying_circle,
            delay:250,
            scale: .1,
            duration: 250,
            ease: "Quint.In",
            onComplete: ()=>{
                this.underlying_circle.destroy();
            }
        })


        //circle
        scene.tweens.add({
            targets: this.blastrad,
            scale: .01,
            alpha: .3,
            ease: "Quint.In",
            duration: 500,
        })
        setTimeout(() => {
            this.blastrad.destroy(); 
            this.destroy();
        },500)
    }
    
}

class TimeCrackBolt extends TimeCrack{
    constructor(scene,x,y){
        super(scene,x,y);
        this.timebolt = this.bolt(scene);
        this.type = "bolt";
    }
    bolt(scene){
        this.bolt = scene.physics.add.sprite(this.x+5,this.y+5,'timebolt').setDepth(-1.9).setScale(.01,.01);
        scene.blastGroup.add(this.bolt);
        scene.tweens.add({ 
            targets: this.bolt,
            y: this.bolt.y+435,
            x: this.bolt.x+95,
            scale:1,
            duration: 3000,
        })
        return this.bolt;
    }
    repair(scene){
        scene.tweens.add({
            targets: [this],
            scale: .1,
            alpha: 1,
            duration: 600,
        })

        scene.tweens.add({
            targets: this.bolt,
            y: this.y,
            x: this.x,
            scale: .001,
            delay: 100,
            duration: 500,
            //ease: "Back.In",
            ease: "Bounce.InOut",
        })

        setTimeout(() => {
            this.timebolt.destroy(); 
            this.destroy();
            let sp = scene.add.sprite(this.x,this.y, 'timecrack').setScale(.01).setAlpha(0.3)
            this.underlying_circle = scene.add.circle(this.x,this.y,40,0x000000).setDepth(-2.5).setOrigin(0.5,0.5).setScale(0.7);
            scene.add.tween({
                delay: 10,
                targets: [sp],
                scale:5,
                duration:500,
                alpha: 0,
                ease: "Cubic.Out"
            })
            scene.add.tween({
                delay:10,
                targets: [this.underlying_circle],
                scale:7,
                duration:800,
                ease: "Cubic.Out",
            })
            scene.add.tween({
                targets:[this.underlying_circle],
                delay: 300,
                duration: 2000,
                alpha: 0,
                scale: 15,
                ease: "Cubic.Out",
                // onComplete: ()=>{
                //     scene.add.tween({
                //         targets:[this.underlying_circle],
                //         duration: 3000,
                //         ease: "Circ.Out",
                //         alpha: 0,
                //     })
                // }
            })

        },600)
    }
}