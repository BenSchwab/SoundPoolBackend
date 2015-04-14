console.log("init user");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
   name: String,
   id: String,
   score: Number,
   userID: String,
   profileID: String
});

mongoose.model('Genre', GenreSchema);