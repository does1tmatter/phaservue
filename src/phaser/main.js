import Phaser from 'phaser'
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'

import Preload from '@/phaser/scenes/Preload'
import ConnectWallet from '@/phaser/scenes/ConnectWallet'
import PlayScene from '@/phaser/scenes/PlayScene'

const launch = (containerId, width, height, emit) => new Phaser.Game({
  type: Phaser.AUTO,
  width,
  height,
  parent: containerId,
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
    ConnectWallet,
    PlayScene
  ],
  plugins: {
    scene: [{
      key: 'rexUI',
      plugin: RexUIPlugin,
      mapping: 'rexUI'
    }]
  }
})

export default launch
export { launch }