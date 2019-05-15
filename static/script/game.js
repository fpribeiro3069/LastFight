var gameState = {};
window.onload = function (){
  var config = {
      type: Phaser.CANVAS,
      width: 1000,
      height: 600,
      backgroundColor: 0xb21c1c,
      scene: [/*BootGame,*/PreloadGame, MainMenu, Controlos, Creditos, MenuPers, MenuMaps, Fight],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 }
        },
        debug: true
      }
  }

  var game = new Phaser.Game(config);
}
