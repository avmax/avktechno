const ProductError = require('../errors').ProductError;
const { isEmpty } = require('lodash/fp');

exports.get = async (req, res, next) => {
  const body = req.body || {};
};

exports.post = async (req, res, next) => {
  const body = req.body || {};
};

exports.put = async (req, res, next) => {
  const body = req.body || { };
};

exports.delete = async (req, res, next) => {
  const body = req.body || { };
  // next(new ProductError(`Ошибка при удалении брэнда. id: ${id}`, err));
};
