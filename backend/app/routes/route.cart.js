const sms = require('../utils/sms');

exports.post = (req, res, next) => {
  const { body } = req;
  const { name, phone, mail, items } = body;

  let message = `${name}, ${phone}, ${mail} заказал следующие товары: `;
  items.forEach(item => message = message + '\n' + item.name + ' - ' + item.count + ' штук');
  console.log(message);
  sms.sendSms(phone, '+79296242456', message, (err) => {
    if (err) {
      res.status(500).send(false);
    } else {
      res.status(200).send(true);
    }
  })
};
