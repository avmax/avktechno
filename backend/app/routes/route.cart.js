const messenger = require('../utils/message');

const TO = [
  'avmax.web@gmail.com',
  '2347366@mail.ru',
  'e.nozdrina@bento-club.ru',
  'info@bento-club.ru',
];

exports.post = async (req, res, next) => {
  const { body } = req;
  const { name, phone, mail, items } = body;

  let message = `Покупатель\n   Имя: ${name} \n   Телефон: ${phone} \n   Почта: ${mail} \nЗаказал следующие товары:`;
  items.forEach(item => message = message + '\n   ' + item.name + ' : ' + item.count + ' штук(и)');

  try
  {
    await messenger.send(message, TO);
    res.status(200).send(true);
  }
  catch (err)
  {
    next(err);
  }
};
