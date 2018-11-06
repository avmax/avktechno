const messenger = require('../utils/message');

const TO = [
  'e.kanaeva@avktechno.com',
  '2347366@mail.ru',
  'avmax.web@gmail.com',
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
