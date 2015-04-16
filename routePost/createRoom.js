var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');

var auth = require('../modules/auth');

var mongoose = require('mongoose');
var UserController = require('../controllers/Users');
var RoomController = require('../controllers/RoomController');



router.post('/', function(req, res) {
    var roomName = req.body.roomName;
    var numSongs = req.body.numSongs;
    var profileID = req.body.profile;
    console.log("Create room profileID: "+profileID);
    var rController = RoomController();
    rController.create(roomName, numSongs, function(err, room){
      if(err) console.log(err);
      else{
         console.log("prof: "+ room);
         res.redirect('/waitingRoom?id='+room.id+"&profileID="+profileID);
      }

    });
    console.log("Got prof creaging post: "+ roomName);

});



module.exports = router;

