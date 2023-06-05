class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,){
        super(scene,x,y,'shipbody');
        this.setScale(4,1);
        this.maxhp = 1000;
        this.initialize()
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    }
    initialize(){
        this.currenthp = 1000;
        console.log(this.currenthp)
    }
    decreaseHealth(){
       this.currenthp -=1;
    }
    increaseHealth(val){
        this.currenthp += val;
    }
    getHP(){
        return this.currenthp;
    }
}