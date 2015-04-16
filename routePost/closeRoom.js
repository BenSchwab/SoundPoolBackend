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

var Algorithm = require('../algorithm/algorithm');


//Note using get is wrong, but w/e
router.get('/', function(req, res) {

    var sockets = req.app.get("wsServer");
    var roomID = req.param('id');
    var rController = RoomController();
    rController.get(roomID, function(err, room){
      if(err) console.log(err);
      else{
         console.log("Closing room: "+ room);
         room.open = false;
         room.save();
         sockets.closeOutRoom(roomID);

         //kick off algorithm calculation
         var algo = new Algorithm();
         algo.calculateOptimalPlaylist(room, function(){
          console.log("Callback");
        });

         res.redirect('/room?id='+room.id);
      }

    });
    console.log("Trying to close room: "+ roomID);



});


function kickOffAlgo(){
  var Worker = require('webworker-threads').Worker;

    var fibo = new Worker(function() {
        function fibo (n) {
          return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
        }
        this.onmessage = function (event) {
          postMessage(fibo(event.data));
        };
      });

    fibo.onmessage = function (event) {
        console.log('fib(40) = ' + event.data);
    };
    fibo.postMessage(40);
}



module.exports = router;

