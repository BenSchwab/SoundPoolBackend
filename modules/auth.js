auth = {
   client_id : '1adddf5d5b1c4e638dbcc6ea8f2c7503', // Your client id
   client_secret : '3a48222e35d04373b191bdd77344fb0c', // Your client secret
   redirect_uri : 'http://localhost:8888/callback', // Your redirect uri
  generateRandomString : function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
},
stateKey : 'spotify_auth_state'

}



module.exports = auth;