import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })
    this.map = null
    this.player = null

    this.ocean = null
    this.ground = null
    this.roads = null
    this.walls = null
    this.bridges = null
    this.houses = null
    this.misc = null

    this.keys = null
  }

  create () {
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
    this.keys = this.input.keyboard.addKeys({ left: LEFT, right: RIGHT, up: UP, down: DOWN, w: W, a: A, s: S, d: D })
    this.initMap()
    this.createDude()
    this.physics.add.collider(this.player, this.ocean)
    this.physics.add.collider(this.player, this.walls)
    this.physics.add.collider(this.player, this.houses)
    this.physics.add.collider(this.player, this.misc)
  }

  initMap() {
    this.map = this.make.tilemap({ key: 'world' })
    const tileSet = this.map.addTilesetImage('tileSet', 'worldTiles')

    this.ocean = this.map.createLayer('Ocean', tileSet)
    this.ground = this.map.createLayer('Ground', tileSet)
    this.roads = this.map.createLayer('Roads', tileSet)
    this.walls = this.map.createLayer('Walls', tileSet)
    this.misc = this.map.createLayer('Misc', tileSet)
    this.bridges = this.map.createLayer('Bridges', tileSet)
    this.houses = this.map.createLayer('Houses', tileSet)

    this.walls.setCollisionByProperty({ collides: true })
    this.houses.setCollisionByProperty({ collides: true })
    this.misc.setCollisionByProperty({ collides: true })

    // const debugGraphics = this.add.graphics().setAlpha(0.7)
    // this.ocean.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
    // this.walls.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
    // this.houses.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
    // this.misc.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // })
  }

  createDude() {
    this.player = this.physics.add.sprite(260, 250, 'dude-idle')
    this.player.setCollideWorldBounds(true)
    this.cameras.main.startFollow(this.player, true)
    this.cameras.main.setFollowOffset(-this.player.width, -this.player.height)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude-running', { start: 8, end: 15 }),
      repeat: -1,
      frameRate: 15
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude-running', { start: 16, end: 23 }),
      repeat: -1,
      frameRate: 15
    })
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('dude-running', { start: 24, end: 31 }),
      repeat: -1,
      frameRate: 15
    })
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('dude-running', { start: 0, end: 7 }),
      repeat: -1,
      frameRate: 15
    })
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('dude-idle', { start: 0, end: 7 }),
      repeat: -1,
      frameRate: 15
    })

  }

  update () {
    const { keys } = this
    this.cameras.main.centerToSize()
    this.player.setVelocityX(0)
    this.player.setVelocityY(0)

    if (keys.left.isDown || keys.a.isDown) {
      this.player.setVelocityX(-160)
    } else if (keys.right.isDown || keys.d.isDown) {
      this.player.setVelocityX(160)
    } 

    if (keys.up.isDown || keys.w.isDown) {
      this.player.setVelocityY(-160)
    } else if (keys.down.isDown || keys.s.isDown) {
      this.player.setVelocityY(160)
    }

    if (keys.left.isDown || keys.a.isDown) {
      this.player.anims.play('left', true)
    } else if (keys.right.isDown || keys.d.isDown) {
      this.player.anims.play('right', true)
    } else if (keys.up.isDown || keys.w.isDown) {
      this.player.anims.play('up', true)
    } else if (keys.down.isDown || keys.s.isDown) {
      this.player.anims.play('down', true)
    } else {
      this.player.anims.play('idle', true)
    }
  }
}