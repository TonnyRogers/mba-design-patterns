import GenerateInvoices from "../src/GenerateInvoices";

test('should generate invoices', async () => {
  const generateInvoices = new GenerateInvoices();
  const output = await generateInvoices.execute();
  console.log(output);
});