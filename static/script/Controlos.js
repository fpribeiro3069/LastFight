class Controlos extends Phaser.Scene {
    constructor() {
      super('Controlos');
    }

    create() {
        gameState.videoBackGround(this, 2)
        let controlos = this.add.image(200, 60, 'instrucoes').setOrigin(0, 0)
        let voltar = this.add.sprite(30, 515, 'voltar').setOrigin(0, 0)

        voltar.setInteractive({useHandCursor: true})
        voltar.on('pointerover', function() {
            voltar.setFrame(1)
        })
        voltar.on('pointerout', function() {
            voltar.setFrame(0)
        })
        voltar.on('pointerdown', () => {
            this.scene.start('MainMenu')
        })

    }
  }
