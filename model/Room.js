var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoomSchema = new Schema({
   name: String,
   id: String,
   numSongs: Number,
   open: Boolean
});

RoomSchema.methods.findEntrants = function (cb) {
  return this.model('RoomEntrant').find({ roomId: this.id}, cb);
};

mongoose.model('Room', RoomSchema);




