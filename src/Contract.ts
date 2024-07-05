import moment from "moment";
import Payment from "./Payment";
import Invoice from "./Invoice";

export default class Contract {
  private payments: Payment[]
  
  constructor(
    {
      id,
      amount,
      date,
      description,
      periods,
    }: Pick<Contract, 'id' | 'amount' | 'date' | 'description' | 'periods' >
  ) {
    this.payments = [];
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.description = description;
    this.periods = periods;
  }
  
  id: string;
  description: string;
  amount: number;
  periods: number;
  date: Date;

  addPayment (payment: Payment) {
    this.payments.push(payment);
  }

  getPayments() {
    return this.payments;
  }

  generateInvoices({ type, month, year }: GenerateInvoicesParams) {
    const invoices: Invoice[] = [];
    if(type === 'cash') {
      for (const payment of this.getPayments()) {
        if (payment.date.getMonth() + 1 !== month || payment.date.getFullYear() !== year) continue;
        invoices.push(new Invoice({ amount: payment.amount, date: moment(payment.date).format("YYYY-MM-DD") }))
      }
    }

    if (type === 'accrual') {
      let period = 0;
      while (period <= this.periods) {
        const date = moment(this.date).add(period++,"months").toDate();
        if(date.getMonth() + 1 !== month || date.getFullYear() !== year) continue;
        const amount = this.amount/this.periods;
        invoices.push(new Invoice({ date: moment(date).format("YYYY-MM-DD"), amount }))
      }
    }
    
    return invoices;
  }
}

type GenerateInvoicesParams = {
  month: number;
  year: number;
  type: "cash" | "accrual"; 
}