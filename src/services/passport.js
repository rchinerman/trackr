const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const config = require('../config');

passport.use(
  new GoogleStrategy({
    clientID: config.googleClientID,
    clientSecret: config.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('access token: ' + accessToken);
    console.log('refresh token: ' + refreshToken);
    console.log('profile: ' + profile);    
  })
);