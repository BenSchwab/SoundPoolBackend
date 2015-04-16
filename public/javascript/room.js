//---------------------Socket code------------------------
var roomID = qs['id'];
console.log("room id "+roomID);

if ("WebSocket" in window)
  {
     var ws = new WebSocket("ws://still-depths-3109.herokuapp.com/:8080");
     ws.onopen = function()
     {
        ws.send(JSON.stringify({action:"registerWait", roomID: roomID}));
        //ws.send(JSON.stringify({action:"getPlaylist", roomID: roomID}));
     };
     ws.onmessage = function (evt)
     {
        var received_msg = evt.data;
        console.log(received_msg);
        handleMessage(JSON.parse(received_msg));
     };
     ws.onclose = function()
     {
        console.log("Connection is closed...");
     };
  }
  else
  {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser! SongPool will not work :(");
  }

 function handleMessage(msg){
    if(msg.action == "playlistUpdate"){
        grabPlaylist(msg.body);
    }
    else if(msg.action == "roomClose"){
        window.location.replace("/room?id="+roomID);
    }
    else{
        console.log("not equal: "+msg.action);
    }
 }




function grabPlaylist(tracks){
    spotifyApi.getTracks(tracks, function(err,data){
        console.log(err);
        if(!err){
            console.log(data);
            setPlaylist(data);
        }
    });
}


//---------------------Socket code------------------------


//---------------------Audio box------------------------

//Audio box managment
var spotifyApi = new SpotifyWebApi();

var audio = document.getElementById("playbox");
audio.addEventListener('ended', playNext);

var albumArt = $("#albumArt");
var songName = $("#songName");
var artistName =  $("#artistName");
var albumName = $("#albumName");

var queueDiv = $("#queue");

var wait = $("#wait");


function playNext(){
    index ++;
    if(index<songQueue.length){
       startTrack(songQueue[index]);
    }

}

var songQueue;
var index = 0;

function setPlaylist(playlist){
    songQueue = playlist.tracks;
    startTrack(songQueue[0]);
    wait.remove();

}

function refreshQueue(){
    queueDiv.empty();
    for(var i = index+1; i< songQueue.length; i++){
        queueDiv.append("<div>"+ songQueue[i].name +"</div>");
    }
}

 function startTrack(track){
    console.log("starting track");
    var url = track.preview_url;
    console.log(albumName);
    albumName.text(track.album.name);
    artistName.text(track.artists[0].name);
    albumArt.attr('src', track.album.images[0].url);
    songName.text(track.name);
    refreshQueue();
    audio.src =  url+'.mp3';
    audio.play();
}

//---------------------Audio box------------------------

//Fetch a playlist
// spotifyApi.searchTracks("Sonnentanz", function(err, data) {
//     if (err) console.error(err);
//     else {
//         console.log(data);
//         setPlaylist(data);
//       }
// });









  function renderRoomUsers(){

  }