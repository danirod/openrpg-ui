// Setup proxy to OpenRPG backend.
const backend = {
  protocol: process.env.BACKEND_PROTOCOL || 'http',
  domain: process.env.BACKEND_HOST || 'localhost',
  port: process.env.BACKEND_PORT || 8000,
  path: process.env.BACKEND_PATH || '/api'
}
const toURL = (b) =>
  `${b.protocol}://${b.domain}:${b.port}` +
  (b.path.startsWith('/') ? '' : '/') +
  b.path
const proxy = process.env.BACKEND_DISABLE ? [] : [toURL(backend)]

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
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
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/sessions',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/api/auth/session',
            method: 'delete'
          },
          user: {
            url: '/api/auth/session',
            method: 'get',
            propertyName: 'user'
          }
        }
      }
    }
  },

  proxy,

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },

  router: {
    middleware: ['auth']
  }
}
