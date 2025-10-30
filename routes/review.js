const express = require('express');
const router = express.Router({mergeParams: true}); // mergeParams to access :id from parent route  
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");


// Review Create Route
router.post('/',isLoggedIn, validateReview, 
  wrapAsync(reviewController.createReview));
  
  // Review Delete Route
  router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;