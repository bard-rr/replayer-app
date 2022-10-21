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

  async getSessions(paramsObj) {
    const sessionQuery = makeSessionQuery(paramsObj);
    const result = await this.#getData(sessionQuery);
    return result;
  }

  async getCount(paramsObj) {
    const countQuery = makeCountQuery(paramsObj);
    const result = await this.#getData(countQuery);
    return result[0]["count()"];
  }

  async #getData(query, format = "JSONEachRow") {
    const resultSet = await this.client.query({ query, format });
    return resultSet.json();
  }
}

const DEFAULT_PER_PAGE = 5;
const DEFAULT_PAGE_NUM = 0;

const makeSessionQuery = (paramsObj) => {
  const where = filterBy(paramsObj);
  const orderBy = sortBy(paramsObj);
  const limitOffset = paginateBy(paramsObj);
  const select = "SELECT * FROM eventDb.sessionTable";
  const sessionQuery = `${select} ${where} ${orderBy} ${limitOffset}`;
  return sessionQuery;
};

const makeCountQuery = (paramsObj) => {
  return `SELECT count(*) FROM eventDb.sessionTable ${filterBy(paramsObj)}`;
};

const filterBy = (paramsObj) => {
  switch (paramsObj.tag) {
    case "length":
      const minLength = Number(paramsObj.minLength) || 0;
      const maxLength = Number(paramsObj.maxLength) || Date.now();
      return `WHERE (lengthMs >= ${minLength}) AND (lengthMs <= ${maxLength})`;
    case "date":
      const startDate = paramsObj.startDate || "1970-01-01";
      const todayString = getTodayString();
      const endDate = paramsObj.endDate || todayString;
      return `WHERE (date >= '${startDate}') AND (date <= '${endDate}')`;

    default:
      return `WHERE (date = '${getTodayString()}')`;
  }
};

const sortBy = (paramsObj) => {
  const direction = paramsObj.sortOrder === "ascending" ? "ASC" : "DESC";
  let column;
  switch (paramsObj.sortBy) {
    case "length":
      column = "lengthMs";
      break;
    case "date":
      column = "date";
      break;
    default:
      column = "date";
  }
  return `ORDER BY ${column} ${direction}`;
};

const paginateBy = (paramsObj) => {
  const limit = Number(paramsObj.perPage) || DEFAULT_PER_PAGE;
  const offset = limit * (Number(paramsObj.pageNum) || DEFAULT_PAGE_NUM);

  return `LIMIT ${limit} OFFSET ${offset}`;
};

const getTodayString = () => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();
  return `${year}-${month}-${day}`;
};

module.exports = Clickhouse;


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