const express = require("express");
const sessionsRouter = express.Router();

sessionsRouter.get("/", async (req, res) => {
  try {
    let result = await req.app.clickhouse.getSessions(req.query);
    let count = await req.app.clickhouse.getCount(req.query);
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
    res.status(500).json(error);
    console.error(error);
  }
});

sessionsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let result = await req.app.clickhouse.getEventsFromSession(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

module.exports = sessionsRouter;
