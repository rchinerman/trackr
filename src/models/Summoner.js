const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.model('summoners', new Schema({
  summonerName: String,
  summonerNameLower: String,
  summonerId: Number, // Riot sometimes stores this as a string
  profileIcon: Number,
  lastUpdate: String,
  soloHistory: Array,
  flexHistory: Array,
  threesHistory: Array
}));
