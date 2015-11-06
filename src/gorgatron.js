;(function() {
  'use strict';
  
  var Gorgatron = module.exports = function Gorgatron(game) {
    this.game = game;
    this.entity = null;
    this.hitboxW = 46;
    this.hitboxH = 38;
    this.fps = 12;
  };
  
  Gorgatron.prototype = {
    getEntity: function getEntity() {
      return this.entity;
    },
    preload: function preload() {

    },
    create: function create(posX, posY) {
      // Attach sprite to gorgatron
      this.entity = this.game.add.sprite(
        posX,
        posY,
        'gorgatron'
      );
  
      this.entity.animations.add(
        'stomp',
        Phaser.Animation.generateFrameNames('gorgatron/stomp', 1, 4, '', 2)
      );

      // Enable physics
      this.game.physics.arcade.enable(this.entity);

      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      this.entity.body.moves = false;
    },
    stomp: function stomp() {
      this.entity.animations.play('stomp', this.fps, true);
      var entity = this;
      setTimeout(function () {
        entity.entity.animations.stop('stomp', true);
      }, 2000);
    }
  };
  
})();