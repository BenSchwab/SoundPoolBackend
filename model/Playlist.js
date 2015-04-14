var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
   name: String,
   id: String,
   score: Number,
   userID: String,
   profileID: Number
});

mongoose.model('Playlist', PlaylistSchema);




