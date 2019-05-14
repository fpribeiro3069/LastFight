class Controlos extends Phaser.Scene {
    constructor() {
      super('Controlos');
    }
  
    preload() {
        this.load.image('instrucoes', 'static/img/menus/CONTROLOS2.png')
    }
  
    create() {
        let controlos = this.add.image(200, 60, 'instrucoes').setOrigin(0, 0)
        let voltar = this.add.sprite(800, 515, 'voltar').setOrigin(0, 0)

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