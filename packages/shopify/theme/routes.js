// This file was added by xdn init.
// You should commit this file to source control.

const { Router } = require('@xdn/core/router')
const { nuxtRoutes } = require('@xdn/nuxt')

const HTML = {
  edge: {
    maxAgeSeconds: 60 * 60 * 24,
    staleWhileRevalidateSeconds: 60 * 60 * 24
  },
  browser: false
}

module.exports = new Router()
  .match('/service-worker.js', ({ serviceWorker }) => {
    serviceWorker('.nuxt/dist/client/service-worker.js')
  })
  .get('/', ({ cache }) => {
    cache(HTML)
  })
  .get('/c/:id', ({ cache }) => {
    cache(HTML)
  })
  .get('/p/:id', ({ cache }) => {
    cache(HTML)
  })
  .use(nuxtRoutes)
