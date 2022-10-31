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
    console.error("clickhouse error:", e);
  }
  try {
    postgres = new Postgres();
    await postgres.init();
    console.log("connected to postgres!");
  } catch (e) {
    console.error("Postgres Error:", e);
  }
};
setupAllConnections();

app.use(express.json());
app.use(cors());

app.get("/sessions", async (req, res) => {
  try {
    let result = await clickhouse.getSessions(req.query);
    let count = await clickhouse.getCount(req.query);
    const sessions = result.map((obj) => {
      return {
        sessionId: obj.sessionId,
        length: obj.lengthMs,
        date: obj.date,
        originHost: obj.originHost,
        errorCount: obj.errorCount,
      };
    });
    res.status(200).json({ count, sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.get("/sessions/:id", async (req, res) => {
  const id = req.params.id;
  try {
    result = await clickhouse.getEventsFromSession(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.get("/funnels", async (req, res) => {
  try {
    let funnels = await postgres.getFunnelMetadata(req.query);
    let count = await postgres.getFunnelCount(req.query);
    res.status(200).json({ funnels, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.post("/funnels", async (req, res) => {
  try {
    await postgres.insertFunnel(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.get("/funnels/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    let result = await handleFunnel(id, postgres, clickhouse, req.query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.get("/funnel/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    result = await postgres.getFunnelObj(id);
    res.status(200).json(result.funnel);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error });
  }
});

app.put("/funnels/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    await handleUpdateFunnel(id, postgres, req.body);
    res.status(204).send();
  } catch (error) {
    console.error("error in put: ", error);
    res.status(500).json({ error: error, location: "In Edit Funnel" });
  }
});

app.delete("/funnels/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    await postgres.deleteFunnel(id);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.get("/funnelOptions", async (req, res) => {
  let { eventType } = req.query;
  try {
    let data = await clickhouse.getFunnelOptions(eventType);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/filterOptions", async (req, res) => {
  let { filterType } = req.query;
  try {
    let data = await clickhouse.getFilterOptions(filterType);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
