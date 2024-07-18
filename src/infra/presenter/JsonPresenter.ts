import moment from "moment";
import Presenter from "../../application/presenter/Presenter";
import { Output } from "../../application/usecase/GenerateInvoices";

export default class JsonPresenter implements Presenter {
  present(output: Output[]) {
    return output.map((val) => ({ amount: val.amount, date: moment(val.date).format("YYYY-MM-DD") }));
  }
}