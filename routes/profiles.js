var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
   // var options = {
   //   criteria: { _id : id }
   // };
   userId = req.userId;

   var options = {
    criteria: { id : userId }
  };
  var query = User.findOne({'id':userId});
  console.log('user: '+query.name);

   console.log("session id"+req.session.userId)
   process.stdout.write("Getting Index");
   res.render('profiles', { title: 'Hey boy', message: 'Hello there, dawg!'});
});

module.exports = router;