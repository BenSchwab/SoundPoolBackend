console.log("init user");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
   name: String,
   id: String,
   userID: String
});

ProfileSchema.methods.getPlaylists = function (cb, rating) {
   console.log("getting tracks");
   var params;
   if(!rating){
      params = {profileID: this.id};
   }
   else{
       params = {profileID: this.id, rating:rating};
   }
   this.model('Playlist').find(params, function(err, playlists){
      if(err) console.log(err);
      console.log("got liked playlists: "+playlists);
      cb(err, playlists);


  });
};

mongoose.model('Profile', ProfileSchema);