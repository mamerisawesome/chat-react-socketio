import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8080/1iecyhj5q1ae2";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    if (socket) {
      return;
    }

    const initializedSocket = socketIOClient(ENDPOINT);
    initializedSocket.on('chat-message', data => {
      console.log(data);
    });

    setSocket(initializedSocket);
  }, [socket]);

  const sendChatMessage = e => {
    socket.emit('chat-message', message);
    setMessages([...messages, message]);
    setMessage("");

    e.preventDefault();
    return false;
  };

  return (
    <div className="App container">
      <form onSubmit={sendChatMessage}>
        <ul>
          {messages.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
        <div className="row">
          <div className="col s10">
            <input
              type="text"
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <div className="col s2">
            <button
              className="btn btn-flat waves-effect waves-gray cyan-text"
              type="submit"
              onClick={sendChatMessage}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
