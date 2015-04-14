console.log("init user");
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
   display_name: String,
   id: String
});

mongoose.model('User', UserSchema);





