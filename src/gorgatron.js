;(function() {
  'use strict';
  
  var Gorgatron = module.exports = function Gorgatron(game) {
    this.game = game;
    this.entity = null;
    this.hitboxW = 46;
    this.hitboxH = 38;
    this.fps = 12;
    this.hearts = null;
    this.startTime = 0;
  };
  
  Gorgatron.prototype = {
    readyForBattle: false,
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
      this.entity.animations.add(
        'die',
        ['gorgatron/die']
      );

      // Enable physics
      this.game.physics.arcade.enable(this.entity);

      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      this.entity.body.moves = false;

      this.hearts = this.game.add.group(this.entity);

      var deltaY = 12;
      var numHearts = 3;

      for (var i = 1; i <= numHearts; i++) {
        this.hearts.create(parseInt(this.hitboxW/2), -(i*deltaY), 'gorgatron', 'gorgatron/heart', false);
      }

      this.startTime = this.game.time.time;
    },
    update: function update() {
      if (!this.entity.alive) {
        this.readyForBattle = false;
        this.entity.animations.play('die', this.fps, true);
        this.game.add.sprite(
          this.entity.x + 16,
          this.entity.y - 12,
          'gorgatron',
          'gorgatron/broken-heart'
        );
        return;
      }
      
      if (this.readyForBattle === false && this.startTime < this.game.time.time-200) {
        this.stomp();
      }
    },
    stomp: function stomp() {
      var gorgatron = this;
      var playTimes = 4;
      var animation = this.entity.animations.play('stomp', this.fps, true);
      animation.onLoop.add(function() {
        if (animation.loopCount >= playTimes) {
          animation.stop();
          gorgatron.showLove();
        }
      });
    },
    showLove: function showLove() {
      /*
      for (var i = 0; i < this.hearts.children.length; i++) {
        this.hearts.children[i].visible = true;
      }
      */
      this.readyForBattle = true;
      
    }
  };
  
})();
