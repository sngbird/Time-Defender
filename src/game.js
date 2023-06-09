const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
        }
    },
    scene: [Logo,Pause,Intro, Credits, Gameplay],
    title: "Time Defender",
});
