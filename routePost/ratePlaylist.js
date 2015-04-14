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
   console.log("Post: "+req.body.playlistID)
   var uid = req.session.userID;
   var params = {id: req.body.playlistID, userID: uid, score: 1};
   playlistController.create(params, function(err, playlist){
      if(err){ console.log(err)}
         else{
            console.log("saved playlist score")
         }
   });
    // var playlistID = req.body.playlistID;
    // console.log("Got rate rating post: "+ songID);
   res.redirect("/");
});



module.exports = router;

