var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');

var auth = require('../modules/auth');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var playlistController = require('../controllers/Playlists');



router.post('/', function(req, res) {
  var playlistID = req.body.playlistID;
   console.log("Post: "+req.body.playlistID);
   console.log("Post: "+req.body.rate);
   var profileID = req.param('profID');
   var playlistName = req.body[playlistID];
   console.log("ProfId"+profileID);
   var uid = req.session.userId;
   var params = {id: req.body.playlistID, userID: uid, rating: req.body.rate, profileID: profileID, name:playlistName};
   playlistController.create(params, function(err, playlist){
      if(err){ console.log(err);}
      else{
            console.log("saved playlist score");
            playlist.getTracks(function(err, tracks){console.log(tracks);}, playlist.id);

            res.redirect(req.get('referer'));
      }
   });
    // var playlistID = req.body.playlistID;
    // console.log("Got rate rating post: "+ songID);

});



module.exports = router;

