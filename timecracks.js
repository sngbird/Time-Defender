class TimeCrack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'crackcenter');
        this.crack = this.timecrack(scene);
        this.blastrad = this.spread(scene);
    }
    timecrack(scene){
        let crackTarget = scene.physics.add.sprite(this.x,this.y,'crackcenter').setScale(.1)
        scene.crackGroup.add(crackTarget);
        scene.tweens.add({
            targets: crackTarget,
            scale: .5,
            duration: 5000,
        })
        return crackTarget;

    }
    spread(scene){
        let blast = scene.physics.add.sprite(this.x,this.y, 'timecrack')
        scene.blastGroup.add(blast)
        scene.tweens.add({ 
            targets: blast,
            scale:20,
            duration: 5000,
        })
        return blast;
    }
    repair(scene){
        
    }
}

