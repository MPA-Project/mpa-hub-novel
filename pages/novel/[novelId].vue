<template>
  <div>
    <NuxtLayout name="default">
      <main id="top" :class="store.$state.showNSFWModal ? 'blur-md' : ''">
        
        <!-- Background -->
        <!-- Video background -->
        <section v-if="anime.bg_video_thumbnail" class="relative z-0">
          <div class="bg-gradient-to-b from-transparent dark:via-neutral-900/10 via-neutral-100/5 dark:to-neutral-900 to-neutral-100 absolute w-full h-full transition-all duration-200" />
          <div class="bg-gradient-to-l from-transparent dark:via-neutral-900/10 via-neutral-100/5 dark:to-neutral-900 to-neutral-100 absolute w-full h-full transition-all duration-200" />
          <div class="bg-gradient-to-r from-transparent dark:via-neutral-900/10 via-neutral-100/5 dark:to-neutral-900 to-neutral-100 absolute w-full h-full transition-all duration-200" />
          <video autoplay muted disablePictureInPicture loop :poster="anime.bg_video_thumbnail"  class="w-full object-cover h-52 md:h-64 lg:h-96">
            <source :src="anime.bg_video_thumbnail" type='video/mp4'>
          </video>
        </section>
        <!-- End Video background -->

        <!-- Poster background -->
        <section v-else class="h-52 md:h-64 lg:h-80 z-0">
          <img :class="[anime && anime.bg_thumbnail ? 'blur-sm' : 'blur-md' ,'min-w-full max-w-full h-full object-cover rounded-b-xl']" :src="anime && anime.bg_thumbnail ? anime.bg_thumbnail : anime.thumbnail" alt="Thumbnail Background"/>
        </section>
        <!-- Poster background --> 
        <!-- Background -->


        <!-- Top Content -->
        <section class="flex flex-col mt-5 pt-36 md:pt-32 lg:pt-0 mx-5 md:mx-20 lg:mx-32">
          <div class="w-full flex flex-col lg:flex-row items-center lg:items-end gap-5 lg:gap-10 mb-5 z-10 mx-auto">

            <!-- Thumbnail -->
            <div class="relative">
              <img :src="anime.thumbnail" alt="Poster" class="rounded-xl w-[200px] md:w-[250px] lg:w-[300px] aspect-[2/3] -mt-40 md:-mt-52 lg:-mt-56 mb-0 md:mb-2 lg:mb-5 object-cover border-r-2 border-b-2 border-MPAPurple shadow-lg">
              <button @click="openEditModal = true" class="absolute -bottom-3 md-bottom-0 lg:bottom-3 -right-3 bg-MPAPurple hover:bg-MPABlue duration-200 transition-colors p-3 rounded-full" title="Request Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-neutral-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            <!-- End Thumbnail -->

            <!-- Novel Information -->
            <div class="mb-0 md:mb-5 text-center lg:text-left">

              <!-- Titles -->
              <div class="space-y-2">
                <p class="text-xl font-bold cursor-default capitalize">{{ anime.title }}</p>
                <p class="cursor-default capitalize"> {{ anime.alternative_title }}</p>
                <p class="cursor-default capitalize">{{ anime.japanese_title }}</p>
              </div>
              <!-- Titles -->
              
              <!-- Details -->
              <div class="flex flex-wrap gap-3 py-3 justify-center lg:justify-start items-center cursor-default font-bold">

                <!-- Type -->
                <router-link :to="`/novel/a?type=${anime.type}`" class="px-3 text-sm p-1.5 btn1">
                  <span class="uppercase font-semibold">{{ anime.type }}</span>
                </router-link>
                <!-- End Type -->

                <!-- Release -->
                <router-link :to="`/novel/b?status=${anime.status}`" class="px-3 text-sm p-1.5 btn1">
                  <span class="capitalize font-semibold">{{ anime.status }}</span>
                </router-link>
                <!-- End Release -->

                <!-- Rating -->
                <div title="Rating" class="flex items-center p-1.5 bg3 rounded-xl px-2 text-sm transition-colors duration-200">
                  <span class="font-semibold uppercase">{{ anime.rating }}</span>
                </div>
                <!-- End Rating -->
              </div>
              <!-- End Details -->

              <section class="flex justify-center lg:justify-start gap-5 pt-5">
                <button class="bg-MPAPurple p-2 rounded-xl text-neutral-100">
                  <span>Read chapter [#ChapterNumber]</span>
                </button>
                <router-link :to="`/novel/c/chapters`">
                  <button class="bg-MPAPurple p-2 rounded-xl text-neutral-100">
                    <span>List chapters</span>
                  </button>
                </router-link>
                
              </section>

            </div>
            <!-- End Novel Information -->

          </div>
        </section>
        <!-- End Top Content -->

        <!-- Content -->
        <section class="mx-5 md:mx-10 lg:mx-32">
          <div class="space-y-7 md:w-[90%] lg:w-full mx-auto pb-10">

            <!-- Synopsis -->
            <div class="flex flex-col pb-7">
              <div class="flex">
                <span class="text-xl font-bold cursor-default flex border-b-2 border-MPAPurple pr-5 pb-1">Synopsis</span>
              </div>
              <div :class="[ loadMoreSynopsis ? '' : 'line-clamp-3 -mb-10', 'pt-2']"> 
                <p class="space-y-3">{{ synopsis }}</p>
              </div>

              <!-- Read More Button -->
              <div v-show="!loadMoreSynopsis && synopsis && synopsis.length > 100" class="flex justify-center bg-gradient-to-t dark:from-neutral-900 dark:via-neutral-900 from-neutral-100 via-neutral-100 to-transparent">
                <div class="pt-10"> 
                  <button @click="loadMoreSynopsis = true" class="px-10 p-1.5 font-semibold hover:opacity-70 duration-150">Read More</button>
                </div>
              </div>
              <!-- Read More Button -->

            </div>
            <!-- End Synopsis  -->

            <!-- Genres -->
            <div class="space-y-3">
              <span class="text-xl font-bold cursor-default border-b-2 border-MPAPurple pr-5 pb-1">Genres</span>

              <!-- Genre -->
              <div  class="grid grid-cols-2 md:flex md:flex-wrap gap-3 text-center pt-2">
                <a v-for="(genre, index) in anime.genres" :key="index" :href="`/novel/genre-${genre.uuid}`" class="p-1.5 px-3 md:px-5 btn1 md:text-base font-semibold capitalize">{{ genre.name }}</a>
              </div>
              <!-- Genre -->

            </div>
            <!-- End Genres -->

            <!-- External Links -->
            <div class="space-y-3">
              <span class="text-xl font-bold cursor-default border-b-2 border-MPAPurple pr-5 pb-1">External Links</span>
              <div class="grid grid-cols-2 md:flex md:flex-wrap gap-3 text-center pt-2">
                <a v-for="(source, index) in anime.external_links" :key="index" :href="source.link" class="p-1.5 px-3 md:px-5 btn1 md:text-base font-semibold capitalize">{{ source.name }}</a>
              </div>
            </div>
            <!-- End External Links -->

          </div>
        </section>
        <!-- End Content -->

      </main>
    </NuxtLayout>
  </div>
</template>
<script setup>
  import languageData from '@/assets/languages'
  import { useStores } from '@/store/Store'
  import { anime } from '@/dummyData'

  const store = useStores()
  const route = useRoute()

  const languageIndex = ref()
  const synopsis = ref("")
  const loadMoreSynopsis = ref(false)
  const isAdult = ref(false)

  const tab = ref(route.query.tab || 'info')

  // watchEffect(() => {
  //   watch(synopsis.value, (current) => {
  //     if (current.value.length > 100) return loadMoreSynopsis.value = true
  //     return loadMoreSynopsis.value = false
  //   })
  // })

  // Language Selection
  // const selectedLangName = ref(languageData?.[0]?.name)
  // const selectedLang = ref(languageData?.[0])
  // const searchLang = ref('')
  // watch(selectedLangName, (current) => {
  //   const getIndex = languageData.findIndex((value) => {
  //     return value.name.toLowerCase() == current.toLowerCase()
  //   })
  //   selectedLang.value = languageData[getIndex]
  // })
  // const filteredLanguages = computed(() =>
  //   searchLang.value == ''
  //     ? languageData
  //     : languageData.filter((lang) => {
  //       if (lang.name.toLowerCase().includes(searchLang.value.toLowerCase())) {
  //           return true
  //         }
  //       })
  // )
  // End Language Selection

  onMounted(() => {
    languageIndex.value = anime.synopsis.findIndex( (value) => {
      return value.language.toLowerCase() == localStorage.getItem('language').toLowerCase()
    })
    // Pick Synopsis
    if (anime.synopsis.length > 0) {
      if (anime.synopsis[languageIndex.value]) {
        synopsis.value = anime.synopsis[languageIndex.value].synopsis
      } else {
        synopsis.value = anime.synopsis[0].synopsis
      }
    } else {
      synopsis.value = 'Ups, there is no synopsis yet.'
    }

    if (synopsis.value.length > 100) {
      loadMoreSynopsis.value = false
    }
    console.log('synopsis', synopsis.value)
    console.log('loadMoreSynopsis', loadMoreSynopsis.value)
  })
</script>