const express = require('express');
const router = express.Router();
const passport = require('passport');

// The root route renders our only view - OPTIONAL
// router.get('/', function(req, res, next) {
//   res.redirect('/travels')
// });

//GET landing page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Now Boarding' });
});



// Google OAuth login route
// Google OAuth login route
// The client has to make an http get request to /auth/google
// and the oauth process will start (Logging in with google)
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    // Optionally force pick account every time
    // prompt: "select_account"
  })
);

// Google OAuth callback route
// This route is the route we defined in our .env
// this the redirect route google has that tells the client how to get back to our express
// after loggin via google
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/travels", // <-------- YOU HAVE TO DECIDE WHERE THE USER GOES (ONE OF YOUR ROUTES)
    failureRedirect: "/", // AFTER THEY LOGIN, WHAT ROUTE?
  })
);

// OAuth logout route
// the client needs to make a http get request to /logout,
// to destroy's the session cookie connect.sid! which has the users id inside
// so when the server has no idea who that person is anymore! they have to relogin
router.get("/logout", function (req, res) {
  req.logout(function () {
    //< - req.logout comes from passport, and what it does is destroys the cookie keeping track of the user!
    // < logout is from passport
    res.redirect("/"); // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
    // <- where do YOU want the user to go when they login! YOUR CHOICE!
  });
});

module.exports = router;
