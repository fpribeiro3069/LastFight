class MenuMaps extends Phaser.Scene {
    constructor() {
      super('MenuMaps');
    }


    create() {
        gameState.videoBackGround(this, 3)
        //this.add.text(270, 15, 'ESCOLHER MAPA', {fontSize: '62px'})
        this.add.image(360, 30, 'title3').setOrigin(0, 0)
        let avancar = this.add.image(779, 515, 'comecar').setOrigin(0, 0)
        let voltar = this.add.sprite(30, 515, 'voltar').setOrigin(0, 0)

        let back = this.add.sprite(300, 300, 'nextback')
        let next = this.add.sprite(700, 300, 'nextback').setFrame(2)

        let lenMaps = 2  // HardCoded for maps
        var currentMap = 1

        var currentMapImage = this.add.image(500, 300, 'map' + currentMap + '_preview').setScale(.3)

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
            gameState.map = currentMap
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
            currentMap -= 1
            if(currentMap <= 0)
              currentMap = lenMaps

            console.log('pointerdown: back -> ' + currentMap)
            currentMapImage.destroy()
            currentMapImage = this.add.image(500, 300, 'map' + currentMap + '_preview').setScale(.3)
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
            currentMap += 1
            if(currentMap > lenMaps)
              currentMap = 1

            console.log('pointerdown: next -> ' + currentMap)
            currentMapImage.destroy()
            currentMapImage = this.add.image(500, 300, 'map' + currentMap + '_preview').setScale(.3)
        })

    }
  }
