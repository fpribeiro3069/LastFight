class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    //video = this.add.video('MainMenuBack')
    //video.play(true)

    /* create video as html5 video element. */
    /*this.video=document.createElement('video');
    this.video.muted=true;
    this.video.src='static/img/menuback.mp4';*/
    gameState.videoBackGround = function(context) {
      let platforms = context.physics.add.staticGroup()
      context.add.image(500, 300, 'map1_bg')
      for(let i = -200; i < 1200; i+=60)
        platforms.create(20 + i, 570, 'map1_ground').setScale(.7).refreshBody()
      let players = context.physics.add.group()
      context.physics.add.collider(players, platforms)
      let sprite = players.create(-30, 300, 'f1_w')
      context.anims.create({
        key: 'p1_walking',
        frames: context.anims.generateFrameNumbers('f1_w', {start: 0, end: 4}),
        repeat: -1
      })
      context.anims.create({
        key: 'p1_jump',
        frames: context.anims.generateFrameNumbers('f1_jump', {start: 0, end: 3}),
        frameRate: 10
      })
      sprite.setVelocityX(350)
      sprite.anims.play('p1_walking')
      var timer = context.time.addEvent({
        delay: 900,                // ms
        callback: () => {
          sprite.setVelocityY(-400)
          sprite.anims.play('p1_jump')
        },
        //args: [],
        callbackScope: context,
        repeat: 2
      });
    }

    gameState.videoBackGround(this)

    this.add.image(300, 30, 'title').setOrigin(0, 0)
    let jogar = this.add.sprite(380, 200, 'jogar').setOrigin(0, 0);
    let controlos = this.add.sprite(380, 300, 'controlos').setOrigin(0, 0);
    let creditos = this.add.sprite(380, 400, 'creditos').setOrigin(0, 0);
    let somIcon = this.add.sprite(20, 530, 'som').setOrigin(0, 0);
    if (gameState.som == undefined)
      gameState.som = this.sound.add('menuSound', {loop: true})

    somIcon.setInteractive({useHandCursor: true});
    somIcon.setFrame(gameState.hasMusic ? 1 : 0)
    somIcon.on('pointerdown', function() {
      if(gameState.hasMusic){
        this.setFrame(0)
        // Turn off sound
        gameState.som.mute = true
      } else {
        this.setFrame(1)
        // Turn on sound
        if(gameState.som.mute) {
          gameState.som.mute = false
        } else
          gameState.som.play()
      }
      gameState.hasMusic = !gameState.hasMusic
    })

    // Mudar as frames dos botoes em pointerover
    let buttons = getMainMenuButtons();
    for(let button of buttons) {
      button.setInteractive({useHandCursor: true})
      button.on('pointerover', function() {
        button.setFrame(1)
      })
      button.on('pointerout', function() {
        button.setFrame(0)
      })
    }

    // Click events para os botoes
    jogar.on('pointerdown', () => {
      // TODO!!! Falta fazer a scene intermediaria de escolha de personagens e mapa
      this.scene.start('MenuPers')
    })

    controlos.on('pointerdown', () => {
      this.scene.start('Controlos')
    })

    creditos.on('pointerdown', () => {
      this.scene.start('Creditos')
    })

    // Função auxiliar para retornar todos os botoes do main menu
    function getMainMenuButtons() {
      return [jogar, controlos, creditos]
    }

    let buttonPos = -3
    this.time.addEvent({
      delay: 250,
      callback: function() {
        let buttons = getMainMenuButtons();
        for (let button of buttons) {
          button.y += buttonPos;
        }
        buttonPos *= -1
      },
      callbackScope: this,
      loop: true
    })

    console.log(gameState)
  }
}
