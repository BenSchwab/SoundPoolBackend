var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomEntrant = new Schema({
   name: String,
   userID: String,
   roomID: String,
   profileID: Number
});

mongoose.model('RoomEntrant', RoomEntrant);




