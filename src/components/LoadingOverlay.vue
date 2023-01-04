<script setup>
import SpinnerIcon from '@/assets/icons/spinner.svg'
</script>

<template>
  <Transition name="fade">
    <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-[4px] z-[1000]">
      <SpinnerIcon class="w-8 h-8 animate-spin text-white/30 fill-white" />
    </div>
  </Transition>
</template>