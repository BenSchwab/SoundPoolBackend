var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var path = require('path');
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var RoomController = require('../controllers/RoomController');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next){
   var socket = req.app.get('wsServer');
   var userID = req.session.userId;
   var roomID = req.param('id');
   var profileID = req.param('profileID');
   console.log("profileID");
   var room;
   var rController = RoomController();
   rController.get(roomID, function(err, room){
      if(err) console.log(err);

      //The room is closed, return to pick a room
      if(!room.open){
         res.redirect('enterRoom'+querystring.stringify({
            status: 'full'
          }),{});
      }
      //Enter the room
      else{
            User.findOne({'id':userID},function(err, user){
            rController.enter(room.id, user, profileID, function(err, entrant){
            if(err) console.log(err);
            console.log(entrant);

            //notify all room members of the new entrant
            socket.messageWaitingList(room);


         });
         res.render('waitingRoom', { room: room});


          });

      }

   });

   console.log("roomID: " + roomID);


});

module.exports = router;