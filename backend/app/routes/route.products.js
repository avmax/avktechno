const db = require('../db');
const ProductError = require('../errors').ProductError;
const { isEmpty } = require('lodash/fp');


exports.get = async (req, res, next) => {
  const body = req.body || {};

  try
  {
    let data = await db.m.p.findAll();
    data = await Promise.all(data.map(async (item) => {
      const model = item.get({ plain: true });
      model.info = await model.info;
      model.refs = await model.refs;
      return model;
    }));

    res.status(200).send(data);
  }
  catch(err)
  {
    next(new ProductError('сервер: Казус при загрузке продуктов', err));
  }
};

exports.post = async (req, res, next) => {
  const body = req.body || {};
  let { refs } = body;

  try
  {
    const p = await db.m.p.create(body);
    await p.setCategories(refs.category);
    await p.setBrand(refs.brand[0]);

    const model = p.get({ plain: true });
    model.info = await model.info;
    model.refs = await model.refs;

    res.status(200).send(model);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case ProductError:
        message = err.message;
        break;
      case db.s.UniqueConstraintError:
        message = 'сервер: Имя продукта должно быть уникальным!';
        break;
      default:
        message = 'сервер: Казус при добавлении продукта :(';
    }

    next(new ProductError(message, err));
  }
};

exports.put = async (req, res, next) => {
  const body = req.body || { };
  let { refs } = body;

  try {
    const p = await db.m.p.findById(body.id);
    await p.update(body);
    await p.setCategories(refs.category);
    await p.setBrand(refs.brand[0]);
    const model = p.get({ plain: true });
    model.info = await model.info;
    model.refs = await model.refs;

    res.status(200).send(model);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case ProductError:
        message = err.message;
        break;
      default:
        message = 'сервер: Казус при обновлении продукта :(';
    }

    next(new ProductError(message, err));
  }

};

exports.delete = async (req, res, next) => {
  const body = req.body || { };
  const { id } = body;

  try
  {
    const p = await db.m.p.findById(id);
    p.destroy();

    res.status(200).send();
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      default:
        message = 'сервер: Казус при удалении продукта :(';
    }

    next(new ProductError(message, err));
  }
};
