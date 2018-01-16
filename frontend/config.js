const env = process.env;

const isProd = env.NODE_ENV && env.NODE_ENV.indexOf('prod') !== -1;

const APP_CONFIG = {
  baseURL: env.BASE_URL || 'http://127.0.0.1:4251',
  isProd: env.IS_PROD || isProd,
};

module.exports = APP_CONFIG;
