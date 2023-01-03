<script setup>
const game = await import('@/phaser/main')
const containerId = 'gameContainer'

const { width, height } = useWindowSize()
const fps = useFps()

const computedWidth = computed(() => width.value * 80 / 100)
const computedHeight = computed(() => height.value * 80 / 100)

let gameInstance = null
onMounted(() => {
  gameInstance = game.launch(containerId, computedWidth.value, computedHeight.value)
  window.addEventListener("resize", () => gameInstance.scale.resize(computedWidth.value, computedHeight.value))
})

onUnmounted(() => {
  gameInstance.destroy(false)
})
</script>

<template>
  <pre class="fixed bottom-0 left-0 text-xs">
    {{ { fps, width, height } }}
  </pre>
  <div :id="containerId" class="rounded-3xl overflow-hidden shadow-xl border border-white" />
</template>