class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }
  create() {
    var button;

    this.add.image(0, 0, 'menubg');
    this.add.text(20, 20, "Last Fight", {font:"40px Arial", fill: "red"});
  }
}
