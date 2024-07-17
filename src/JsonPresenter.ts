import moment from "moment";
import { Output } from "./GenerateInvoices";
import Presenter from "./Presenter";

export default class JsonPresenter implements Presenter {
  present(output: Output[]) {
    return output.map((val) => ({ amount: val.amount, date: moment(val.date).format("YYYY-MM-DD") }));
  }
}