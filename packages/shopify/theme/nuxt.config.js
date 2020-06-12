global.fetch = require('node-fetch');
require('dotenv').config();
import webpack from 'webpack';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport',
        content: 'width=device-width, initial-scale=1' },
      { hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  plugins: [
    './plugins/shopify.js'
  ],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: [
          '@vue-storefront/shopify',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/shopify',
          '@vue-storefront/core'
        ]
      }
    }],
    ['@vue-storefront/nuxt-theme', {
      apiClient: '@vue-storefront/shopify-api',
      composables: '@vue-storefront/shopify'
    }]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt'
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  pwa: {
    manifest: {
      name: 'VSF Next: Shopify APP',
      lang: 'en',
      shortName: 'VSF Next',
      startUrl: '/',
      display: 'standalone',
      backgroundColor: '#fff',
      themeColor: '#5ece7b',
      description: 'This is the Shopify PWA app for VSF Next',
      icons: [
        {
          src: './static/icons/android-icon-48x48.png',
          sizes: '48X48',
          type: 'image/png'
        },
        {
          src: './static/icons/android-icon-72x72.png',
          sizes: '72X72',
          type: 'image/png'
        },
        {
          src: './static/icons/android-icon-96x96.png',
          sizes: '96X96',
          type: 'image/png'
        },
        {
          src: './static/icons/android-icon-144x144.png',
          sizes: '144X144',
          type: 'image/png'
        },
        {
          src: './static/icons/android-icon-168x168.png',
          sizes: '168X168',
          type: 'image/png'
        },
        {
          src: './static/icons/android-icon-192x192.png',
          sizes: '192X192',
          type: 'image/png'
        },
        {
          src: './static/icons/android-icon-512x512.png',
          sizes: '512X512',
          type: 'image/png'
        }
      ]
    }
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome 1'
        },
        de: {
          welcome: 'Welcome 2'
        }
      }
    }
  }
};
