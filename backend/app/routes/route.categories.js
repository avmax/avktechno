const db = require('../db');
const CategoryError = require('../errors').CategoryError;
const { uniq } = require('lodash/fp');
const timer = require('../../../utils/timer')();

const modelFromReq = (req) => {
  const { body } = req;
  const model = body;

  const parse = val => val ? JSON.parse(val) : val;
  model.refs = parse(model.refs);
  if (model.refs) {
    Object.keys(model.refs).forEach(key => model.refs[key] = model.refs[key][0] || null);
  }

  return model;
};


exports.get = async (req, res, next) => {
  try
  {
    let model;
    let data;

    const stop = timer();
    model = await db.m.c.findAll();
    data = await Promise.all(model.map(async (modelItem) => {
      const dataItem = modelItem.retrieve();
      dataItem.refs = await modelItem.getRefs();
      return dataItem;
    }));

    console.log('end categories', stop());
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
    await model.setRefs(data.refs);
    data = model.retrieve();
    data.refs = await model.getRefs();

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
    await model.setRefs(data.refs);
    data = model.retrieve();
    data.refs = await model.getRefs();

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
