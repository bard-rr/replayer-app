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
  // const filterObj = filter(req.params)
  // const pageNum = req.query.page
  // const perPage = req.query.perPage
  // const sortOrder = req.query.sort-order
  // const sortBy = req.query.sort-by
  // const filterTag = req.query.filter-tag
  // const startDate = req.query.filter-startDate
  // const endDate = req.query.filter-endDate
  console.log(req.query);

  result = await clickhouse.getSessions(req.query);
  result = result.map((obj) => {
    return {
      sessionId: obj.sessionId,
      length: obj.lengthMs,
      date: obj.date,
    };
  });
  res.status(200).json(result);
});

app.get("/sessions/:id", async (req, res) => {
  const id = req.params.id;
  result = await clickhouse.getEventsFromSession(id);
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
