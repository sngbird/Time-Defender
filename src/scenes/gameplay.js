class Gameplay extends DefenderGameScene{
    constructor(){
        super('gameplay')
        console.log("gameplay")
    }
    onEnter(){
        
        //Create UI
        console.log("Gameplay");
        this.HP = this.add.text(this.w*.1,this.game.config.height*.87)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        
        this.TimerText = this.add.text(this.game.config.width*.5,this.game.config.height*.05)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);  
        
        this.diffText = this.add.text(this.w*.8,this.game.config.height*.87)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        
        this.ScoreText = this.add.text(this.game.config.width*.85,this.game.config.height*.05)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 50}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);

        this.weaponText = this.add.text(this.w*.4,this.h*.95)
        .setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 40}px` })
        .setWordWrapWidth(this.w * 0.5 - 2 * this.s);
        this.scene.launch("pause");
        this.scene.bringToTop("pause");

        const bolt = this.add.shader('bolt',this.w,this.h,this.w,this.h).setDepth(0);
        bolt.setRenderToTexture('timebolt',true);

    }
    update(){
        //Update difficulty
        this.g_seconds = performance.now()/1000.0 - this.g_startTime;



        if (this.difficulty < 8){this.difficulty = 1+Math.round(this.g_seconds / 15)}
        else{
            this.difficulty = Math.round(Math.sqrt(this.g_seconds));
        }
        //console.log(this.difficulty)
        //this.difficulty = 11;
        this.HP.setText("HP: "+ this.ship.getHP() + " / " + this.ship.getMax())
        this.diffText.setText("Difficulty:  " + this.difficulty)
        this.ScoreText.setText(this.score)
        this.TimerText.setText(Math.floor(this.g_seconds))
        this.bombText.setText(this.ship.getBombs() + "/" + this.ship.getMaxBombs());
        this.weaponText.setText("Laser: "+ this.ship.getWeapon());
        this.spawnDanger();
        if (this.ship.getHP() <= 0){
            this.bgm.stop();
            this.gameOver();
            // this.scene.start("intro");
            // localStorage.setItem("survived_time", null)
            // localStorage.setItem("score", null)
            const scoreArray = [this.score,this.difficulty,Math.floor(this.g_seconds), "AAA"];
            localStorage.setItem("curr_player",JSON.stringify(scoreArray))
        }
    }

    add_to_start_time(value){
        console.log("changing start by: " + value)
        this.g_startTime += value;
    }

    get_start_time(){
        return this.g_startTime;
    }

    get_score(){
        return this.score;
    }

    
    
}