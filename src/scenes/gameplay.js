class Gameplay extends DefenderGameScene{
    constructor(){
        super('gameplay')
    }
    onEnter(){
        console.log("Gameplay");
        this.HP = this.add.text(this.game.config.width*.05,this.game.config.height*.92)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        
        this.TimerText = this.add.text(this.game.config.width*.5,this.game.config.height*.05)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);  
        
        this.diffText = this.add.text(this.game.config.width*.65,this.game.config.height*.92)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        
        this.ScoreText = this.add.text(this.game.config.width*.85,this.game.config.height*.05)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);

        this.scene.launch("pause");
        this.scene.bringToTop("pause");

    }
    update(){
        this.g_seconds = performance.now()/1000.0 - this.g_startTime;
        if (this.difficulty < 8){this.difficulty = Math.round(this.g_seconds / 15)}
        else{
            this.difficulty = Math.round(Math.sqrt(this.g_seconds));
        }
        //console.log(this.difficulty)
        this.HP.setText("HP: "+ this.ship.getHP() + " / " + this.ship.getMax())
        this.diffText.setText("Difficulty: " + this.difficulty)
        this.ScoreText.setText(this.score)
        this.TimerText.setText(Math.floor(this.g_seconds))
        if(this.getRandomBetween(0,1000) < 5 +this.difficulty){
              this.spawnCrack();
        }
        if (this.ship.getHP() <= 0){
            this.bgm.stop();
            this.scene.restart();
        }
    }

    
    
}