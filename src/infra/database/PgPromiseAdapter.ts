import DatabaseConnection from "./DatabaseConnection";
import pgPromise from "pg-promise"

export default class PgPromiseAdapter implements DatabaseConnection {
  connection: any;

  constructor() {
    this.connection = pgPromise()("postgres://postgres:r373261597y6@localhost:5432/app");
  }

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement,params);
  }
  
  async close(): Promise<void> {
    return this.connection.$pool.end();
  }

}