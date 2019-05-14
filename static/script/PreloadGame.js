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
    this.load.spritesheet('voltar', 'static/img/btnVoltar.png', {frameWidth: 193, frameHeight: 67})
    this.load.audio('menuSound', 'static/sound/menu.mp3');

    this.load.image('map1_bg', 'static/img/maps/map1_bg.png')
    this.load.image('map1_ground', 'static/img/maps/map1_ground.png')

    // Fighter 1
    this.load.spritesheet('f1_w', 'static/img/fighters/fighter1_walking.png', {frameWidth: 38, frameHeight: 79})
    this.load.spritesheet('f1_jump', 'static/img/fighters/fighter1_jump.png', {frameWidth: 34, frameHeight: 80})
    this.load.spritesheet('f1_atck', 'static/img/fighters/fighter1_attack1.png', {frameWidth: 51, frameHeight: 78})
    this.load.spritesheet('f1_fire', 'static/img/fighters/fighter1_attack2.png', {frameWidth: 129, frameHeight: 152})
    this.load.image('f1_proj', 'static/img/fighters/fighter1_proj.png')

    gameState.hasMusic = false

  }

  create() {
    this.scene.start("MainMenu");
  }
}
