class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    this.add.image(300, 50, 'title').setOrigin(0, 0)
    let jogar = this.add.sprite(380, 200, 'jogar').setOrigin(0, 0);
    let controlos = this.add.sprite(380, 300, 'controlos').setOrigin(0, 0);
    let creditos = this.add.sprite(380, 400, 'creditos').setOrigin(0, 0);
    let somIcon = this.add.sprite(20, 530, 'som').setOrigin(0, 0);
    gameState.som = this.sound.add('menuSound', {loop: true})

    somIcon.setInteractive({useHandCursor: true});
    somIcon.setFrame(gameState.hasMusic ? 1 : 0)
    somIcon.on('pointerdown', function() {
      if(gameState.hasMusic) {
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
      this.scene.start('Fight')
    })

    // Função auxiliar para retornar todos os botoes do main menu
    function getMainMenuButtons() {
      return [jogar, controlos, creditos]
    }

    let buttonPos = -3
    this.time.addEvent({
      delay: 250,
      callback: animateButtons,
      callbackScope: this,
      loop: true
    })
    // botoes a mexerem-se a cada 250ms
    function animateButtons() {
      let buttons = getMainMenuButtons();
      for (let button of buttons) {
        button.y += buttonPos;
      }
      buttonPos *= -1
    }

    console.log(gameState)
  }
}
