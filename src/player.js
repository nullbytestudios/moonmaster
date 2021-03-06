;(function () {
  'use strict';
  
  var Bullet = require('./bullet.js');
  
  var Player = module.exports = function Player(game) {
    this.game = game;
    this.entity = null;
    this.joystick = null;
    this.actionButton = null;
    this.movementSpeed = 100;
    this.hitboxW = 30;
    this.hitboxH = 30;
    this.fps = 20;
    this.victoryLevelFps = 10;
    this.victoryLevel = false;
    this.victoryGame = false;
    this.walking = false;
    this.bullets = game.add.group();
  };
  
  Player.prototype = {
    inBattle: false,
    getBullets: function getBullets() {
      return this.bullets;
    },
    getEntity: function getEntity() {
      return this.entity;
    },
    levelComplete: function levelComplete(complete) {
      this.victoryLevel = complete;
    },
    gameComplete: function gameComplete(complete) {
      this.victoryGame = complete;
    },
    create: function create(posX, posY) {
      this.joystick = this.game.input.keyboard.createCursorKeys();
      this.actionButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  
      // Attach sprite to player
      this.entity = this.game.add.sprite(
        posX,
        posY,
        'player'
      );
  
      this.entity.animations.add(
        'walk',
        Phaser.Animation.generateFrameNames('player/walk', 1, 4, '', 2)
      );
      this.entity.animations.add(
        'victory',
        Phaser.Animation.generateFrameNames('player/victory', 1, 6, '', 2)
      );
      this.entity.animations.add(
        'attack',
        Phaser.Animation.generateFrameNames('player/attack', 1, 2, '', 2)
      );
  
      // Enable physics
      this.game.physics.arcade.enable(this.entity);
      
      // Set hitbox dimensions
      this.entity.body.setSize(this.hitboxW, this.hitboxH);
      // Enable collision
      this.entity.body.collideWorldBounds = true;
      
      // Bind attack
      this.actionButton.onDown.add(this.attack, this);
      
      this.bullets.add(new Bullet(this.game));
      this.game.physics.arcade.enable(this.bullets);
    },
    update: function update() {
      this.entity.body.velocity.x = 0;
      this.entity.body.velocity.y = 0;
      this.walking = false;

      if (this.victoryLevel) {
        this.entity.animations.play('attack', this.victoryLevelFps, true);
        return;        
      }
      if (this.victoryGame) {
        this.entity.animations.play('victory', this.fps, true);
        return;
      }
      
      if (this.joystick.up.isDown) {
        this.move(null, -this.movementSpeed);
      } else if (this.joystick.down.isDown) {
        this.move(null, this.movementSpeed);
      }

      if (this.joystick.left.isDown) {
        this.move(-this.movementSpeed);
      } else if (this.joystick.right.isDown) {
        this.move(this.movementSpeed);
      }
      
      if (!this.walking) {
        this.resetAnimation('walk');
      }
      
      if (this.bulletFired) {
        this.bullet.update();
      }
    },
    resetAnimation: function resetAnimation(name) {
      if (name !== null && this.entity.animations.getAnimation(name).isPlaying) {
        this.entity.animations.stop(name, true);
      }
    },
    move: function move(x, y) {
      if (typeof x === 'number') {
        this.entity.body.velocity.x = x;
      }
      if (typeof y === 'number') {
        this.entity.body.velocity.y = y;
      }
      this.entity.animations.play('walk', this.fps, true);
      this.walking = true;
    },
    attack: function attack() {
      this.walking = false;

      if (this.inBattle) {
        this.game.world.bringToTop(this.bullets);
        var bullet = this.bullets.getFirstDead();
        if (bullet) {
          bullet.fire(this.entity.x, this.entity.y, 215, 60);
        }
      } else {
        this.entity.animations.play('attack', this.fps, false);
      }
    }
  };
})();