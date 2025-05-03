const express = require('express');
const {
  getOverview,
  getTourView,
  getLogin,
} = require('../controllers/viewsController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router.get('/', getOverview);

router.get('/tour/:slug', protect, getTourView);

router.get('/login', getLogin);
module.exports = router;
