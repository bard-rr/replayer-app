const clickhouse = require("@clickhouse/client");
const { escapeString } = require("./utils");
const createClient = clickhouse.createClient;
class Clickhouse {
  constructor() {
    this.client = {};
    this.query_params = {};
    this.DEFAULT_PER_PAGE = 5;
    this.DEFAULT_PAGE_NUM = 0;
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
    let query_params = this.query_params;
    console.log("query", query, "query_params", query_params);
    const resultSet = await this.client.query({ query, format, query_params });
    this.query_params = {};
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
    const whereClause = this.#getWhereClauseFromFilters(newFilterArr);
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
    let eventWhereClause = this.#getEventWhereClause(queryObj);
    let sessionWhereClause = this.#getSessionWhereClause(filteredSessionArr);
    let query = `SELECT sessionId, MIN(timestamp) AS time FROM
                 eventDb.conversionEvents WHERE ${eventWhereClause} ${sessionWhereClause}
                 GROUP BY sessionId`;
    return await this.#getData(query);
  };
  #getSubsequentFunnelResults = async (prevResultArr, queryObj) => {
    if (prevResultArr.length === 0) {
      return [];
    }
    let eventWhereClause = this.#getEventWhereClause(queryObj);
    let funnelWhereClause = this.#getFunnelWhereClause(prevResultArr);
    let query = `SELECT sessionId, MIN(timestamp) AS time FROM
    eventDb.conversionEvents WHERE ${eventWhereClause} ${funnelWhereClause}
    GROUP BY sessionId`;
    return await this.#getData(query);
  };

  #getEventWhereClause = (queryObj) => {
    switch (queryObj.eventType) {
      case "click":
        return `(eventType = 'click') AND (textContent = '${escapeString(
          queryObj.textContent
        )}')`;
      default:
        return `(eventType = 'click') AND (textContent = '${escapeString(
          queryObj.textContent
        )}')`;
    }
  };
  #getFunnelWhereClause = (prevResultArr) => {
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

  #getSessionWhereClause = (filteredSessionArr) => {
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

  #makeSessionQuery = (paramsObj) => {
    const whereClause = this.#filterBy(paramsObj);
    const orderBy = this.#sortBy(paramsObj);
    const limitOffset = this.#paginateBy(paramsObj);
    const select = "SELECT * FROM eventDb.sessionTable";
    const sessionQuery = `${select} WHERE ${whereClause} ${orderBy} ${limitOffset}`;
    return sessionQuery;
  };

  #makeCountQuery = (paramsObj) => {
    return `SELECT count(*) FROM eventDb.sessionTable WHERE ${this.#filterBy(
      paramsObj
    )}`;
  };

  #getWhereClauseFromFilters = (filterArr) => {
    let clausePieces = [];
    for (let i = 0; i < filterArr.length; i++) {
      let clausePiece = `(${this.#filterBy(filterArr[i])})`;
      clausePieces.push(clausePiece);
    }
    return clausePieces.join(" AND "); //only support AND filtering right now
  };

  #filterBy = (paramsObj) => {
    let result = [];
    //parse filters from the query params
    const filtersTags = Object.keys(paramsObj).filter(
      (key) => key.substring(0, 6) === "filter"
    );
    const filters = filtersTags.map((filter) => {
      return paramsObj[filter];
    });

    //use the filters to construct the where clause
    filters.forEach((filter) => {
      switch (filter) {
        case "length":
          const minLength = Number(paramsObj.minLength) || 0;
          const maxLength = Number(paramsObj.maxLength) || Date.now();
          result.push(
            `(lengthMs >= {minLength: UInt64}) AND (lengthMs <= {maxLength: UInt64})`
          );
          this.query_params["maxLength"] = maxLength;
          this.query_params["minLength"] = minLength;
          break;
        case "date":
          const startDate = paramsObj.startDate || "1970-01-01";
          const todayString = this.getTodayString();
          const endDate = paramsObj.endDate || todayString;
          result.push(
            `(date >= {startDate: Date}) AND (date <= {endDate: Date})`
          );
          this.query_params["startDate"] = startDate;
          this.query_params["endDate"] = endDate;
          break;
        case "originHost":
          const originHost = paramsObj.textContent;
          result.push(`(originHost = {originHost: String})`);
          this.query_params["originHost"] = originHost;
          break;
        default:
          result.push(`(date = '${this.getTodayString()}')`);
      }
    });
    return result.join(` AND `);
  };

  #sortBy = (paramsObj) => {
    const direction = paramsObj.sortOrder === "ascending" ? "ASC" : "DESC";
    let column;
    switch (paramsObj.sortBy) {
      case "length":
        column = "lengthMs";
        break;
      case "date":
        column = "date";
        break;
      case "originHost":
        column = "originHost";
        break;
      default:
        column = "date";
    }
    return `ORDER BY ${column} ${direction}, sessionId ASC`;
  };

  #paginateBy = (paramsObj) => {
    const limit = Number(paramsObj.perPage) || this.DEFAULT_PER_PAGE;
    const offset = limit * (Number(paramsObj.pageNum) || this.DEFAULT_PAGE_NUM);

    return `LIMIT ${limit} OFFSET ${offset}`;
  };

  getTodayString = () => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth() + 1;
    const day = today.getUTCDate();
    return `${year}-${month}-${day}`;
  };
}

module.exports = Clickhouse;
