import { Scene } from 'phaser'

export default class Preloader extends Scene {
  constructor () {
    super({ key: 'Preload' })
  }

  preload () {
    this.load.image('worldTiles', '/images/tileSet.png')
    this.load.tilemapTiledJSON('world', '/tileMap.json')

    this.load.spritesheet('dude-idle', '/images/dude/idle.png', { frameWidth: 64, frameHeight: 128 })
    this.load.spritesheet('dude-running', '/images/dude/running.png', { frameWidth: 64, frameHeight: 128 })
  }

  create () {
    this.load.on('complete', this.scene.start('PlayScene'))
  }
}