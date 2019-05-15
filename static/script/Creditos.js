class Creditos extends Phaser.Scene {
    constructor() {
      super('Creditos');
    }

    preload() {
        this.load.image('cred', 'static/img/menus/CREDITOS.png')
    }

    create() {
        let creditos = this.add.image(170, 40, 'cred').setOrigin(0, 0)
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
