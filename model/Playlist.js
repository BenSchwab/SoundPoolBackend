var mongoose = require('mongoose');
var SpotifyWebApi = require('../modules/SpotifyApiModule.js');

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
   owner: String,
   name: String,
   id: String,
   rating: String,
   userID: String,
   profileID: Number
});

PlaylistSchema.methods.getTracks = function (cb, id) {
   console.log("getting tracks");
   this.model('User').findOne({id: this.userID}, function(err, user){
      if(err) console.log(err);
      console.log("getting tracks got user");
      var api = new SpotifyWebApi(user);
      console.log("Playlist id: "+id);
      api.spotifyApi.getPlaylist(user.id,id).then(function(data) {
          //console.log('playlists', data.body.tracks);
          cb(err,data.body.tracks.items);

      }, function(err) {
         console.error(err);
         cb(err);
      });

  });
};


mongoose.model('Playlist', PlaylistSchema);




