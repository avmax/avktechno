const CategoryError = require('../errors').CategoryError;
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
  // next(new CategoryError(`Ошибка при удалении брэнда. id: ${id}`, err));
};
