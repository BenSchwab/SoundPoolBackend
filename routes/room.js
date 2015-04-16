var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var RoomController = require('../controllers/RoomController');

/* GET home page. */
router.get('/', function(req, res, next) {
   var server = req.app.get('wsServer');
   var userID = req.session.userId;
   var roomID = req.param('id');
    var rController = RoomController();
   rController.get(roomID, function(err, room){
      if(err) console.log(err);
      else{
         room.findEntrants(function(err, entrants){
            res.render('room', { room:room, entrants: entrants});
         });


      }

   });
});

module.exports = router;
