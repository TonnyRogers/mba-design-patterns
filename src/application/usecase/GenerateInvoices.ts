import Mediator from "../../infra/mediator/Mediator";
import JsonPresenter from "../../infra/presenter/JsonPresenter";
import Presenter from "../presenter/Presenter";
import ContractRepository from "../repository/ContractRepository";
import UseCase from "./UseCase";

export default class GenerateInvoices implements UseCase {
  constructor (
    readonly contractRepository: ContractRepository, 
    readonly presenter: Presenter = new JsonPresenter(),
    readonly mediator: Mediator = new Mediator(),
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

      invoices.forEach((invoice: any) => {
        output.push(invoice);
      });
    }   
    await this.mediator.publish("InvoicesGenerated", output);
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