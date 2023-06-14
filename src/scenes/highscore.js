class HighScore extends DefenderScene {
    constructor() {
        super('highscore');
        //console.log("credits")
        this.topscores = new Array();
    }
    sceneLayout(){

    }
    onEnter(){
        this.curr_player = JSON.parse(localStorage.getItem("curr_player"));
        //let playerName = window.prompt("Please Enter Name", "name");
        let playerName = '';

        // Create a text input field using Phaser's Text Game Object
        const nameInput = this.add.text(
          game.config.width / 2,
          game.config.height / 2,
          'Enter 3 Character Name: ',
          {
            fontSize: '75px',
            fill: '#ffffff',
            padding: {
              x: 8,
              y: 4
            }
          }
        );
        nameInput.setOrigin(0.5);
        
        // Enable input events for the text input
        nameInput.setInteractive();
        
        // Capture keyboard input events
        this.input.keyboard.on('keydown', (event) => {
          if (event.key === 'Enter') {
            if (playerName.length === 3) {
              // Assuming you have the player's score stored in a variable called 'score'
              //submitHighscore(playerName.toUpperCase(), score);
              playerName.toUpperCase();
              this.curr_player[3] = playerName;
              nameInput.disableInteractive();
              nameInput.setVisible(false);
              this.updateScores();
            } else {
              // Invalid name, handle accordingly
              console.log('Invalid name!');
            }
          } else if (event.key === 'Backspace') {
            playerName = playerName.slice(0, -1);
            nameInput.text = playerName;
          } else if (event.key.length === 1 && playerName.length < 3) {
            playerName += event.key;
            nameInput.text = playerName;
          }})
        this.topscores = JSON.parse(localStorage.getItem("topscores"));
        if (this.topscores == null){
            this.topscores = []
            this.topscores[0] = this.curr_player;
           
        }
        else if (this.topscores.length == 5){
            this.topscores.sort(function(a,b){return a[0]-b[0]}).reverse()
            if(this.curr_player[0] > this.topscores[this.topscores.length-1][0]){
                this.topscores[this.topscores.length-1] = this.curr_player;
            }
        }
        else if (this.topscores.length < 5){
            this.topscores[this.topscores.length] = this.curr_player;
        }
        this.topscores.sort(function(a,b){return a[0]-b[0]}).reverse()
        localStorage.setItem("topscores",JSON.stringify(this.topscores));
        let layoutText = this.add.text(this.game.config.width*.1,this.game.config.height*.1).setText(
            "Score                              Difficulty       Time              Name"
        ).setStyle({fontFamily: 'kanit', fontSize: `${1.5 * 75}px` });
        //this.updateScores();
        this.input.on('pointerdown',()=>{
          this.scene.start('intro')
          localStorage.setItem("survived_time", null)
          localStorage.setItem("score", null)
        });
       
    }
    update(){
        //console.log("cred");
    }
    updateScores(){
        localStorage.setItem("topscores",JSON.stringify(this.topscores));
        for (let i = 0; i < this.topscores.length; i++){
            this.displayScores(this.topscores[i],i*.1);
        }
        this.displayScores(this.curr_player,.6);
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
        let objArray = [scoreText,diffText,timeText,nameText];
        return objArray
    }
    
}