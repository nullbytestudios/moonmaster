(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Menu = require('./menu.js');
  
  var Boot = module.exports = function Boot() {

  };
  
  Boot.prototype = {
    minWidth: 320,
    minHeight: 240,
    maxWidth: 320,
    maxHeight: 240,
    init: function (minWidth, minHeight, maxWidth, maxHeight) {
      this.minWidth = minWidth;
      this.minHeight = minHeight;
      this.maxWidth = maxWidth;
      this.maxHeight = maxHeight;
    },
    preload: function () {
      this.load.image('bg', 'assets/textures/bg.gif');
      this.load.atlas(
        'player',
        'assets/textures/sprites.gif',
        'assets/textures/atlases/player.json'
      );
      this.load.atlas(
        'goal',
        'assets/textures/sprites.gif',
        'assets/textures/atlases/goal.json'
      );
      this.load.atlas(
        'gorgatron',
        'assets/textures/sprites.gif',
        'assets/textures/atlases/gorgatron.json'
      );
      // load level maps
      for (var i=1; i<=3; i++) {
        this.load.tilemap(
          'level' + i,
          'assets/textures/tilemaps/level' + i + '.json',
          null,
          Phaser.Tilemap.TILED_JSON
        );
      }
      
      this.physics.startSystem(Phaser.Physics.ARCADE);

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
},{"./menu.js":8}],2:[function(require,module,exports){
;(function () {
  var game;

  var Boot = require('./boot.js');
  var minWidth = 320;
  var minHeight = 240;
  var maxWidth = 960;
  var maxHeight = 720;

  // Initialize
  var game = new Phaser.Game(
    minWidth,
    minHeight,
    Phaser.AUTO,
    'moonmaster',
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
  
  var Goal = module.exports = function Goal(game) {
    this.game = game;
    this.entity = null;
    this.hitboxW = 20;
    this.hitboxH = 4;
  };
  
  Goal.prototype = {
    getEntity: function getEntity() {
      return this.entity;
    },
    preload: function preload() {

    },
    create: function create(posX, posY) {
      // Attach sprite to goal
      this.entity = this.game.add.sprite(
        posX,
        posY,
        'goal'
      );

      // Enable physics
      this.game.physics.arcade.enable(this.entity);

      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      this.entity.body.moves = false;
    }
  };
  
})();
},{}],4:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Gorgatron = module.exports = function Gorgatron(game) {
    this.game = game;
    this.entity = null;
    this.hitboxW = 46;
    this.hitboxH = 38;
    this.fps = 12;
  };
  
  Gorgatron.prototype = {
    getEntity: function getEntity() {
      return this.entity;
    },
    preload: function preload() {

    },
    create: function create(posX, posY) {
      // Attach sprite to gorgatron
      this.entity = this.game.add.sprite(
        posX,
        posY,
        'gorgatron'
      );
  
      this.entity.animations.add(
        'stomp',
        Phaser.Animation.generateFrameNames('gorgatron/stomp', 1, 4, '', 2)
      );

      // Enable physics
      this.game.physics.arcade.enable(this.entity);

      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      this.entity.body.moves = false;
    },
    stomp: function stomp() {
      this.entity.animations.play('stomp', this.fps, true);
      var entity = this;
      setTimeout(function () {
        entity.entity.animations.stop('stomp', true);
      }, 2000);
    }
  };
  
})();
},{}],5:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Level2 = require('./level2.js');
  var Player = require('./player.js');
  var Goal = require('./goal.js');
  var player;
  var goal;
  var map;
  var layer;
  
  var Level1 = module.exports = function Level1() {

  };
  
  Level1.prototype = {
    preload: function () {
      player = new Player(this);
      goal = new Goal(this);
    },
    create: function () {
      map = this.add.tilemap('level1');
      map.addTilesetImage('bg');
      map.setCollision(1);
      layer = map.createLayer('walls');

      // Position entities
      goal.create(136, 56);
      player.create(138, 182);

      this.state.add('level2', Level2);
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      // End of level?
      state.physics.arcade.collide(player.getEntity(), goal.getEntity(), function () {
        player.levelComplete(true);
        setTimeout(
          function () {
            state.state.start('level2')
          },
          2000
        );
      });
      player.update();
    }
  };
  
})();
},{"./goal.js":3,"./level2.js":6,"./player.js":9}],6:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Level3 = require('./level3.js');
  var Player = require('./player.js');
  var Goal = require('./goal.js');
  var player;
  var goal;
  var map;
  var layer;
  
  var Level2 = module.exports = function Level2() {

  };
  
  Level2.prototype = {
    preload: function () {
      player = new Player(this);
      goal = new Goal(this);
    },
    create: function () {
      map = this.add.tilemap('level2');
      map.addTilesetImage('bg');
      map.setCollision(1);
      layer = map.createLayer('walls');
      map.debug = true;

      // Position entities
      goal.create(53, 100);
      player.create(88, 76);

      this.state.add('level3', Level3);
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      // End of level?
      state.physics.arcade.collide(player.getEntity(), goal.getEntity(), function () {
        player.levelComplete(true);
        setTimeout(
          function () {
            state.state.start('level3')
          },
          2000
        );
      });
      player.update();
    }
  };
  
})();
},{"./goal.js":3,"./level3.js":7,"./player.js":9}],7:[function(require,module,exports){
;(function() {
  'use strict';
  
  var Player = require('./player.js');
  var Gorgatron = require('./gorgatron.js');
  var player;
  var gorgatron;
  var map;
  var layer;
  
  var Level3 = module.exports = function Level3() {

  };
  
  Level3.prototype = {
    preload: function () {
      player = new Player(this);
      gorgatron = new Gorgatron(this);
    },
    create: function () {
      map = this.add.tilemap('level3');
      map.addTilesetImage('bg');
      map.setCollision(1);
      layer = map.createLayer('walls');
      map.debug = true;
      
      // draw boxes to smooth level
      var box = new Phaser.Rectangle(16, 0, 16, 16);
      this.add.image(120, 40, 'bg', 1).crop(box);
      this.add.image(168, 40, 'bg', 1).crop(box);

      // Position entities
      player.create(138, 182);
      gorgatron.create(215, 60);
      
      setTimeout(function () {
        gorgatron.stomp();
      }, 200);
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      player.update();
    }
  };
  
})();
},{"./gorgatron.js":4,"./player.js":9}],8:[function(require,module,exports){
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
},{"./level1.js":5}],9:[function(require,module,exports){
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
    this.fps = 24;
    this.victory = false;
    this.walking = false;
  };
  
  Player.prototype = {
    getEntity: function getEntity() {
      return this.entity;
    },
    levelComplete: function levelComplete(complete) {
      this.victory = complete;
    },
    preload:function preload() {

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
        Phaser.Animation.generateFrameNames('player/walk', 1, 4, '', 2)
      );
      this.entity.animations.add(
        'victory',
        Phaser.Animation.generateFrameNames('player/victory', 1, 6, '', 2)
      );
      this.entity.animations.add(
        'attack',
        Phaser.Animation.generateFrameNames('player/attack', 1, 2, '', 2)
      );
  
      // Enable physics
      this.game.physics.arcade.enable(this.entity);
      
      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      // Enable collision
      this.entity.body.collideWorldBounds = true;
      
      // Bind attack
      this.actionButton.onDown.add(this.attack, this);
    },
    update: function update() {
      this.entity.body.velocity.x = 0;
      this.entity.body.velocity.y = 0;
      this.walking = false;

      if (this.victory) {
        this.entity.animations.play('victory', this.fps, true);
        return;
      }
      
      if (this.joystick.up.isDown) {
        this.move(null, -this.movementSpeed);
      } else if (this.joystick.down.isDown) {
        this.move(null, this.movementSpeed);
      }

      if (this.joystick.left.isDown) {
        this.move(-this.movementSpeed);
      } else if (this.joystick.right.isDown) {
        this.move(this.movementSpeed);
      }
      
      if (!this.walking) {
        this.resetAnimation('walk');
      }
    },
    resetAnimation: function resetAnimation(name) {
      if (name !== null && this.entity.animations.getAnimation(name).isPlaying) {
        this.entity.animations.stop(name, true);
      }
    },
    move: function move(x, y) {
      if (typeof x === 'number') {
        this.entity.body.velocity.x = x;
      }
      if (typeof y === 'number') {
        this.entity.body.velocity.y = y;
      }
      this.entity.animations.play('walk', this.fps, true);
      this.walking = true;
    },
    attack: function attack() {
      this.walking = false;
      this.entity.animations.play('attack', this.fps, false);
      /*
      #
      # TODO: During normal play, swing the sword. If in battle, fire beam.
      #
      */
    }
  };
})();
},{}]},{},[2]);
