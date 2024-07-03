import ContractRepository from "./ContractRepository";
import pgPromise from "pg-promise"

export default class ContractDatabaseRepository implements ContractRepository {
 async list(): Promise<any> {
    const connection = pgPromise()("postgres://postgres:r373261597y6@localhost:5432/app");
    const constracts = await connection.query('SELECT * FROM contract', []);

    for (const contract of constracts) {
        contract.payments = await connection.query('SELECT * FROM payment WHERE contract_id = $1', [contract.id]);
    }


    connection.$pool.end();
    return constracts;
  }

}