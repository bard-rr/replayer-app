const { Client } = require("pg");
// const { Client } = pkg;
const dotenv = require("dotenv");
dotenv.config();

/*
pg Client expects an env file with the following fields
  PGUSER
  PGPASSWORD
  PGHOST
  PGDATABASE
  PGPORT
*/

class Postgres {
  #client;
  constructor() {
    this.defaultPageNum = 0;
    this.defaultPerPage = 5;
  }
  async init() {
    this.#client = new Client();
    await this.#client.connect();
  }

  async getFunnelMetadata(paramsObj) {
    const funnelQuery = this.#makeFunnelQuery(paramsObj);
    let result = await this.#executeQuery(funnelQuery);
    return result.rows.map((fullFunnel) => {
      let createdDateStr = this.#getDateStr(
        Number.parseInt(fullFunnel.created_at_ms, 10)
      );
      let lastModifiedDateStr = this.#getDateStr(
        Number.parseInt(fullFunnel.last_modified_at_ms, 10)
      );
      return {
        id: fullFunnel.id,
        name: fullFunnel.name,
        created: createdDateStr,
        lastModified: lastModifiedDateStr,
      };
    });
  }

  #makeFunnelQuery(paramsObj) {
    const orderBy = this.#sortBy(paramsObj);
    const limitOffset = this.#paginateBy(paramsObj);
    const select = "SELECT * FROM funnels";
    return `${select} ${orderBy} ${limitOffset}`;
  }

  #paginateBy = (paramsObj) => {
    const limit = Number(paramsObj.perPage) || this.defaultPerPage;
    const offset = limit * (Number(paramsObj.pageNum) || this.defaultPageNum);

    return `LIMIT ${limit} OFFSET ${offset}`;
  };

  #sortBy = (paramsObj) => {
    const direction = paramsObj.sortOrder === "ascending" ? "ASC" : "DESC";
    let column;
    switch (paramsObj.sortBy) {
      case "name":
        column = "name";
        break;
      case "created":
        column = "created_at_ms";
        break;
      case "lastModified":
        column = "last_modified_at_ms";
        break;
      default:
        column = "name";
    }
    return `ORDER BY ${column} ${direction}`;
  };

  async getFunnelCount(paramsObj) {
    const countQuery = this.#makeCountQuery(paramsObj);
    let result = await this.#executeQuery(countQuery);
    return result.rows[0].count;
  }

  async updateFunnel(id, body) {
    const name = body.funnelName;
    const lastModified = Date.now();
    console.log("id: ", id);
    console.log("name: ", name);
    console.log("lastModified: ", lastModified);
    console.log("body: ", body);
  }

  #makeCountQuery() {
    return "SELECT count(*) FROM funnels";
  }

  async insertFunnel(funnelObj) {
    let now = Date.now();
    const sql = `INSERT INTO funnels (
        funnel, name, created_at_ms, last_modified_at_ms
      ) 
      VALUES (
        $1, $2, $3, $4
      )`;
    await this.#client.query(sql, [funnelObj, funnelObj.funnelName, now, now]);
    return;
  }

  async getFunnelObj(funnelId) {
    let query = `SELECT funnel FROM funnels WHERE id = ${funnelId}`;
    let result = await this.#executeQuery(query);
    return result.rows[0];
  }

  async #executeQuery(queryStr) {
    return await this.#client.query(queryStr);
  }
  #getDateStr(timestamp) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    return `${year}-${month}-${day}`;
  }
}

module.exports = Postgres;
