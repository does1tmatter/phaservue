<script setup>
const { Game } = await import('@/phaser/main')
const containerId = 'gameContainer'

const { width, height } = useWindowSize()

const computedWidth = computed(() => width.value * 80 / 100)
const computedHeight = computed(() => height.value * 80 / 100)

let gameInstance = null
onMounted(() => {
  gameInstance = new Game(containerId, computedWidth.value, computedHeight.value)
  window.addEventListener("resize", () => gameInstance.scale.resize(computedWidth.value, computedHeight.value))
})

onUnmounted(() => {
  gameInstance.destroy(false)
})
</script>

<template>
  <div :id="containerId" />
</template>