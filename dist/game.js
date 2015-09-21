(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./menu.js":3}],2:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Level1 = module.exports = function Level1() {

  };
  var player = require('./player.js');
  
  Level1.prototype = {
    preload: function () {
      player = new player(this);
      player.preload();
    },
    create: function () {
      player.create();
    },
    update: function () {
      player.update();
    }
  };
  
})();
},{"./player.js":4}],3:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Menu = module.exports = function Menu() {

  };
  
  Menu.prototype = {
    preload: function () {

    },
    create: function () {
      // Set level1 state
      this.state.add('level1', require('./level1.js'));
    },
    update: function () {
      //
      // TODO: Display menu screen, wait for input, then change state to level1
      //
      this.state.start('level1');
    }
  };
  
})();
},{"./level1.js":2}],4:[function(require,module,exports){
;(function () {
  'use strict';
  
  var Player = module.exports = function Player(game) {
    this.game = game;
    this.entity = null;
    this.joystick = null;
    this.actionButton = null;
    this.movementSpeed = 100;
    this.hitboxW = 30;
    this.hitboxH = 30;
  };
  
  Player.prototype.getEntity = function getEntity() {
    return this.entity;
  }
  
  Player.prototype.preload = function preload() {
    this.game.load.atlas(
      'player',
      'assets/textures/sprites.gif',
      'assets/textures/atlases/player.json'
    );
  }

  Player.prototype.create = function create() {
    this.joystick = this.game.input.keyboard.createCursorKeys();
    this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Attach sprite to player
    this.entity = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'player'
    );

    this.entity.animations.add(
      'walk',
      Phaser.Animation.generateFrameNames('player/walk', 1, 3, '', 2)
    );
    this.entity.animations.add(
      'victory',
      Phaser.Animation.generateFrameNames('player/victory', 1, 6, '', 2)
    );

    // Enable physics
    this.game.physics.arcade.enable(this.entity);
    
    // Set hitbox dimensions
    this.entity.body.setSize(this.hitboxW, this.hitboxH);
    // Enable collision
    this.entity.body.collideWorldBounds = true;
  }
  
  Player.prototype.update = function update() {
    this.entity.body.velocity.x = 0;
    this.entity.body.velocity.y = 0;

    var walking = false;

    if (this.joystick.up.isDown) {
      this.entity.body.velocity.y = -this.movementSpeed;
      walking = true;
    } else if (this.joystick.down.isDown) {
      this.entity.body.velocity.y = this.movementSpeed;
      walking = true;
    }
  
    if (this.joystick.left.isDown) {
      this.entity.body.velocity.x = -this.movementSpeed;
      walking = true;
    } else if (this.joystick.right.isDown) {
      this.entity.body.velocity.x = this.movementSpeed;
      walking = true;
    }

    if (this.actionButton.justPressed) {
      // TODO: animate attack
    }

    if (walking) {
      this.entity.animations.play('walk', 26, true);
    } else {
      this.entity.animations.frame = 0;
      this.entity.animations.stop('walk');
    }
  }
  
  Player.prototype.render = function render() {

  }
})();
},{}]},{},[1]);
