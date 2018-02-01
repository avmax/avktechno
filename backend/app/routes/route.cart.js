const messenger = require('../utils/message');

exports.post = async (req, res, next) => {
  const { body } = req;
  const { name, phone, mail, items } = body;

  let message = `Покупатель\n   Имя: ${name} \n   Телефон: ${phone} \n   Почта: ${mail} \nЗаказал следующие товары:`;
  items.forEach(item => message = message + '\n   ' + item.name + ' : ' + item.count + ' штук(и)');

  try
  {
    messenger.send(message);
    res.status(200).send(true);
  }
  catch (err)
  {
    next(err);
  }
};
