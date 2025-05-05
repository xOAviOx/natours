const express = require("express");
const {
  getOverview,
  getTourView,
  getLogin,
  getAccount,
  updateUserData,
  getMyTours,
  getSignUp,
} = require("../controllers/viewsController");
const { protect, isLoggedIn } = require("../controllers/authController");
const { createBookingCheckout } = require("../controllers/bookingController");
const router = express.Router();

router.get("/", createBookingCheckout, isLoggedIn, getOverview);

router.get("/tour/:slug", isLoggedIn, getTourView);

router.get("/login", isLoggedIn, getLogin);
router.get("/sign-up", getSignUp);
router.get("/me", protect, getAccount);
router.get("/my-tours", protect, getMyTours);

router.post("/submit-user-data", protect, updateUserData);

module.exports = router;
