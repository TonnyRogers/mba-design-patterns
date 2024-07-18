import moment from "moment";
import Presenter from "../../application/presenter/Presenter";
import { Output } from "../../application/usecase/GenerateInvoices";

export default class CsvPresenter implements Presenter {
  present(output: Output[]) {
    const lines: any[] = []
    
    output.forEach((invoice) => {
      lines.push([moment(invoice.date).format("YYYY-MM-DD"),`${invoice.amount}`].join(';'))
    });

    return lines.join('\n');
  }
}