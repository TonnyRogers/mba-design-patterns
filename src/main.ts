import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import MainController from "./infra/http/MainController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const  generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository));
const httpServer = new ExpressAdapter();
new MainController(httpServer,generateInvoices);
 httpServer.listen(3000);