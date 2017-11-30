const mysql = require('mysql');
const db = require('../db/index');

exports.get = (req, res, next) => {
  db.query('select * from categories;', (err, result) => {
    if (err) {
      res.status = 500;
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
