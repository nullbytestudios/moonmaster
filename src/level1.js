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
      this.load.tilemap('map', 'assets/textures/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('bg', 'assets/textures/bg.gif');

      player = new Player(this);
      player.preload();

      goal = new Goal(this);
      goal.preload();
    },
    create: function () {
      map = this.add.tilemap('map');
      map.addTilesetImage('bg');
      map.setCollision(1);
      layer = map.createLayer('walls');
      map.debug = true;

      // Position entities
      goal.create(6.5*16, 3*16);
      player.create(6.75*16, 12*16);

      this.state.add('level2', Level2);
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      // End of level?
      state.physics.arcade.collide(player.getEntity(), goal.getEntity(), function () {
        player.levelComplete(true);
        state.state.start('level2');
      });
      player.update();
    }
  };
  
})();