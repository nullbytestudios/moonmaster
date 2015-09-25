(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Menu = require('./menu.js');
  
  var Boot = module.exports = function Boot() {

  };
  
  Boot.prototype = {
    minWidth: 256,
    minHeight: 240,
    maxWidth: 256,
    maxHeight: 240,
    init: function (minWidth, minHeight, maxWidth, maxHeight) {
      this.minWidth = minWidth;
      this.minHeight = minHeight;
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
    },
    preload: function () {
      this.physics.startSystem(Phaser.Physics.ARCADE);

      console.log(this.minWidth);
      console.log(this.minHeight);
      console.log(this.maxWidth);
      console.log(this.minHeight);

      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.minWidth = this.minWidth;
      this.scale.minHeight = this.minHeight;
      this.scale.maxWidth = this.maxWidth;
      this.scale.maxHeight = this.maxHeight;
      this.scale.forceLandscape = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.updateLayout(true);
    },
    create: function () {
      this.state.add('menu', Menu);
    },
    update: function () {
      this.state.start('menu');
    }
  };
  
})();
},{"./menu.js":4}],2:[function(require,module,exports){
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

},{"./boot.js":1}],3:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Player = require('./player.js');
  var player;
  
  var Level1 = module.exports = function Level1() {

  };
  
  Level1.prototype = {
    preload: function () {
      player = new Player(this);
      player.preload();
    },
    create: function () {
      player.create(this.game.world.centerX, this.game.world.centerY);
    },
    update: function () {
      player.update();
    }
  };
  
})();
},{"./player.js":5}],4:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Level1 = require('./level1.js');
  
  var Menu = module.exports = function Menu() {

  };
  
  Menu.prototype = {
    preload: function () {

    },
    create: function () {
      // Set level1 state
      this.state.add('level1', Level1);
    },
    update: function () {
      //
      // TODO: Display menu screen, wait for input, then change state to level1
      //
      this.state.start('level1');
    }
  };
  
})();
},{"./level1.js":3}],5:[function(require,module,exports){
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
  
  Player.prototype = {
    getEntity: function getEntity() {
      return this.entity;
    },
    preload:function preload() {
      this.game.load.atlas(
        'player',
        'assets/textures/sprites.gif',
        'assets/textures/atlases/player.json'
      )
    },
    create: function create(posX, posY) {
      this.joystick = this.game.input.keyboard.createCursorKeys();
      this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
      // Attach sprite to player
      this.entity = this.game.add.sprite(
        posX,
        posY,
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
    },
    update: function update() {
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
    },
    render: function render() {
      
    }
  };
})();
},{}]},{},[2]);
