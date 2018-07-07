const env = process.env;
const isProd = env.NODE_ENV && env.NODE_ENV.indexOf('prod') !== -1;

const config = () => {
  const cfg = {
    db: {
      name: env.DB_NAME || 'avktechno',
      username: env.DB_USER || 'root',
      password: env.DB_PASSWORD || '12345',
      host: env.DB_HOST || 'localhost',
    },
    baseURL: env.BASE_URL || 'http://90.156.142.46',
    domainURL: env.DOMAIN_URL || 'http://avktechno.com',
    server: {
      port: +env.SERVER_PORT || 4251,
    },
    client: {
      port: +env.CLIENT_PORT || 80,
    },
    isProd: env.IS_PROD || isProd,
  }

  cfg.server.URL = cfg.baseURL + ':' + cfg.server.port;
  cfg.client.URL = cfg.baseURL + (+cfg.client.port === 80 ? '' : ':' + cfg.client.port);

  return cfg;
};

module.exports = config();
