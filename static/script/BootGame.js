class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');
  }
  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("PreloadGame");
  }
}
