var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
   name: String,
   id: String,
   numSongs: Number,
   open: Boolean,
   tracks: [String]
});

RoomSchema.methods.findEntrants = function (cb) {
  return this.model('RoomEntrant').find({ roomID: this.id}, cb);
};

mongoose.model('Room', RoomSchema);




