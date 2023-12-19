// require dotenv and call its config() method to "process" the KEY=VALUE pairs in the .env:
// It's very important to require dotenv before any other module that depends upon the properties added to process.env
require("dotenv").config();
// Load express and require modules
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// session middleware
//server-side way of remembering a user's browser session by setting a cookie that contains a session id.
const session = require("express-session");
const passport = require("passport");
// lets you use HTTP PUT and DELETE in places where it is not supported and needs to be used before any module that needs to know the method of the request.
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");

//setup router for our routes folder.
const indexRouter = require("./routes/index");
const travelsRouter = require("./routes/travels");
const commentsRouter = require("./routes/comments");

// Create our express app
const app = express();

// ===== Middleware functions =====
// connect to the MongoDB with mongoose. the code in a Node module doesn't execute until the module is required
require("./config/database");
// require Passport authentication strategy file for Google OAuth code implementation.
require("./config/passport");

// view engine setup
// Configure the app (app.set)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Mount middleware (app.use)
app.use(methodOverride("_method"));
//handles request for static assets and responds with that file(ending the request)
app.use(express.static(path.join(__dirname, "public")));
//Info about the request is logged in terminal.
app.use(logger("dev"));
//adds properties to reg.body in JSON in body of HTTP request.
app.use(express.json());
//parses the body (data) of the http request that makes req.body in our controller functions
app.use(express.urlencoded({ extended: true }));
//add properites to request for cookies in HTTP request.
app.use(cookieParser());

// mount the session middleware
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

//Passport must be mounted after the session, because it uses the session cookie, which is the logged in user in the form of req.user in all the controller functions.
app.use(passport.initialize());
app.use(passport.session());

// This middleware is added below passport middleware because we need access to req.user and before the response to the client(routes). This property is useful for exposing request-level information such as the request path name, authenticated user, user settings, and so on to templates rendered within the application.
app.use(function (req, res, next) {
  // res.locals sets variables in every single ejs page in your views folder
  // in this case the variable is user (the key name on res.locals)
  res.locals.user = req.user; // assigning a property to res.locals, makes that said property (user) availiable in every
  // single ejs view
  // <- mongo document from the passport.deserializeUser function that occurs
  // on every request!
  next();
});

app.use(express.static(path.join(__dirname, "public")));

// Mount all routes with appropriate base paths and then those routers are mounted in the middleware pipeline with the app.use
// all actual path begins with /travels
//routers are middleware that map requests to our controller functions which are themselves middleware that res.render or res.redirect.
app.use("/", indexRouter);
app.use("/", travelsRouter);
app.use("/", commentsRouter);

// invalid request, send 404 page
// catch 404 and forward to error handler
// Define a "root" route directly on app
//The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
app.use(function (req, res) {
  res.status(404).send("Cant find that!");
});

module.exports = app;
