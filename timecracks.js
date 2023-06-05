class TimeCrack extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'crackcenter');
    }
    spread(scene){
        let crack = scene.physics.add.sprite(this.x,this.y, 'timecrack')
        scene.tweens.add({ 
            targets: crack,
            scale:20,
            duration: 5000,
        })
    }
}

