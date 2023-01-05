import Phaser from 'phaser'
import { Preload, Town } from '@/phaser/scenes'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

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
          debug: false
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
        Town
      ],
      plugins: {
        scene: [{
          key: 'rexUI',
          plugin: RexUIPlugin,
          mapping: 'rexUI'
        }]
      }
    })

  }
}