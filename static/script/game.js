var gameState = {};
window.onload = function (){
  var config = {
      type: Phaser.CANVAS,
      width: 1000,
      height: 600,
      backgroundColor: 0xb21c1c,
      scene: [BootGame, MainMenu],
  }

  var game = new Phaser.Game(config);
}
