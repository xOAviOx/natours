const express = require('express');
const {
  getOverview,
  getTourView,
  getLogin,
} = require('../controllers/viewsController');
const { protect, isLoggedIn } = require('../controllers/authController');
const router = express.Router();

router.use(isLoggedIn);

router.get('/', getOverview);

router.get('/tour/:slug', getTourView);

router.get('/login', getLogin);
module.exports = router;
