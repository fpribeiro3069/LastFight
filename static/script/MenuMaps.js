class MenuMaps extends Phaser.Scene {
    constructor() {
      super('MenuMaps');
    }


    create() {
        this.add.text(270, 15, 'ESCOLHER MAPA', {fontSize: '62px'})
        let avancar = this.add.image(779, 515, 'comecar').setOrigin(0, 0)
        let voltar = this.add.sprite(30, 515, 'voltar').setOrigin(0, 0)

        let back = this.add.sprite(300, 300, 'nextback')
        let next = this.add.sprite(700, 300, 'nextback').setFrame(2)

        voltar.setInteractive({useHandCursor: true})
        voltar.on('pointerover', function() {
            voltar.setFrame(1)
        })
        voltar.on('pointerout', function() {
            voltar.setFrame(0)
        })
        voltar.on('pointerdown', () => {
            this.scene.start('MenuPers')
        })

        avancar.setInteractive({useHandCursor: true})
        avancar.on('pointerover', function() {
            avancar.setFrame(1)
        })
        avancar.on('pointerout', function() {
            avancar.setFrame(0)
        })
        avancar.on('pointerdown', () => {
            this.scene.start('Fight')
        })

        back.setInteractive({useHandCursor: true})
        back.on('pointerover', function() {
            back.setFrame(1)
        })
        back.on('pointerout', function() {
            back.setFrame(0)
        })
        back.on('pointerdown', () => {
            // Previous Map
        })

        next.setInteractive({useHandCursor: true})
        next.on('pointerover', function() {
            next.setFrame(2)
        })
        next.on('pointerout', function() {
            next.setFrame(3)
        })
        next.on('pointerdown', () => {
            // Next Map
        })

    }
  }
