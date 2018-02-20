const db = require('../db');
const ProductError = require('../errors').ProductError;
const { isEmpty } = require('lodash/fp');
const { imgURL } = require('../utils/img');
const timer = require('../../../utils/timer')();

const modelFromReq = (req) => {
  const { body, file } = req;
  const model = body;

  const parse = val => val ? JSON.parse(val) : val;

  model.footer = parse(model.footer);
  model.features = parse(model.features);
  model.charachteristics = parse(model.charachteristics);

  model.refs = parse(model.refs);
  if (model.refs) {
    Object.keys(model.refs).forEach(key => model.refs[key] = model.refs[key][0] || null);
  }

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

    const stop = timer();
    model = await db.m.p.findAll();
    data = await Promise.all(model.map(async (itemModel) => {
      const itemData = await itemModel.retrieve();
      itemData.refs = await itemModel.getRefs();
      return itemData;
    }));

    console.log('products end', stop());
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
    await model.setRefs(data.refs);
    data = await model.retrieve();
    data.refs = await model.getRefs();

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
        message = 'сервер: Артикул продукта должен быть уникальным!';
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
    await model.setRefs(data.refs);
    data = await model.retrieve();
    data.refs = await model.getRefs();

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
        message = 'сервер: Имя и VIN продукта должны быть уникальными!';
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

    res.status(200).send(true);
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
