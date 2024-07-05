import Contract from "../src/Contract";

// unit test
test('should generate contract invoices', () => {
  const contract = new Contract({
    id: "",
    description: "",
    periods: 12,
    amount: 6000,
    date: new Date("2024-01-01T10:00:00"),
  });
  const invoices = contract.generateInvoices({
    month: 1,
    year: 2024,
    type: `accrual`, 
  })
  expect(invoices.at(0)?.date).toBe("2024-01-01");
  expect(invoices.at(0)?.amount).toBe(500);
});