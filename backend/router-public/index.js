const express = require('express');
const router = express.Router();

const delay = require('../middleware/delay');

router.get('/categories/', delay(300), require('./categories.route').get);

router.post('/sign-in', require('./sign-in.route').post);

module.exports = router;
