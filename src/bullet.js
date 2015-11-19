;(function() {
  'use strict';
  
  var Bullet = module.exports = function Bullet(game) {
    this.game = game;
    this.hitboxW = 16;
    this.hitboxH = 32;
    this.exists = false;
    this.endX = 0;
    this.endY = 0;
    this.fired = false;

    var projectile = game.add.bitmapData(this.hitboxW, this.hitboxH);

    projectile.ctx.beginPath();
    projectile.ctx.rect(0, 0, this.hitboxW, this.hitboxH);
    projectile.ctx.fillStyle = '#ffa500';
    projectile.ctx.fill();
    
    Phaser.Sprite.call(this, game, 0, 0, projectile);
  };
  
  Bullet.prototype = Object.create(Phaser.Sprite.prototype);
  Bullet.prototype.constructor = Bullet;
  
  Bullet.prototype.fire = function fire(startX, startY, endX, endY) {
    // Can only be fired once
    if (this.fired) {
      return;
    }
    this.fired = true;
    this.endX = endX;
    this.endY = endY;
    
    this.reset(startX, startY);
  };
  
  Bullet.prototype.update = function update() {
    var deltaX = 6;
    var deltaY = 4;

    if (this.y > this.endY) {
      // Animate Up
      this.y -= deltaY;
    } else if (this.y <= this.endY-deltaY) {
      // Animate Down
      this.y += deltaY;
    } else if (this.x < this.endX) {
      // Animate Right
      this.x += deltaX;
    } else {
      this.kill();
    }
  };
  
})();