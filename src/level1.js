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