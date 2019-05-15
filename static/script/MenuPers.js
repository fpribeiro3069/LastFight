class MenuPers extends Phaser.Scene {
    constructor() {
      super('MenuPers');
    }


    create() {
        let avancar = this.add.image(779, 515, 'avancar').setOrigin(0, 0)
        let voltar = this.add.sprite(30, 515, 'voltar').setOrigin(0, 0)

        voltar.setInteractive({useHandCursor: true})
        voltar.on('pointerover', function() {
            voltar.setFrame(1)
        })
        voltar.on('pointerout', function(){
            voltar.setFrame(0)
        })
        voltar.on('pointerdown', () => {
            this.scene.start('MainMenu')
        })



        avancar.setInteractive({useHandCursor: true})
        avancar.on('pointerover', function() {
            avancar.setFrame(1)
        })
        avancar.on('pointerout', function() {
            avancar.setFrame(0)
        })
        avancar.on('pointerdown', () => {
            this.scene.start('MenuMaps')
        })

    }
  }
