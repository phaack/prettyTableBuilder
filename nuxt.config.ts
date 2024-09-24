import Aura from '@primevue/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
   app: {
    baseURL: '/prettyTableBuilder/',//'https://phaack.github.io/',
   },
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
    
  pinia: {
    storesDirs: ['./stores/**'],
  },
  nitro: {
    prerender: {
      routes: ["/"]
    }
  },

  typescript: {
    strict: true
  },

  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  }
})