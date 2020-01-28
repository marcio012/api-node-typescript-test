import bodyParser from 'body-parser';
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
  public mongoUrl: string = 'mongodb://localhost/order-api';

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.userRoutes.routes(this.app);
    this.apiRoutes.routes(this.app);
    this.orderRoutes.routes(this.app);
    this.mongoSetup();
  }

  private mongoSetup(): void {
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
