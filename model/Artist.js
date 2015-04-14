console.log("init user");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
   name: String,
   id: String,
   score: Number,
   userID: String,
   profileID: String
});

mongoose.model('Artist', ArtistSchema);