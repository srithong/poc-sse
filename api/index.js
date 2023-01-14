const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/sse", (req, res) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  };
  res.writeHead(200, headers);
  const interval = setInterval(() => {
    const eventName = `event: server_time\n`;
    const data = `data: ${JSON.stringify({
      time: new Date().toUTCString(),
    })}\n\n`;
    
    res.write(eventName);
    res.write(data);

  }, 1000);

  req.on("close", () => {
    console.log("lost connection");
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log(`Facts Events service listening at http://localhost:3000`);
});
