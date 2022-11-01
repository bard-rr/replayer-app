const express = require("express");
const cors = require("cors");
const { events1, events2 } = require("./events");
const sessions = require("./sessions");

const app = express();
app.use(cors());
const PORT = 3003;

app.get("/sessions", (req, res) => {
  res.json(sessions);
});

app.get("/sessions/:id", (req, res) => {
  const events = Math.random() > 0.5 ? events1 : events2;
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`mock API running on port ${PORT}`);
});
