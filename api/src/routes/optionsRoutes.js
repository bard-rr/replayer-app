const express = require("express");
const optionsRouter = express.Router();

optionsRouter.get("/funnel", async (req, res) => {
  let { eventType } = req.query;
  try {
    let data = await req.app.clickhouse.getFunnelOptions(eventType);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

optionsRouter.get("/filter", async (req, res) => {
  let { filterType } = req.query;
  try {
    let data = await req.app.clickhouse.getFilterOptions(filterType);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = optionsRouter;
