class PowerUps extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'powerupbase');
      this.setScale(.35);
      // Add the power-up sprite to the scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Set up physics properties
      this.setCollideWorldBounds(true);
      this.setBounce(1);
      this.body.setVelocity(scene.getRandomBetween(-400,400), scene.getRandomBetween(-400,400));
    }
    // Custom logic for power-up behavior
    collectAnimation(scene){
        this.body.setVelocity(0,0);
        scene.tweens.add({
        targets: this,
        scale: .5,
        alpha: 0,
        y: this.y - 120,
        ease: 'Power1',
        duration: 1000,
      })
    }
  }

class HealthUp extends PowerUps{
    constructor(scene, x, y){
        super(scene, x, y);
        let indicator = scene.add.image(this.x,this.y,'HP');
        indicator.setScale(.35);
        scene.add.existing(indicator);
    }
    collectPowerUp(scene) {
        scene.ship.increaseHealth(200);
        this.collectAnimation(scene);
      setTimeout(() => {this.destroy();},1000)
    }
}