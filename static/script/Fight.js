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

    gameState.player1 = players.create(225, 300, 'f1_w').setScale(1.5)
    gameState.player2 = players.create(525, 300, 'f1_w_f').setScale(1.5)

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
      key: 'p1_stand',
      frames: [{key:'f1_w', frame: 2}],
    })

    this.anims.create({
      key: 'p1_stand_f',
      frames: [{key:'f1_w_f', frame: 0}],
    })

    this.anims.create({
      key: 'p1_walking',
      frames: this.anims.generateFrameNumbers('f1_w', {start: 0, end: 4}),
      repeat: -1
    })

    this.anims.create({
      key: 'p1_walking_f',
      frames: this.anims.generateFrameNumbers('f1_w_f', {start: 0, end: 4}),
      repeat: -1
    })

    this.anims.create({
      key: 'p1_jump',
      frames: this.anims.generateFrameNumbers('f1_jump', {start: 0, end: 3}),
    })

    this.anims.create({
      key: 'p1_jump_f',
      frames: this.anims.generateFrameNumbers('f1_jump_f', {start: 0, end: 3}),
    })

    this.anims.create({
      key: 'p1_attack1',
      frames: this.anims.generateFrameNumbers('f1_atck1'),

    })

    this.anims.create({
      key: 'p1_attack2',
      frames: this.anims.generateFrameNumbers('f1_atck2'),

    })

  }

  update() {
    if(gameState.isActive) {
      // Update Player1
      if(gameState.player1.controlos.left.isDown) {
        if(gameState.player1.body.onFloor() && gameState.player1.play('p1_walking', true))
          gameState.player1.play('p1_walking', true)
        gameState.player1.flipX = true
        gameState.player1.setVelocityX(-350)
      }
      else if(gameState.player1.controlos.right.isDown) {
        if(gameState.player1.body.onFloor() && gameState.player1.play('p1_walking', true))
          gameState.player1.play('p1_walking', true)
        gameState.player1.flipX = false
        gameState.player1.setVelocityX(350)
      }
      else {
        if (gameState.player1.body.onFloor()) {
          gameState.player1.play('p1_stand')
        }
        else {
          gameState.player1.play('p1_jump')
        }
        gameState.player1.setVelocityX(0)
      }

      if(gameState.player1.controlos.up.isDown && gameState.player1.body.onFloor()){
        gameState.player1.play('p1_jumping');
        gameState.player1.body.setVelocityY(-400);
    }

      // END
      // Update Player2

      //END
    }
  }
}
