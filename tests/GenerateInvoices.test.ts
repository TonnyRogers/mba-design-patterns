import GenerateInvoices from "../src/GenerateInvoices";

test('should generate invoices to cash regim', async () => {
  const generateInvoices = new GenerateInvoices();
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
  const generateInvoices = new GenerateInvoices();
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
  const generateInvoices = new GenerateInvoices();
  const input: any = {
    month: 2,
    year: 2024,
    type: "accrual",
  }
  const output = await generateInvoices.execute(input);
  expect(output.at(0)?.date).toBe("2024-02-01");
  expect(output.at(0)?.amount).toBe(500);
});