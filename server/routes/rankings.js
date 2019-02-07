const express = require('express');
const router = express.Router({mergeParams: true});

const {getRankings} = require('../handlers/rankings');

// /api/rankings
router.route('/').get(getRankings)

module.exports = router;