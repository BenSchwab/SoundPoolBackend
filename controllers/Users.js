var mongoose = require('mongoose');
var User = mongoose.model('User');


UserController = {
   get: function(id, callback){
      User.findOne({'id':id},callback);
   },
   create: function(params, callback){
      var newUser = User(params);
      newUser.save(callback);
   }

}


module.exports = UserController;


