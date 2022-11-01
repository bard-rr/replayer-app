const express = require("express");
const funnelRouter = express.Router();

funnelRouter.get("/:id", async (req, res) => {
  let id = Number.parseInt(req.params.id, 10);
  try {
    let result = await req.app.postgres.getFunnelObj(id);
    res.status(200).json(result.funnel);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error });
  }
});

module.exports = funnelRouter;
