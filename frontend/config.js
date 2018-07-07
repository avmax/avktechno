const env = process.env;
const config = require('../config');

delete config.db;
env.PORT = config.client.port;

module.exports = config;
