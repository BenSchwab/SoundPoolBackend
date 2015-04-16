var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var RoomController = require('../controllers/RoomController');
var UserController = require('../controllers/Users');
/* GET home page. */
router.get('/', function(req, res, next) {
   var rController = RoomController();
   console.log("er: "+req.session.userId);
   var uController = UserController(req.session.userId);
   rController.getAllOpen(function(err, rooms){
      if(err) console.log(err);
      else{
         uController.getProfiles(function(profiles){
            res.render('enterRoom', {rooms: rooms, profiles: profiles});
         });


      }
   });
});

module.exports = router;
