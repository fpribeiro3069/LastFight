class Fight extends Phaser.Scene {
  constructor() {
    super('Fight');
  }

  create() {
    gameState.isActive = true;
    this.add.image(500, 300, 'map1_bg')

    const platforms = this.physics.add.staticGroup();
    const players = this.physics.add.group();
    // Construir estaticamente o mapa.... Rip nota
    for(let i = 0; i < 1000; i+=60)
      platforms.create(20 + i, 570, 'map1_ground').setScale(.7).refreshBody()

    gameState.player1 = { sprite: undefined, vida: 100, controlos: undefined }
    gameState.player2 = { sprite: undefined, vida: 100, controlos: undefined }

    // Definir controlos (Hard Coded for now)
    gameState.player1.controlos = this.input.keyboard.addKeys({
      up: 'W',
      right: 'D',
      left: 'A',
      attack: 'V',
      fire: 'B'
    })
    gameState.player2.controlos = this.input.keyboard.addKeys({
      up: 'up',
      right: 'right',
      left: 'left',
      attack: 'K',
      fire: 'L'
    })

    gameState.player1.sprite = players.create(225, 300, 'fighter1_still').setScale(1.5)
    gameState.player1.sprite.setCollideWorldBounds(true)
    this.physics.add.collider(players, platforms)

    // Definir animações
    this.anims.create({
      key: 'p1_still',
      repeat: -1,
      frames: this.anims.generateFrameNames('fighter1_still', {start: 0, end: 4})
    })

  }

  update() {
    if(gameState.isActive) {
      // Update Player1
      if(gameState.player1.controlos.left.isDown) {
        gameState.player1.sprite.setVelocityX(-350)
      }
      else if(gameState.player1.controlos.right.isDown) {
        gameState.player1.sprite.setVelocityX(350)
      }
      else {
        gameState.player1.sprite.setVelocityX(0)
        gameState.player1.sprite.play('p1_still')
      }

      if(gameState.player1.controlos.up.isDown && gameState.player1.sprite.body.touching.down) {
        gameState.player1.sprite.setVelocityY(-200)
      }

      if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.attack)) {
        // Atacar close quarters
      }
      else if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.fire)) {
        // Atacar projetil
      }
      // END
      // Update Player2

      //END
    }
  }
}
