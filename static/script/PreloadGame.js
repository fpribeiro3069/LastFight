class PreloadGame extends Phaser.Scene {
  constructor() {
    super('PreloadGame');
  }

  preload() {
    let loading = this.add.text(400, 250, "Loading game", {fontFamily: 'Comic Sans MS', fontSize: '32px', color: '#faa'});
    let count = 1;
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(350, 300, 320, 50);
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    this.load.on('progress', function (value) {   //valor entre 0 e 1 -> tempo que demora a carregar um asset (dado pelo evento progress)
          console.log(value);
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(360, 310, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file) {
              console.log('Loading asset: ' + file.key);   //escreve na consola quando um ficheiro for carregado
    });

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
    });

    this.load.on('complete', function () {
                progressBar.destroy();
                progressBox.destroy();
                loading.destroy();
    });

    // Imagens (geral)
    this.load.image('title', 'static/img/title.png')
    this.load.image('title2','static/img/title2.png')
    this.load.image('title3','static/img/title3.png')
    this.load.image('player1','static/img/player1.png')
    this.load.image('player2','static/img/player2.png')
    this.load.image('fight','static/img/fight_intro.png')
    this.load.spritesheet('jogar', 'static/img/btnJogar.png', {frameWidth: 191, frameHeight: 67})
    this.load.spritesheet('controlos', 'static/img/btnControlos.png', {frameWidth: 191, frameHeight: 66})
    this.load.spritesheet('creditos', 'static/img/btnCreditos.png', {frameWidth: 191, frameHeight: 66})
    this.load.spritesheet('avancar', 'static/img/btnAvancar.png', {frameWidth: 190.5, frameHeight: 66})
    this.load.spritesheet('comecar', 'static/img/btnComecar.png', {frameWidth: 192, frameHeight: 66})
    this.load.spritesheet('som', 'static/img/btnSound.png', {frameWidth: 56, frameHeight: 52})
    this.load.spritesheet('voltar', 'static/img/btnVoltar.png', {frameWidth: 193, frameHeight: 67})
    this.load.spritesheet('nextback', 'static/img/btnNextBack.png', {frameWidth: 40, frameHeight: 38})
    this.load.image('pause', 'static/img/btnPause.png')
    this.load.image('cred', 'static/img/menus/CREDITOS.png')
    this.load.image('instrucoes', 'static/img/menus/CONTROLOS2.png')

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


    //Sounds
    this.load.audio('fight', 'static/sound/fight.mp3')

    this.load.audio('menuSound', 'static/sound/menu.mp3')
    this.load.audio('murro1', 'static/sound/PUNCH.mp3')
    this.load.audio('murro2', 'static/sound/punch1.mp3')
    this.load.audio('murro3', 'static/sound/punch2.mp3')

    this.load.audio('fire1', 'static/sound/Fireball+2.mp3')
    this.load.audio('fire2', 'static/sound/Fireball+3.mp3')
    this.load.audio('fire3', 'static/sound/throw3.mp3')

    this.load.audio('pain1', 'static/sound/Pain1.mp3')
    this.load.audio('pain2', 'static/sound/pain2.mp3')
    this.load.audio('pain3', 'static/sound/roblox-death.mp3')


    gameState.hasMusic = false

  }

  create() {
    this.scene.start("MainMenu");
  }
}
