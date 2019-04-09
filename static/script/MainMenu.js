class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  create() {
    this.add.text(20, 20, "Last Fight", {font:"40px Arial", fill: "red"});
  }
}
