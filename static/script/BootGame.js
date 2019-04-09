class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');
  }

  preload() {
    this.load.image('menubg', 'static/img/menubg.jpg');
    this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);

  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("MainMenu");
  }
}
