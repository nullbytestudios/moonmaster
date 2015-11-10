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
    },
    update: function () {
      var state = this;

      // Collide walls
      state.physics.arcade.collide(player.getEntity(), layer);

      player.update();
      gorgatron.update();
    }
  };
  
})();