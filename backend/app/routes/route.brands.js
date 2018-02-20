const db = require('../db');
const BrandError = require('../errors').BrandError;
const { uniq, flatten } = require('lodash/fp');
const { imgURL } = require('../utils/img');

const modelFromReq = (req) => {
  const { body, file } = req;
  const model = body;

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

    model = await db.m.b.findAll();
    data = await Promise.all(model.map(async (modelItem) => {
      const dataItem = modelItem.retrieve();
      dataItem.refs = await modelItem.getRefs();
      return dataItem;
    }));

    res.status(200).send(data);
  }
  catch(err)
  {
    console.log(err);
    next(new BrandError('сервер: Казус при загрузке производителей', err));
  }
};


exports.post = async (req, res, next) => {
  try
  {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.b.create(data);
    data = model.retrieve();
    data.refs = await model.getRefs();

    res.status(200).send(data);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case db.s.UniqueConstraintError:
        message = 'сервер: Имя производителяя должно быть уникальным!';
        break;
      default:
        message = 'сервер: Казус при добавлении производителяя :(';
    }
    console.log(err);
    next(new BrandError(message, err));
  }
};


exports.put = async (req, res, next) => {
  try
  {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.b.findById(data.id);
    await model.update(data);
    await model.update(data);
    data = model.retrieve();
    data.refs = await model.getRefs();

    res.status(200).send(data);
  }
  catch(err)
  {
    let message;
    switch (err.constructor) {
      case BrandError:
        message = err.message;
        break;
      case db.s.UniqueConstraintError:
        message = 'сервер: Имя производителя должно быть уникальным!';
        break;
      default:
        message = 'сервер: Казус при обновлении производителя :(';
    }

    next(new BrandError(message, err));
  }
};


exports.delete = async (req, res, next) => {
  try {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.b.findById(data.id);
    model.destroy();

    res.status(200).send();
  } catch(err) {
    let message;
    switch (err.constructor) {
      default:
        message = 'сервер: Казус при удалении производителя :(';
    }
    next(new BrandError(message, err));
  }
};
