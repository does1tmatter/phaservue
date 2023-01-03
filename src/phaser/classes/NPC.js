import Phaser from 'phaser'

export default class NPC extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, texturePrefix) {
    super(scene, x, y, `${texturePrefix}-idle`)
    this.texturePrefix = texturePrefix
    scene.add.existing(this)
    scene.physics.world.enableBody(this, 0)

    scene.anims.create({
      key: `${texturePrefix}-idle`,
      frames: scene.anims.generateFrameNumbers(`${texturePrefix}-idle`, { start: 0, end: 3 }),
      repeat: -1,
      frameRate: 8
    })

    this.anims.play(`${texturePrefix}-idle`, true)
    this.body.moves = false
  }

}