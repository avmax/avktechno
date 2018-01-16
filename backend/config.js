const config = {
  db: {
    name: 'avktechno',
    username: 'root',
    password: '12345',
    host: 'localhost',
  },
  server: {
    port: process.env.SERVER_PORT || '4251',
  },
};

module.exports = config;
