var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SongSchema = new Schema({
   name: String,
   id: String,
   score: Number
});

mongoose.model('Song', SongSchema);




