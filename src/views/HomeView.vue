<script setup>
import PhaserContainer from '@/components/PhaserContainer.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
  <main class="flex justify-center items-center min-h-screen">
    <Suspense>
      <PhaserContainer />
      <template #fallback>
        <div class="w-[80vw] h-[80vh] bg-[#50a7e8] rounded-3xl overflow-hidden shadow-xl border border-white relative">
          <LoadingOverlay />
        </div>
      </template>
    </Suspense>
  </main>
</template>
