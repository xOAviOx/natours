const Tour = require("../model/tourModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.getOverview = catchAsync(async (req, res) => {
  //1 Get tour data from coll;ection
  const tours = await Tour.find();
  //2 Build template

  //3 Render that template using tour data from 1

  res.status(200).render("overview", {
    title: "All tours",
    tours,
  });
});

exports.getTourView = catchAsync(async (req, res, next) => {
  //1 get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }
  //2 build template

  //3 render template using the data from 1

  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLogin = async (req, res) => {
  res
    .status(200)
    .set(
      "Content-Security-Policy",
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render("login", {
      title: "Log into your account",
    });
};
