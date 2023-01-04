<script setup>
import PhaserContainer from '@/components/PhaserContainer.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
  <main class="flex justify-center items-center min-h-screen">
    <div class="w-[80vw] h-[80vh] bg-black rounded-3xl overflow-hidden shadow-xl border border-white relative">
      <Suspense>
        <PhaserContainer />
        <template #fallback>
          <LoadingOverlay />
        </template>
      </Suspense>
    </div>
  </main>
</template>
