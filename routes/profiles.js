var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');
var UserController = require('../controllers/Users');

router.get('/', function(req, res, next){

  var uController = UserController(req.session.userID);
  uController.getProfiles(function(profiles){
    res.render('profiles', { profiles: profiles});
  });




});

module.exports = router;