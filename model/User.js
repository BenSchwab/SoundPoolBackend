console.log("init user");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
   display_name: String,
   id: String,
   accessToken: String,
   profiles: [{type: Schema.Types.ObjectId, ref: 'Profile'}]
});

mongoose.model('User', UserSchema);





