import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // env access in vue app
  env: {
    API_ENDPOINT           : process.env.API_ENDPOINT
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - kinitiras',
    title: 'kinitiras',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: 'dns-prefetch', href: 'https://fonts.gstatic.com/'},
      {rel: 'dns-prefetch', href: 'https://fonts.googleapis.com/'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;400;500;600;700;800;900&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // base
    {src: '~/plugins/lodash'},
    {src: '~/configs'},
    {src: '~/store/types'},
    {src: '~/plugins/storage'},
    //
    {src: '~/plugins/i18n'}, // register i18n first
    {src: '~/plugins/axios'},
    {src: '~/services'},
    {src: '~/plugins/utils'},
    {src: '~/plugins/router'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
        '~/components',
        // {path: '~/components/utils'},
        // {path: '~/components/biz'}
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n', // register i18n first
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  axios  : {
    baseURL: process.env.API_ENDPOINT
  },
  //
  // router: {
  //   middleware: ['auth']
  // },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  toast: {
    position      : 'top-right',
    duration      : 3000,
    containerClass: 'kinitiras-toast'
  },

  // https://i18n.nuxtjs.org/basic-usage
  i18n: {
    locales      : [
        {
            code: 'en',
            file: 'en-US.js'
        },
        {
            code: 'vi',
            file: 'vi-VN.js'
        }
    ],
    lazy         : true,
    langDir      : 'locale/',
    defaultLocale: 'en',
    strategy     : 'no_prefix'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
