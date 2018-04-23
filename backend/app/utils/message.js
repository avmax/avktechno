const nodemailer = require('nodemailer');

const FROM = 'avmax.web@gmail.com';
const TO = 'e.kanaeva@avktechno.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'avmax.web@gmail.com',
    pass: 'wfJJi7717yY'
  }
});

const mailOptions = {
  from: FROM,
  subject: 'АВК-ТЕХНО: запрос на покупку товаров.',
};

const opts = (message, target) => ({
    ...mailOptions, text: message || 'That was easy!',
    to: target || TO,
  });

const messenger = {
  async send(message, target) {
    try {
      if (!Array.isArray(target)) {
        await transporter.sendMail(opts(message, target));
      } else {
        await Promise.all(target.map(t => transporter.sendMail(opts(message, t))));
      }
    } catch(err) {
      console.log('FAILURE AT SENDING MESSAGE', err);
      return Promise.reject(err);
    }
  }
};

module.exports = messenger;
