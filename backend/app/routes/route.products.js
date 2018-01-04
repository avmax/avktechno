const db = require('../db');
const ProductError = require('../errors').ProductError;
const { isEmpty } = require('lodash/fp');

const validateRefs = refs => {
  let isValid = true;
  Object.values(refs).forEach(val => {
    if (typeof val === 'number') {
      isValid = true;
    } else if (Array.isArray(val)) {
      if (val.length) {
        val.forEach(v => isValid === typeof v === 'number');
      }
    } else {
      isValid = false;
    }
  })

  return isValid;
}

exports.get = async (req, res, next) => {
  const body = req.body || {};
  try {
    let data = await db.m.p.findAll();
    data = await Promise.all(data.map(async (item) => {
      const model = item.get({ plain: true });
      const category = await item.getCategories();
      const brand = await item.getBrand();

      model.refs = {
        brand: brand ? [brand.get().id] : [],
        category: category.map(c => c.get().id),
      };

      return model;
    }));

    res.status(200).send(data);
  } catch(err) {
    console.log(err);
    next(new ProductError('сервер: Казус при загрузке продуктов', err));
  }
};

exports.post = async (req, res, next) => {
  const body = req.body || {};
  try {
    refs = {
      brand: body.refs && body.refs.brand || [],
      category: body.refs && body.refs.category || []
    };

    if (!validateRefs(refs)) {
      throw new ProductError('refs херовые');
    }

    const p = await db.m.p.create(body);
    const model = p.get({ plain: true });
    model.refs = refs;

    await p.addCategories(model.refs.category);
    if (model.refs.brand[0]) {
      await p.setBrand(model.refs.brand[0]);
    }

    res.status(200).send(model);
  } catch(err) {
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
    console.log(err);
    next(new ProductError(message, err));
  }
};

exports.put = async (req, res, next) => {
  const body = req.body || { };
  const { refs } = body;

  try {
    if (!validateRefs(refs)) {
      throw new ProductError('refs херовые');
    }

    const p = await db.m.p.findById(body.id);
    await p.update(body);
    await p.setCategories(refs.category);
    if (refs.brand[0]) {
      await p.setBrand(refs.brand[0])
    }

    res.status(200).send();
  } catch(err) {
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

  try {
    const p = await db.m.p.findById(id);
    p.destroy();
    res.status(200).send();
  } catch(err) {
    let message;
    switch (err.constructor) {
      default:
        message = 'сервер: Казус при удалении продукта :(';
    }
    next(new ProductError(message, err));
  }
};
