const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //1 Get tour data from coll;ection
  const tours = await Tour.find();
  //2 Build template

  //3 Render that template using tour data from 1

  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTourView = catchAsync(async (req, res) => {
  //1 get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  //2 build template

  //3 render template using the data from 1

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});
