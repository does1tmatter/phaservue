import { Between } from 'phaser/src/math/distance'

export default (player, npc, range = 125) => Between(player.body.x, player.body.y, npc.body.x, npc.body.y) < range