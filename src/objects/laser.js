class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'repairbeam');
        this.current_scene = scene;
        console.log("laser")
    }
    fire(scene,turret,targetDeg,targetx,targety){
        this.movingEmitter = scene.add.particles(0, 0, 'smoke', {
            speed: 50,
            scale: { start: 0.1, end: 1 },
            alpha: { start: 1, end: 0 },
            // higher steps value = more time to go btwn min/max
            lifespan: 800
        })
        // note: setting the emitter's initial position to 0, 0 seems critical to get .startFollow to work
        this.movingEmitter.startFollow(this, 0, 0, false)
        this.targetx = targetx;
        this.targety = targety;
        this.setAngle(targetDeg);
        this.body.reset(turret.x,turret.y);
        this.setActive(true);
        this.setVisible(true);
        if(scene.ship.getWeapon() == 'Piercing Laser'){
            scene.physics.moveTo(this,targetx,targety,2200);
        }else{
            scene.physics.moveTo(this,targetx,targety,1600);
        }
        
    }
    reset(){
       //this.movingEmitter.destroy();
    }
    preUpdate(time, delta){
        super.preUpdate(time,delta);
        if(this.y <= 0 || this.y >= this.current_scene.game.config.height * 1.2 || this.x <= -50 || this.x >= this.current_scene.game.config.width * 1.2){
            this.setActive(false);
            this.setVisible(false);
            this.movingEmitter.destroy();
        }
    }


}  

class LaserGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world, scene);

        this.createMultiple({
            classType: Laser,
            frameQuantity: 4,
            active: false,
            visible: false,
            key: 'laser'
        })
    }

    fireLaser(scene,targetx,targety,targetDeg,turret){
        let laser = this.getFirstDead(false);
        if(laser){
            laser.fire(scene,turret, targetDeg, targetx, targety);
            scene.play_sound("laser");
        }
    }
}