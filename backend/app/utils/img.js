const config = require('../../../config');
const BASE_URL = config.server.URL;

const imgURL = name => BASE_URL + '/' + name;

exports.imgURL = imgURL;
