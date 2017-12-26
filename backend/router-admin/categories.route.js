const mysql = require('mysql');
const db = require('../db/index');

const CategoryError = require('../errors').CategoryError;


exports.post = (req, res, next) => {
  const body = req.body || { };
  db.query(
    `INSERT INTO categories (title, description, imgUrl) VALUES ('${body.title}', '${body.description}', '${body.imgUrl}');`,
    (err, result) => {
      if (err) { next(new CategoryError(`Ошибка при добавлении категории`, err)); }
      else { res.status(200).send({ ...body, id: result.insertId }); }
    }
  );
};

exports.put = (req, res, next) => {
  const body = req.body || { };
  db.query(
    `UPDATE categories SET title='${body.title}', description='${body.description}', imgUrl='${body.imgUrl}' WHERE id=${body.id};`,
    (err, result) => {
      if (err) { next(new CategoryError(`Ошибка при изменении категории. id: ${body.id}`, err)); }
      else { res.status(200).send(body); }
    }
  );
};

exports.delete = (req, res, next) => {
  const id = req.body.id;

  db.query(
    `DELETE FROM categories WHERE id = ${id}`,
    (err, result) => {
      if (err) { next(new CategoryError(`Ошибка при удалении категории. id: ${id}`, err)); }
      else { res.sendStatus(200); }
    }
  );
};
