import moment from "moment";
import { Output } from "./GenerateInvoices";
import Presenter from "./Presenter";

export default class CsvPresenter implements Presenter {
  present(output: Output[]) {
    const lines: any[] = []
    
    output.forEach((invoice) => {
      lines.push([moment(invoice.date).format("YYYY-MM-DD"),`${invoice.amount}`].join(';'))
    });

    return lines.join('\n');
  }
}