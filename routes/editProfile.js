var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserController = require('../controllers/Users');
var PlaylistController = require('../controllers/Playlists');
var SpotifyWebApi = require('../modules/SpotifyApiModule.js');

var fs = require('fs');
var querystring = require('querystring');
var path = require('path');
var request = require('request');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

router.get('/', function(req, res, next){
   var listID = req.param('playlistID');
   //console.log(req.param);
   console.log("listID " +listID);
   var id = req.session.userId;
   var uController = UserController(id);
   var pController = PlaylistController;

   var playlists;
   var profile;

   var profilePromise = new Promise(function(resolve, reject){
      uController.getProfile(listID, function(err, prof){
        console.log("prof: "+prof);
          profile = prof;
          resolve();
      });
   });
   var playListPromise = new Promise(function(resolve, reject){
      uController.get(id,function(err, user){
          SpotifyWebApi.setToken(user.accessToken);
          SpotifyWebApi.spotifyApi.getUserPlaylists(id).then(function(data) {
          //res.send("hello world of spotify");
          //console.log('Retrieved playlists', data.body);
          playlists = data.body.items;
          resolve();
        },function(err) {
          res.send("Errored :(");
          console.log('Something went wrong!', err);
          });
      });
   });

   var promises = [profilePromise, playListPromise];
   Promise.all(promises).then(function(values){
       console.log("Promises have resolved");
       res.render('playlist', { profile: profile, playlists: playlists});
   });

});

module.exports = router;