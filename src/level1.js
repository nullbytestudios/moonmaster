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