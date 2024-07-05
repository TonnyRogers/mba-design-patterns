export default class Payment {
  constructor (
    {
      amount,
      date,
    }: Payment
  ) {
    this.amount = amount;
    this.date = date;
  }

  date: Date;
  amount: number;
}