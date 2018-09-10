import {Component} from '@angular/core';
import {Game, AUTO} from 'phaser-ce';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent {
  title = 'Space Invaders';

  game: Game;
  milSeconds = 0;
  seconds = 0;

  ship;
  aliens;
  bullets;
  bulletTime;
  cursors;
  fireButton;
  explosions;
  starfield;
  score;
  scoreString;
  scoreText;
  lives;
  enemyBullet;
  enemyBullets;
  firingTimer;
  stateText;
  // livingEnemies;
  createAliens;
  enemyFires;
  fireBullet;


  constructor() {
    this.game = new Game(800, 600, AUTO, '', {preload: this.preload, create: this.create, update: this.update, render: this.render});


  }

  preload() {
    this.game.load.image('logo', 'assets/phaser.png');
    this.game.load.image('space', 'assets/space.png');
    this.game.load.image('invader', 'assets/invader.png');
    this.game.load.image('enemyBullet', 'assets/bullet71.png');
    this.game.load.spritesheet('ship', 'assets/cosmo01.png', 54, 44);
    this.game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    this.game.load.image('bullet', 'assets/bullet.png');
  }

// ---------------------------------------------------------------------------------------
  create() {
    this.score = 0;
    this.scoreString = 0;
    this.milSeconds = 0;
    this.seconds = 0;
    this.firingTimer = this.game.time.now + 2000;
    this.bulletTime = 0;
    // this.livingEnemies = [];

    // let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    // logo.anchor.setTo(0.5, 0.5);
    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'space');

    this.game.renderer.clearBeforeRender = false;
    // this.game.renderer.roundPixels = true;

    //  Our bullet group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 1);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    // The enemy's bullets
    this.enemyBullets = this.game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(30, 'enemyBullet');
    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 1);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);


    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    //  The hero!
    this.ship = this.game.add.sprite(350, 500, 'ship');
    this.ship.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(this.ship, true);
    this.ship.body.collideWorldBounds = true;

    //  The baddies!
    this.aliens = this.game.add.group();
    this.aliens.enableBody = true;
    this.aliens.physicsBodyType = Phaser.Physics.ARCADE;


    this.createAliens = () => {

      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 10; x++) {
          const alien = this.aliens.create(x * 48, y * 50, 'invader');
          alien.anchor.setTo(0.5, 0.5);
          alien.animations.add('fly', [0, 1, 2, 3], 20, true);
          alien.play('fly');
          alien.body.moves = false;
        }
      }

      this.aliens.x = 100;
      this.aliens.y = 50;

      //  All this does is basically start the invaders moving. Notice we're
      // moving the Group they belong to, rather than the invaders directly.
      const tween = this.game.add.tween(this.aliens).to({x: 200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

      //  When the tween loops it calls descend
      tween.onLoop.add(descend, this);

      function descend() {
        this.aliens.y += 10;
      }
    };

    this.createAliens();


    //  The score
    this.scoreString = 'Score : ';
    this.scoreText = this.game.add.text(10, 10, this.scoreString + this.score, {font: '34px Arial', fill: '#fff'});

    //  Lives
    this.lives = this.game.add.group();
    this.game.add.text(this.game.world.width - 180, this.game.world.height - 80, 'Lives : ', {font: '34px Arial', fill: '#fff'});

    //  Text
    this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {font: '84px Arial', fill: '#fff'});
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;

    for (let i = 0; i < 3; i++) {
      const ship1 = this.lives.create(this.game.world.width - 200 + (60 * i), this.game.world.height - 100, 'ship');
      ship1.anchor.setTo(0.5, 0.5);
      // ship1.angle = 90;
      ship1.alpha = 0.4;
    }

    function setupInvader(invader) {

      invader.anchor.x = 0.5;
      invader.anchor.y = 0.5;
      invader.animations.add('kaboom');

    }

    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'kaboom');
    this.explosions.forEach(setupInvader, this);

    //  All 40 of them
    this.bullets.createMultiple(40, 'bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);

    //  An explosion pool
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'kaboom');
    this.explosions.forEach(setupInvader, this);

    this.fireBullet = () => {
      console.log('fireBullet');
      //  To avoid them being allowed to fire too fast we set a time limit
      if (this.game.time.now > this.bulletTime) {
        //  Grab the first bullet we can from the pool
        const bullet = this.bullets.getFirstExists(false);

        if (bullet) {
          //  And fire it
          bullet.reset(this.ship.x, this.ship.y - 39);
          bullet.body.velocity.y = -400;
          this.bulletTime = this.game.time.now + 200;
        }
      }

    };

    this.enemyFires = () => {
      let livingEnemies = [];
      //  Grab the first bullet we can from the pool
      const enemyBullet = this.enemyBullets.getFirstExists(false);
      this.aliens.forEachAlive(function (alien) {
        // put every living enemy in an array
        livingEnemies.push(alien);
      });
      if (enemyBullet && livingEnemies.length > 0) {
        const random = this.game.rnd.integerInRange(0, livingEnemies.length - 1);
        // randomly select one of them
        const shooter = livingEnemies[random];
        // And fire the bullet from this enemy
        enemyBullet.reset(shooter.body.x, shooter.body.y);
        this.game.physics.arcade.moveToObject(enemyBullet, this.ship, 200);
        this.firingTimer = this.game.time.now + 2000;
        // }
      }

    };

  }

  // -------------------create () completed ----------------------------------
  render() {
    this.game.debug.text('Space Invaders', 600, 20);
    this.game.debug.text('Game Timer: ' + this.seconds, 600, 60);
    this.game.debug.text('game.time.now: ' + this.game.time.now, 600, 80);
    this.game.debug.text('firingTimer: ' + this.firingTimer, 600, 100);
  }

