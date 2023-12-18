// load the env consts
require('dotenv').config();
// Load express and require modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

//setup router for our routes folder.
const indexRouter = require('./routes/index');
const travelsRouter = require('./routes/travels');
const commentsRouter = require('./routes/comments')

// Create our express app
const app = express();


// ===== Middleware functions =====
// connect to the MongoDB with mongoose
require('./config/database');
// require Passport authentication strategy file for Google OAuth code implementation.
require('./config/passport');

// view engine setup
// Configure the app (app.set)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mount middleware (app.use)
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
//parses the body of the http request to make the req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mount the session middleware
app.use(session({
  store: MongoStore.create({
    mongoUrl: process.env.DATABASE_URL
  }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

//Passport must be mounted after the session, because it uses the session cookie
// Passport must be mounted before our routes, because our routes want to use what passport gives us in the end
// which is the logged in user in the form of req.user in all of our controller functions!
app.use(passport.initialize());
app.use(passport.session());


// Add this middleware BELOW passport middleware
// this code is after passport because we want access to req.user, and before the response to the client(routes!)
//This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on to templates rendered within the application.

app.use(function (req, res, next) {
  // res.locals, <- this sets variables in every single ejs page in your views folder
  // in this case the variable is user (the key name on res.locals)
  res.locals.user = req.user; // assigning a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  // <- mongo document from the passport.deserializeUser function that occurs
  // on every request!
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// mount all routes with appropriate base paths
// Mount routes
// Then those routers are mounted in the middleware pipeline with the app.use
// all actual path begins with /travels
app.use('/', indexRouter);
// embedded resources don't have a consitent name at the beginning
// of each route, so we just always mount them as '/'
app.use('/', travelsRouter);
app.use('/', commentsRouter);

// invalid request, send 404 page
// catch 404 and forward to error handler
// Define a "root" route directly on app
//The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
