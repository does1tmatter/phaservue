import { Scene } from 'phaser'
import { NPC, Player } from '@/phaser/classes'
import { getDistance } from '@/phaser/utils'

export default class Town extends Scene {
  constructor () {
    super({ key: 'Town' })

    this.npcList = [
      { 
        type: 'StakingNPC',
        x: 340, 
        y: 220, 
        texture: 'wizard', 
        interactive: { status: true, callback: this.onStakingNPC }, 
        methods: { body: { setSize: [40, 64], setOffset: [90, 64] } }
      }
    ]

    this.player = null
    this.npc = {}

    this.keys = null
  }

  create () {
    const map = this.initMap()
    this.npc = this.initNPC(this.npcList)

    this.player = new Player(this, 260, 250, 'dude', true)
    this.setColliders(this.player, { ...map, ...this.npc })
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

  initNPC (list) {
    const npcs = {}

    list.forEach(n => {
      npcs[n.type] = new NPC(this, n.x, n.y, n.texture)
      if (n.interactive?.status) {
        npcs[n.type].setInteractive({ useHandCursor: true, pixelPerfect: true })
        npcs[n.type].on('pointerup', () => n.interactive.callback(this.player, npcs[n.type]))
      }
      if (n.methods) Object.keys(n.methods).forEach(key => { Object.keys(n.methods[key]).forEach(method => { npcs[n.type][key][method](...n.methods[key][method]) }) })
    })

    return npcs
  }
  
  onStakingNPC (player, npc) {
    const { x, y } = player.body
    const { x: x1, y: y1 } = npc.body
    const distance = getDistance(x, y, x1, y1)

    if (distance < 125) {
      alert('Pressed on NPC')
    } else {
      alert('Target out of range')
    }
  }

}