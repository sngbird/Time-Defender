class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'repairbeam');
    }
    fire(scene,turret,targetDeg,targetx,targety){
        this.targetx = targetx;
        this.targety = targety;
        this.setScale(3,1);
        this.setAngle(targetDeg);
        this.body.reset(turret.x,turret.y);
        this.setActive(true);
        this.setVisible(true);
        scene.physics.moveTo(this,targetx,targety,600);
    }


}  

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Laser,
            frameQuantity: 8,
            active: false,
            visible: false,
            key: 'laser'
        })
    }

    fireLaser(scene,targetx,targety,targetDeg,turret){
        const laser = this.getFirstDead(false);
        if(laser){
            laser.fire(scene,turret, targetDeg, targetx, targety);
        }
    }
}