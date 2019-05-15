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
    gameState.player2 = players.create(525, 300, 'f1_w').setScale(1.5)

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
    gameState.player1.vidaText = this.add.text(10, 10, "Player 1: 100",
      {fontFamily: 'Comic Sans MS', fontSize: '32px', color: '#faa'});
    gameState.player2.vida = 100;
    gameState.player2.vidaText = this.add.text(700, 10, "Player 2: 100",
      {fontFamily: 'Comic Sans MS', fontSize: '32px', color: '#faa'});

    gameState.player1.projectiles = this.physics.add.group()
    gameState.player2.projectiles = this.physics.add.group()

    // Collisions
    gameState.player1.setCollideWorldBounds(true)
    gameState.player2.setCollideWorldBounds(true)
    this.physics.add.collider(players, platforms)
    this.physics.add.collider(gameState.player2, gameState.player1.projectiles, function(player2, projectile) {
      gameState.player2.vida -= 15
      console.log('Player2.vida = ' + gameState.player2.vida)
      projectile.destroy()
      updateHUD()
    })

    this.physics.add.collider(gameState.player1, gameState.player2.projectiles, function(player1, projectile) {
      gameState.player1.vida -= 15
      console.log('Player1.vida = ' + gameState.player1.vida)
      projectile.destroy()
      updateHUD()
    })
    gameState.player1.isHitting = false
    gameState.player2.isHitting = false

    this.physics.add.overlap(gameState.player1, gameState.player2, function(player1, player2) {
      if(gameState.player1.isHitting) {
        gameState.player2.vida -= 10
        console.log('Player2.vida = ' + gameState.player2.vida)
        player2.x = player1.x < player2.x ? player2.x + 10 : player2.x -10
        gameState.player1.isHitting = false
        updateHUD()
      }
      else if(gameState.player2.isHitting) {
        gameState.player1.vida -= 10
        console.log('Player1.vida = ' + gameState.player1.vida)
        player1.x = player1.x < player2.x ? player1.x + 10 : player1.x -10
        gameState.player2.isHitting = false
        updateHUD()
      }
    })

    // Definir animações
    this.anims.create({
      key: 'p1_stand',
      frames: [{key:'f1_w', frame: 0}],
    })

    this.anims.create({
      key: 'p1_walking',
      frames: this.anims.generateFrameNumbers('f1_w', {start: 0, end: 4}),
      repeat: -1
    })

    this.anims.create({
      key: 'p1_jump',
      frames: this.anims.generateFrameNumbers('f1_jump', {start: 0, end: 3}),
      frameRate: 10
    })

    this.anims.create({
      key: 'p1_attack',
      frames: this.anims.generateFrameNumbers('f1_atck'),
      frameRate: 20
    }).on('complete', function(_currentAnim, _currentFrame, sprite) {
      console.log('Completed animation')
      // Check if puch landed
      sprite.play('p1_stand')
      sprite.isHitting = false
    }).on('start', function(_currentAnim, _currentFrame, sprite) {
      sprite.isHitting = true
    })

    this.anims.create({
      key: 'p1_fire',
      frames: this.anims.generateFrameNumbers('f1_fire'),
      frameRate: 10
    }).on('complete', function(_currentAnim, _currentFrame, sprite) {
      console.log('Completed animation')
      let projectile = sprite.projectiles.create(sprite.x, sprite.y, 'f1_proj')
      projectile.setGravityY(-1000)
      projectile.body.setVelocityX(sprite.flipX ? -1200 : 1200)
      sprite.play('p1_stand')
    })

    function updateHUD() {
      gameState.player2.vidaText.setText('Player 2: ' + gameState.player2.vida)
      gameState.player1.vidaText.setText('Player 1: ' + gameState.player1.vida)
    }

  }

  update() {
    if(gameState.isActive) {
      // Update Player1
      var isAttacking = gameState.player1.anims.currentAnim == this.anims.get('p1_attack') ||
                        gameState.player1.anims.currentAnim == this.anims.get('p1_fire')

      if(gameState.player1.controlos.left.isDown) {
        if(gameState.player1.body.onFloor() && !(isAttacking))
          gameState.player1.play('p1_walking', true)
        gameState.player1.flipX = true
        gameState.player1.setVelocityX(-350)
      }
      else if(gameState.player1.controlos.right.isDown) {
        if(gameState.player1.body.onFloor() && !(isAttacking))
          gameState.player1.play('p1_walking', true)
        gameState.player1.flipX = false
        gameState.player1.setVelocityX(350)
      }
      else if (gameState.player1.body.onFloor() && !(isAttacking)) {
        gameState.player1.play('p1_stand')
        gameState.player1.setVelocityX(0)
      }

      if(gameState.player1.controlos.up.isDown && gameState.player1.body.onFloor()){
        gameState.player1.play('p1_jump');
        gameState.player1.body.setVelocityY(-400);
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.attack)) {
        gameState.player1.play('p1_attack', true)
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.fire)) {
        gameState.player1.play('p1_fire', true)
      }

      // END
      // Update Player2
      isAttacking = gameState.player2.anims.currentAnim == this.anims.get('p1_attack') ||
                        gameState.player2.anims.currentAnim == this.anims.get('p1_fire')

      if(gameState.player2.controlos.left.isDown) {
        if(gameState.player2.body.onFloor() && !(isAttacking))
          gameState.player2.play('p1_walking', true)
        gameState.player2.flipX = true
        gameState.player2.setVelocityX(-350)
      }
      else if(gameState.player2.controlos.right.isDown) {
        if(gameState.player2.body.onFloor() && !(isAttacking))
          gameState.player2.play('p1_walking', true)
        gameState.player2.flipX = false
        gameState.player2.setVelocityX(350)
      }
      else if (gameState.player2.body.onFloor() && !(isAttacking)) {
        gameState.player2.play('p1_stand')
        gameState.player2.setVelocityX(0)
      }

      if(gameState.player2.controlos.up.isDown && gameState.player2.body.onFloor()){
        gameState.player2.play('p1_jump');
        gameState.player2.body.setVelocityY(-400);
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player2.controlos.attack)) {
        gameState.player2.play('p1_attack', true)
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player2.controlos.fire)) {
        gameState.player2.play('p1_fire', true)
      }
      //END

      // Check Win Condition
      if(gameState.player1.vida <= 0) {
        gameState.isActive = false;
        gameState.player1.vida = 0;
        this.physics.pause()
        let gameover = this.add.text(300, 250, "Player 2 Wins!!!",
          {fontFamily: 'Comic Sans MS', fontSize: '72px', color: '#faa'});
        gameover.setInteractive({useHandCursor: true})
        gameover.on('pointerdown', () => {
          this.scene.start('MainMenu')
        })
      }
      else if(gameState.player2.vida <= 0) {
        gameState.isActive = false;
        gameState.player2.vida = 0;
        this.physics.pause()
        let gameover = this.add.text(300, 250, "Player 1 Wins!!!",
          {fontFamily: 'Comic Sans MS', fontSize: '72px', color: '#faa'});
        gameover.setInteractive({useHandCursor: true})
        gameover.on('pointerdown', () => {
          this.scene.start('MainMenu')
        })
      }
    }
  }
}
