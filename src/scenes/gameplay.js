class Gameplay extends DefenderGameScene{
    constructor(){
        super('test')
    }
    onEnter(){
        this.HP = this.add.text(this.game.config.width*.05,this.game.config.height*.92)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
        
        this.diffText = this.add.text(this.game.config.width*.65,this.game.config.height*.92)
        .setStyle({ fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s); 
    }
    update(){
        this.g_seconds = performance.now()/1000.0 - this.g_startTime;
        this.difficulty = Math.round(this.g_seconds /15);
        console.log(this.difficulty)
        this.HP.setText("HP: "+ this.ship.getHP() + " / " + this.ship.getMax())
        this.diffText.setText("Difficulty: " + this.difficulty)

        if(this.getRandomBetween(0,1000) < 5 +this.difficulty){
              this.spawn();
        }
        if (this.ship.getHP() <= 0){
            this.scene.restart();
        }
    }

    
    
}