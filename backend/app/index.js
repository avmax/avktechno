const db = require('./db');
const config = require('../config');

const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const SERVER_PORT = config.server.port;
const CLIENT_PORT = config.client.port;


server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://127.0.0.1:${CLIENT_PORT}`);
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
    server.listen(SERVER_PORT, () => {
      console.log(`сервер запущен на порту ${SERVER_PORT}`, `клиент ожидается на порту ${CLIENT_PORT}`);
    });
  } catch(err) {
    console.error('сервер наебнулся:', err);
  }
};

start();
