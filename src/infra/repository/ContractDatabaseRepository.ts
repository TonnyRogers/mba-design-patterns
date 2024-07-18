import moment from "moment";
import ContractRepository from "../../application/repository/ContractRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import Contract from "../../domain/Contract";
import CashBasisStrategy from "../../domain/CashBasisStrategy";
import Payment from "../../domain/Payment";


export default class ContractDatabaseRepository implements ContractRepository {

  constructor (readonly connection: DatabaseConnection) {}

  async list(): Promise<Contract[]> {

    const constractsData = await this.connection.query('SELECT * FROM contract', []);
    const contracts: Contract[] = [];
    for (const contractData of constractsData) {
        const contract = new Contract({
          id: contractData.id,
          amount: parseFloat(contractData.amount),
          date: moment(contractData.date).toDate(),
          description: contractData.description,
          periods: contractData.periods,
          invoiceGenerationStrategy: new CashBasisStrategy(),
        });

        const paymentsData = await this.connection.query('SELECT * FROM payment WHERE contract_id = $1', [contract.id]);

        for (const paymentData of paymentsData) {
          contract.addPayment(new Payment({ 
            amount: parseFloat(paymentData.amount), 
            date: moment(paymentData.date).toDate(),
          }));     
        }

        contracts.push(contract);
    }

    return contracts;
  }

}