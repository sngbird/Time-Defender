class HighScore extends DefenderScene {
    constructor() {
        super('highscore');
        //console.log("credits")
        this.topscores = new Array();
    }
    sceneLayout(){

    }
    onEnter(){
        let curr_player = JSON.parse(localStorage.getItem("curr_player"));

        this.topscores = JSON.parse(localStorage.getItem("topscores"));
        if (this.topscores == null){
            this.topscores = []
            this.topscores[0] = curr_player;
           
        }else if (this.topscores.length < 5){
            this.topscores[this.topscores.length] = curr_player;
        }
        this.topscores.sort(function(a,b){return a[0]-b[0]}).reverse()
        localStorage.setItem("topscores",JSON.stringify(this.topscores));
        // if(curr_player[0] > this.topscores[this.topscores.length-1][0]){
        //     this.topscores[this.topscores.length-1] = curr_player;
        //     this.topscores.sort(function(a,b){return a[0]-b[0]}).reverse()
        //      localStorage.setItem("topscores",JSON.stringify(this.topscores));
        // }
       
        let layoutText = this.add.text(this.game.config.width*.1,this.game.config.height*.1).setText(
            "Score                              Difficulty       Time              Name"
        ).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
        for (let i = 0; i < this.topscores.length; i++){
            this.displayScores(this.topscores[i],i*.1);
        }
        
        this.displayScores(curr_player,.6);
       
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