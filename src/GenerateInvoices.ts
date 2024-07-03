import pgPromise from "pg-promise"
import moment from "moment";

export default class GenerateInvoices {
  async execute(input: Input): Promise<Output[]> {
    const connection = pgPromise()("postgres://postgres:r373261597y6@localhost:5432/app");
    const constracts = await connection.query('SELECT * FROM contract', []);
    const output: Output[] = [];
    for (const contract of constracts) {
      if(input.type === 'cash') {
        const payments = await connection.query('SELECT * FROM payment WHERE contract_id = $1', [contract.id]);
        for (const payment of payments) {
          if (payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) continue;
          output.push({ amount: parseFloat(payment.amount), date: moment(payment.date).format("YYYY-MM-DD") })
        }
      }

      if (input.type === 'accrual') {
        let period = 0;
        while (period <= contract.periods) {
          const date = moment(contract.date).add(period++,"months").toDate();
          if(date.getMonth() + 1 !== input.month || date.getFullYear() !== input.year) continue;
          const amount = parseFloat(contract.amount)/contract.periods;
          output.push({ date: moment(date).format("YYYY-MM-DD"), amount })
        }
      }
    }   

    connection.$pool.end();
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