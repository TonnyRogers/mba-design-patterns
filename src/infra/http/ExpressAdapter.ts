
import express from 'express';
import HttpServe from './HttpServer';

export default class ExpressAdapter implements HttpServe {
  app: any;

  constructor () {
    this.app = express();
    this.app.use(express.json());
  }
  
  on(method: string, url: string, callback: Function): void {
    this.app[method](url,async (req: any, res: any) => {
      const output = await callback(req.params, req.body, req.headers);
      res.json(output);
    })
  }

  listen(port: number): void {
    this.app.listen(port);
  }

}