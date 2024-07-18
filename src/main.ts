import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import MainController from "./infra/http/MainController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import Mediator from "./infra/mediator/Mediator";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import SendEmail from "./application/usecase/SendEmail";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const mediator = new Mediator();
const sendEmail = new SendEmail();

mediator.on("InvoicesGenerated", (data: any) => {
  sendEmail.execute(data);
})
const  generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository, new JsonPresenter(), mediator));
const httpServer = new ExpressAdapter();
new MainController(httpServer,generateInvoices);
 httpServer.listen(3000);