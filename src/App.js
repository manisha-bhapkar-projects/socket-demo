import "./App.css";
// import { connect } from "./api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [arr, setArr] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState();

  useEffect(() => {
    let socket = io("http://3fb0d50f089f.ngrok.io");
    socket.on("connection", () => {
      console.log("Connection");
      socket.emit("room", "room-1-2");
    });

    socket.on("message", (msg) => {
      console.log("Message", msg);
      setArr((arr) => [...arr, msg]);
    });

    socket.on("room-joined", () => {
      console.log("room joined");
    });

    setSocket(socket);
  }, []);
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
