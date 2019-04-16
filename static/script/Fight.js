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

    gameState.player1 = players.create(225, 300, 'fighter1_walking').setScale(1.5, 1.5)
    gameState.player2 = players.create(525, 300, 'fighter1_walking').setScale(-1.5, 1.5)

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

    gameState.player1.vida = 100;
    gameState.player2.vida = 100;

    gameState.player1.setCollideWorldBounds(true)
    this.physics.add.collider(players, platforms)

    // Definir animações
    this.anims.create({
      key: 'p1_walking',
      frames: this.anims.generateFrameNumbers('fighter1_walking', {start: 0, end: 4}),
      repeat: -1
    })

    this.anims.create({
      key: 'p1_attack',
      frames: this.anims.generateFrameNumbers('fighter1_attack'),

    })

  }

  update() {
    if(gameState.isActive) {
      // Update Player1
      if(gameState.player1.controlos.left.isDown) {
        gameState.player1.setVelocityX(-350)
        gameState.player1.setScale(-1.5, 1.5)
        gameState.player1.play('p1_walking', true)
      }
      else if(gameState.player1.controlos.right.isDown) {
        gameState.player1.setVelocityX(350)
        gameState.player1.setScale(1.5, 1.5)
        gameState.player1.play('p1_walking', true)
      }
      else{
        gameState.player1.setVelocityX(0)
        if (gameState.player1.anims.currentAnim != this.anims.get('p1_attack'))
          gameState.player1.setFrame(0)
      }

      if(gameState.player1.controlos.up.isDown && gameState.player1.body.touching.down) {
        gameState.player1.setVelocityY(-200)
      }

      if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.attack)) {
        // Atacar close quarters
        //gameState.player1.anims.stop()
        gameState.player1.play('p1_attack')
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
