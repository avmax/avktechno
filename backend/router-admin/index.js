const express = require('express');

const router = express.Router();

router.post('/categories', require('./categories.route').post);
router.put('/categories', require('./categories.route').put);
router.delete('/categories', require('./categories.route').delete);

module.exports = router;
