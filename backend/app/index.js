const db = require('./db');
const config = require('../../config');

const express = require('express');
const bodyParser = require('body-parser');
const money = require('./utils/money');

const server = express();
const SERVER_PORT = config.server.port;
const CLIENT_URL = config.client.URL;


server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

server.use(bodyParser.json());
server.use(express.static('static'));

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
    money.init();
    server.listen(SERVER_PORT, () => {
      console.log(`сервер запущен на порту ${SERVER_PORT}`);
      console.log(`клиент ожидается по урлу ${CLIENT_URL}`);
    });
  } catch(err) {
    console.error('сервер наебнулся:', err);
  }
};

start();
