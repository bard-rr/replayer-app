const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3003;
const cors = require("cors");
const Clickhouse = require("./database/clickhouse");
// import { Clickhouse } from "./clickhouseService.js";

const app = express();

let clickhouse;
const setupAllConnections = async () => {
  try {
    clickhouse = new Clickhouse();
    await clickhouse.init();
    console.log("connected to clickhouse!");
  } catch (e) {
    console.log("clickhouse error:", e);
  }
};
setupAllConnections();

app.use(express.json());
app.use(cors());

app.get("/sessions", async (req, res) => {
  let result = await clickhouse.getSessions(req.query);
  let count = await clickhouse.getCount(req.query);
  const sessions = result.map((obj) => {
    return {
      sessionId: obj.sessionId,
      length: obj.lengthMs,
      date: obj.date,
      originHost: obj.originHost,
    };
  });
  res.status(200).json({ count, sessions });
});

app.get("/sessions/:id", async (req, res) => {
  const id = req.params.id;
  result = await clickhouse.getEventsFromSession(id);
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
