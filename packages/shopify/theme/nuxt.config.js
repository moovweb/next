global.fetch = require('node-fetch');

let webpack

try {
  require('dotenv').config();
  webpack = require('webpack')
} catch (e) {
  // will get here in the cloud, but we can just catch this error because webpack is only needed during the build phase
}

const localeConfig = require('./lang/config');

module.exports = {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  plugins: ['./plugins/shopify.js'],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    // ['@nuxtjs/pwa', { icon: false }], // this adds it's own service worker which would replace the XDN service worker
    [
      '@vue-storefront/nuxt',
      {
        coreDevelopment: true,
        useRawSource: {
          dev: ['@vue-storefront/shopify', '@vue-storefront/core'],
          prod: ['@vue-storefront/shopify', '@vue-storefront/core']
        }
      }
    ],
    [
      '@vue-storefront/nuxt-theme',
      {
        apiClient: '@vue-storefront/shopify-api',
        composables: '@vue-storefront/shopify'
      }
    ],
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@nuxtjs/robots',
    '@xdn/nuxt/module'
  ],
  modules: [
  ],
  build: webpack && {
    transpile: ['vee-validate/dist/rules'],
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
  robots: {
    // UserAgent: '*',
    // Disallow: '/'
  },
  pwa: {
    manifest: {
      name: 'VSF Next: Shopify APP',
      lang: 'en',
      /* eslint-disable @typescript-eslint/class-name-casing */
      /* eslint-disable @typescript-eslint/camelcase */
      shortName: 'VSF Next',
      startUrl: '/',
      display: 'standalone',
      /* eslint-disable @typescript-eslint/class-name-casing */
      /* eslint-disable @typescript-eslint/camelcase */
      backgroundColor: '#fff',
      /* eslint-disable @typescript-eslint/class-name-casing */
      /* eslint-disable @typescript-eslint/camelcase */
      themeColor: '#5ece7b',
      description: 'This is the Shopify PWA app for VSF Next',
      icons: [
        {
          src: '/icons/android-icon-48x48.png',
          sizes: '48X48',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-72x72.png',
          sizes: '72X72',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-96x96.png',
          sizes: '96X96',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-144x144.png',
          sizes: '144X144',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-168x168.png',
          sizes: '168X168',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-192x192.png',
          sizes: '192X192',
          type: 'image/png'
        },
        {
          src: '/icons/android-icon-512x512.png',
          sizes: '512X512',
          type: 'image/png'
        }
      ]
    },
    meta: {
      name: 'VSF Next: Shopify APP',
      author: 'Aureate labs',
      description:
        'This is the Shopify PWA app for VSF Next - Developed by Aureate labs',
      /* eslint-disable @typescript-eslint/class-name-casing */
      /* eslint-disable @typescript-eslint/camelcase */
      themeColor: '#5ece7b',
      ogHost: 'shopify-pwa.aureatelabs.com'
    },
    icon: {
      iconSrc: 'src/static/android-icon-512x512.png'
    }
  },
  i18n: localeConfig
};
