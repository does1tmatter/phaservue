import { Math } from 'phaser'

export default (target1, target2) => Math.Distance.Between(target1.body.x, target1.body.y, target2.body.x, target2.body.y)