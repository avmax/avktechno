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
    data = await Promise.all(model.map(async (itemModel) => {
      const itemData = itemModel.get({ plain: true });
      const products = await itemModel.getProducts();
      const categories = await Promise.all(products.map(p => p.getCategories()));
      itemData.refs = {
        product: products.map(p => p.get({ plain: true }).id),
        category: uniq(flatten(categories).map(c => c.get({ plain: true }).id)),
      };
      return itemData;
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
  try
  {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.b.create(data);
    data = model.get({ plain: true });
    data.refs = { product: [], category: [] };

    res.status(200).send(data);
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
  try
  {
    let model;
    let data;

    data = modelFromReq(req);
    model = await db.m.b.findById(data.id);
    await model.update(data);
    data = model.get({ plain: true });

    res.status(200).send(data);
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
        message = 'сервер: Казус при удалении бренда :(';
    }
    next(new BrandError(message, err));
  }
};
