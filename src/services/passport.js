const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const config = require('../config/keys');

const User = mongoose.model('users');

let baseURL = process.env.NODE_ENV === 'production' ? 'https://infinite-river-57974.herokuapp.com' : 'http://localhost:5000';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);      
    })
});

passport.use(
  new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: `${baseURL}/auth/google/callback`
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser){
          // already have a user with this Google Id
          done(null, existingUser); // null because no error occurred 
        } else{
          // user with this Google Id doesn't already exist so create one
          new User({
            googleId: profile.id,
            signupDate: new Date()
          }).save()
            .then(user => {
              done(null, user);
            })
        }
      });
  })
);