;(function() {
  'use strict';
  
  var Player = require('./player.js');
  var player;
  var map;
  var layer;
  
  var Level3 = module.exports = function Level1() {

  };
  
  Level3.prototype = {
    preload: function () {
      this.load.tilemap('map', 'assets/textures/tilemaps/level3.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('bg', 'assets/textures/bg.gif');

      player = new Player(this);
      player.preload();
    },
    create: function () {
      map = this.add.tilemap('map');
      map.addTilesetImage('bg');
      map.setCollision(1);
      layer = map.createLayer('walls');
      map.debug = true;

      // Position entities
      player.create(6.75*16, 12*16);
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      player.update();
    }
  };
  
})();