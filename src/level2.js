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
      goal.create(50, 96);
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
            state.state.start('level3');
          },
          2000
        );
      });
      player.update();
    }
  };
  
})();