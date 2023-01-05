import { getDistance } from "./"

export default (player, npc, range = 125) => getDistance(player.body.x, player.body.y, npc.body.x, npc.body.y) < range