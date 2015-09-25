;(function () {
  var game;

  var Boot = require('./boot.js');
  var minWidth = 256;
  var minHeight = 240;
  var maxWidth = 768;
  var maxHeight = 720;

  // Initialize
  var game = new Phaser.Game(
    minWidth,
    minHeight,
    Phaser.AUTO,
    '',
    null,
    false,
    false
  );
  
  // Start the game
  game.state.add('boot', Boot);
  game.state.start(
    'boot',
    true,
    false,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight
  );
})();
