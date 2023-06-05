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

