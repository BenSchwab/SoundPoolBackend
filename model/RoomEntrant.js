var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
   userID: String,
   roomID: String,
   profileID: Number
});

mongoose.model('Room', RoomSchema);




