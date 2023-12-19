const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// configure passport - plug-in an instance of OAuth strategy user has logged in using OAuth.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },

  async function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    let user = await User.findOne({ googleId: profile.id}); //user has logged in via OAuth!
    if (user) return cb(null, user);

    //if user is null handle error in this manner
    try {
      user = User.create({
        name: profile.Displayname,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });
      return cb(null, user);

    } catch (err) {
      cb (err);
    }
  }
 )
);
// a method that will call after the verify callback to let Passport know what data we want to store in the session to identify user.
passport.serializeUser(function(user, cb){
  cb(null, user._id)
});
// a method that Passport will call on each request when a user is logged in. What is returned will be assigned to req.user.
passport.deserializeUser(async function(id, cb){
  try {
    const userDoc = await User.findById(id);
    cb(null, userDoc)

  } catch (err) {
    cb(err)
  }
});
  //REVIEW THIS MODULE IN OFFICE HOURS
  // Find your User, using your model, and then call cb(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will
  // be availible in every Single controller function, so you always know the logged in user
