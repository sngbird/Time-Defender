class HighScore extends DefenderScene {
    constructor() {
        super('highscore');
        //console.log("credits")
        this.topscores = [];
    }
    sceneLayout(){

    }
    onEnter(){
        let curr_player = JSON.parse(localStorage.getItem("curr_player"));

        this.topscores = JSON.parse(localStorage.getItem("topscores"));
        if (this.topscores == null){
            this.topscores[0] = curr_player;
            localStorage.setItem("topscores",JSON.stringify(this.topscores));
        }else if (this.topscores.length < 5){
            console.log(this.topscores.length);
            this.topscores[this.topscores.length] = curr_player;
            localStorage.setItem("topscores",JSON.stringify(this.topscores));
        }
        
        
       
        let layoutText = this.add.text(this.game.config.width*.1,this.game.config.height*.1).setText(
            "Score                              Difficulty       Time              Name"
        ).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
        for (let i = 0; i < this.topscores.length; i++){
            this.displayScores(this.topscores[i],i*.1);
        }
        
        this.displayScores(curr_player,.5);
       
    }
    update(){
        //console.log("cred");
    }
    //Wants the score array, and a height offset
    displayScores(score_obj,location){
        let scoreText = this.add.text(this.game.config.width*.1,this.game.config.height*(.25+location)).setText(
            score_obj[0]).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
        let diffText = this.add.text(this.game.config.width*.4,this.game.config.height*(.25+location)).setText(
            score_obj[1]).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
        let timeText = this.add.text(this.game.config.width*.6,this.game.config.height*(.25+location)).setText(
            score_obj[2]).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
        let nameText = this.add.text(this.game.config.width*.75,this.game.config.height*(.25+location)).setText(
            score_obj[3]).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
    }
}