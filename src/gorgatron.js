;(function() {
  'use strict';
  
  var Gorgatron = module.exports = function Gorgatron(game) {
    this.game = game;
    this.entity = null;
    this.emotion = null;
    this.hitboxW = 46;
    this.hitboxH = 38;
    this.fps = 12;
    this.hit = false;
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
      this.entity.animations.add(
        'die',
        ['gorgatron/die']
      );
      this.emotion = this.game.add.sprite(
        posX,
        posY,
        'gorgatron'
      );

      // Enable physics
      this.game.physics.arcade.enable(this.entity);

      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      this.entity.body.moves = false;
      
      var gorgatron = this;
      setTimeout(function () {
        gorgatron.stomp();
      }, 200);
    },
    update: function update() {
      if (this.hit) {
        this.entity.animations.play('die', this.fps, true);
      }
    },
    stomp: function stomp() {
      this.entity.animations.play('stomp', this.fps, true);
      var entity = this;
      setTimeout(function () {
        entity.entity.animations.stop('stomp', true);
        entity.emoteLove();
      }, 2000);
    },
    emoteLove: function emoteLove() {
      var x = parseInt(this.entity.x+(this.hitboxW/2));
      var y = this.entity.y;
      var index = 0;
      var deltaY = 12;
      var playTimes = 0;
      var maxPlayTimes = 3;
      var hearts = [
        this.game.add.sprite(x, y - (1*deltaY), 'gorgatron', 'gorgatron/heart'),
        this.game.add.sprite(x, y - (2*deltaY), 'gorgatron', 'gorgatron/heart'),
        this.game.add.sprite(x, y - (3*deltaY), 'gorgatron', 'gorgatron/heart')
      ];

      // hide hearts
      for (var i = 0; i < hearts.length; i++) {
        hearts[i].visible = false;
      } 

      var animateLove = setInterval(function() {
        // Reset
        if (index >= hearts.length) {
          index = 0;
          hideHearts();

          // End ?
          if (++playTimes >= maxPlayTimes) {
            clearInterval(animateLove);
          }
          return;
        }
        
        hearts[index].visible = true;
        index++;
      }, 200);

      function hideHearts()
      {
        for (var i = 0; i < hearts.length; i++) {
          hearts[i].visible = false;
        }
      }
    }
  };
  
})();
