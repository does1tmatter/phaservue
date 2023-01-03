import NPC from '@/phaser/classes/NPC'

export default class MainPlayer extends NPC {
  constructor (scene, x, y, texturePrefix) {
    super(scene, x, y, `${texturePrefix}`)

    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers(`${texturePrefix}-running`, { start: 8, end: 15 }),
      repeat: -1,
      frameRate: 15
    })
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers(`${texturePrefix}-running`, { start: 16, end: 23 }),
      repeat: -1,
      frameRate: 15
    })
    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNumbers(`${texturePrefix}-running`, { start: 24, end: 31 }),
      repeat: -1,
      frameRate: 15
    })
    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNumbers(`${texturePrefix}-running`, { start: 0, end: 7 }),
      repeat: -1,
      frameRate: 15
    })

    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
    this.keys = scene.input.keyboard.addKeys({ left: LEFT, right: RIGHT, up: UP, down: DOWN, w: W, a: A, s: S, d: D })

    scene.cameras.main.startFollow(this.body, true)
    scene.cameras.main.setFollowOffset(-this.body.width, -this.body.height)
  }

  movement() {
    const { keys } = this

    this.body.setVelocityX(0)
    this.body.setVelocityY(0)

    if (keys.left.isDown || keys.a.isDown) {
      this.body.setVelocityX(-160)
    } else if (keys.right.isDown || keys.d.isDown) {
      this.body.setVelocityX(160)
    } 

    if (keys.up.isDown || keys.w.isDown) {
      this.body.setVelocityY(-160)
    } else if (keys.down.isDown || keys.s.isDown) {
      this.body.setVelocityY(160)
    }

    if (keys.left.isDown || keys.a.isDown) {
      this.anims.play('left', true)
    } else if (keys.right.isDown || keys.d.isDown) {
      this.anims.play('right', true)
    } else if (keys.up.isDown || keys.w.isDown) {
      this.anims.play('up', true)
    } else if (keys.down.isDown || keys.s.isDown) {
      this.anims.play('down', true)
    } else {
      this.anims.play('idle', true)
    }
  }
}