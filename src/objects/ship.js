class Ship extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,){
        super(scene,x,y,'shipbody');
        this.setScale(4,1);
        this.initialize()
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        console.log("ship")
        
    }
    initialize(){
        this.maxhp = 1000;
        this.maxBombs = 3;
        this.currenthp = 1000;
        this.currBombs = 0;
        this.weapon = 'Repair Laser';
        //console.log(this.currenthp)
    }
    decreaseHealth(){
       this.currenthp -=1;
    }
    decreaseXHealth(val){
        this.currenthp -= val;
    }
    increaseHealth(val){
        this.currenthp += val;
        if(this.currenthp > 1000){this.currenthp = 1000};
    }
    getHP(){
        return this.currenthp;
    }
    getMax(){
        return this.maxhp;
    }
    getBombs(){
        return this.currBombs;
    }
    getMaxBombs(){
        return this.maxBombs;
    }
    gainBomb(){
        if (this.currBombs < this.maxBombs){
            this.currBombs += 1;
        }
    }
    removeBomb(){
        this.currBombs -= 1;
    }
    setWeapon(weapon){
        this.weapon = weapon;
        console.log(this.weapon);
    }
    getWeapon(){
        return this.weapon;
    }
    resetWeapon(scene){
        this.weapon = 'Repair Laser';
    }
}