import { Scene } from 'phaser'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })

    this.player = null
    this.keys = null
  }

  create () {
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
    this.keys = this.input.keyboard.addKeys({ left: LEFT, right: RIGHT, up: UP, down: DOWN, w: W, a: A, s: S, d: D })
    const map = this.initMap()
    this.player = this.createDude()
    this.physics.add.collider(this.player, map.ocean)
    this.physics.add.collider(this.player, map.walls)
    this.physics.add.collider(this.player, map.houses)
    this.physics.add.collider(this.player, map.misc)
  }

  initMap() {
    const map = this.make.tilemap({ key: 'world' })
    const tileSet = map.addTilesetImage('tileSet', 'worldTiles')

    const ocean = map.createLayer('Ocean', tileSet)
    const ground = map.createLayer('Ground', tileSet)
    const roads = map.createLayer('Roads', tileSet)
    const walls = map.createLayer('Walls', tileSet)
    const misc = map.createLayer('Misc', tileSet)
    const bridges = map.createLayer('Bridges', tileSet)
    const houses = map.createLayer('Houses', tileSet)

    walls.setCollisionByProperty({ collides: true })
    houses.setCollisionByProperty({ collides: true })
    misc.setCollisionByProperty({ collides: true })

    return { ocean, ground, roads, walls, misc, bridges, houses }
  }

  createDude() {
    const player = this.physics.add.sprite(260, 250, 'dude-idle')
    player.setCollideWorldBounds(true)
    this.cameras.main.startFollow(player, true)
    this.cameras.main.setFollowOffset(-player.width, -player.height)

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

    return player
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