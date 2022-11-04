require("dotenv").config();
const clickhouse = require("@clickhouse/client");
const { DEFAULT_QUERY_OBJECT } = require("./const");
const createClient = clickhouse.createClient;
class Clickhouse {
  constructor() {
    this.client = {};
    this.query_params = {};
    this.paramCount = 0;
    this.DEFAULT_PER_PAGE = 5;
    this.DEFAULT_PAGE_NUM = 0;
  }

  async init() {
    //host should be the clickhouse container for PRD build
    let host = `http://${process.env.CHHOST}:8123`;
    // eslint-disable-next-line no-undef
    // if (process.env.NODE_ENV === "production") {
    //   host = "http://clickhouse:8123";
    // } else {
    //   host = "http://localhost:8123";
    // }

    //create a client to interface with clickhouse
    this.client = createClient({
      username: "default",
      password: "",
      host,
    });
  }

  async getEventsFromSession(sessionId) {
    let query = `SELECT event from eventDb.eventTable where sessionId=
                ${this.#getParam(sessionId, "String")}
                `;
    let dataSet = await this.#runQuery(query);
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
    if (Object.keys(paramsObj).length === 0) {
      paramsObj = DEFAULT_QUERY_OBJECT;
    }
    const sessionQuery = this.#makeSessionQuery(paramsObj);
    const result = await this.#runQuery(sessionQuery);
    return result;
  }

  async getCount(paramsObj) {
    if (Object.keys(paramsObj).length === 0) {
      paramsObj = DEFAULT_QUERY_OBJECT;
    }
    const countQuery = this.#makeCountQuery(paramsObj);
    const result = await this.#runQuery(countQuery);
    return result[0]["count()"];
  }

  async getFunnelOptions(eventType) {
    let query = this.#getFunnelOptionsQuery(eventType);
    let result = await this.#runQuery(query);
    return result.map((resultObj) => resultObj.textContent);
  }

  async getFilterOptions(filterType) {
    let query = this.#getFilterOptionsQuery(filterType);
    let result = await this.#runQuery(query);
    return result.map((resultObj) => resultObj.textContent);
  }

  #getParam(data, dataType) {
    let paramName = `parameter${this.paramCount}`;
    this.paramCount++;
    this.query_params[paramName] = data;
    return `{${paramName}: ${dataType}}`;
  }

  #clearQueryParams() {
    this.query_params = {};
    this.paramCount = 0;
  }

  async #runQuery(query, format = "JSONEachRow") {
    try {
      let query_params = this.query_params;
      // console.log("query", query, "\nqueryparams", query_params);
      const resultSet = await this.client.query({
        query,
        format,
        query_params,
      });
      this.#clearQueryParams();
      return resultSet.json();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSessionIdsFromFilters(filterArr, startDate, endDate) {
    const newFilterArr =
      Object.keys(filterArr[0]).length === 0 ? [] : [...filterArr];
    newFilterArr.push({
      filterType: "date",
      startDate,
      endDate,
    });
    const select = "SELECT sessionId FROM eventDb.sessionTable";
    const whereClause = this.#getWhereClauseFromFilters(newFilterArr);
    const query = `${select} WHERE ${whereClause}`;
    let result = await this.#runQuery(query);
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
    // console.log(queryObj, filteredSessionArr);
    return await this.#runQuery(query);
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
    return await this.#runQuery(query);
  };

  #getEventWhereClause = (queryObj) => {
    let query;
    switch (queryObj.eventType) {
      case "click":
        query = `(eventType = 'click') AND (textContent = ${this.#getParam(
          queryObj.textContent,
          "String"
        )})`;
        return query;
      case "custom":
        query = `(eventType = 'custom') AND (customEventType = ${this.#getParam(
          queryObj.customEventType,
          "String"
        )})`;
        return query;
      default:
        query = `(eventType = 'click') AND (textContent = ${this.#getParam(
          "", // queryObj.textContent,
          "String"
        )})`;
        return query;
    }
  };

  #getFunnelOptionsQuery = (eventType) => {
    switch (eventType) {
      case "click":
        return `SELECT DISTINCT(textContent) 
                FROM eventDb.conversionEvents 
                WHERE eventType=${this.#getParam(eventType, "String")}`;
      case "custom":
        return `SELECT DISTINCT(customEventType) as textContent
                FROM eventDb.conversionEvents
                WHERE eventType=${this.#getParam(eventType, "String")}`;
      default:
        throw new Error("Invalid funnel option");
    }
  };

  #getFunnelWhereClause = (prevResultArr) => {
    let funnelWhereClause = "AND (";
    let prevResultClauses = [];
    for (let i = 0; i < prevResultArr.length; i++) {
      let onePrevResult = prevResultArr[i];
      prevResultClauses.push(
        `((sessionId = ${this.#getParam(
          onePrevResult.sessionId,
          "String"
        )}) AND (timestamp > ${this.#getParam(onePrevResult.time, "UInt64")}))`
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
      clausePieces.push(`(sessionId = ${this.#getParam(sessionId, "String")})`);
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
        case "length": {
          const minLength = Number(paramsObj.minLength) || 0;
          const maxLength = Number(paramsObj.maxLength) || Date.now();
          result.push(
            `(lengthMs >= ${this.#getParam(minLength, "UInt64")}) AND 
             (lengthMs <= ${this.#getParam(maxLength, "UInt64")})`
          );
          break;
        }
        case "date": {
          const startDate = paramsObj.startDate || "1970-01-01";
          const todayString = this.getTodayString();
          const endDate = paramsObj.endDate || todayString;
          result.push(
            `(date >= ${this.#getParam(startDate, "Date")}) AND 
             (date <= ${this.#getParam(endDate, "Date")})`
          );
          break;
        }
        case "appName": {
          const appName = paramsObj.textContent;
          result.push(`(appName = ${this.#getParam(appName, "String")})`);
          break;
        }
        case "Has Errors?": {
          const comparisonOperator = paramsObj.yesOrNo === "yes" ? ">" : "=";
          result.push(`errorCount ${comparisonOperator} 0`);
          break;
        }
        default:
          result.push(`(date = '${this.getTodayString()}')`);
      }
    });
    return result.join(` AND `);
  };

  #getFilterOptionsQuery = (filterType) => {
    switch (filterType) {
      case "appName":
        return `SELECT DISTINCT(appName) as textContent
                FROM eventDb.sessionTable`;
      default:
        throw new Error("Invalid filter option");
    }
  };

  #sortBy = (paramsObj) => {
    //tenary and switch ensure that what makes it into query is sanitized
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
      case "appName":
        column = "appName";
        break;
      case "errorCount":
        column = "errorCount";
        break;
      default:
        column = "date";
    }
    return `ORDER BY ${column} ${direction}, sessionId ASC`;
  };

  #paginateBy = (paramsObj) => {
    //NaN is falsey, so the || operator ensures we always have a number here
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
