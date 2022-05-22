<template>
  <div class="bg1 text1 duration-200 transition-colors">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
  import { useStores } from '@/store/Store'
  import { Config } from './config'
  import { AuthResponse, UniversalResponse } from './models'

  const store = useStores()
  const mode = ref('light')
  const isLogged = ref(false)

  onMounted(() => {
    window.scroll({top:0})
    console.log("mounted")

    authInitialize()
  })

  const authInitialize = async () => {
    const getRefreshTokenCookie = useCookie(Config.COOKIE.REFRESH_TOKEN)

    if (getRefreshTokenCookie.value && getRefreshTokenCookie.value != null && getRefreshTokenCookie.value != undefined) {
      try {
        const resp = await $fetch<UniversalResponse<AuthResponse>>('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            refresh_token: getRefreshTokenCookie.value
          }
        })

        useCookie(Config.COOKIE.REFRESH_TOKEN, {
          domain: Config.COOKIE.DOMAIN,
          httpOnly: Config.COOKIE.HTTP_ONLY,
          path: '/',
          expires: new Date(resp.data.refresh_token_expired),
        }).value = resp.data.refresh_token

        useCookie(Config.COOKIE.ACCESS_TOKEN, {
          domain: Config.COOKIE.DOMAIN,
          httpOnly: Config.COOKIE.HTTP_ONLY,
          path: '/',
          expires: new Date(resp.data.acces_token_expired),
        }).value = resp.data.access_token

        isLogged.value = true
        store.setLoginState(true)
      } catch (error) { }
    }
  }

  onActivated(() => {
    console.log("activated")
  })

  onBeforeMount(() => {
    store.$reset()
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