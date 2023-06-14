class GameOver extends Phaser.Scene {
    constructor() {
        super('gameover');
    }
    init(data){
        this.score = data.score;
        this.difficulty = data.difficulty;
        this.survived = data.time;
    }
    preload(){
        this.load.audio('gameoversong', 'src/assets/sounds/gameoversong.mp3')
    }
    create(){
        this.gameoversong = this.sound.add('gameoversong')
        if(localStorage.getItem("sound") != 1){
            this.gameoversong.play()
        }
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
            this.scene.start('outro',{difficulty: this.difficulty, score: this.score, survived: this.survived});
        });
    }
 
}