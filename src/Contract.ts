import moment from "moment";
import Payment from "./Payment";
import Invoice from "./Invoice";
import InvoiceGenerationStrategy from "./InvoiceGenerationStrategy";
import InvoiceGenerationFactory from "./InvoiceGenerationFactory";

export default class Contract {
  private payments: Payment[]
  
  constructor(
    {
      id,
      amount,
      date,
      description,
      periods,
      invoiceGenerationStrategy,
    }: Pick<Contract, 'id' | 'amount' | 'date' | 'description' | 'periods' | 'invoiceGenerationStrategy' >
  ) {
    this.payments = [];
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.description = description;
    this.periods = periods;
    this.invoiceGenerationStrategy = invoiceGenerationStrategy;
  }
  
  readonly id: string;
  readonly description: string;
  readonly amount: number;
  readonly periods: number;
  readonly date: Date;
  readonly invoiceGenerationStrategy: InvoiceGenerationStrategy;


  addPayment (payment: Payment) {
    this.payments.push(payment);
  }

  getPayments () {
    return this.payments;
  }

  generateInvoices({ month, year, type }: GenerateInvoicesParams) {
    const invoiceGenerationStrategy = InvoiceGenerationFactory.create(type);
    return invoiceGenerationStrategy.generate(this,month,year);
  }

  getBalance () {
    let balance = this.amount;
    this.payments.forEach((item) => {
      balance -= item.amount;
    });
    return balance;
  }
}

type GenerateInvoicesParams = {
  month: number;
  year: number;
  type: 'cash'| 'accrual';
}