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
    console.log("loading");
    this.db = new Database();
    let db = this.db;
    db.exec(`create table interactions(step integer primary key, value integer)`);
    this.interactions = {
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
