const fx = require('money');
const axios = require('axios');

const API_KEY = '4e640f73de71435686b0194c79b36077';

let money = { };

const init = async () => {
  try
  {
    const { data } = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`);
    const { rates } = data;
    const { USD, RUB, EUR } = rates;
    fx.base = 'USD';
    fx.rates = { USD, RUB, EUR };
    money.fx = fx;
  }
  catch (err)
  {
    console.log('MONEY ERROR:', err);
    return Promise.reject(err);
  }
}

module.exports = { init, money };
