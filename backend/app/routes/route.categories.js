const db = require('../db');
const CategoryError = require('../errors').CategoryError;
const { isEmpty, uniq } = require('lodash/fp');

exports.get = async (req, res, next) => {
  const body = req.body || {};
  try {
    let data = await db.m.c.findAll();
    data = await Promise.all(data.map(async (item) => {
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
  } catch(err) {
    console.log(err);
    next(new CategoryError('сервер: Казус при загрузке категорий', err));
  }
};

exports.post = async (req, res, next) => {
  const body = req.body || {};
  try {
    const c = await db.m.c.create(body);
    const model = c.get({ plain: true });

    model.refs = { brand: [], product: [] };

    res.status(200).send(model);
  } catch(err) {
    let message;
    switch (err.constructor) {
      case db.s.UniqueConstraintError:
        message = 'сервер: Имя категории должно быть уникальным!';
        break;
      default:
        message = 'сервер: Казус при добавлении категории :(';
    }
    console.log(err);
    next(new CategoryError(message, err));
  }
};

exports.put = async (req, res, next) => {
  const body = req.body || { };
};

exports.delete = async (req, res, next) => {
  const body = req.body || { };
  const { id } = body;

  try {
    const c = await db.m.c.findById(id);
    c.destroy();
    res.status(200).send();
  } catch(err) {
    let message;
    switch (err.constructor) {
      default:
        message = 'сервер: Казус при удалении категории :(';
    }
    next(new CategoryError(message, err));
  }
};
