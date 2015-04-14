var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');
var UserController = require('../controllers/Users');
var SpotifyWebApi = require('../modules/SpotifyApiModule.js');
var request = require('request');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


router.get('/', function(req, res, next){
   var listID = req.param("listid");
   console.log("listID " +listID);
   var id = req.session.userId;
   var uController = UserController(id);
   uController.get(id,function(err, user){
      console.log("In playlists route: " + user.id);
      SpotifyWebApi.setToken(user.accessToken);
      SpotifyWebApi.spotifyApi.getUserPlaylists(id).then(function(data) {
          //res.send("hello world of spotify");
          //console.log('Retrieved playlists', data.body);
          var playlists = data.body.items;
          res.render('playlist', { playlists: playlists});
          console.log(playlists);
        },function(err) {
          res.send("Errored :(");
          console.log('Something went wrong!', err);
          });
   });



});

module.exports = router;