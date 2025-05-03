const express = require('express');
const { getOverview, getTourView } = require('../controllers/viewsController');
const router = express.Router();

router.get('/', getOverview);

router.get('/tour/:slug', getTourView);

module.exports = router;
