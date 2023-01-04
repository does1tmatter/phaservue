import Phaser from 'phaser'
import { NPC, Player } from '@/phaser/classes'
import { getDistance } from '@/phaser/utils'

export default class Town extends Phaser.Scene {
  constructor () {
    super({ key: 'Town' })

    this.stakingNPC = null
    this.player = null

    this.keys = null
  }

  create () {
    const map = this.initMap()
    this.initStakingNPC()

    this.player = new Player(this, 260, 250, 'dude', true)
    this.setColliders(this.player, { ...map, npc: this.stakingNPC })
  }

  update () {
    this.cameras.main.centerToSize()
    this.player.movement()
  }

  initMap() {
    const map = this.make.tilemap({ key: 'world' })
    const tileSet = map.addTilesetImage('tileSet', 'worldTiles')

    const mapLayers = map.layers.reduce((prevObj, layer) => {
      const newLayer = map.createLayer(layer.name, tileSet)
      newLayer.setCollisionByProperty({ collides: true })
      return { ...prevObj, [layer.name]: newLayer }
    }, {})

    return mapLayers
  }

  setColliders (target, object) {
    Object.keys(object).forEach(key => this.physics.add.collider(target, object[key]))
  }

  initStakingNPC () {
    this.stakingNPC = new NPC(this, 1375, 200, 'wizard')
    this.stakingNPC.body.setSize(40, 64)
    this.stakingNPC.body.setOffset(90, 64)
    this.stakingNPC.setInteractive({ cursor: 'pointer', pixelPerfect: true })
    this.stakingNPC.on('pointerdown', () => this.onStakingNPC())
  }

  onStakingNPC () {
    const distance = getDistance(this.player, this.stakingNPC)
    if (distance < 125) {
      alert('Pressed on NPC')
    } else {
      alert('Target out of range')
    }
  }

}