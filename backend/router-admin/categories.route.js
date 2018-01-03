const mysql = require('mysql');
const { query, tables } = require('../db/index');
const { categories: c, categoriesBrands: cb } = tables;
const CategoryError = require('../errors').CategoryError;


exports.post = async (req, res, next) => {
  const body = req.body || { };
  try {
    const { insertId } = await query(
      `INSERT INTO ${c} (name, title) VALUES ('${body.name}', '${body.title}');`,
    );

    const result = await query(
      `SELECT * FROM ${c} WHERE id=${insertId}`
    );

    const data = {
      ...result[0],
      refs: {
        brand: [],
      },
    };

    if (body.brand && body.brand.length) {
      body.brand.forEach(async (brand) => {
        await query(
          `INSERT INTO ${cb} (id_category, id_brand) VALUES('${insertId}', '${brand}')`,
        );
      })

      data.refs.brand = body.brand;
    }

    res.status(200).send(data);
  } catch(err) {
    next(new CategoryError(`Ошибка при добавлении брэнда`, err));
  }
};

exports.put = async (req, res, next) => {
  const body = req.body || { };

  try {
    await query(`
      UPDATE ${c} SET name='${body.name}', title='${body.title}' WHERE id=${body.id};
    `);

    res.status(200).send(body);
  } catch(err) {
    next(new CategoryError(`Ошибка при изменении категории. id: ${body.id}`, err));
  }
};

exports.delete = async (req, res, next) => {
  const id = req.body.id;

  try {
    await query(`
      DELETE FROM ${cb} WHERE id_category = ${id}
    `);

    await query(`
      DELETE FROM ${c} WHERE id = ${id}
    `);

    res.sendStatus(200);
  } catch(err) {
    next(new CategoryError(`Ошибка при удалении категории. id: ${id}`, err));
  }
};
