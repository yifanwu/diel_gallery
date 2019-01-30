import { Database, Statement } from "sql.js";
import { loadPage } from "../index";

export default class Diel {
  db: Database;
  interactions: {
    add: Statement;
    sub: Statement;
  };
  views: {
    count: Statement;
  };
  constructor() {
    this.setup();
  }
  setup() {
    this.db = new Database(); // sql.js
    let db = this.db;
    this.db.exec(`create table interactions(step integer primary key, value integer)`);
    this.interactions = {
      // TODO: get rid of the prepared statement and use raw query
      add: db.prepare(`insert into interactions (value) values (1)`),
      sub: db.prepare(`insert into interactions (value) values (-1)`),
    };
    this.views = {
      count: db.prepare(`select sum(value) as count from interactions;`)
    };
    setTimeout(() => {
      console.log("set time out");
      loadPage();
    }, 200);
  }
}
