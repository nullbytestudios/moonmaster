;(function() {
  'use strict';
  
  var Menu = module.exports = function Menu() {

  };
  
  Menu.prototype = {
    preload: function () {

    },
    create: function () {
      // Set level1 state
      this.state.add('level1', require('./level1.js'));
    },
    update: function () {
      //
      // TODO: Display menu screen, wait for input, then change state to level1
      //
      this.state.start('level1');
    }
  };
  
})();