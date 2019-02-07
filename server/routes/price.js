const express = require('express');
const router = express.Router({mergeParams: true});

const {getPrices} = require('../handlers/price');

// /api/price
router.route('/').get(getPrices)

module.exports = router;