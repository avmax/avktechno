const path = require('path');
const APP_CONFIG = require('./config');

module.exports = {
  env: APP_CONFIG,
  // env
  // Headers of the page
  head: {
    title: 'АВК ТЕХНО',
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
  plugins: ['~plugins/vuetify', '~plugins/map'],
  css: [
    'vuetify/dist/vuetify.css',
    { src: '~assets/link.post.css', lang: 'scss' },
    { src: '~assets/card.post.css', lang: 'scss' },
    { src: '~assets/page.post.css', lang: 'scss' },
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
      config.resolve.alias['~barrel'] = path.join('.', 'barrel');
      config.resolve.alias['~common'] = path.join('.', 'common');
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      config.module.rules.splice(0, 0, {
        test: /\.js$/,
        include: [path.resolve(__dirname, './node_modules/vue2-google-maps')],
        loader: 'babel-loader',
      });
    },
  },
};

