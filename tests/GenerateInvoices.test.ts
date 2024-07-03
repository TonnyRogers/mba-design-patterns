import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import ContractRepository from "../src/ContractRepository";
import GenerateInvoices from "../src/GenerateInvoices";

let generateInvoices: GenerateInvoices;

beforeEach(() => {
  const contractDatabaseRepository: ContractRepository = {
    async list(): Promise<any> {
        return [
          {
            id: "",
            description: "",
            periods: 12,
            amount: "6000",
            date: new Date("2024-01-01T10:00:00"),
            payments: [
              {
                id: "",
                contract_id: "",
                amount: "6000",
                date: new Date("2024-01-02T10:00:00"),
              }
            ]
          }
        ]
    },
  }
  generateInvoices = new GenerateInvoices(contractDatabaseRepository);
  // generateInvoices = new GenerateInvoices(new ContractDatabaseRepository()); with database
})

test('should generate invoices to cash regim', async () => {
  const input: any = {
    month: 1,
    year: 2024,
    type: "cash",
  }
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-01-02");
  expect(output.at(0)?.amount).toBe(6000);
});

test('should generate invoices to accrual regim', async () => {
  const input: any = {
    month: 1,
    year: 2024,
    type: "accrual",
  }
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-01-01");
  expect(output.at(0)?.amount).toBe(500);
});

test('should generate invoices to accrual regim', async () => {
  const input: any = {
    month: 2,
    year: 2024,
    type: "accrual",
  }
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-02-01");
  expect(output.at(0)?.amount).toBe(500);
});