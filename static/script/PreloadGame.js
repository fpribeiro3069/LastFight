class PreloadGame extends Phaser.Scene {
  constructor() {
    super('PreloadGame');
  }

  preload() {
    let loading = this.add.text(400, 250, "Loading game", {fontFamily: 'Comic Sans MS', fontSize: '32px', color: '#faa'});
    let count = 1;
    this.time.addEvent({
      delay: 150,
      callback: function() {
        count++;
        if(count === 4) {
          count = 1;
        }
        loading.setText('Loading game' + '.'.repeat(count))
      },
      callbackScope: this,
      repeat: true
    })
    function loadingAnim() {
    }

    // Falta background!! Por enquanto fica backgroundColor
    //this.load.image('menubg', 'static/img/menubg.jpg');
    this.load.image('title', 'static/img/title.png')
    this.load.spritesheet('jogar', 'static/img/btnJogar.png', {frameWidth: 191, frameHeight: 67})
    this.load.spritesheet('controlos', 'static/img/btnControlos.png', {frameWidth: 191, frameHeight: 66})
    this.load.spritesheet('creditos', 'static/img/btnCreditos.png', {frameWidth: 191, frameHeight: 66})
    this.load.spritesheet('som', 'static/img/btnSound.png', {frameWidth: 56, frameHeight: 52})
    this.load.audio('menuSound', 'static/sound/menu.mp3');

    this.load.image('map1_bg', 'static/img/maps/map1_bg.png')
    this.load.image('map1_ground', 'static/img/maps/map1_ground.png')

    this.load.spritesheet('fighter1_walking', 'static/img/fighters/fighter1_walking.png', {frameWidth: 38, frameHeight: 79})
    this.load.spritesheet('fighter1_attack', 'static/img/fighters/fighter1_attack.png', {frameWidth: 54.3, frameHeight: 78})

    gameState.hasMusic = false

  }

  create() {
    this.scene.start("MainMenu");
  }
}
