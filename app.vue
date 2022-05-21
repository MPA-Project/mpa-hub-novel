<template>
  <div class="bg1 text1 duration-200 transition-colors">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
  import { useStores } from '@/store/Store'

  const mode = ref('light')
  onMounted(() => {
    useStores().$reset()
    window.scroll({top:0})
    console.log("mounted")
  })

  onActivated(() => {
    console.log("activated")
  })

  onBeforeMount(() => {
    console.log("before mount")

    if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light') // Set default Theme
    if (!localStorage.getItem('language')) localStorage.setItem('language', 'en') // Set default Language

    // Check dark mode 
    mode.value = localStorage.getItem('theme')
    if (mode.value) {
      document.documentElement.classList.add(mode.value)
    } else {
      document.documentElement.classList.add('light')
    }
  })


  onRenderTracked(() => {
    console.log("render tracked")
  })

  onUpdated(() => {
    console.log("updated")
  })

  onDeactivated(() => {
    console.log("deactivated")
  })

  onErrorCaptured(() => {
    console.log("error captured")
  })

  onBeforeUnmount(() => {
    console.log("before unmount")
  })

  onUnmounted(() => {
    console.log("unmounted")
  })
</script>