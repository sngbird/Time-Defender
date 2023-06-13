class GameOver extends Phaser.Scene {
    constructor() {
        super('gameover');
    }
    create(){
        this.gameoverText = this.add.text(this.game.config.width*.3,this.game.config.height*.35)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 80}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        this.gameoverText.setText('Game Over')
        this.gameoverText.setAlpha(0);
        this.tweens.add({
            targets: this.gameoverText,
            alpha: 1,
            x: this.game.config.width*.4,
            y: this.game.config.height*.25,
            duration: 2000,
        })
        this.cameras.main.fade(5000, 0, 0, 0);
        this.time.delayedCall(5000, () => {
            //this.scene.start('credits', { inventory: this.inventory });
            this.scene.stop('gameplay');
            this.scene.start('credits');
        });
    }
 
}