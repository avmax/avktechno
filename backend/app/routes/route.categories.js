const db = require('../db');
const CategoryError = require('../errors').CategoryError;
const { uniq } = require('lodash/fp');

const modelFromReq = (req) => {
  const { body } = req;
  const model = body;

  return model;
};


exports.get = async (req, res, next) => {
  try
  {
    let model;
    let data;
    model = await db.m.c.findAll();
    data = await Promise.all(model.map(async (item) => {
      const model = item.get({ plain: true });
      const products = await item.getProducts();
      const brands = await Promise.all(products.map(p => p.getBrand()));
      model.refs = {
        product: products.map(p => p.get({ plain: true }).id),
        brand: uniq(brands.filter(b => !!b).map(b => b.get({ plain: true }).id)),
      };
      return model;
    }));

    res.status(200).send(data);
  }
  catch(err)
  {
    next(new CategoryError('сервер: Казус при загрузке категорий', err));
  }
};


exports.post = async (req, res, next) => {
  try
  {
    let model;
    let data;
    data = modelFromReq(req);
    model = await db.m.c.create(data);
    data = model.get({ plain: true });
    data.refs = { brand: [], product: [] };

    res.status(200).send(data);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case db.s.UniqueConstraintError:
        message = 'сервер: Имя категории должно быть уникальным!';
        break;
      default:
        message = 'сервер: Казус при добавлении категории :(';
    }

    next(new CategoryError(message, err));
  }
};


exports.put = async (req, res, next) => {
  try
  {
    let model;
    let data;
    data = modelFromReq(req);
    model = await db.m.c.findById(data.id);
    await model.update(data);
    data = model.get({ plain: true });

    res.status(200).send(data);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case CategoryError:
        message = err.message;
        break;
      default:
        message = 'сервер: Казус при обновлении категории :(';
    }

    next(new CategoryError(message, err));
  }
};


exports.delete = async (req, res, next) => {
  const body = req.body || { };
  const { id } = body;

  try
  {
    let model;
    let data;
    data = modelFromReq(req);
    model = await db.m.c.findById(data.id);
    model.destroy();
    res.status(200).send();
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      default:
        message = 'сервер: Казус при удалении категории :(';
    }

    next(new CategoryError(message, err));
  }
};
