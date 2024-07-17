import moment from "moment";
import ContractRepository from "./ContractRepository";

export default class GenerateInvoices {
  constructor (readonly contractRepository: ContractRepository) {}

  async execute(input: Input): Promise<Output[] | string> {

    const output: Output[] = [];
    const contracts = await this.contractRepository.list();
    for (const contract of contracts) {
      const invoices = contract.generateInvoices({
        month: input.month,
        year: input.year,
        type: input.type,
      });

      invoices.forEach((invoice) => {
        output.push(invoice);
      });
    }   

    if (input.format === 'json') {
      return output;
    }

    if (input.format) {
      const lines: any[] = []
      output.forEach((invoice) => {
        lines.push([invoice.date,`${invoice.amount}`].join(';'))
      });
      return lines.join('\n');
    }

    return output;
  }
}

type Input = {
  month: number;
  year: number;
  type: "cash" | "accrual"; 
  format?: 'json'| 'csv';
}

type Output = {
  date: string;
  amount: number;
}