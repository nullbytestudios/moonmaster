(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

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

},{"./level1.js":4,"./level2.js":5,"./level3.js":6,"./player.js":7}],3:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],6:[function(require,module,exports){
require('./gorgatron.js')(game);
require('./bullet.js')(game);

},{"./bullet.js":1,"./gorgatron.js":3}],7:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}]},{},[2]);
