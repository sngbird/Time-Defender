class TimeCrack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,){
        super(scene,x,y,'crackcenter');
        this.setScale(.1);
        this.timecrack(scene);
        this.blastrad = this.spread(scene);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
    timecrack(scene){
        scene.tweens.add({
            targets: this,
            scale: .5,
            duration: 10000,
        })
    }
    spread(scene){
        let blast = scene.physics.add.sprite(this.x,this.y, 'timecrack')
        scene.blastGroup.add(blast)
        scene.tweens.add({ 
            targets: blast,
            scale:20,
            duration: 10000,
        })
        return blast;
    }
    repair(scene){
        //this.crack.destroy();
        scene.tweens.add({
            targets: this,
            scale: .1,
            alpha: 0,
            duration: 500,
        })
        scene.tweens.add({
            targets: this.blastrad,
            scale: 1,
            alpha: 0,
            duration: 500,
        })
        setTimeout(() => {this.blastrad.destroy(); 
            this.destroy();},500)
    }
}

