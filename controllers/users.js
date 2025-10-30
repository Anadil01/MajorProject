const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs');
  };


module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash('success', 'Welcome to Wanderlust!');
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('signup');
  } 
};

module.exports.renderLoginForm = (req, res )=>{
    res.render("users/login.ejs")
};

module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to Wanderlust! You are logged in!");
    
    // Use a fallback, and delete the session variable
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    delete req.session.redirectUrl; // <-- Add this line
    
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res)=>{
    req.logout((err)=>{
       if(err) {
       return next(err);
       }
       req.flash("success", "you are logged out!");
       res.redirect("/listings");
    });
};