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
    // set it up for barchart
    this.db.exec(`
      create table attendee (animal text);
      insert into attendee values
        ('cat'), ('cat'),('cat'),
        ('dog'), ('dog'),('dog'),('dog'), ('dog'),('dog')
        ;
    `);
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
  inspectQueryResult(query: string) {
    let r = this.db.exec(query)[0];
    if (r) {
      console.log(r.columns.join("\t"));
      console.log(JSON.stringify(r.values).replace(/\],\[/g, "\n").replace("[[", "").replace("]]", "").replace(/,/g, "\t"));
    } else {
      console.log("No results");
    }
  }
}
