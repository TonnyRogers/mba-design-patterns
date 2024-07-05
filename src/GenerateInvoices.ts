import moment from "moment";
import ContractRepository from "./ContractRepository";

export default class GenerateInvoices {
  constructor (readonly contractRepository: ContractRepository) {}

  async execute(input: Input): Promise<Output[]> {

    const output: Output[] = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      const invoices = contract.generateInvoices({
        month: input.month,
        type: input.type,
        year: input.year
      });

      invoices.forEach((invoice) => {
        output.push(invoice);
      });
    }   


    return output;
  }
}

type Input = {
  month: number;
  year: number;
  type: "cash" | "accrual"; 
}

type Output = {
  date: string;
  amount: number;
}