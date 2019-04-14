class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame');
  }
  preload() {
    // Carregar loading bar
  }

  create() {
    this.scene.start("PreloadGame");
  }
}
