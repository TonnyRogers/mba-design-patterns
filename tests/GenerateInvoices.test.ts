import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository";
import ContractRepository from "../src/application/repository/ContractRepository";
import CsvPresenter from "../src/infra/presenter/CsvPresenter";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import GenerateInvoices from "../src/application/usecase/GenerateInvoices";

// integration test
let generateInvoices: GenerateInvoices;
const connection = new PgPromiseAdapter();
let contractRepository: ContractRepository;

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
  // generateInvoices = new GenerateInvoices(contractDatabaseRepository);
  
  contractRepository = new ContractDatabaseRepository(connection);
  generateInvoices = new GenerateInvoices(contractRepository);
})

test('should generate invoices to cash regim', async () => {
  const input: any = {
    month: 1,
    year: 2024,
    type: "cash",
  }
  const output = await generateInvoices.execute(input);
  
  expect(typeof output !== 'string' && output.at(0)?.date).toBe("2024-01-02");
  expect(typeof output !== 'string' && output.at(0)?.amount).toBe(6000);
});

test('should generate invoices to accrual regim', async () => {
  const input: any = {
    month: 1,
    year: 2024,
    type: "accrual",
  }
  const output = await generateInvoices.execute(input);
  expect(typeof output !== 'string' && output.at(0)?.date).toBe("2024-01-01");
  expect(typeof output !== 'string' && output.at(0)?.amount).toBe(500);
});

test('should generate invoices to accrual regim to csv', async () => {
  const input: any = {
    month: 1,
    year: 2024,
    type: "accrual",
    format: 'csv',
  }
  const presenter = new CsvPresenter();
  generateInvoices = new GenerateInvoices(contractRepository, presenter);
  const output = await generateInvoices.execute(input);
  expect(output).toBe("2024-01-01;500");
});

test('should generate invoices to accrual regim', async () => {
  const input: any = {
    month: 2,
    year: 2024,
    type: "accrual",
  }
  const output = await generateInvoices.execute(input);
  expect(typeof output !== 'string' && output.at(0)?.date).toBe("2024-02-01");
  expect(typeof output !== 'string' && output.at(0)?.amount).toBe(500);
});

afterAll(async () => {
  connection.close()
})