import { Scene } from 'phaser'
import { NPC, Player } from '@/phaser/classes'
import { isInRange } from '@/phaser/utils'

export default class Town extends Scene {
  constructor () {
    super({ key: 'Town' })

    this.player = null
    this.npc = {}
  }

  create () {
    const map = initMap(this)
    this.npc = initNPC(this, npcList)

    this.player = new Player(this, 260, 250, 'dude', true)
    setColliders(this, this.player, { ...map, ...this.npc })
  }

  update () {
    this.cameras.main.centerToSize()
    this.player.movement()
  }

}

const initMap = (scene) => {
  const map = scene.make.tilemap({ key: 'world' })
  const tileSet = map.addTilesetImage('tileSet', 'worldTiles')

  const mapLayers = map.layers.reduce((prevObj, layer) => {
    const newLayer = map.createLayer(layer.name, tileSet)
    newLayer.setCollisionByProperty({ collides: true })
    return { ...prevObj, [layer.name]: newLayer }
  }, {})

  return mapLayers
}

const setColliders = (scene, target, object) => Object.keys(object).forEach(key => scene.physics.add.collider(target, object[key]))

const initNPC = (scene, list) => {
  const npcs = {}

  list.forEach(n => {
    npcs[n.type] = new NPC(scene, n.x, n.y, n.texture, n.type)
    if (n.interactive?.status) {
      npcs[n.type].setInteractive({ useHandCursor: true, pixelPerfect: true })
      npcs[n.type].on('pointerup', () => n.interactive.callback(scene.player, npcs[n.type]))
    }
    if (n.methods) Object.keys(n.methods).forEach(key => { Object.keys(n.methods[key]).forEach(method => { npcs[n.type][key][method](...n.methods[key][method]) }) })
  })

  return npcs
}

const onStakingNPC = (player, npc) => isInRange(player, npc) ? alert(`Pressed on ${npc.name} NPC`) : alert('Target out of range')

const npcList = [
  {
    type: 'Staker',
    x: 340, 
    y: 220, 
    texture: 'wizard', 
    interactive: { status: true, callback: onStakingNPC }, 
    methods: { body: { setSize: [40, 64], setOffset: [90, 64] } }
  },
  { 
    type: 'Banker',
    x: 500, 
    y: 220, 
    texture: 'wizard', 
    interactive: { status: true, callback: onStakingNPC }, 
    methods: { body: { setSize: [40, 64], setOffset: [90, 64] } }
  },
]