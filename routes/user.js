const express = require('express');
const router = express.Router(); 
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { trusted } = require('mongoose');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require("../controllers/users.js");

router.route('/signup')
.get( userController.renderSignupForm)  // render form
.post(wrapAsync(userController.signup)); // signup route

router.route("/login")
.get( userController.renderLoginForm)
.post( saveRedirectUrl, passport.authenticate("local", {
  failureRedirect: "/login", 
  failureFlash: true,
}), 
userController.login);


router.get('/logout', userController.logout);

module.exports = router;// Placeholder for user-related routes (e.g., registration, login, logout)
// These can be implemented as needed in the future