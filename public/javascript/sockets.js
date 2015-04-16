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



});

