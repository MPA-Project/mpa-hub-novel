<template>
  <div>
    <header :class="[transparantNav ? '' : 'bg1' ,'fixed w-full mx-auto py-2 px-10 z-40 duration-200']">

      <!-- Navbar -->
      <div class="flex justify-between items-center max-w-[1366px] mx-auto transition-all">

        <div>
          <a rel="folow" href="/">
            <div class="w-24 md:w-32 lg:w-40">
              <img class="w-full" src="/images/logo_web.png" alt="Web Logo" />
            </div>
          </a>
        </div>

        <!-- Dark Mode Toggle Button -->
        <button @click="changeMode()" class="bg-neutral-700 dark:bg-neutral-100 p-1.5 px-5 rounded-full transition-all" >
          
          <!-- Sun SVG -->
          <svg v-show="mode == 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-700 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <!-- End Sun SVG -->

          <!-- Moon SVG -->
          <svg v-show="mode == 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- End Moon SVG -->

        </button>
        <!-- End Dark Mode Toggle Button -->

        <!-- <button @click="store.toggleLoadingState()" class="bg-MPAPurple p-2 rounded-xl text-neutral-100">
          <span v-if="store.$state.loadingState">Data State</span>
          <span v-else>Loading State</span>
        </button> -->

      </div>
      <!-- End Navbar -->

    </header>
  </div>
</template>
<script setup>
  import {useStores} from '@/store/Store'

  const store = useStores()
  const transparantNav = ref(true)
  const mode = ref('light')

  const changeMode = () => {
    if (localStorage.getItem('theme') == 'dark') {
      // If current theme == dark, change to light
      document.documentElement.classList.replace('dark', 'light')
      localStorage.setItem('theme', 'light')
      mode.value = 'light'
    } else {
      document.documentElement.classList.replace('light', 'dark')
      localStorage.setItem('theme', 'dark')
      mode.value = 'dark'
    }
  }

  onMounted(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY < 50) {
        if (useRoute().path == '/') {
          return transparantNav.value = false
        } else {
          return transparantNav.value = true
        }
      }
      return transparantNav.value = false
    });
  })
</script>