import { Between } from 'phaser/src/math/distance'

export default (target1, target2) => Between(target1.body.x, target1.body.y, target2.body.x, target2.body.y)