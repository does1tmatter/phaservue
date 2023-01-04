import { Scene } from 'phaser'

export default class Preloader extends Scene {
  constructor () {
    super({ key: 'Preload' })

    this.width = null
    this.height = null

    this.items = {
      progressBar: null,
      progressBox: null,
      loadingText: null,
      percentText: null,
      assetText: null
    }

    this.boxSize = { width: 320, height: 50 }
    this.barSize = { width: 300, height: 30 }
  }

  preload () {
    this.load.image('worldTiles', '/images/tileSet.png')
    this.load.tilemapTiledJSON('world', '/tileMap.json')

    this.load.spritesheet('dude-idle', '/images/dude/idle.png', { frameWidth: 64, frameHeight: 128 })
    this.load.spritesheet('dude-running', '/images/dude/running.png', { frameWidth: 64, frameHeight: 128 })
    this.load.spritesheet('wizard-idle', '/images/npc/wizard.png', { frameWidth: 230, frameHeight: 150 })

    this.items.progressBar = this.add.graphics()
    this.items.progressBox = this.add.graphics()
    
    this.items.progressBox.fillStyle(0x222222, 0.8).fillRect(0, 0, 320, 50)
    this.items.progressBar.fillStyle(0xffffff, 1)

    this.items.loadingText = this.make.text({
      text: 'Loading...',
      style: {
        font: '20px',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)
    
    this.items.percentText = this.make.text({
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)
    
    this.items.assetText = this.make.text({
      text: '',
      style: {
        font: '18px',
        fill: '#ffffff'
      }
    }).setOrigin(0.5, 0.5)

    this.load.on('progress', (value) => {
      this.items.percentText.setText((value * 100).toFixed() + '%')
      this.items.progressBar.fillRect(0, 0, 300 * value, 30)
    })
                
    this.load.on('fileprogress', (file) => {
      this.items.assetText.setText(file.src)
    })

    this.scale.on('resize', (arg) => this.onResize(arg))
    
    this.load.on('complete', () => {
      Object.keys(this.items).forEach(key => this.items[key].destroy())
      this.scene.start('Town')
    })
  }

  onResize (gameSize) {
    const { width, height } = gameSize

    this.cameras.resize(width, height)

    this.items.progressBox.setPosition(width / 2 - this.boxSize.width / 2, height / 2 - this.boxSize.height / 2)
    this.items.progressBar.setPosition(width / 2 - this.barSize.width / 2, height / 2 - this.barSize.height / 2)
    this.items.loadingText.setPosition(width / 2, height / 2 - this.boxSize.height)
    this.items.percentText.setPosition(width / 2, height / 2 - (this.barSize.height / 2 - 16))
    this.items.assetText.setPosition(width / 2, height / 2 + (this.boxSize.height - 9))
  }

}