;(function () {
  'use strict';
  
  var Player = module.exports = function Player(game) {
    this.game = game;
    this.entity = null;
    this.joystick = null;
    this.actionButton = null;
    this.movementSpeed = 100;
  };
  
  Player.prototype.getEntity = function getEntity() {
    return this.entity;
  }
  
  Player.prototype.preload = function preload() {
    this.game.load.spritesheet('player', 'assets/textures/sprites.gif', 42, 30, 3);
  }

  Player.prototype.create = function create(joystick, actionButton) {
    this.joystick = joystick;
    this.actionButton = actionButton;
    this.entity = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'player'
    );
    this.entity.animations.add('walk');
    this.game.physics.arcade.enable(this.entity);
    this.entity.body.collideWorldBounds = true;
  }
  
  Player.prototype.update = function update() {
    this.entity.body.velocity.x = 0;
    this.entity.body.velocity.y = 0;

    var walking = false;

    if (this.joystick.up.isDown) {
      this.entity.body.velocity.y = -this.movementSpeed;
      walking = true;
    } else if (this.joystick.down.isDown) {
      this.entity.body.velocity.y = this.movementSpeed;
      walking = true;
    }
  
    if (this.joystick.left.isDown) {
      this.entity.body.velocity.x = -this.movementSpeed;
      walking = true;
    } else if (this.joystick.right.isDown) {
      this.entity.body.velocity.x = this.movementSpeed;
      walking = true;
    }

    if (this.actionButton.justPressed) {
      // TODO: animate attack
    }

    if (walking) {
      this.entity.animations.play('walk', 26, true);
    } else {
      this.entity.animations.frame = 0;
      this.entity.animations.stop('walk');
    }
  }
  
  Player.prototype.render = function render() {

  }
})();