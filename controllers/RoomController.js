var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');
var Room = mongoose.model('Room');
var RoomEntrant = mongoose.model('RoomEntrant');


RoomController = function() {
   return   {
      get: function(id, callback){
         Room.findOne({'id':id},callback);
      },
      create: function(name, numSongs, callback){
         Room.count({}, function(err, count){
            var newRoom = new Room({name: name, numSongs: numSongs, id: count, open:true});
            newRoom.save(callback);
         });
      },
      getAllOpen: function(callback){
         Room.find({'open':true},callback);
      },
      enter: function(roomID, userID, profileID, callback){
         var roomEntrant = new RoomEntrant({roomID:roomID,userID:userID, profileID: profileID });
         roomEntrant.save(callback);
      },
      getEntrants: function(roomID, callback){
         RoomEntrant.find({roomID:roomID}, callback);
      }
   };
};


module.exports = RoomController;


