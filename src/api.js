// const app = require('express');
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const PORT = 8811

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   console.log(`${socket} user connected`);
// });

// http.listen(PORT, () => {
//   console.log(`listening on *:${PORT}`);
// });



import "./App.css";
// import { connect } from "./api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [arr, setArr] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();

  useEffect(() => {
    let socket = io("http://e48d60034d49.ngrok.io/");
    socket.on("connection", () => {
      console.log("Connection");
      socket.emit("room", "room-1-2");
    });

    socket.on("message", (msg) => {
      console.log("Message", msg);
      setArr([...arr, msg]);
      // console.log("arr", arr);
    });

    socket.on("room-joined", () => {
      console.log("room joined");
    });

    setSocket(socket);
  }, [arr]);
  const connect = () => {
    socket.emit("message", message);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={message} onChange={handleChange} /> &nbsp;
      <button type="button" onClick={connect}>
        Send Message!
      </button>
      <div>
        {arr.map((item, index) => {
          console.log("item", item);
          return <div key={index}>{item.message}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
