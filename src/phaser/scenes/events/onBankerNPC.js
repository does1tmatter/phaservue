import { isInRange } from '@/phaser/utils'

export default (scene, player, npc) => {
  if (isInRange(player, npc)) {
    alert(`Pressed on ${npc.name} NPC`)
  } else {
    alert('Target out of range')
  }
}