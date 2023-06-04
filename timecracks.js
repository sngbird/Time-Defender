class TimeCrack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'timecrack');
        //this.spread(scene);
    }
    spread(scene){
        scene.tweens.add({ 
            targets: this,
            scale:20,
            duration: 5000,
        })
    }
}

class CrackGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);
        // this.createMultiple({
        //     classType: TimeCrack,
        //     frameQuantity: 8,
        //     active: false,
        //     visible: false,
        //     key: 'laser'
        // })
    }

    fireLaser(scene,targetx,targety,targetDeg,turret){
        const laser = this.getFirstDead(false);
        if(laser){
            laser.fire(scene,turret, targetDeg, targetx, targety);
        }
    }
}