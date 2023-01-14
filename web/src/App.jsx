import "./App.css";
import React, { useState, useEffect } from "react";
function App() {
  const [serverTime, setServerTime] = useState(new Date().toTimeString());

  useEffect(() => {
    const events = new EventSource("http://localhost/api/sse");
    return events.addEventListener("server_time", (message) => {
      setServerTime(JSON.parse(message.data).time);
    });
  }, []);

  return (
    <div className="App">
      <h1>Server Time</h1>
      <h2>{serverTime}</h2>
    </div>
  );
}

export default App;
