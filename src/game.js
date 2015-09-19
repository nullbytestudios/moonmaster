
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

require('./player.js')(game);
require('./level1.js')(game);
require('./level2.js')(game);
require('./level3.js')(game);



function preload() {
  //game.load.spritesheet('ground', 'assets/textures/bg.gif', 16, 16);
  //game.load.spritesheet('wall', 'assets/textures/bg.gif', );
  //game.load.image('star', 'assets/star.png');
  //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('player', 'assets/textures/sprites.gif', 32, 32, 3);
}

function create() {
  var player = game.add.sprite(300, 200, 'player');

  player.animations.add('walk');

  player.animations.play('walk', 2, true);
}

function update() {
}
