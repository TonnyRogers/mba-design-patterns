import ContractRepository from "./ContractRepository";
import Presenter from "./Presenter";
import JsonPresenter from "./JsonPresenter";
import UseCase from "./UseCase";

export default class GenerateInvoices implements UseCase {
  constructor (
    readonly contractRepository: ContractRepository, 
    readonly presenter: Presenter = new JsonPresenter()
  ) {}

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

    return this.presenter.present(output);
  }
}

type Input = {
  month: number;
  year: number;
  type: "cash" | "accrual";
}

export type Output = {
  date: Date;
  amount: number;
}