let currentWebSocket = null;
let username = "john";
let roomname = "1";

let hostname = window.location.host;
if (hostname == "") {
  // Probably testing the HTML locally.
  hostname = "edge-chat-demo.cloudflareworkers.com";
}

let spinFunction;

function join()
{
  const wss = document.location.protocol === "http:" ? "ws://" : "wss://";
  let ws = new WebSocket(wss + hostname + "/api/room/" + roomname + "/websocket");
  let rejoined = false;
  let startTime = Date.now();

  ws.addEventListener("open", event => {
    currentWebSocket = ws;

    // Send user info message.
    ws.send(JSON.stringify({name: username}));
  });

  ws.addEventListener("message", event => {
    console.log(event.data);
    if (JSON.parse(event.data).message == "spin") {
      if(spinFunction)
        spinFunction(0.0, 0.05);
    }
  });
}

join();

