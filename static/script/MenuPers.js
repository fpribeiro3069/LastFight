class MenuPers extends Phaser.Scene {
    constructor() {
      super('MenuPers');
    }


    create() {
        let avancar = this.add.image(779, 515, 'avancar').setOrigin(0, 0)
        let voltar = this.add.sprite(30, 515, 'voltar').setOrigin(0, 0)

        let lenPersonagens = 3  // HardCoded para 3 personagens
        let currentPers1 = 1
        let currentPers2 = 3

        let pers1 = this.add.sprite(250, 300, 'f' + currentPers1 + '_w').setScale(3)
        let pers2 = this.add.sprite(750, 300, 'f' + currentPers2 + '_w').setScale(3)

        let back1 = this.add.sprite(100, 250, 'nextback')
        let next1 = this.add.sprite(400, 250, 'nextback').setFrame(2)

        let back2 = this.add.sprite(600, 250, 'nextback')
        let next2 = this.add.sprite(900, 250, 'nextback').setFrame(2)

        back1.setInteractive()
        next1.setInteractive()
        back2.setInteractive()
        next2.setInteractive()

        back1.on('pointerover', function() {
          back1.setFrame(1)
        })
        back1.on('pointerout', function() {
          back1.setFrame(0)
        })
        back1.on('pointerdown', function() {
          currentPers1 -= 1
          if(currentPers1 <= 0)
            currentPers1 = lenPersonagens
          pers1.setTexture('f' + currentPers1 + '_w', 0, false)
        })

        next1.on('pointerover', function() {
          next1.setFrame(3)
        })
        next1.on('pointerout', function() {
          next1.setFrame(2)
        })
        next1.on('pointerdown', function() {
          currentPers1 += 1
          if(currentPers1 >= 4)
            currentPers1 = 1
          pers1.setTexture('f' + currentPers1 + '_w', 0, false)
        })

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
