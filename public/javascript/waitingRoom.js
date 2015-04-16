var roomID = qs['id'];
console.log("room id "+roomID);

if ("WebSocket" in window)
  {
     var ws = new WebSocket("ws://localhost:8080");
     ws.onopen = function()
     {
        ws.send(JSON.stringify({action:"registerWait", roomID: roomID}));
        ws.send(JSON.stringify({action:"getRoomUsers", roomID: roomID}));
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


var otherUsers =  $("#otherUsers");
 function handleMessage(msg){
    if(msg.action == "getRoomUsers"){
        otherUsers.empty();
        msg.data.forEach(function(user){
            console.log("I think I am doing some insertion?");
            otherUsers.append('<li>'+user.name+'</li>');
        });
    }
    else if(msg.action == "roomClose"){
        window.location.replace("/room?id="+roomID);
    }
    else{
        console.log("not equal: "+msg.action);
    }
 }


  function renderRoomUsers(){

  }