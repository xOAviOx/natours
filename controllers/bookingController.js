const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tour = require("./../model/tourModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1 get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  const transformedItems = [
    {
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: tour.price * 100,
        product_data: {
          name: `${tour.name} Tour`,
          description: tour.description, //description here
          images: [
            `${req.protocol}://${req.get("host")}/img/tours/${tour.imageCover}`,
          ], //only accepts live images (images hosted on the internet),
        },
      },
    },
  ];

  //2 create checout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: transformedItems,
    mode: "payment",
  });
  //3 create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});
