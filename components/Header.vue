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

        <div class="flex-1"></div>

        <!-- Sign in -->
        <!-- <div>
          <button class="btnTheme">
            Signin
          </button>
        </div> -->
        <!-- End Sign in -->

        <!-- Avatar -->
        <div>
          <div class="flex items-center">
            <Menu as="div" class="relative inline-block">

              <div>
                <MenuButton class="inline-flex justify-center w-10 h-10 rounded-full text-sm font-medium">
                  <img class="w-full h-full rounded-full" src="/images/default_avatar.png" alt="Avatar" />
                </MenuButton>
              </div>

              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-56 cardAvatar rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                  <div class="py-3 px-4">
                    <span class="block text-sm text-gray-900 dark:text-white">#USERNAME#</span>
                    <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">#GROUP#</span>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="https://mpa-hub-nuxt.vercel.app/user/me" :class="[active ? 'bg-gray-100 text-gray-900' : '', 'block px-4 py-2 text-sm']">Account Settings</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : '', 'block px-4 py-2 text-sm']">Language</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : '', 'block px-4 py-2 text-sm']">Theme</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : '', 'block px-4 py-2 text-sm']">Sign out</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>

            </Menu>
          </div>
        </div>
        <!-- End Avatar -->

      </div>
      <!-- End Navbar -->

    </header>
  </div>
</template>
<script setup>
  import {useStores} from '@/store/Store'
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

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