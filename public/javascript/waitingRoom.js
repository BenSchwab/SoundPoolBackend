var roomID = qs['id'];
console.log("room id "+roomID);

if ("WebSocket" in window)
  {
     //alert("WebSocket is supported by your Browser!");
     // Let us open a web socket
     var ws = new WebSocket("ws://localhost:8080");
     ws.onopen = function()
     {
        // Web Socket is connected, send data using send()
        ws.send(JSON.stringify({action:"registerWait", roomID: roomID}));
        ws.send(JSON.stringify({action:"getRoomUsers", roomID: roomID}));
        //alert("Message is sent...");
     };
     ws.onmessage = function (evt)
     {
        var received_msg = evt.data;
        console.log(received_msg);
        handleMessage(JSON.parse(received_msg));
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


  var otherUsers =  $("#otherUsers");


 function handleMessage(msg){
    if(msg.action == "getRoomUsers"){
        otherUsers.empty();
        msg.data.forEach(function(user){
            console.log("I think I am doing some insertion?");
            otherUsers.append('<li>'+user.userID+'</li>');
        });
    }
    else{
        console.log("not equal: "+msg.action);
    }
 }


  function renderRoomUsers(){

  }