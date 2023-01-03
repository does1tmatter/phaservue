import Phaser from 'phaser'

export default class NPC extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, texturePrefix) {
    super(scene, x, y, `${texturePrefix}-idle`)

    scene.add.existing(this)
    scene.physics.world.enableBody(this, 0)

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers(`${texturePrefix}-idle`, { start: 0, end: 7 }),
      repeat: -1,
      frameRate: 15
    })

    this.anims.play('idle', true)
    this.body.moves = false
    const tempSize = [this.body.width, this.body.height]
    this.body.setSize(20, 10)
    this.body.setOffset(tempSize[0] * 35 / 100, tempSize[1] * 75 / 100)
  }

}