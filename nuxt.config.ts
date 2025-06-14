import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/test-utils', 'shadcn-nuxt', '@pinia/nuxt'],

  icon: {
    componentName: 'NuxtIcon',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      // tailwindcss plugin cannot satisfy PluginOption type event if it is fully compatibile
      (tailwindcss as Function)(),
    ],
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  }
})