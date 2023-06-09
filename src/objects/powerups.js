class PowerUps extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'powerupbase');
      this.setScale(.35);
      // Add the power-up sprite to the scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
      scene.powerUpsGroup.add(this);
      // Set up physics properties
      this.setCollideWorldBounds(true);
      this.setBounce(1);
      this.exploding = 0;
      // Create random trajectory for powerup
      this.body.setVelocity(scene.getRandomBetween(-400,400), scene.getRandomBetween(-400,400));
    }
    //Animation for powerup pickup
    collectAnimation(scene){
        this.body.onCollide = false;
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
    //Animation for the powerup's label
    collectIndicatorAnimation(scene){
        this.indicator.body.setVelocity(0,0);
        this.indicator.body.onCollide = false;

        scene.tweens.add({
        targets: this.indicator,
        scale: .5,
        alpha: 0,
        y: this.indicator.y - 120,
        ease: 'Power1',
        duration: 1000,
      })
    }
  }

class HealthUp extends PowerUps{
    constructor(scene, x, y){
        super(scene, x, y);
        this.indicator = scene.physics.add.image(this.x,this.y,'HP');
        scene.powerUpsIndicatorGroup.add(this.indicator);
        this.indicator.setScale(.35);
        scene.add.existing(this.indicator);
        this.indicator.body.setVelocity(this.body.velocity.x,this.body.velocity.y);
        this.indicator.setCollideWorldBounds(true);
        this.indicator.setBounce(1)
    }
    collectPowerUp(scene) {
        scene.ship.increaseHealth(200);
        this.collectAnimation(scene);
        this.collectIndicatorAnimation(scene);
      setTimeout(() => {
        this.indicator.destroy()
        this.destroy();
      },1000)
    }
}