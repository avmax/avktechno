var Nexmo = require('nexmo');

var nexmo = new Nexmo({
  apiKey: '6c7b6cd7',
  apiSecret: '6c7b6cd7',
});

module.exports = nexmo.message;
