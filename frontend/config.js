const env = process.env;
const config = require('../config');

delete config.db;
env.PORT = config.client.port;
env.HOST = '0.0.0.0';

module.exports = config;
