var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SongSchema = new Schema({
   name: String,
   id: String,
   score: Number,
   userID: String,
   profileID: String
});

mongoose.model('Song', SongSchema);




