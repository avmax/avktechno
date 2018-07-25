const path = require('path');
const config = require('./config');

const CLIENT_PORT = config.client.port;
const SERVER_URL = config.server.URL;

console.log(`клиент запущен на порту ${CLIENT_PORT}`);
console.log(`сервер ожидается по урлу ${SERVER_URL}`);
console.log(`клиент запущен в ${config.isProd ? 'production' : 'development'} режиме`);
console.log('\n');

module.exports = {
  env: config,
  // env
  // Headers of the page
  head: {
    title: 'АВК ТЕХНО',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'ГНБ, бурение, горно-шахтное оборудование, бентониты, полимеры, смазка, масла, запчасти, baroid, vermeer, ditch witch, copper, penetrol, fuse-it' },
      { name: 'yandex-verification', content: '02f259ff5e21fedb' },
      { hid: 'description', name: 'description', content: 'Поставки бентонита для ГНБ, полимеров для ГНБ, масел Copper, масел Vermeer, запасных частей  и прочей сопутствующей продукции  по горизонтальному направленному бурению.' },
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

    babel: {
      plugins: ['transform-object-assign'],
    },
  },
};

