import express from 'express'
import * as bodyParser from 'body-parser'
import { router } from './router'
import { User } from './models/user';

class App {
  public express: express.Express;
  private usersData: User[] = []

  constructor() {
    this.express = express();
    this.express.locals.usersData = this.usersData;

    this.configureMiddleware(this.express)
    this.mountRoutes()
  }

  private configureMiddleware(app: express.Express): void {
    app.use(bodyParser.json())
  }

  private mountRoutes(): void {
    this.express.use('/api', router)
  }
}

export default new App().express;