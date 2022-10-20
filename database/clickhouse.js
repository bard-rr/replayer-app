// import { createClient } from "@clickhouse/client";
const clickhouse = require("@clickhouse/client");
const createClient = clickhouse.createClient;
class Clickhouse {
  constructor() {
    this.client = {};
  }

  async init() {
    //create a client to interface with clickhouse
    this.client = createClient({
      username: "default",
      password: "",
    });
    //creates a clickhouse db
    // await this.client.exec({
    //   query: `CREATE DATABASE IF NOT EXISTS eventDb;`,
    // });
    // // //create a queryable table. note that Primary Keys don't need to be unique among rows
    // await this.client.exec({
    //   query: `
    //     CREATE TABLE IF NOT EXISTS eventDb.eventTable
    //     (sessionId String, event String)
    //     ENGINE = MergeTree()
    //     PRIMARY KEY (sessionId)
    //   `,
    // });

    // //this creates a clickhouse table that listens for messages sent to the provided
    // //rabbitMQ exchange. We use a materialize view to take messages from this table
    // //and place them into our queryable table without 'reading' them from the queue.
    // await this.client.exec({
    //   query: `
    //     CREATE TABLE IF NOT EXISTS eventDb.eventQueue
    //     (sessionId String, event String)
    //     ENGINE = RabbitMQ SETTINGS
    //       rabbitmq_host_port = 'localhost:5672',
    //       rabbitmq_exchange_name = 'test-exchange',
    //       rabbitmq_format = 'JSONEachRow'
    //   `,
    // });

    // //create a materialized view to populate the queryable table
    // await this.client.exec({
    //   query: `
    //     CREATE MATERIALIZED VIEW IF NOT EXISTS eventDb.consumer TO eventDb.eventTable
    //     AS SELECT * FROM eventDb.eventQueue
    //    `,
    // });

    //create a table to store session information
    // await this.client.exec({
    //   query: `
    //     CREATE TABLE IF NOT EXISTS eventDb.sessionTable
    //     (
    //       sessionId String,
    //       startTime DateTime64(3, 'Etc/UTC'),
    //       endTime DateTime64(3, 'Etc/UTC'),
    //       length Number,
    //       date Date,
    //       complete Bool
    //     )
    //     ENGINE = MergeTree()
    //     PRIMARY KEY (sessionId)
    //   `,
    // });
  }

  async getEventsFromSession(sessionId) {
    let query = `SELECT event from eventDb.eventTable where sessionId='${sessionId}'`;
    let resultSet = await this.client.query({
      query,
      format: "JSONEachRow",
    });
    let dataSet = await resultSet.json();
    return this.processData(dataSet);
  }

  //data is an array of objects with a sessionId and event property.
  //both contain strings. we need to parse the json string in the event property
  //into a json object
  processData(dataSet) {
    return dataSet.map((row) => {
      return JSON.parse(row.event);
    });
  }

  //TODO: the query works in the clickhouse client. need to make sure it works in the wild.
  async getSessions(paramsObj) {
    const whereStatement = filter(paramsObj);
    let query = `SELECT * FROM eventDb.sessionTable ${whereStatement}`;
    let resultSet = await this.client.query({
      query,
      format: "JSONEachRow",
    });
    return await resultSet.json();
  }
}

const filter = (paramsObj) => {
  switch (paramsObj.filterTag) {
    case "length":
      const minLength = Number(paramsObj.minLength) || 0;
      const maxLength = Number(paramsObj.maxLength) || Date.now();
      return `WHERE (lengthMs >= ${minLength}) AND (lengthMs <= ${maxLength})`;
    default:
      break;
  }
};

module.exports = Clickhouse;
