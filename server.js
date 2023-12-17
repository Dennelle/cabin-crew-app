// load the env consts
require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
// session middleware
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

const indexRouter = require('./routes/index');
const travelsRouter = require('./routes/travels');
const commentsRouter = require('./routes/comments')

// create the Express app
const app = express();


// ===== Middleware functions =====
// connect to the MongoDB with mongoose
require('./config/database');
// require Passport authentication strategy file for Google OAuth code implementation.
require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
/* GET users listing. */
app.use('/', indexRouter);
// embedded resources don't have a consitent name at the beginning
// of each route, so we just always mount them as '/'
app.use('/', travelsRouter);
app.use('/', commentsRouter);

// invalid request, send 404 page
// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).send('Cant find that!');
});

module.exports = app;
