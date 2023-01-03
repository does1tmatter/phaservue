import { Scene } from 'phaser'

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x1e40af;
const COLOR_DARK = 0x260e04;

export default class ConnectWallet extends Scene {
  constructor () {
    super({ key: 'ConnectWallet' })

  }

  createButton = (scene, text, slug) => scene.rexUI.add.label({
    width: 60,
    height: 48,
    background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
    text: scene.add.text(0, 0, text, {
        fontSize: 18
    }),
    align: 'center',
    space: {
        left: 10,
        right: 10,
    },
    name: slug
  })

  create () {
    let buttons = this.rexUI.add.buttons({
      x: this.game.canvas.width * 50 / 100,
      y: this.game.canvas.height * 50 / 100,

      orientation: 'x',
      buttons: [
          this.createButton(this, 'Connect wallet', 'connect').setOrigin(0.5, 1),
      ],

      space: {
          left: 10, right: 10, top: 10, bottom: 10,
          item: 6
      }

    })
      .setOrigin(0.5, 1)
      .layout()

    buttons.getElement('buttons').forEach((button) => button.popUp(1000, undefined, 'Back'))

    buttons.on('button.click', (button, index, pointer, event) => {
      button.scaleYoyo(500, 1.2);
      if (button.name === 'connect') {
        // this.game.emit('connect', { payload: 'test' })
        this.scene.start('PlayScene')
      }
    })
  }


  update () {

  }
}