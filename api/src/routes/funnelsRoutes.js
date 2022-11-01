const express = require("express");
const { handleUpdateFunnel, handleFunnel } = require("../database/funnel");
const funnelsRouter = express.Router();

funnelsRouter.get("/", async (req, res) => {
  try {
    let funnels = await req.app.postgres.getFunnelMetadata(req.query);
    let count = await req.app.postgres.getFunnelCount(req.query);
    res.status(200).json({ funnels, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

funnelsRouter.post("/", async (req, res) => {
  try {
    await req.app.postgres.insertFunnel(req.body);
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

funnelsRouter.get("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  console.log(req.query);
  try {
    let result = await handleFunnel(
      id,
      req.app.postgres,
      req.app.clickhouse,
      req.query
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

funnelsRouter.put("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    await handleUpdateFunnel(id, req.app.postgres, req.body);
    res.status(204).send();
  } catch (error) {
    console.error("error in put: ", error);
    res.status(500).json({ error: error, location: "In Edit Funnel" });
  }
});

funnelsRouter.delete("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    await req.app.postgres.deleteFunnel(id);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = funnelsRouter;
