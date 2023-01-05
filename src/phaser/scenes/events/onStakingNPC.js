import { isInRange } from '@/phaser/utils'
import { Align } from 'phaser/src/display'

const COLOR_PRIMARY = 0x4e342e
const COLOR_LIGHT = 0x7b5e57
const COLOR_DARK = 0x260e04
const COLOR_RED = 0xdc2626

export default (scene, player, npc) => {
  if (isInRange(player, npc)) {
    const scrollablePanel = scene.rexUI.add.scrollablePanel({
      x: 400,
      y: 300,
      width: 320,
      height: 460,
      scrollMode: 0,
      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY),
      panel: {
        child: createGrid(scene),
        mask: {
          mask: true,
          padding: 1,
        }
      },
      slider: {
        track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_RED),
      },
      mouseWheelScroller: {
        focus: false,
        speed: 0.1
      },
      header: scene.rexUI.add.label({
        height: 30,
        orientation: 0,
        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, COLOR_DARK),
        text: scene.add.text(0, 0, npc.name),
        align: 'center'
      }).setDraggable(),
    
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        panel: 10,
        header: 10,
        footer: 10,
      }
    })
    .layout()
    
    const print = scene.add.text(0, 0, '');

    const closeButton = scene.rexUI.add.label({
      height: 30,
      width: 30,
      orientation: 0,
      background: scene.rexUI.add.roundRectangle(0, 0, 28, 28, 10, COLOR_RED),
      text: scene.add.text(-5, -7, 'X'),
      align: 'center'
    })
    .setInteractive({ useHandCursor: true })

    closeButton.on('pointerup', () => {
      scrollablePanel.destroy()
    })

    scene.rexUI.add.buttons({
      buttons: [ closeButton ],
    })
    .layout()

    Align.In.TopRight(closeButton, scrollablePanel, -10, -10)


    let timeout
    
    scrollablePanel
      .add(closeButton, { expand: false, align: 'center' })
      .setChildrenInteractive()
      .on('child.click', (button) => {
        clearTimeout(timeout)
        print.text += `Click ${button.text}\n`;
        timeout = setTimeout(() => print.text = '', 5000)
      })

  } else {
    alert('Target out of range')
  }
}

const createGrid = function (scene) {
  const sizer = scene.rexUI.add.fixWidthSizer({
    space: {
      left: 3,
      right: 3,
      top: 3,
      bottom: 3,
      item: 8,
      line: 8,
    },
  })
  .addBackground(scene.rexUI.add.roundRectangle(0, 0, 10, 10, 20, COLOR_DARK))

  for (let i = 1; i <= 30; i++) {
    sizer.add(scene.rexUI.add.label({
      width: 60, height: 60,

      background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 14, COLOR_LIGHT),
      text: scene.add.text(0, 0, `${i}`, {
        fontSize: 18
      }),

      align: 'center',
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      }
    }));
  }

  return sizer;
}