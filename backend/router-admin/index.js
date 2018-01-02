const express = require('express');

const router = express.Router();

router.post('/categories', require('./categories.route').post);
router.put('/categories', require('./categories.route').put);
router.delete('/categories', require('./categories.route').delete);

router.post('/brands', require('./brands.route').post);
router.put('/brands', require('./brands.route').put);
router.delete('/brands', require('./brands.route').delete);

module.exports = router;
