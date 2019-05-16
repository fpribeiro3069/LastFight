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

    // Falta background!! Por enquanto fica backgroundColor
    //this.load.image('menubg', 'static/img/menubg.jpg');
    this.load.image('title', 'static/img/title.png')
    this.load.spritesheet('jogar', 'static/img/btnJogar.png', {frameWidth: 191, frameHeight: 67})
    this.load.spritesheet('controlos', 'static/img/btnControlos.png', {frameWidth: 191, frameHeight: 66})
    this.load.spritesheet('creditos', 'static/img/btnCreditos.png', {frameWidth: 191, frameHeight: 66})
    this.load.spritesheet('avancar', 'static/img/btnAvancar.png', {frameWidth: 190.5, frameHeight: 66})
    this.load.spritesheet('comecar', 'static/img/btnComecar.png', {frameWidth: 192, frameHeight: 66})
    this.load.spritesheet('som', 'static/img/btnSound.png', {frameWidth: 56, frameHeight: 52})
    this.load.spritesheet('voltar', 'static/img/btnVoltar.png', {frameWidth: 193, frameHeight: 67})
    this.load.spritesheet('nextback', 'static/img/btnNextBack.png', {frameWidth: 40, frameHeight: 38})
    this.load.image('pause', 'static/img/btnPause.png')
    this.load.audio('menuSound', 'static/sound/menu.mp3')

    // Map 1
    this.load.image('map1_preview', 'static/img/maps/map1_preview.png')
    this.load.image('map1_bg', 'static/img/maps/map1_bg.png')
    this.load.image('map1_ground', 'static/img/maps/map1_ground.png')
    this.load.image('map1_highground', 'static/img/maps/map1_highground.png')

    // Map 2
    this.load.image('map2_preview', 'static/img/maps/map2_preview.png')
    this.load.image('map2_bg', 'static/img/maps/map2_bg.png')
    this.load.image('map2_ground', 'static/img/maps/map2_ground.png')
    this.load.image('map2_highground', 'static/img/maps/map2_highground.png')

    // Fighter 1
    this.load.spritesheet('f1_w', 'static/img/fighters/fighter1_walking.png', {frameWidth: 38, frameHeight: 79})
    this.load.spritesheet('f1_jump', 'static/img/fighters/fighter1_jump.png', {frameWidth: 34, frameHeight: 80})
    this.load.spritesheet('f1_atck', 'static/img/fighters/fighter1_attack1.png', {frameWidth: 57, frameHeight: 78})
    this.load.spritesheet('f1_fire', 'static/img/fighters/fighter1_attack2.png', {frameWidth: 69.3, frameHeight: 78})
    this.load.image('f1_proj', 'static/img/fighters/fighter1_proj.png')

    // Fighter 2
    this.load.spritesheet('f2_w', 'static/img/fighters/2_walk.png', {frameWidth: 53.75, frameHeight: 81})
    this.load.spritesheet('f2_jump', 'static/img/fighters/2_jump.png', {frameWidth: 42.75, frameHeight: 86})
    this.load.spritesheet('f2_atck', 'static/img/fighters/2_attack1.png', {frameWidth: 56.6, frameHeight: 80})
    this.load.spritesheet('f2_fire', 'static/img/fighters/2_attack2.png', {frameWidth: 66, frameHeight: 80})
    this.load.image('f2_proj', 'static/img/fighters/2_projetil.png')

    //Fighter 3
    this.load.spritesheet('f3_w', 'static/img/fighters/3_walk.png', {frameWidth: 62, frameHeight: 80})
    this.load.spritesheet('f3_jump', 'static/img/fighters/3_jump.png', {frameWidth: 57.5, frameHeight: 82})
    this.load.spritesheet('f3_atck', 'static/img/fighters/3_attack1.png', {frameWidth: 81, frameHeight: 80})
    this.load.spritesheet('f3_fire', 'static/img/fighters/3_attack2.png', {frameWidth: 86.5, frameHeight: 79})
    this.load.image('f3_proj', 'static/img/fighters/3_projetil.png')

    gameState.hasMusic = false

  }

  create() {
    this.scene.start("MainMenu");
  }
}
