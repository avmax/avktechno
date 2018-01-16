const path = require('path');
const APP_CONFIG = require('./config');

module.exports = {
  // env
  env: APP_CONFIG,
  // Headers of the page
  head: {
    title: 'Avktechno',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons', rel: 'stylesheet' },
    ],
  },
  // Customize the progress bar color
  loading: { color: '#3B8070' },
  // Set plugins
  plugins: ['~plugins/vuetify'],
  css: [
    'vuetify/dist/vuetify.css',
    { src: '~assets/link.post.css', lang: 'scss' },
    { src: '~assets/card.post.css', lang: 'scss' },
  ],
  // Build configuration
  build: {
    vendor: ['vuetify', 'axios'],
    postcss: [
      // eslint-disable-next-line
      require('postcss-cssnext')(),
      // eslint-disable-next-line
      require('postcss-responsive-type')(),
      // eslint-disable-next-line
      require('postcss-nested')(),
    ],
    // Run ESLint on save
    extend(config, ctx) {
      config.resolve.alias['~domains'] = path.join('.', 'domains');
      config.resolve.alias['~utils'] = path.join('.', 'utils');
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};

