const express = require("express");
const {
  getOverview,
  getTourView,
  getLogin,
  getAccount,
  updateUserData,
} = require("../controllers/viewsController");
const { protect, isLoggedIn } = require("../controllers/authController");
const router = express.Router();

router.get("/", isLoggedIn, getOverview);

router.get("/tour/:slug", isLoggedIn, getTourView);

router.get("/login", isLoggedIn, getLogin);
router.get("/me", protect, getAccount);
router.post("/submit-user-data", protect, updateUserData);

module.exports = router;
