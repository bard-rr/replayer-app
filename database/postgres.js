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
  constructor() {}
  async init() {
    // console.log(new Client());
    this.#client = new Client();
    await this.#client.connect();
  }

  // async getSessionMetadata(sessionId) {
  //   let sql = `SELECT * FROM pending_sessions WHERE session_id='${sessionId}'`;
  //   let result = await this.#executeQuery(sql);
  //   return result.rows[0];
  // }

  async getFunnels() {
    const sql = `SELECT (id) FROM funnels`;
    let result = await this.#executeQuery(sql);
    return result.rows;
  }

  async insertFunnel(funnelObj) {
    const sql = `INSERT INTO funnels (funnel) VALUES ($1)`;
    await this.#client.query(sql, [funnelObj]);
    return;
  }

  async #executeQuery(queryStr) {
    return await this.#client.query(queryStr);
  }
}

module.exports = Postgres;
