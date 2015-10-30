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