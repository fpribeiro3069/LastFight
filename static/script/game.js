window.onload = function() {
    var config = {
        type: Phaser.CANVAS,
        width: 1000,
        height: 600,
        backgroundColor: 0x00000,
        scene: [BootGame, MainMenu],
    }

    var game = new Phaser.Game(config);
}
