const mysql = require('mysql');
const db = require('../db/index');

const BrandError = require('../errors').BrandError;


exports.post = (req, res, next) => {
  const body = req.body || { };
  db.query(
    `INSERT INTO brands (name, title, imgUrl) VALUES ('${body.name}', '${body.title}', '${body.imgUrl}');`,
    (err, result) => {
      if (err) { next(new BrandError(`Ошибка при добавлении брэнда`, err)); }
      else { res.status(200).send({ ...body, id: result.insertId }); }
    }
  );
};

exports.put = (req, res, next) => {
  const body = req.body || { };
  db.query(
    `UPDATE brands SET name='${body.name}', title='${body.title}', imgUrl='${body.imgUrl}' WHERE id=${body.id};`,
    (err, result) => {
      if (err) { next(new BrandError(`Ошибка при изменении брэнда. id: ${body.id}`, err)); }
      else { res.status(200).send(body); }
    }
  );
};

exports.delete = (req, res, next) => {
  const id = req.body.id;

  db.query(
    `DELETE FROM brands WHERE id = ${id}`,
    (err, result) => {
      if (err) { next(new BrandError(`Ошибка при удалении брэнда. id: ${id}`, err)); }
      else { res.sendStatus(200); }
    }
  );
};
