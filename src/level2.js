;(function() {
  'use strict';
  
  var Level3 = require('./level3.js');
  var Player = require('./player.js');
  var Goal = require('./goal.js');
  var player;
  var goal;
  var map;
  var layer;
  
  var Level2 = module.exports = function Level1() {

  };
  
  Level2.prototype = {
    preload: function () {
      this.load.tilemap('map', 'assets/textures/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
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
      goal.create(3.5*16, 4*16);
      player.create(6*16, 3*16);

      this.state.add('level3', Level3);
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      // End of level?
      state.physics.arcade.collide(player.getEntity(), goal.getEntity(), function () {
        player.levelComplete(true);
        state.state.start('level3');
      });
      player.update();
    }
  };
  
})();