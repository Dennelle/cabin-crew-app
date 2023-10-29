const express = require('express');
const router = express.Router();
const passport = require('passport');

// The root route renders our only view
router.get('/', function(req, res, next) {
  res.redirect('/travels')
});

//GET landing page.
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Now Boarding' });
// });

module.exports = router;

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/travels',
    failureRedirect : '/travels'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function(){ //< - req.logout comes from passport, and what it does is destroys the cookie keeping track of the user!
    res.redirect('/travels') // <---- UPDATE THIS TO WHERE YOU WANT THE USER TO GO AFTER LOGOUT
  });
});

module.exports = router;
