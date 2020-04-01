import dotenv from 'dotenv';
dotenv.config();

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        defer: true,
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Open+Sans:400,400i,600,700&subset=latin-ext',
      },
    ],
    noscript: [
      {
        innerHTML: 'Body No Scripts',
        body: true,
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Transition between pages
   */
  pageTransition: 'page',

  layoutTransition: 'layout',

  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/antd-ui'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/firebase',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  // Uncomment if you use firebase
  firebase: {
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
      fcmPublicVapidKey: process.env.fcmPublicVapidKey,
    },
    onFirebaseHosting: false,
    services: {
      auth: {
        // persistence: 'local',
        initialize: {
          onAuthStateChangedMutation: 'SET_AUTH_USER',
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
        ssr: true,
      },
      firestore: true,
      // functions: {
      //   // location: 'eruope-west', // Default
      //   // emulatorPort: 12345,
      // },
      storage: true,
      realtimeDb: true,
      // performance: true,
      // analytics: true,
      //   remoteConfig: {
      //     settings: {
      //       fetchTimeoutMillis: 60000, // Default
      //       minimumFetchIntervalMillis: 43200000, // Default
      //     },
      //     defaultConfig: {
      //       welcome_message: 'Welcome',
      //     },
      //   },
      // messaging: {
      //   createServiceWorker: true,
      // },
    },
  },

  pwa: {
    workbox: {
      importScripts: ['/firebase-auth-sw.js'],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false,
    },
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      config.resolve.alias.vue = 'vue/dist/vue.common';

      return Object.assign({}, config, {
        devtool: 'source-map',
      });
    },
  },
};
