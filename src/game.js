;(function () {
  var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    '',
    null,
    false,
    false
  );
  
  game.state.add('menu', require('./menu.js'));
  game.state.start('menu');
  game.physics.startSystem(Phaser.Physics.ARCADE);
})();
