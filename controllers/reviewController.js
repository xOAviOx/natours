const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { review: newReview },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find().populate('user');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews },
  });
});

exports.getTourReview = async (req, res, next) => {
  const tourReview = await Review.find({ tour: req.params.id });
  res.status(200).json({
    status: 'success',
    results: tourReview.length,
    data: { tourReview },
  });
};
