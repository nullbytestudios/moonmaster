(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;(function () {
  var game = new Phaser.Game(
    800,
    600,
    Phaser.AUTO,
    '',
    {preload: preload, create: create, update: update, render: render }
  );
  var joystick;
  var actionButton;
  
  var player = require('./player.js');
  player = new player(game); // TODO: why can't we requir('./player.js')(game);?
  //require('./level1.js')(game);
  //require('./level2.js')(game);
  //require('./level3.js')(game);
  
  function preload() {
    player.preload();
  }
  
  function create() {
    joystick = game.input.keyboard.createCursorKeys();
    actionButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    player.create(joystick, actionButton);
  }
  
  function update() {
    player.update();
  }
  
  function render() {
    player.render();
  }
})();

},{"./player.js":2}],2:[function(require,module,exports){
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
},{}]},{},[1]);
