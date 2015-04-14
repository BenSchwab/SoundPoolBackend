var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
   name: String,
   id: String,
   numSongs: Number,
   open: Boolean
});

mongoose.model('Room', RoomSchema);




