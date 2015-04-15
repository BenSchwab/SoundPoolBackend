var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var RoomController = require('../controllers/RoomController');

/* GET home page. */
router.get('/', function(req, res, next) {
   var rController = RoomController();
   rController.getAllOpen(function(err, rooms){
      if(err) console.log(err);
      else{
         res.render('enterRoom', {rooms: rooms});
      }
   });
});

module.exports = router;
