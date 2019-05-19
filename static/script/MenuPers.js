class MenuPers extends Phaser.Scene {
    constructor() {
      super('MenuPers');
    }


    create() {
        //this.add.text(175, 15, 'ESCOLHER PERSONAGEM', {fontSize: '62px'})
        gameState.videoBackGround(this, 2)

        this.add.image(165, 30, 'title2').setOrigin(0, 0);
        this.add.image(170, 155, 'player1').setOrigin(0, 0);
        this.add.image(670, 155, 'player2').setOrigin(0, 0);
        //this.add.text(142, 110, 'PLAYER 1', {fontSize: '45px', color: '#2200FF'})
        //this.add.text(650, 110, 'PLAYER 2', {fontSize: '45px', color: '#2200FF'})

        let avancar = this.add.image(779, 515, 'avancar').setOrigin(0, 0)
        let voltar = this.add.sprite(30, 515, 'voltar').setOrigin(0, 0)

        let lenPersonagens = 3  // HardCoded para 3 personagens
        if (gameState.number1 == undefined && gameState.number2 == undefined){
          gameState.number1 = 1
          gameState.number2 = 1
        }

        let pers1 = this.add.sprite(250, 350, 'f' + gameState.number1 + '_w').setScale(3)
        let pers2 = this.add.sprite(750, 350, 'f' + gameState.number2 + '_w').setScale(3)
        pers2.flipX = true

        let pers1Anim = this.anims.create({
          key: 'pers1',
          frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_w', {start: 0, end: 4}),
          frameRate: 10,
          repeat: -1
        })

        let pers2Anim = this.anims.create({
          key: 'pers2',
          frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_w', {start: 0, end: 4}),
          frameRate: 10,
          repeat: -1
        })

        pers1.anims.play('pers1')
        pers2.anims.play('pers2')

        let back1 = this.add.sprite(100, 300, 'nextback')
        let next1 = this.add.sprite(400, 300, 'nextback').setFrame(2)

        let back2 = this.add.sprite(600, 300, 'nextback')
        let next2 = this.add.sprite(900, 300, 'nextback').setFrame(2)

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
        back1.on('pointerdown', () => {
          gameState.number1 -= 1
          if(gameState.number1 <= 0)
            gameState.number1 = lenPersonagens
          pers1.anims.stop()
          pers1.setTexture('f' + gameState.number1 + '_w', 0, false)
          this.anims.remove('pers1')
          pers1Anim = this.anims.create({
            key: 'pers1',
            frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_w', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
          })
          pers1.anims.play('pers1')
        })

        next1.on('pointerover', function() {
          next1.setFrame(3)
        })
        next1.on('pointerout', function() {
          next1.setFrame(2)
        })
        next1.on('pointerdown', () => {
          gameState.number1 += 1
          if(gameState.number1 > lenPersonagens)
            gameState.number1 = 1
          pers1.anims.stop()
          pers1.setTexture('f' + gameState.number1 + '_w', 0, false)
          this.anims.remove('pers1')
          pers1Anim = this.anims.create({
            key: 'pers1',
            frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_w', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
          })
          pers1.anims.play('pers1')
        })

        back2.on('pointerover', function() {
          back2.setFrame(1)
        })
        back2.on('pointerout', function() {
          back2.setFrame(0)
        })
        back2.on('pointerdown', () => {
          gameState.number2 -= 1
          if(gameState.number2 <= 0)
            gameState.number2 = lenPersonagens
          pers2.anims.stop()
          pers2.setTexture('f' + gameState.number2 + '_w', 0, false)
          this.anims.remove('pers2')
          pers2Anim = this.anims.create({
            key: 'pers2',
            frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_w', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
          })
          pers2.anims.play('pers2')
        })

        next2.on('pointerover', function() {
          next2.setFrame(3)
        })
        next2.on('pointerout', function() {
          next2.setFrame(2)
        })
        next2.on('pointerdown', () => {
          gameState.number2 += 1
          if(gameState.number2 >= 4)
            gameState.number2 = 1
          pers2.anims.stop()
          pers2.setTexture('f' + gameState.number2 + '_w', 0, false)
          this.anims.remove('pers2')
          pers2Anim = this.anims.create({
            key: 'pers2',
            frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_w', {start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
          })
          pers2.anims.play('pers2')
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

        this.time.addEvent({
          delay: 1000,
          callback: function() {
            pers1.flipX = !pers1.flipX
            pers2.flipX = !pers2.flipX
          },
          callbackScope: this,
          loop: true
        })

    }
  }
