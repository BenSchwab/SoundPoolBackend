var mongoose = require('mongoose');
var Playlist = mongoose.model('Playlist');
var SpotifyWebApi = require('../modules/SpotifyApiModule.js');


Controller = {
   get: function(id, callback){
      Playlist.findOne({'id':id},callback);
   },
   create: function(params, callback){
      var newPlaylist = Playlist(params);
      newPlaylist.save(callback);
   },
   getSongs: function(userID, playlistID, callback){

      //SpotifyWebApi.setToken()

   }

};


module.exports = Controller;
