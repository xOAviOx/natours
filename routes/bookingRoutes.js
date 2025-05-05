const express = require("express");
const reviewController = require("./../controllers/reviewController");
const authController = require("./../controllers/authController");
const bookingController = require("./../controllers/bookingController");
const router = express.Router({ mergeParams: true });

router.get(
  "/checkout-session/:tourId",
  authController.protect,
  bookingController.getCheckoutSession
);

module.exports = router;
