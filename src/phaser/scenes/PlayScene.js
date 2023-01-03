import { Scene } from 'phaser'
import Player from '@/phaser/classes/Player'
import NPC from '@/phaser/classes/NPC'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })

    this.stakingNPC = null

    this.player = null
    this.keys = null
  }

  create () {
    const map = this.initMap()

    this.stakingNPC = new NPC(this, 1375, 200, 'wizard')
    this.stakingNPC.body.setSize(40, 64)
    this.stakingNPC.body.setOffset(90, 64)
    this.stakingNPC.setInteractive()

    this.player = new Player(this, 260, 250, 'dude', true)
    this.setMapColliders(this.player, map)
    this.physics.add.collider(this.player, this.stakingNPC)
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

  setMapColliders (target, object) {
    Object.keys(object).forEach(key => this.physics.add.collider(target, object[key]))
  }

}