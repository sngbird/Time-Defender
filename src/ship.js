class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,){
        super(scene,x,y,'shipbody');
        this.setScale(4,1);
        //scene.add.existing(this);
        //scene.physics.add.existing(this);
    }
}