// -----------------------------------------------------------
  update() {
    function collisionHandler(bullet, alien) {

      //  When a bullet hits an alien we kill them both
      bullet.kill();
      alien.kill();

      //  Increase the score
      this.score += 20;
      this.scoreText.text = this.scoreString + this.score;

      //  And create an explosion :)
      const explosion = this.explosions.getFirstExists(false);
      explosion.reset(alien.body.x, alien.body.y);
      explosion.play('kaboom', 30, false, true);

      if (this.aliens.countLiving() === 0) {
        this.score += 1000;
        this.scoreText.text = this.scoreString + this.score;

        this.enemyBullets.callAll('kill', this);
        this.stateText.text = ' You Won, \n Click to restart';
        this.stateText.visible = true;

        // the "click to restart" handler
        this.game.input.onTap.addOnce(this.restart, this);
      }

    }

    function enemyHitsPlayer(ship, bullet) {

      bullet.kill();
      this.enemyBullets.callAll('kill');
      const live = this.lives.getFirstAlive();

      if (live) {
        live.kill();
      }

      //  And create an explosion :)
      const explosion = this.explosions.getFirstExists(false);
      explosion.reset(ship.body.x, ship.body.y);
      explosion.play('kaboom', 30, false, true);

      // When the player dies
      if (this.lives.countLiving() < 1) {
        ship.kill();
        this.enemyBullets.callAll('kill');

        this.stateText.text = ' GAME OVER \n Click to restart ';
        this.stateText.visible = true;

        // the "click to restart" handler
        this.game.input.onTap.addOnce(this.restart, this);
      }

      this.restart = () => {
        console.log('restart');
        //  A new level starts

        // resets the life count
        this.lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        this.aliens.removeAll();
        this.enemyBullets.callAll('kill');
        this.createAliens();

        // revives the player
        ship.revive();
        // hides the text
        this.stateText.visible = false;

      };


    }


    //  Scroll the background
    this.starfield.tilePosition.y += 2;

    this.milSeconds++;
    if (this.milSeconds === 60) {
      this.milSeconds = 0;
      this.seconds++;
    }

    // movement
    this.ship.body.velocity.x = 0;
    this.ship.body.velocity.y = 0;

    if (this.cursors.left.isDown) {
      this.ship.body.velocity.x = -150;
      this.ship.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.ship.body.velocity.x = 150;
      this.ship.animations.play('right');
    } else if (this.cursors.up.isDown) {
      this.ship.body.velocity.y = -150;
      this.ship.animations.play('right');
    } else if (this.cursors.down.isDown) {
      this.ship.body.velocity.y = 150;
      this.ship.animations.play('left');
    } else {
      // If no movement keys are pressed, stop the player
      this.ship.animations.stop();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.fireBullet();
    }

    if (this.game.time.now > this.firingTimer) {
      // console.log("Открываю огонь", this)
      this.enemyFires();
    }

    //  Run collision
    this.game.physics.arcade.overlap(this.bullets, this.aliens, collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.enemyBullets, this.ship, enemyHitsPlayer, null, this);
    // game.physics.arcade.overlap(enemyBullets, ship, collisionHandler, null, this);

// ------------------update ended-----------------------------------------------


  }
}

