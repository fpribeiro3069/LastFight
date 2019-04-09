class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');
  }

  preload() {
    this.load.image('menubg', 'static/img/menubg.jpg');
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("MainMenu");
  }
}
