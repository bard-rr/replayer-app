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

  async #getDataSanitized(query, query_params, format = "JSONEachRow") {
    const resultSet = await this.client.query({ query, format, query_params });
    return resultSet.json();
  }

  async #getData(query, format = "JSONEachRow") {
    const resultSet = await this.client.query({ query, format });
    return resultSet.json();
  }

  async getSessionIdsFromFilters(filterArr, startDate, endDate) {
    const newFilterArr = [...filterArr];
    newFilterArr.push({
      filterType: "date",
      startDate,
      endDate,
    });
    const select = "SELECT sessionId FROM eventDb.sessionTable";
    const whereClause = getWhereClauseFromFilters(newFilterArr);
    const query = `${select} WHERE ${whereClause}`;
    let result = await this.#getData(query);
    return result.map((resultObj) => resultObj.sessionId);
  }

  //make one db query for each eventSequence object in the array
  //the query returns sessionIds and timestamps of when the event's we're looking
  //for happened in the session.

  /*
  first query
  SELECT
      sessionId,
      min(timestamp)
  FROM eventDb.conversionEvents
  WHERE (eventType = 'click') AND (textContent = 'Delete Elements')
  GROUP BY sessionId


subsequent queries

SELECT
    sessionId,
    min(timestamp)
FROM eventDb.conversionEvents
WHERE (eventType = 'click') AND (textContent = 'Delete Elements') AND (
  ((sessionId = 'undefined') AND (timestamp > 1666710420216)) OR
  ((sessionId = '2969cdf9-627d-457f-a369-c29b520070ae') AND (timestamp > 1666710566122))
  )
GROUP BY sessionId
  */
  async getEventSequenceResults(eventSequenceArr, filteredSessionArr) {
    let allResults = [];
    let firstResult = await this.#getFirstFunnelResults(
      eventSequenceArr[0],
      filteredSessionArr
    );
    allResults.push(firstResult);
    let prevResult = firstResult;
    for (let i = 1; i < eventSequenceArr.length; i++) {
      let eventQuery = eventSequenceArr[i];
      let resultArr = await this.#getSubsequentFunnelResults(
        prevResult,
        eventQuery
      );
      allResults.push(resultArr);
      prevResult = resultArr;
    }
    return allResults.map((resultArr) => {
      if (resultArr.length > 0) {
        return resultArr.map((resultObj) => resultObj.sessionId);
      } else {
        return resultArr;
      }
    });
  }

  //queries return an array of objects. object properties are the columns
  //returned by the query
  #getFirstFunnelResults = async (queryObj, filteredSessionArr) => {
    //create the query
    let eventWhereClause = getEventWhereClause(queryObj);
    let sessionWhereClause = getSessionWhereClause(filteredSessionArr);
    let query = `SELECT sessionId, MIN(timestamp) AS time FROM
                 eventDb.conversionEvents WHERE ${eventWhereClause} ${sessionWhereClause}
                 GROUP BY sessionId`;
    return await this.#getData(query);
  };
  #getSubsequentFunnelResults = async (prevResultArr, queryObj) => {
    if (prevResultArr.length === 0) {
      return [];
    }
    let eventWhereClause = getEventWhereClause(queryObj);
    let funnelWhereClause = getFunnelWhereClause(prevResultArr);
    let query = `SELECT sessionId, MIN(timestamp) AS time FROM
    eventDb.conversionEvents WHERE ${eventWhereClause} ${funnelWhereClause}
    GROUP BY sessionId`;
    return await this.#getData(query);
  };
}

const DEFAULT_PER_PAGE = 5;
const DEFAULT_PAGE_NUM = 0;

const getEventWhereClause = (queryObj) => {
  switch (queryObj.eventType) {
    case "click":
      return `(eventType = 'click') AND (textContent = '${queryObj.textContent}')`;
    default:
      return `(eventType = 'click') AND (textContent = '${queryObj.textContent}')`;
  }
};
const getFunnelWhereClause = (prevResultArr) => {
  let funnelWhereClause = "AND (";
  let prevResultClauses = [];
  for (let i = 0; i < prevResultArr.length; i++) {
    let onePrevResult = prevResultArr[i];
    prevResultClauses.push(
      `((sessionId = '${onePrevResult.sessionId}') AND (timestamp > ${onePrevResult.time}))`
    );
  }
  funnelWhereClause += prevResultClauses.join(" OR ");
  funnelWhereClause += ")";
  return funnelWhereClause;
};

const getSessionWhereClause = (filteredSessionArr) => {
  let sessionWhereClause = "AND (";
  let clausePieces = [];
  for (let i = 0; i < filteredSessionArr.length; i++) {
    let sessionId = filteredSessionArr[i];
    clausePieces.push(`(sessionId = '${sessionId}')`);
  }
  sessionWhereClause += clausePieces.join(" OR ");
  sessionWhereClause += ")";
  return sessionWhereClause;
};

const makeSessionQuery = (paramsObj) => {
  const whereClause = filterBy(paramsObj);
  const orderBy = sortBy(paramsObj);
  const limitOffset = paginateBy(paramsObj);
  const select = "SELECT * FROM eventDb.sessionTable";
  const sessionQuery = `${select} WHERE ${whereClause} ${orderBy} ${limitOffset}`;
  return sessionQuery;
};

const makeCountQuery = (paramsObj) => {
  return `SELECT count(*) FROM eventDb.sessionTable WHERE ${filterBy(
    paramsObj
  )}`;
};

const getWhereClauseFromFilters = (filterArr) => {
  let clausePieces = [];
  for (let i = 0; i < filterArr.length; i++) {
    let clausePiece = `(${filterBy(filterArr[i])})`;
    clausePieces.push(clausePiece);
  }
  return clausePieces.join(" AND "); //only support AND filtering right now
};

const filterBy = (paramsObj) => {
  let result = [];
  const filtersTags = Object.keys(paramsObj).filter(
    (key) => key.substring(0, 6) === "filter"
  );
  const filters = filtersTags.map((filter) => {
    return paramsObj[filter];
  });
  filters.forEach((filter) => {
    switch (filter) {
      case "length":
        const minLength = Number(paramsObj.minLength) || 0;
        const maxLength = Number(paramsObj.maxLength) || Date.now();
        result.push(
          `(lengthMs >= ${minLength}) AND (lengthMs <= ${maxLength})`
        );
        break;
      case "date":
        const startDate = paramsObj.startDate || "1970-01-01";
        const todayString = getTodayString();
        const endDate = paramsObj.endDate || todayString;
        result.push(`(date >= '${startDate}') AND (date <= '${endDate}')`);
        break;
      case "originHost":
        const originHost = paramsObj.textContent;
        result.push(`(originHost = '${originHost}')`);
        break;
      case "Has Errors?":
        const comparisonOperator = (paramsObj.yesOrNo === 'yes' ? '>' : '=');
        result.push(`errorCount ${comparisonOperator} 0`);
        break;
      default:
        result.push(`(date = '${getTodayString()}')`);
    }
  });
  return result.join(` AND `);
};

const sortBy = (paramsObj) => {
  const direction = paramsObj.sortOrder === "ascending" ? "ASC" : "DESC";
  let column;
  switch (paramsObj.sortBy) {
    case "sessionId":
      column = "sessionId";
      break;
    case "length":
      column = "lengthMs";
      break;
    case "date":
      column = "date";
      break;
    case "originHost":
      column = "originHost";
      break;
    case "errorCount":
      column = "errorCount";
      break;
    default:
      column = "date";
  }
  return `ORDER BY ${column} ${direction}, sessionId ASC`;
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
