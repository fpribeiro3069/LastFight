class Fight extends Phaser.Scene {
  constructor() {
    super('Fight');
  }

  create() {
    gameState.murro1 =  this.sound.add('murro'+ gameState.number1)
    gameState.murro2 =  this.sound.add('murro'+ gameState.number2)

    gameState.fire1 =  this.sound.add('fire'+ gameState.number1)
    gameState.fire2 =  this.sound.add('fire'+ gameState.number2)

    gameState.pain1 =  this.sound.add('pain'+ gameState.number1)
    gameState.pain2 =  this.sound.add('pain'+ gameState.number2)


    gameState.isActive = true;
    gameState.speed = 350
    gameState.jump = 600
    // Tirar a musica do menu
    gameState.hasMusic = false
    gameState.som.stop()

    function buildMap(context, num, platforms) {
      // A little HardCoded ):
      context.add.image(500, 300, 'map' + num + '_bg')

      switch (num) {
        case 1:
          // Map 1
          for(let i = 0; i < 1000; i+=60)
            platforms.create(20 + i, 570, 'map'+ num +'_ground').setScale(.7).refreshBody()
          platforms.create(370, 375, 'map'+ num +'_highground').setScale(0.8).refreshBody()
          platforms.create(600, 375, 'map'+ num +'_highground').setScale(0.8).refreshBody()
          platforms.create(500, 200, 'map'+ num +'_highground').setScale(0.8).refreshBody()

          break;
        case 2:
          // Map 2
          platforms.create(500, 570, 'map' + num + '_ground').setScale(2.7).refreshBody()
          platforms.create(200, 300, 'map' + num + '_highground').setScale(2.7).refreshBody()
          platforms.create(800, 300, 'map' + num + '_highground').setScale(2.7).refreshBody()
          platforms.create(500, 390, 'map' + num + '_highground').setScale(2.7).refreshBody()
          platforms.create(500, 150, 'map' + num + '_highground').setScale(2.7).refreshBody()
          break;
      }
    }

    const platforms = this.physics.add.staticGroup();
    buildMap(this, gameState.map, platforms)

    //region Pause
    gameState.pauseMenu = {}
    gameState.pauseMenu.pauseButton = this.add.image(900, 10, 'pause').setOrigin(0, 0).setScale(0.5)
    gameState.pauseMenu.pauseButton.setInteractive({useHandCursor: true})
    gameState.pauseMenu.pauseButton.on('pointerdown', () => {
      gameState.isActive = !gameState.isActive

      if (!gameState.isActive) {
        this.physics.pause()
        console.log('Game is paused!')

        let rect = new Phaser.Geom.Rectangle(230, 200, 500, 200)
        gameState.pauseMenu.rect = this.add.graphics({fillStyle: {color: 0x777777, alpha: 0.5}})
        gameState.pauseMenu.rect.fillRectShape(rect)
        gameState.pauseMenu.resume = this.add.text(380, 230, 'RESUME', {fontSize: '55px'}).setInteractive({useHandCursor: true})
        gameState.pauseMenu.quit = this.add.text(410, 310, 'QUIT', {fontSize: '55px'}).setInteractive({useHandCursor: true})

        gameState.pauseMenu.resume.on('pointerdown', () => {
          this.physics.resume()
          gameState.isActive = !gameState.isActive
          console.log('Game is active!')

          gameState.pauseMenu.rect.destroy()
          gameState.pauseMenu.resume.destroy()
          gameState.pauseMenu.quit.destroy()
        })

        gameState.pauseMenu.quit.on('pointerdown', () => {
          this.scene.start('MainMenu')
        })
      }
      else {
        this.physics.resume()
        console.log('Game is active!')

        gameState.pauseMenu.rect.destroy()
        gameState.pauseMenu.resume.destroy()
        gameState.pauseMenu.quit.destroy()
      }
    })
    //endregion Pause

    const players = this.physics.add.group();
    gameState.player1 = players.create(225, 300, 'f' + gameState.number1 +'_w').setScale(1.5)
    gameState.player2 = players.create(775, 300, 'f' + gameState.number2 +'_w').setScale(1.5)
    gameState.player2.flipX = true

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
      {fontSize: '32px'});
    gameState.player2.vida = 100;
    gameState.player2.vidaText = this.add.text(700, 10, "Player 2: 100",
      {fontSize: '32px'});

    gameState.player1.projectiles = this.physics.add.group()
    gameState.player2.projectiles = this.physics.add.group()

    // Collisions
    gameState.player1.setCollideWorldBounds(true)
    gameState.player2.setCollideWorldBounds(true)
    this.physics.add.collider(players, platforms)
    this.physics.add.collider(gameState.player2, gameState.player1.projectiles, function(player2, projectile) {
      gameState.player2.vida -= 15
      gameState.pain2.play()
      console.log('Player2.vida = ' + gameState.player2.vida)
      projectile.destroy()
      updateHUD()
    })

    this.physics.add.collider(gameState.player1, gameState.player2.projectiles, function(player1, projectile) {
      gameState.player1.vida -= 15
      gameState.pain1.play()
      console.log('Player1.vida = ' + gameState.player1.vida)
      projectile.destroy()
      updateHUD()
    })
    gameState.player1.isHitting = false
    gameState.player2.isHitting = false

    this.physics.add.overlap(gameState.player1, gameState.player2, function(player1, player2) {
      if(gameState.player1.isHitting) {
        gameState.player2.vida -= 10
        gameState.pain2.play()

        console.log('Player2.vida = ' + gameState.player2.vida)
        player2.x = player1.x < player2.x ? player2.x + 10 : player2.x -10
        gameState.player1.isHitting = false
        updateHUD()
      }
      else if(gameState.player2.isHitting) {
        gameState.player1.vida -= 10
        gameState.pain1.play()
        console.log('Player1.vida = ' + gameState.player1.vida)
        player1.x = player1.x < player2.x ? player1.x - 10 : player1.x + 10
        gameState.player2.isHitting = false
        updateHUD()
      }
    })

    // Definir animações for player 1
    this.anims.create({
      key: 'p1_stand',
      frames: [{key:'f' + gameState.number1 +'_w', frame: 0}],
    })

    this.anims.create({
      key: 'p1_walking',
      frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_w', {start: 0, end: 4}),
      repeat: -1
    })

    this.anims.create({
      key: 'p1_jump',
      frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_jump', {start: 0, end: 3}),
      frameRate: 10
    })

    this.anims.create({
      key: 'p1_attack',
      frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_atck'),
      frameRate: 20
    }).on('complete', function(_currentAnim, _currentFrame, sprite) {
      gameState.murro1.play()
      console.log('Completed animation')
      // Check if puch landed
      sprite.play('p1_stand')
      sprite.isHitting = false
    }).on('start', function(_currentAnim, _currentFrame, sprite) {
      sprite.isHitting = true
    })

    this.anims.create({
      key: 'p1_fire',
      frames: this.anims.generateFrameNumbers('f' + gameState.number1 +'_fire'),
      frameRate: 10
    }).on('complete', function(_currentAnim, _currentFrame, sprite) {
      gameState.fire1.play()
      console.log('Completed animation')
      let projectile = sprite.projectiles.create(sprite.x, sprite.y, 'f' + gameState.number1 +'_proj')
      projectile.setGravityY(-1000)
      projectile.body.setVelocityX(sprite.flipX ? -1200 : 1200)
      sprite.play('p1_stand')
    })

    // Animations for player 2
    this.anims.create({
      key: 'p2_stand',
      frames: [{key:'f' + gameState.number2 +'_w', frame: 0}],
    })

    this.anims.create({
      key: 'p2_walking',
      frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_w', {start: 0, end: 4}),
      repeat: -1
    })

    this.anims.create({
      key: 'p2_jump',
      frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_jump', {start: 0, end: 3}),
      frameRate: 10
    })

    this.anims.create({
      key: 'p2_attack',
      frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_atck'),
      frameRate: 20
    }).on('complete', function(_currentAnim, _currentFrame, sprite) {
      gameState.murro2.play()
      console.log('Completed animation')
      // Check if puch landed
      sprite.play('p2_stand')
      sprite.isHitting = false
    }).on('start', function(_currentAnim, _currentFrame, sprite) {
      sprite.isHitting = true
    })

    this.anims.create({
      key: 'p2_fire',
      frames: this.anims.generateFrameNumbers('f' + gameState.number2 +'_fire'),
      frameRate: 10
    }).on('complete', function(_currentAnim, _currentFrame, sprite) {
      gameState.fire2.play()
      console.log('Completed animation')
      let projectile = sprite.projectiles.create(sprite.x, sprite.y, 'f' + gameState.number2 +'_proj')
      projectile.setGravityY(-1000)
      projectile.body.setVelocityX(sprite.flipX ? -1200 : 1200)
      sprite.play('p2_stand')
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
        gameState.player1.setVelocityX(-1 * gameState.speed)
      }
      else if(gameState.player1.controlos.right.isDown) {
        if(gameState.player1.body.onFloor() && !(isAttacking))
          gameState.player1.play('p1_walking', true)
        gameState.player1.flipX = false
        gameState.player1.setVelocityX(gameState.speed)
      }
      else if (gameState.player1.body.onFloor() && !(isAttacking)) {
        gameState.player1.play('p1_stand')
        gameState.player1.setVelocityX(0)
      }

      if(gameState.player1.controlos.up.isDown && gameState.player1.body.onFloor()){
        gameState.player1.play('p1_jump');
        gameState.player1.body.setVelocityY(-1 * gameState.jump);
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.attack)) {
        gameState.player1.play('p1_attack', true)
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player1.controlos.fire)) {
        gameState.player1.play('p1_fire', true)
      }

      // END
      // Update Player2
      isAttacking = gameState.player2.anims.currentAnim == this.anims.get('p2_attack') ||
                        gameState.player2.anims.currentAnim == this.anims.get('p2_fire')

      if(gameState.player2.controlos.left.isDown) {
        if(gameState.player2.body.onFloor() && !(isAttacking))
          gameState.player2.play('p2_walking', true)
        gameState.player2.flipX = true
        gameState.player2.setVelocityX(-1 * gameState.speed)
      }
      else if(gameState.player2.controlos.right.isDown) {
        if(gameState.player2.body.onFloor() && !(isAttacking))
          gameState.player2.play('p2_walking', true)
        gameState.player2.flipX = false
        gameState.player2.setVelocityX(gameState.speed)
      }
      else if (gameState.player2.body.onFloor() && !(isAttacking)) {
        gameState.player2.play('p2_stand')
        gameState.player2.setVelocityX(0)
      }

      if(gameState.player2.controlos.up.isDown && gameState.player2.body.onFloor()){
        gameState.player2.play('p2_jump');
        gameState.player2.body.setVelocityY(-1 * gameState.jump);
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player2.controlos.attack)) {
        gameState.player2.play('p2_attack', true)
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.player2.controlos.fire)) {
        gameState.player2.play('p2_fire', true)
      }
      //END

      // Check Win Condition
      if(gameState.player1.vida <= 0) {
        gameState.isActive = false;
        gameState.player1.vida = 0;
        this.physics.pause()
        let gameover = this.add.text(150, 225, "Player 2 Wins!!!",
          {fontSize: '72px', color:'#ff0000'});
        gameover.setInteractive({useHandCursor: true})
        gameover.on('pointerdown', () => {
          this.scene.start('MainMenu')
        })
      }
      else if(gameState.player2.vida <= 0) {
        gameState.isActive = false;
        gameState.player2.vida = 0;
        this.physics.pause()
        let gameover = this.add.text(150, 225, "Player 1 Wins!!!",
          {fontSize: '72px', color:'#ff0000'});
        gameover.setInteractive({useHandCursor: true})
        gameover.on('pointerdown', () => {
          this.scene.start('MainMenu')
        })
      }
    }
  }
}
