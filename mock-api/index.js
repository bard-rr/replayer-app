const express = require("express");
const cors = require("cors");
const events = require("./events");
const sessions = require("./sessions");

const app = express();
app.use(cors());
const PORT = 3003;

app.get("/sessions", (req, res) => {
  res.json(sessions);
});

app.get("/replay/:id", (req, res) => {
  res.json(events);
});

app.listen(PORT, () => {
  console.log(`mock API running on port ${PORT}`);
});
