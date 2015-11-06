;(function() {
  'use strict';
  
  var Goal = module.exports = function Goal(game) {
    this.game = game;
    this.entity = null;
    this.hitboxW = 10;
    this.hitboxH = 4;
  };
  
  Goal.prototype = {
    getEntity: function getEntity() {
      return this.entity;
    },
    preload: function preload() {

    },
    create: function create(posX, posY) {
      // Attach sprite to goal
      this.entity = this.game.add.sprite(
        posX,
        posY,
        'goal'
      );

      // Enable physics
      this.game.physics.arcade.enable(this.entity);

      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      this.entity.body.moves = false;
    }
  };
  
})();