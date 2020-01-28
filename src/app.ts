import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { APIRoute } from './routes/api';
import { OrderRoute } from './routes/orderRoute';
import { UserRoute } from './routes/userRoute';

class App {
  public app: express.Application;
  public userRoutes: UserRoute = new UserRoute();
  public apiRoutes: APIRoute = new APIRoute();
  public orderRoutes: OrderRoute = new OrderRoute();
  public mongoUrl: string;
  public mongoUser: string;
  public mongoPass: string;

  constructor() {
    const path = `${__dirname}/../.env.${process.env.NODE_ENV}`;
    dotenv.config({ path: path });
    this.mongoUrl = `mongodb://${process.env.MONGODB_URL_PORT}/${process.env.MONGODB_DATABASE}`;
    this.mongoUser = `${process.env.MONGODB_USER}`;
    this.mongoPass = `${process.env.MONGODB_PASS}`;

    this.app = express();
    this.app.use(bodyParser.json());
    this.userRoutes.routes(this.app);
    this.apiRoutes.routes(this.app);
    this.orderRoutes.routes(this.app);
    this.mongoSetup();
  }

  private mongoSetup(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let options;

    if (process.env.NODE_ENV !== 'prod') {
      options = {
        useNewUrlParser: true,
      };
    } else {
      options = {
        user: this.mongoUser,
        pass: this.mongoPass,
        useNewUrlParser: true,
      };
    }
    mongoose
      .connect(this.mongoUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => console.log('DB Connected!'))
      .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
      });
  }
}

export default new App().app;
