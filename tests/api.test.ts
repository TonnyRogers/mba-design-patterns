import axios from "axios"

test('should generate invoices by API', async function () {
  const input = {
    month: 1,
    year: 2024,
    type: 'cash',
  }

  const response = await axios.post('http://localhost:3000/generate-invoices', input);
  const output = response.data;
  expect(output.at(0).date).toBe("2024-01-02");
  expect(output.at(0).amount).toBe(6000);
})