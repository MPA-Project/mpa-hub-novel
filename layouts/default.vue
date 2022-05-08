<template>
  <div>
    <Header />
    <div class="max-w-[90rem] mx-auto min-h-screen max-h-full">
      <slot />
    </div>
    <!-- <Footer/> -->
  </div>
</template>
<script setup>
  import { useStores } from '@/store/Store'
</script>