var nodemailer = require('nodemailer');

const FROM = 'avmax.web@gmail.com';
const TO = 'e.kanaeva@avktechno.com';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'avmax.web@gmail.com',
    pass: 'yyRKT7737gjR'
  }
});

var mailOptions = {
  from: FROM,
  to: TO,
  subject: 'АВК-ТЕХНО: запрос на покупку товаров.',
  text: 'That was easy!'
};

const messenger = {
  async send(message) {
    return new Promise((resolve, reject) => {
      transporter.sendMail({ ...mailOptions, text: message }, function(error, info) {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
};

module.exports = messenger;
