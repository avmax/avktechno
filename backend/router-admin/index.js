const express = require('express');

const router = express.Router();

router.post('/categories/add', require('./categories.route').add);
router.delete('/categories/remove', require('./categories.route').remove);

module.exports = router;
