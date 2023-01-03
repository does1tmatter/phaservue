import { Scene } from 'phaser'
import MainPlayer from '@/phaser/classes/MainPlayer'

export default class PlayScene extends Scene {
  constructor () {
    super({ key: 'PlayScene' })

    this.player = null
    this.keys = null
  }

  create () {
    const map = this.initMap()
    this.player = new MainPlayer(this, 260, 250, 'dude')

    this.setColliders(this.player, map)
  }

  update () {
    this.cameras.main.centerToSize()
    this.player.movement()
  }

  initMap() {
    const map = this.make.tilemap({ key: 'world' })
    const tileSet = map.addTilesetImage('tileSet', 'worldTiles')

    const mapLayers = {}
    map.layers.forEach(layer => {
      mapLayers[layer.name] = map.createLayer(layer.name, tileSet)
      mapLayers[layer.name].setCollisionByProperty({ collides: true })
    })

    return mapLayers
  }

  setColliders (target, object) {
    Object.keys(object).forEach(key => this.physics.add.collider(target, object[key]))
  }

}