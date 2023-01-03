import { Scene } from 'phaser'
import Player from '@/phaser/classes/Player'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })

    this.player = null
    this.keys = null
  }

  create () {
    const map = this.initMap()
    this.player = new Player(this, 260, 250, 'dude', true)

    this.setColliders(this.player, map)
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

}