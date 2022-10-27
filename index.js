const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3003;
const cors = require("cors");
const Clickhouse = require("./database/clickhouse");
const Postgres = require("./database/postgres");
const { handleFunnel, handleUpdateFunnel } = require("./database/funnel");

const app = express();

let clickhouse;
let postgres;
const setupAllConnections = async () => {
  try {
    clickhouse = new Clickhouse();
    await clickhouse.init();
    console.log("connected to clickhouse!");
  } catch (e) {
    console.log("clickhouse error:", e);
  }
  try {
    postgres = new Postgres();
    await postgres.init();
    console.log("connected to Postgres!!");
  } catch (e) {
    console.log("Postgres Error:", e);
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

app.get("/funnels", async (req, res) => {
  let funnels = await postgres.getFunnelMetadata(req.query);
  let count = await postgres.getFunnelCount(req.query);
  res.status(200).json({ funnels, count });
});

app.post("/funnels", async (req, res) => {
  console.log(req.body);
  try {
    await postgres.insertFunnel(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/funnels/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    console.log(id);
    let result = await handleFunnel(id, postgres, clickhouse, req.query);
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ error: e });
  }
});

app.get("/funnel/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    result = await postgres.getFunnelObj(id);
    res.status(200).json(result.funnel);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error });
  }
});

app.put("/funnels/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    let result = await handleUpdateFunnel(id, postgres, req.body);
    res.status(204).send();
  } catch (error) {
    console.log("error in put: ", error);
    res.status(500).json({ error: error, location: "In Edit Funnel" });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
