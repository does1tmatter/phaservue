import Phaser from 'phaser'
import Preload from '@/phaser/scenes/Preload'
import PlayScene from '@/phaser/scenes/PlayScene'

export class Game extends Phaser.Game {
  constructor (parent, width, height) {

    super({
      type: Phaser.AUTO,
      width,
      height,
      parent,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0 },
          debug: true
        }
      },
      scale: {
        mode: Phaser.Scale.NONE,
        width,
        height,
      },
      backgroundColor: 0x50a7e8,
      scene: [
        Preload,
        PlayScene
      ]
    })

  }
}