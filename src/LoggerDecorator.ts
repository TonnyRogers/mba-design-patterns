import UseCase from "./UseCase";

export default class LoggerDecorator implements UseCase {
  constructor (readonly usecase: UseCase) {}

  execute(input: any): Promise<any> {
    // ** add an new functionality to the object
    console.log(input.userAgent);

    return this.usecase.execute(input);
  }
   
}