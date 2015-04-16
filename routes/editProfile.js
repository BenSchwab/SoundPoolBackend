var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserController = require('../controllers/Users');
var PlaylistController = require('../controllers/Playlists');
var SpotifyWebApi = require('../modules/SpotifyApiModule.js');
var Playlist = mongoose.model('Playlist');

var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
var request = require('request');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

router.get('/', function(req, res, next){
   var profileID = req.param('playlistID');


   console.log("profileID " +profileID);
   var id = req.session.userId;
   var uController = UserController(id);
   var pController = PlaylistController;

   var playlists;
   var profile;
   var lovedLists;
   var hatedLists;

   var profilePromise = new Promise(function(resolve, reject){
      uController.getProfile(profileID, function(prof){
        console.log("prof: "+prof);
          profile = prof;
          resolve();
      });
   });
   var playListPromise = new Promise(function(resolve, reject){
      uController.get(id,function(err, user){
          var api = new SpotifyWebApi(user);

          api.spotifyApi.getUserPlaylists(id).then(function(data) {
          console.log(data.body.items);

          playlists = data.body.items;
          resolve();
        },function(err) {
          res.send("Errored :(");
          console.log('Something went wrong!', err);
          });
      });
   });

   var lovedListPromise = new Promise(function(resolve, reject){
      Playlist.find({rating:"love",profileID:profileID,userID:id}, function(err, playlists){
        if(err) console.log(err);
        lovedLists = playlists;
        console.log("loved size: "+ lovedLists);
        resolve();
      });
   });

  var hatedListPromise = new Promise(function(resolve, reject){
       Playlist.find({profileID:profileID,rating:"hate",userID:id}, function(err, playlists){
        hatedLists = playlists;
        resolve();
      });
   });

   var promises = [profilePromise, playListPromise, lovedListPromise, hatedListPromise];
   Promise.all(promises).then(function(values){
       console.log("Promises have resolved");
       res.render('playlist', { profile: profile, playlists: playlists, lovedLists:lovedLists, hatedLists:hatedLists});
   });

});

module.exports = router;