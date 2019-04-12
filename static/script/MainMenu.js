class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    this.add.image(300, 50, 'title').setOrigin(0, 0)
    gameState.menu = []
    gameState.menu.jogar = this.add.sprite(380, 200, 'jogar').setOrigin(0, 0);
    gameState.menu.controlos = this.add.sprite(380, 300, 'controlos').setOrigin(0, 0);
    gameState.menu.creditos = this.add.sprite(380, 400, 'creditos').setOrigin(0, 0);
    gameState.menu.somIcon = this.add.sprite(20, 530, 'som').setOrigin(0, 0);
    gameState.menu.som = this.sound.add('menuSound', {loop: true})

    gameState.menu.somIcon.setInteractive({useHandCursor: true});
    gameState.menu.somIcon.setFrame(1)
    gameState.menu.somIcon.on('pointerdown', function() {
      if(gameState.sound) {
        this.setFrame(0)
        // Turn off sound
        gameState.menu.som.stop()
      } else {
        this.setFrame(1)
        // Turn on sound
        gameState.menu.som.play()
      }
      gameState.sound = !gameState.sound
    })

    let buttons = this.getMainMenuButtons();
    for(let button of buttons) {
      button.setInteractive({useHandCursor: true})
      button.on('pointerover', function() {
        button.setFrame(1)
      })
      button.on('pointerout', function() {
        button.setFrame(0)
      })
    }
  }

  getMainMenuButtons() {
    return [gameState.menu.jogar, gameState.menu.controlos, gameState.menu.creditos]
  }
}
