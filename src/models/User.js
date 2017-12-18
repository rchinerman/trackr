const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model('users', new Schema({
  googleId: String,
  signupDate: String
}));
