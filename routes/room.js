var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
   var server = req.app.get('wsServer');
   console.log("session: ");
   process.stdout.write("Getting Index");
   res.render('room', { title: 'Hey boy', message: 'Hello there, dawg!'});
});

module.exports = router;
