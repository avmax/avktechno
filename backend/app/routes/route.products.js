const db = require('../db');
const ProductError = require('../errors').ProductError;
const { isEmpty } = require('lodash/fp');
const { imgURL } = require('../utils/img');

const modelFromReq = (req) => {
  const { body, file } = req;
  const model = body;

  const parse = val => val ? JSON.parse(val) : val;

  model.refs = parse(model.refs);
  model.footer = parse(model.footer);
  model.features = parse(model.features);
  model.charachteristics = parse(model.charachteristics);

  if (file && file.filename) {
    model.imgUrl = imgURL(file.filename);
  }

  return model;
};


exports.get = async (req, res, next) => {
  try
  {
    let model;
    let data;

    model = await db.m.p.findAll();
    data = await Promise.all(model.map(async (itemModel) => {
      const itemData = itemModel.get({ plain: true });
      itemData.info = await itemData.info;
      itemData.refs = await itemData.refs;
      return itemData;
    }));

    res.status(200).send(data);
  }
  catch(err)
  {
    next(new ProductError('сервер: Казус при загрузке продуктов', err));
  }
};

exports.post = async (req, res, next) => {
  try
  {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.p.create(data);
    await model.setCategories(data.refs.category);
    await model.setBrand(data.refs.brand[0]);
    data = model.get({ plain: true });
    data.info = await data.info;
    data.refs = await data.refs;

    res.status(200).send(data);
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
  try {
    let model;
    let data;
    data = modelFromReq(req);
    model = await db.m.p.findById(data.id);
    await model.update(data);
    await model.setCategories(data.refs.category);
    await model.setBrand(data.refs.brand[0]);
    data = model.get({ plain: true });
    data.info = await data.info;
    data.refs = await data.refs;

    res.status(200).send(data);
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
  try
  {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.p.findById(data.id);
    model.destroy();

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
