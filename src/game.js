;(function () {
  var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    '',
    {preload: preload, create: create, update: update, render: render }
  );
  var joystick;
  var actionButton;
  
  var player = require('./player.js');
  player = new player(game); // TODO: why can't we requir('./player.js')(game);?
  //require('./level1.js')(game);
  //require('./level2.js')(game);
  //require('./level3.js')(game);
  
  function preload() {
    player.preload();
  }
  
  function create() {
    joystick = game.input.keyboard.createCursorKeys();
    actionButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    player.create(joystick, actionButton);
  }
  
  function update() {
    player.update();
  }
  
  function render() {
    player.render();
  }
})();
