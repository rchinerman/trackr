const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const config = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // null because no error occurred 
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);      
});

passport.use(
  new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: `/auth/google/callback`,
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser){
      return done(null, existingUser); 
    }
    const user = await new User({
                              googleId: profile.id,
                              signupDate: new Date()
                            }).save();
    done(null, user);
  })
);