class PowerUps extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'powerupbase');
      
      // Add the power-up sprite to the scene
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Set up physics properties
      this.setCollideWorldBounds(true);
      this.setBounce(1);
      this.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
      
      // Add the power-up to a specific group (optional)
      scene.powerUpsGroup.add(this);
    }
  
    // Custom logic for power-up behavior
    collectPowerUp() {
      // Custom logic when the power-up is collected by a player
      // For example, increase the player's score or apply special effects
  
      // Destroy the power-up sprite
      this.destroy();
    }
  }