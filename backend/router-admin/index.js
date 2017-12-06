const express = require('express');

const router = express.Router();

router.post('/categories/post', require('./categories.route').post);
router.put('/categories/put', require('./categories.route').put);
router.delete('/categories/delete', require('./categories.route').delete);

module.exports = router;
