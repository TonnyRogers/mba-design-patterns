import pgPromise from "pg-promise"

export default class GenerateInvoices {
  async execute() {
    const connection = pgPromise()("postgres://postgres:12345@localhost:5432/app");
    const constract = await connection.query('SELECT * FROM invoice_service.contracts', []);
    console.log(constract);
    
    return []
  }
}