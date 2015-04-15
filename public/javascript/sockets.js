 if ("WebSocket" in window)
  {
     //alert("WebSocket is supported by your Browser!");
     // Let us open a web socket
     var ws = new WebSocket("ws://localhost:8080");
     ws.onopen = function()
     {
        // Web Socket is connected, send data using send()
        //ws.send("Message to send");
        //alert("Message is sent...");
     };
     ws.onmessage = function (evt)
     {
        var received_msg = evt.data;
        console.log(received_msg);
        //alert("Message is received...");
     };
     ws.onclose = function()
     {
        // websocket is closed.
        console.log("Connection is closed...");
     };
  }
  else
  {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }


  console.log(qs["id"]);

function messageServer(){
    ws.send("Hello from someone");
}


  $(document).ready(function(){

      var spotifyApi = new SpotifyWebApi();

      var audio = document.getElementById("playbox");
      var albumArt = $("#albumArt");
      var songName = $("#songName");
      var artistName =  $("#artistName");
      var albumName = $("#albumName");
      console.log(albumName);


      spotifyApi.searchTracks("Sonnentanz", function(err, data) {
        if (err) console.error(err);
        else {
          console.log(data);
            setAlbumView(data.tracks.items[0]);
        }
      });

      function setAlbumView(track){
            var url = track.preview_url;
            console.log(albumName);
            albumName.text(track.album.name);
            artistName.text(track.artists[0].name);
            albumArt.attr('src', track.album.images[0].url);
            songName.text(track.name);
            audio.src =  url+'.mp3';
            audio.play();
      }

});

