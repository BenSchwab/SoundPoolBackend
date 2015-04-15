var mongoose = require('mongoose');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');


UserController = function(id) {
   var userId = id;
   return   {
      get: function(id, callback){
         User.findOne({'id':id},callback);
      },
      create: function(params, callback){
         var newUser = User(params);
         newUser.save(callback);
      },
      getProfiles: function(callback){
         Profile.find({'userID':userId}, function(err, profiles){
            if(err) console.log(err);
            callback(profiles);
         });
      },
      createProfile: function(name, callback){
         Profile.count({userID: userId}, function(err, count){
            var newProfile = Profile({userID: userId, id: ''+count, name: name});
            newProfile.save(callback);
         });
      },
      getProfile: function(pID, callback){
         console.log({'id':pID, 'userID': userId});
         Profile.findOne({'id':pID, 'userID': userId}, function(err, profile){
            if(err) console.log(err);
            callback(profile);
         });
      }
   };
};


module.exports = UserController;


