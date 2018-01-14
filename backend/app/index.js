const db = require('./db');
const { server: config } = require('../config');

const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const PORT = config.port;


server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

server.use(bodyParser.json());

server.use(require('./router').public);
server.use('/admin', require('./router').admin);
server.use((err, req, res, next) => {
  // console.error('Catch error:', err.cause || err);
  console.error('Catch error:', err);
  res.status(err.status || 404).send(err);
});

const start = async () => {
  try {
    await db.init();
    server.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch(err) {
    console.error('БД НАЕБНУЛАСЬ:', err);
  }
};

start();
