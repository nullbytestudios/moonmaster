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