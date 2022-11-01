const express = require("express");
require("dotenv").config();
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3003;
const cors = require("cors");
const Clickhouse = require("./database/clickhouse");
const Postgres = require("./database/postgres");
const sessionsRouter = require("./routes/sessionsRoutes");
const funnelsRouter = require("./routes/funnelsRoutes");
const funnelRouter = require("./routes/funnelRoute");
const optionsRouter = require("./routes/optionsRoutes");

const app = express();

let clickhouse;
let postgres;
const setupAllConnections = async () => {
  try {
    clickhouse = new Clickhouse();
    await clickhouse.init();
    app.clickhouse = clickhouse;
    console.log("connected to clickhouse!");
  } catch (e) {
    console.error("clickhouse error:", e);
  }
  try {
    // eslint-disable-next-line no-undef
    console.log("env vars", process.env);
    postgres = new Postgres();
    await postgres.init();
    app.postgres = postgres;
    console.log("connected to postgres!");
  } catch (e) {
    console.error("Postgres Error:", e);
  }
};
setupAllConnections();

app.use(express.json());
app.use(cors());
//serve our static app if this is a production build
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
app.use("/sessions", sessionsRouter);
app.use("/funnels", funnelsRouter);
app.use("/funnel", funnelRouter);
app.use("/options", optionsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
