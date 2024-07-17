export default class Invoice {
  constructor(
    {
      amount,
      date,
    }: Invoice
  ) {
    this.amount = amount;
    this.date = date;
  }

  date: Date;
  amount: number;
}