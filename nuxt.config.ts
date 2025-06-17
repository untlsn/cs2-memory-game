import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/test-utils', 'shadcn-nuxt', '@pinia/nuxt'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/game/**': {
      ssr: false,
    },
    '/': { prerender: true },
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  vite: {
    plugins: [
      // tailwindcss plugin cannot satisfy PluginOption type event if it is fully compatibile
      (tailwindcss as Function)(),
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },

  icon: {
    componentName: 'NuxtIcon',
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui',
  },
});
