import UseCase from "./UseCase";

export default class SendEmail implements UseCase {

  execute(input: any): any {
   console.log("send", input);
  }

}