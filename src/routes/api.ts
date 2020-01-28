import * as apiController from '../controllers/api';
import { Application } from 'express';

export class APIRoute {
  public routes(app: Application): void {
    app.route('/api').get(apiController.getApi);
  }
}
