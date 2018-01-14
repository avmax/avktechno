const db = require('../db');
const BrandError = require('../errors').BrandError;
const { uniq, flatten } = require('lodash/fp');


exports.get = async (req, res, next) => {
  const body = req.body || {};

  try
  {
    let data = await db.m.b.findAll();
    data = await Promise.all(data.map(async (item) => {
      const model = item.get({ plain: true });
      const products = await item.getProducts();
      const categories = await Promise.all(products.map(p => p.getCategories()));
      model.refs = {
        product: products.map(p => p.get({ plain: true }).id),
        category: uniq(flatten(categories).map(c => c.get({ plain: true }).id)),
      };
      return model;
    }));

    res.status(200).send(data);
  }
  catch(err)
  {
    console.log(err);
    next(new BrandError('сервер: Казус при загрузке брендов', err));
  }
};


exports.post = async (req, res, next) => {
  const body = req.body || {};

  try
  {
    const b = await db.m.b.create(body);
    const model = b.get({ plain: true });
    model.refs = { product: [], category: [] };

    res.status(200).send(model);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case db.s.UniqueConstraintError:
        message = 'сервер: Имя бренда должно быть уникальным!';
        break;
      default:
        message = 'сервер: Казус при добавлении бренда :(';
    }
    console.log(err);
    next(new BrandError(message, err));
  }
};


exports.put = async (req, res, next) => {
  const body = req.body || { };

  try
  {
    const b = await db.m.b.findById(body.id);
    await b.update(body);

    res.status(200).send();
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case BrandError:
        message = err.message;
        break;
      default:
        message = 'сервер: Казус при обновлении бренда :(';
    }

    next(new BrandError(message, err));
  }
};


exports.delete = async (req, res, next) => {
  const body = req.body || { };
  const { id } = body;

  try {
    const b = await db.m.b.findById(id);
    b.destroy();
    res.status(200).send();
  } catch(err) {
    let message;
    switch (err.constructor) {
      default:
        message = 'сервер: Казус при удалении бренда :(';
    }
    next(new BrandError(message, err));
  }
};
