const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  //Allow nested routes

  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { review: newReview },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

// exports.getTourReview = async (req, res, next) => {
//   const tourReview = await Review.find({ tour: req.params.id });
//   res.status(200).json({
//     status: 'success',
//     results: tourReview.length,
//     data: { tourReview },
//   });
// };
