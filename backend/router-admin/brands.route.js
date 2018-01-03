const { query, tables } = require('../db/index');
const { brands: b, categoriesBrands: bc } = tables;
const BrandError = require('../errors').BrandError;


exports.post = async (req, res, next) => {
  const body = req.body || { };
  try {
    const { insertId } = await query(
      `INSERT INTO ${b} (name, title) VALUES ('${body.name}', '${body.title}');`,
    );

    const result = await query(
      `SELECT * FROM ${b} WHERE id=${insertId}`
    );

    const data = {
      ...result[0],
      refs: {
        category: [],
      },
    };

    if (body.category && body.category.length) {
      body.category.forEach(async (category) => {
        await query(
          `INSERT INTO ${bc} (id_brand, id_category) VALUES('${insertId}', '${category}')`,
        );
      });

      data.refs.category = body.category;
    }

    res.status(200).send(data);
  } catch(err) {
    next(new BrandError(`Ошибка при добавлении брэнда`, err));
  }
};

exports.put = async (req, res, next) => {
  const body = req.body || { };
  try {
    await query(`
      UPDATE ${b} SET name='${body.name}', title='${body.title}' WHERE id=${body.id};
    `)
    res.status(200).send(body);
  } catch (err) {
    next(new BrandError(`Ошибка при изменении брэнда. id: ${body.id}`, err));
  }
};

exports.delete = async (req, res, next) => {
  const id = req.body.id;

  try {
    await query(`
      DELETE FROM ${bc} WHERE id_brand = ${id}
    `);

    await query(`
      DELETE FROM ${b} WHERE id = ${id}
    `);

    res.sendStatus(200);
  } catch(err) {
    next(new BrandError(`Ошибка при удалении брэнда. id: ${id}`, err));
  }
};
