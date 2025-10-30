if(process.env.NODE_ENV != "production"){

  require('dotenv').config()
}

console.log(process.env.SECRET);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');  
// Import routes

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const review = require('./models/review.js');
const { error } = require('console');


// Connect to MongoDB
// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.ATLASDB_URL


main().then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));


const store = MongoStore.create({
  mongoUrl: dbUrl, 
  crypto: {
    secret:process.env.SECRET,
  },
  touchAfter: 24 * 3600,
})

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE", error);
});

// Session
const sessionOptions = {
  store,
  secret: process.env.SECRET, // <-- Corrected
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
};

// Root Route

// app.get('/', (_req, res) => {
//   res.send('Root is Working');
// });




app.use(session(sessionOptions));
app.use(flash());


// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());  
passport.deserializeUser(User.deserializeUser());


// Flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user; // for access in ejs temp
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({ 
//     email: "student@gmail.com",
//     username: "detla-student"
//    });
//   let registeredUser = await User.register(fakeUser, 'mypassword');
//   res.send(registeredUser);
// });  

// Use the listings routes
app.use("/listings", listingRouter);

// Use the review routes
app.use("/listings/:id/reviews", reviewRouter);

// Use the user routes
app.use("/", userRouter); 


// Catch-all for 404 errors
app.use((req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// Final error handler
// main error handler
app.use((err, req, res, next) => { 
  let { statusCode = 500, message = "Something went wrong!" } = err; 


  // If the error is a CastError, it means the ID was in the wrong format.
  // We can treat this as a 404.
  if (err.name === 'CastError') {
    statusCode = 404;
    message = "Page Not Found!";
  }
  
  res.status(statusCode).render('error.ejs', { statusCode, message });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});